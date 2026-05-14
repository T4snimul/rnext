import { Suspense, useState } from "react";
import demos from "./data/demos";
import importDemo from "./utils/importDemo";

export default function App() {
  const [selectedDemo, setSelectedDemo] = useState(null);

  const loadDemo = async (file) => {
    const Demo = await importDemo(file);
    return <Demo />;
  };

  const selectDemo = async (file) => {
    const DemoComponent = await loadDemo(file);

    setSelectedDemo(DemoComponent);
  };

  return (
    <div>
      <div>
        <h1>React Lazy load explained</h1>

        <div>
          {demos.map((demo) => (
            <button key={demo.name} onClick={() => selectDemo(demo.file)}>
              {demo.name}
            </button>
          ))}
        </div>

        <div>
          <Suspense fallback={<p>Loading...</p>}>{selectedDemo}</Suspense>
        </div>
      </div>
    </div>
  );
}
