import { useState, useEffect } from 'react';
import ReservationForm from './components/ReservationForm';
import ReservationList from './components/ReservationList';
import { db } from './firebase';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';


function App() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'reservations'),
      (snapshot) => {
        const data = snapshot.docs.map(doc => doc.data());
        setReservations(data);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleAdd = async (reservation) => {
    await addDoc(collection(db, 'reservations'), reservation);
  };

  return (
    <div>
      <h1>予約管理アプリ</h1>
      <ReservationForm onAdd={handleAdd} />
      <ReservationList reservations={reservations} />
    </div>
  );
}

export default App;

