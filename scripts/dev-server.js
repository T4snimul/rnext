const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const PORT = Number(process.env.PORT) || 8080;
const projectRoot = path.resolve(__dirname, '..');
const pdfPath = path.join(projectRoot, 'build', 'main.pdf');
const sourcePollIntervalMs = 1000;
let buildTimer = null;
let buildRunning = false;
let buildQueued = false;
let sourcePollTimer = null;
let lastSourceStamp = 0;

function getPdfMtime(callback) {
  fs.stat(pdfPath, (err, stats) => {
    if (err) {
      callback(null);
      return;
    }

    callback(stats.mtimeMs);
  });
}

function getWatchedFiles() {
  const sectionsDir = path.join(projectRoot, 'sections');
  const sourceFiles = [
    path.join(projectRoot, 'main.tex'),
    path.join(projectRoot, '.latexmkrc')
  ];

  try {
    const sectionFiles = fs.readdirSync(sectionsDir)
      .filter((fileName) => fileName.endsWith('.tex'))
      .map((fileName) => path.join(sectionsDir, fileName));

    sourceFiles.push(...sectionFiles);
  } catch (error) {
    console.error('Unable to read sections directory for watch list:', error);
  }

  return sourceFiles;
}

function getLatestSourceStamp() {
  return getWatchedFiles().reduce((latestStamp, filePath) => {
    try {
      const stats = fs.statSync(filePath);
      return Math.max(latestStamp, stats.mtimeMs);
    } catch (error) {
      return latestStamp;
    }
  }, 0);
}

function runBuild() {
  if (buildRunning) {
    buildQueued = true;
    return;
  }

  buildRunning = true;
  console.log('Rebuilding PDF with latexmk -pdf main.tex');

  const buildProcess = spawn('latexmk', ['-pdf', 'main.tex'], {
    cwd: projectRoot,
    stdio: ['ignore', 'pipe', 'pipe']
  });

  buildProcess.stdout.on('data', (chunk) => {
    process.stdout.write(chunk);
  });

  buildProcess.stderr.on('data', (chunk) => {
    process.stderr.write(chunk);
  });

  buildProcess.on('exit', (code) => {
    buildRunning = false;

    if (code !== 0) {
      console.error(`latexmk exited with code ${code}`);
    }

    if (buildQueued) {
      buildQueued = false;
      runBuild();
    }
  });
}

function scheduleBuild() {
  clearTimeout(buildTimer);
  buildTimer = setTimeout(() => {
    buildTimer = null;
    runBuild();
  }, 150);
}

function startWatching() {
  lastSourceStamp = getLatestSourceStamp();

  sourcePollTimer = setInterval(() => {
    const currentStamp = getLatestSourceStamp();

    if (currentStamp > lastSourceStamp) {
      lastSourceStamp = currentStamp;
      scheduleBuild();
    }
  }, sourcePollIntervalMs);
}

function sendFile(res, filePath, contentType) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('PDF not found. Run "npm run build" to generate build/main.pdf.');
      return;
    }

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-store'
    });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  const urlPath = req.url.split('?')[0];

  if (urlPath === '/__pdf-mtime') {
    getPdfMtime((mtime) => {
      res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store'
      });
      res.end(JSON.stringify({ mtime }));
    });
    return;
  }

  if (urlPath === '/main.pdf' || urlPath === '/build/main.pdf') {
    sendFile(res, pdfPath, 'application/pdf');
    return;
  }

  if (urlPath === '/' || urlPath === '/index.html') {
    const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Math 1227 PDF</title>
  <style>
    body { margin: 0; font-family: Georgia, serif; background: #f6f6f2; color: #1f1f1f; }
    header { padding: 12px 16px; background: #1f1f1f; color: #fff; }
    a { color: #0b5fff; }
    main { height: calc(100vh - 56px); }
    iframe { border: 0; width: 100%; height: 100%; background: #fff; }
    .note { padding: 12px 16px; font-size: 14px; }
  </style>
</head>
<body>
  <header>Math 1227 Worksheet Preview</header>
  <div class="note">PDF endpoint: <a href="/main.pdf">/main.pdf</a></div>
  <main>
    <iframe id="pdf-viewer" src="/main.pdf" title="Math 1227 PDF"></iframe>
  </main>
  <script>
    const iframe = document.getElementById('pdf-viewer');
    let lastMtime = 0;

    async function refreshPdfWhenChanged() {
      try {
        const response = await fetch('/__pdf-mtime', { cache: 'no-store' });
        const data = await response.json();

        if (data.mtime && data.mtime !== lastMtime) {
          lastMtime = data.mtime;
          iframe.src = '/main.pdf?ts=' + Date.now();
        }
      } catch (error) {
        console.warn('PDF refresh check failed:', error);
      }
    }

    refreshPdfWhenChanged();
    setInterval(refreshPdfWhenChanged, 2000);
  </script>
</body>
</html>`;

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Not found');
});

function shutdown() {
  if (sourcePollTimer) {
    clearInterval(sourcePollTimer);
  }

  if (buildTimer) {
    clearTimeout(buildTimer);
  }

  server.close(() => {
    process.exit(0);
  });

  setTimeout(() => {
    process.exit(0);
  }, 2000).unref();
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

server.listen(PORT, () => {
  console.log(`PDF server running at http://localhost:${PORT}`);
  console.log('Watching source files with fs.watch and rebuilding via latexmk -pdf main.tex');
  console.log('Serving: build/main.pdf');

  startWatching();
  runBuild();
});
