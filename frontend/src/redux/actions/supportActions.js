const API_URL = process.env.REACT_APP_API_URL;

// Action Types
export const ADD_SUPPORT = 'ADD_SUPPORT';
export const CREATE_SUPPORT_SUCCESS = 'CREATE_SUPPORT_SUCCESS';
export const CREATE_SUPPORT_FAILURE = 'CREATE_SUPPORT_FAILURE';
export const UPDATE_SUPPORT_STATUS_SUCCESS = 'UPDATE_SUPPORT_STATUS_SUCCESS';
export const UPDATE_SUPPORT_STATUS_FAILURE = 'UPDATE_SUPPORT_STATUS_FAILURE';
export const FETCH_TICKETS_SUCCESS = 'FETCH_TICKETS_SUCCESS';
export const FETCH_TICKETS_FAILURE = 'FETCH_TICKETS_FAILURE';
export const DELETE_SUPPORT_SUCCESS = 'DELETE_SUPPORT_SUCCESS'
export const DELETE_SUPPORT_FAIL = 'DELETE_SUPPORT_FAIL'

export const createSupportSuccess = (ticket) => ({
  type: CREATE_SUPPORT_SUCCESS,
  payload: ticket,
});

export const createSupportFailure = (error) => ({
  type: CREATE_SUPPORT_FAILURE,
  payload: error,
});


export const updateSupportStatusSuccess = (ticketId, newStatus) => ({
  type: UPDATE_SUPPORT_STATUS_SUCCESS,
  payload: { ticketId, newStatus },
});

export const updateSupportStatusFailure = (error) => ({
  type: UPDATE_SUPPORT_STATUS_FAILURE,
  payload: error,
});

export const fetchTicketsSuccess = (tickets) => ({
  type: FETCH_TICKETS_SUCCESS,
  payload: tickets,
});

export const fetchTicketsFailure = (error) => ({
  type: FETCH_TICKETS_FAILURE,
  payload: error,
});

export const deleteSupportSuccess = (ticketId) => ({
  type: DELETE_SUPPORT_SUCCESS,
  payload: ticketId,
});

export const deleteSupportFailure = (error) => ({
  type: DELETE_SUPPORT_FAIL,
  payload: error,
});

// API Call Actions
export const fetchTickets = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${API_URL}/tickets`);
      if (!response.ok) {
        throw new Error('Failed to fetch tickets');
      }
      const tickets = await response.json();
      dispatch(fetchTicketsSuccess(tickets));
    } catch (error) {
      dispatch(fetchTicketsFailure(error.message));
    }
  };
};

export const fetchTicketsIfNeeded = () => {
  console.log(API_URL, process.env);
  return async (dispatch, getState) => {
    const { tickets } = getState().support;
    if (tickets.length === 0) {
      try {
        const response = {}//await fetch(`${API_URL}/tickets`);
        if (!response.ok) {
          throw new Error('Failed to fetch tickets');
        }
        const fetchedTickets = await response.json();
        dispatch(fetchTicketsSuccess(fetchedTickets));
      } catch (error) {
        dispatch(fetchTicketsFailure(error.message));
      }
    }
  };
};

export const createSupport = (ticketData) => {
  return async (dispatch) => {
      try {
        const response = await fetch(`${API_URL}/tickets`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(ticketData),
        });

        if (!response.ok) {
            throw new Error('Failed to create ticket');
        }

        const newTicket = await response.json();
        dispatch(createSupportSuccess(newTicket));
      } catch (error) {
        dispatch(createSupportFailure(error.message));
      }
  };
};

export const updateTicketStatus = (ticketId, newStatus) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${API_URL}/tickets/${ticketId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) {
        throw new Error('Failed to update ticket status');
      }
      dispatch(updateSupportStatusSuccess(ticketId, newStatus));
    } catch (error) {
      dispatch(updateSupportStatusFailure(error.message));
    }
  };
};

export const deleteSupport = (id) => async (dispatch) => {
  try {
    const response = await fetch(`${API_URL}/tickets/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete ticket');
    }

    dispatch(deleteSupportSuccess(id));
  } catch (error) {
    dispatch(deleteSupportFailure(error.message));
  }
};
