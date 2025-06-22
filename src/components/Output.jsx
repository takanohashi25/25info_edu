export default function Output({ result }) {
  return (
    <pre className="result">
      {result || 'ここに実行結果を表示'}
    </pre>
  );
}
