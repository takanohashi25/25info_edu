import { useState } from 'react';

function ReservationForm({ onAdd }) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');  // ⬅️ 追加

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && date && time) {
      onAdd({ name, date, time });  // ⬅️ 追加
      setName('');
      setDate('');
      setTime('');  // ⬅️ 追加
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="名前"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <button type="submit">予約する</button>
    </form>
  );
}

export default ReservationForm;

