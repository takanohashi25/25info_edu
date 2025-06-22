export default function ProgramList({
  programs,
  selectedProgramId,
  editingId,
  editTitle,
  onSelect,
  onEditStart,
  onEditFinish,
  setEditTitle
}) {
  return (
    <ul>
      {programs.map(prog => (
        <li key={prog.id}>
          {editingId === prog.id ? (
            <input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onBlur={() => onEditFinish(prog.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') onEditFinish(prog.id);
              }}
              autoFocus
            />
          ) : (
            <span
              onClick={() => onSelect(prog)}
              onDoubleClick={() => onEditStart(prog)}
              style={{
                cursor: 'pointer',
                fontWeight: prog.id === selectedProgramId ? 'bold' : 'normal'
              }}
            >
              {prog.title}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
