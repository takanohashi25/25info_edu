import { useEffect, useState } from 'react';
import { db } from './firebaseSimizu';
import {
  collection, addDoc, deleteDoc, doc,
  updateDoc, onSnapshot, query, orderBy
} from 'firebase/firestore';

import Sidebar from './components/Sidebar';
import Editor from './components/Editor';
import ButtonRow from './components/ButtonRow';
import Output from './components/Output';
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
      <Sidebar
        programs={programs}
        selectedProgramId={selectedProgramId}
        editingId={editingId}
        editTitle={editTitle}
        onSelect={handleSelect}
        onEditStart={startEditing}
        onEditFinish={finishEditing}
        onNew={handleNew}
        onDelete={handleDelete}
        setEditTitle={setEditTitle}
      />
      <div className="main-content">
        <h1>プログラムエディタ</h1>
        <ButtonRow onSave={handleSave} onRun={handleRun} />
        <Editor code={code} onChange={setCode} />
        
        <h2>出力</h2>
        <Output result={result} />
      </div>
    </div>
  );
}

export default App;
