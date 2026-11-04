export default function Pagination({ page = 1, totalPages = 1, onChange = () => {} }) {
  if (totalPages <= 1) return null;
  return (
    <nav aria-label="Pagination">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => onChange(page - 1)}>Previous</button>
        </li>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
          <li key={number} className={`page-item ${page === number ? "active" : ""}`}>
            <button className="page-link" onClick={() => onChange(number)}>{number}</button>
          </li>
        ))}
        <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => onChange(page + 1)}>Next</button>
        </li>
      </ul>
    </nav>
  );
}