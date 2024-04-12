import {
  CREATE_SUPPORT_REQUEST,
  CREATE_SUPPORT_SUCCESS,
  CREATE_SUPPORT_FAILURE,
  UPDATE_SUPPORT_STATUS_SUCCESS,
  UPDATE_SUPPORT_STATUS_FAILURE,
  FETCH_TICKETS_REQUEST,
  FETCH_TICKETS_SUCCESS,
  FETCH_TICKETS_FAILURE,
  DELETE_SUPPORT_SUCCESS,
  DELETE_SUPPORT_FAIL,
} from "../actions/supportActions.js";

const initialState = {
  tickets: [],
  error: null,
  isLoading: false
};

const supportReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_SUPPORT_REQUEST: 
      return {
        ...state,
        isLoading: false
      }
    case CREATE_SUPPORT_SUCCESS:
      return {
        ...state,
        tickets: [...state.tickets, action.payload],
        error: null,
        isLoading: false
      };
    case CREATE_SUPPORT_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false
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
        isLoading: false
      };
    case UPDATE_SUPPORT_STATUS_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case FETCH_TICKETS_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_TICKETS_SUCCESS:
      return {
        ...state,
        tickets: [...action.payload],
        error: null,
        isLoading: false
      };
    case FETCH_TICKETS_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case DELETE_SUPPORT_SUCCESS:
      return {
        ...state,
        tickets: state.tickets.filter((ticket) => ticket.id !== action.payload),
        error: null,
        isLoading: false
      };
    case DELETE_SUPPORT_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    default:
      return state;
  }
};

export default supportReducer;
