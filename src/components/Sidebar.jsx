import ProgramList from './ProgramList';

export default function Sidebar({
  programs,
  selectedProgramId,
  editingId,
  editTitle,
  onSelect,
  onEditStart,
  onEditFinish,
  onNew,
  onDelete,
  setEditTitle
}) {
  return (
    <div className="sidebar">
      <h2>保存プログラム</h2>
      <ProgramList
        programs={programs}
        selectedProgramId={selectedProgramId}
        editingId={editingId}
        editTitle={editTitle}
        onSelect={onSelect}
        onEditStart={onEditStart}
        onEditFinish={onEditFinish}
        setEditTitle={setEditTitle}
      />
      <div className="sidebar-row">
        <button className="sidebar-button" onClick={onNew}>＋ 新規作成</button>
        <button className="sidebar-button" onClick={onDelete}>🗑️ 削除</button>
      </div>
    </div>
  );
}
