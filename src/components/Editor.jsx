export default function Editor({ code, onChange }) {
  return (
    <textarea
      className="code-input"
      placeholder="JavaScriptコードをここに記述"
      value={code}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
