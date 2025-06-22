import { useEffect, useState } from 'react';
import { db } from './firebaseSimizu';
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';
import './App.css';

function App() {
  const [code, setCode] = useState('');
  const [programs, setPrograms] = useState([]);
  const [selectedProgramId, setSelectedProgramId] = useState(null);
  const [result, setResult] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'programs'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, snapshot => {
      const list = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setPrograms(list);
    });
    return () => unsubscribe();
  }, []);

  const handleNew = async () => {
    const now = new Date();
    const title = now.toLocaleString();
    const docRef = await addDoc(collection(db, 'programs'), {
      title,
      code: '',
      timestamp: now
    });
    setCode('');
    setResult('');
    setSelectedProgramId(docRef.id);
  };

  const handleDelete = async () => {
    if (!selectedProgramId) return;
    await deleteDoc(doc(db, 'programs', selectedProgramId));
    setSelectedProgramId(null);
    setCode('');
    setResult('');
  };

  const handleSave = async () => {
    if (!code) return;
    const now = new Date();
    const title = now.toLocaleString();
    await addDoc(collection(db, 'programs'), {
      title,
      code,
      timestamp: now
    });
    setCode('');
    setResult('');
    setSelectedProgramId(null);
  };

  const handleRun = async () => {
    const selectedProgram = programs.find(p => p.id === selectedProgramId);
    const title = selectedProgram ? selectedProgram.title : '(無題)';
    try {
      const fn = new Function(code);
      const output = fn();
      const resultText = String(output);
      setResult(resultText);

      await addDoc(collection(db, 'executions'), {
        title,
        code,
        result: resultText,
        timestamp: new Date()
      });
    } catch (e) {
      const errorText = 'Error: ' + e.message;
      setResult(errorText);

      await addDoc(collection(db, 'executions'), {
        title,
        code,
        result: errorText,
        timestamp: new Date()
      });
    }
  };

  const handleSelect = prog => {
    setCode(prog.code);
    setSelectedProgramId(prog.id);
    setResult('');
  };

  const startEditing = prog => {
    setEditingId(prog.id);
    setEditTitle(prog.title);
  };

  const finishEditing = async id => {
    const trimmed = editTitle.trim();
    if (trimmed) {
      const ref = doc(db, 'programs', id);
      await updateDoc(ref, { title: trimmed });
    }
    setEditingId(null);
    setEditTitle('');
  };

  return (
    <div className="app-layout">
      <div className="sidebar">
        <h2>保存プログラム</h2>
        <ul>
          {programs.map(prog => (
            <li key={prog.id}>
              {editingId === prog.id ? (
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  onBlur={() => finishEditing(prog.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') finishEditing(prog.id);
                  }}
                  autoFocus
                />
              ) : (
                <span
                  onClick={() => handleSelect(prog)}
                  onDoubleClick={() => startEditing(prog)}
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
        <div className="sidebar-row">
          <button className="sidebar-button" onClick={handleNew}>＋ 新規作成</button>
          <button className="sidebar-button" onClick={handleDelete}>🗑️ 削除</button>
        </div>
      </div>

      <div className="main-content">
        <h1>プログラムエディタ</h1>
        <textarea
          className="code-input"
          placeholder="JavaScriptコードをここに記述"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <div className="button-row">
          <button className="action-button" onClick={handleSave}>💾 保存</button>
          <button className="action-button" onClick={handleRun}>▶ 実行</button>
        </div>
        <h2>出力</h2>
        <pre className="result">{result || 'ここに実行結果を表示'}</pre>
      </div>
    </div>
  );
}

export default App;
