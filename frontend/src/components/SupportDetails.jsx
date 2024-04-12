import React from 'react';

const TicketDetails = ({ ticket }) => {
  return (
    <div>
      <h2>Ticket Details</h2>
      <div>
        <strong>Ticket ID:</strong> {ticket.id}
      </div>
      <div>
        <strong>Status:</strong> {ticket.status}
      </div>
      <div>
        <strong>User:</strong> {ticket.user}
      </div>
      <div>
        <strong>Description:</strong> {ticket.description}
      </div>
    </div>
  );
}

export default TicketDetails;