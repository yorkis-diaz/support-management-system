import React, { useState } from 'react';

const TicketStatus = ({ ticket, onUpdateStatus }) => {
  const [newStatus, setNewStatus] = useState('');

  const handleChange = (e) => {
    setNewStatus(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateStatus(newStatus);
    setNewStatus('');
  };

  return (
    <div>
      <h2>Update Ticket Status</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="status">New Status:</label>
        <select id="status" value={newStatus} onChange={handleChange}>
          <option value="">Select Status</option>
          <option value="new">New</option>
          <option value="in progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
        <button type="submit">Update Status</button>
      </form>
    </div>
  );
};

export default TicketStatus;