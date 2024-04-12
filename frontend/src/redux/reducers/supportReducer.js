import {
  CREATE_SUPPORT_SUCCESS,
  CREATE_SUPPORT_FAILURE,
  UPDATE_SUPPORT_STATUS_SUCCESS,
  UPDATE_SUPPORT_STATUS_FAILURE,
  FETCH_TICKETS_SUCCESS,
  FETCH_TICKETS_FAILURE,
  DELETE_SUPPORT_SUCCESS,
  DELETE_SUPPORT_FAIL,
} from "../actions/supportActions.js";

const initialState = {
  tickets: [],
  error: null,
};

const supportReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_SUPPORT_SUCCESS:
      return {
        ...state,
        tickets: [...state.tickets, action.payload],
        error: null
      };
    case CREATE_SUPPORT_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case UPDATE_SUPPORT_STATUS_SUCCESS:
      return {
        ...state,
        tickets: state.tickets.map((ticket) =>
          ticket.id === action.payload.ticketId
            ? { ...ticket, status: action.payload.newStatus }
            : ticket
        ),
        error: null,
      };
    case UPDATE_SUPPORT_STATUS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case FETCH_TICKETS_SUCCESS:
      return {
        ...state,
        tickets: [...action.payload],
        error: null,
      };
    case FETCH_TICKETS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_SUPPORT_SUCCESS:
      return {
        ...state,
        tickets: state.tickets.filter((ticket) => ticket.id !== action.payload),
        error: null
      };
    case DELETE_SUPPORT_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default supportReducer;
