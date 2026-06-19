const rtf = new Intl.RelativeTimeFormat("en", {
  numeric: "auto",
});

export function getRelativeTime(dateString) {
  const date = new Date(dateString);
  const diff = (date.getTime() - Date.now()) / 1000;

  const units = [
    ["year", 31536000],
    ["month", 2592000],
    ["week", 604800],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
  ];

  for (const [unit, seconds] of units) {
    if (Math.abs(diff) >= seconds) {
      return rtf.format(Math.round(diff / seconds), unit);
    }
  }

  return "just now";
}
