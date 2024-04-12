import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTickets, fetchTicketsIfNeeded } from '../redux/actions/supportActions';

// CSS
import '../styles/adminDashboard.css';
import SupportList from './SupportList';

const AdminDashboardComponent = () => {
    const dispatch = useDispatch();
    const { tickets, isLoading, error } = useSelector((state) => state.support);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const totalPages = Math.ceil(tickets.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedTickets = tickets.slice(startIndex, endIndex);

    const goToPage = (page) => {
      setCurrentPage(page);
    };

    const nextPage = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    };

    const prevPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };


    useEffect(() => {
      if (tickets.length === 0 && !isLoading) {
        dispatch(fetchTickets());
      }
    }, [dispatch, tickets, isLoading]);

    const handleRefresh = () => {
      dispatch(fetchTickets());
    };

    if (error) {
      return <div>Error: {error}</div>;
    }

    return (
      <div className='dashboard-container'>
        <h2 className='dashboard-title'>Admin Dashboard</h2>
        <button onClick={handleRefresh}>Refresh</button>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {tickets.length === 0 ? (
          <p>No tickets available</p>
        ) : (
          <React.Fragment>
            <SupportList tickets={displayedTickets} />
            <div className='pagination'>
              <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
              {Array.from({ length: totalPages }, (_, index) => (
                  <button key={index} onClick={() => goToPage(index + 1)}>{index + 1}</button>
              ))}
              <button onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
            </div>
          </React.Fragment>
        )}
    </div>
    );
}

export default AdminDashboardComponent;
