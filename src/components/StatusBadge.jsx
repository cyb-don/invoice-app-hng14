export default function StatusBadge({ status }) {
  return (
    <span className={`badge ${status}`}>
      <span className="dot" aria-hidden="true" />
      {status}
    </span>
  );
}