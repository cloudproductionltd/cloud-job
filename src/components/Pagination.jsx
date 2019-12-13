
import React from 'react';
import { Link } from 'react-router-dom';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  // for (let i = 1; i <= totalPage; i++) {
  //   pageNumbers.push(i);
  // }

  return (

    <nav>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <nav aria-label="Page navigation example" className="pagination-inner d-flex align-items-center justify-content-center bottom-pagination">
            <ul className="pagination pg-primary">
                <li key={number} className="page-item ">
                <a onClick={() => paginate(number)}  className="page-link" tabIndex="-1"> {number}</a>
                </li>
            </ul>
        </nav>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;