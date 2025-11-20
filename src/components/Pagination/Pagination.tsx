interface PaginationProps {
  tasksPerPage: number;
  totalTasks: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  tasksPerPage,
  totalTasks,
  currentPage,
  onPageChange
}) => {
  const pageNumbers = [];
  
  // Вычисляем сколько всего страниц
  for (let i = 1; i <= Math.ceil(totalTasks / tasksPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '20px' }}>
      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          style={{
            padding: '8px 12px',
            background: currentPage === number ? '#3b82f6' : 'white',
            color: currentPage === number ? 'white' : '#1f2937',
            border: '1px solid #e2e8f0',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination