export default function ButtonRow({ onSave, onRun }) {
  return (
    <div className="button-row">
      <button className="action-button" onClick={onRun}>▶ 実行</button>
      <button className="action-button" onClick={onSave}>💾 保存</button>
    </div>
  );
}
