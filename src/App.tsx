import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [page, setCurrentPage] = useState(1);

  const end = page * perPage;
  const start = end - perPage;

  const handlePerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(+e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {page} (items {start + 1} -{' '}
        {end >= items.length ? items.length : end} of 42)
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handlePerPage}
          >
            {[3, 5, 10, 20].map(e => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      {/* Move this markup to Pagination */}
      <Pagination
        perPage={perPage}
        total={items.length}
        currentPage={page}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default App;
