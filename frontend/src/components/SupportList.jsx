import React from 'react';
import { useDispatch } from 'react-redux';
import { updateTicketStatus, deleteSupport } from '../redux/actions/supportActions';

// Utils
import { sendEmail } from '../utils/emailUtils';

// CSS
import '../styles/supportList.css';

const SupportList = ({ tickets }) => {
  const dispatch = useDispatch();

  const handleStatusChange = (ticketId, newStatus) => {
    dispatch(updateTicketStatus(ticketId, newStatus));
  };

  const handleDelete = (ticketId) => {
    dispatch(deleteSupport(ticketId));
  };

  const handleSendEmail = () => {
    const recipient = 'sample@example.com';
    const subject = 'Important Notification';
    const body = 'This is the content of the email...';
    sendEmail(recipient, subject, body);
  };

  return (
    <div className="support-list-container">
      <h2>Ticket List</h2>
      <button onClick={handleSendEmail} className='send-email-button'>Send Email</button>
      <table className="support-table">
        <thead>
          <tr>
            <th>Ticket ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Email</th>
            <th>Description</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(ticket => (
            <tr key={ticket.id}>
              <td>{ticket.id}</td>
              <td>{ticket.name}</td>
              <td>
                <select
                  value={ticket.status || ''}
                  onChange={(e) => handleStatusChange(ticket.id, e.target.value)}
                  className='support-status-dropdown'
                >
                  <option value="New">New</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </td>
              <td>{ticket.email}</td>
              <td>{ticket.description}</td>
              <td>
                <button onClick={() => handleDelete(ticket.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SupportList;
