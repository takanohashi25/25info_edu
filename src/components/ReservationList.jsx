function ReservationList({ reservations }) {
  return (
    <ul>
      {reservations.map((r, index) => (
        <li key={index}>
          {r.name}（{r.date} {r.time}）
        </li>
      ))}
    </ul>
  );
}

export default ReservationList;


