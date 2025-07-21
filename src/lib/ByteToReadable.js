export default function ByteToReadable(bytes) {
  if (bytes === 0) return "0 Б";

  const kb = 1024;
  const mb = kb * 1024;

  if (bytes < mb) {
    const kbValue = bytes / kb;
    return `~${Math.round(kbValue)} КБ`;
  } else {
    const mbValue = bytes / mb;
    return `~${mbValue.toFixed(1)} МБ`;
  }
}
