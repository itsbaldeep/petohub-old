import * as actionTypes from "../constants/service";

export const servicesReducer = (state = { services: [], service: {} }, action) => {
  switch (action.type) {
    case actionTypes.GET_SERVICES_REQUEST:
    case actionTypes.GET_OWN_SERVICES_REQUEST:
    case actionTypes.GET_ALL_SERVICES_REQUEST:
    case actionTypes.GET_OWN_SERVICE_REQUEST:
    case actionTypes.GET_SERVICE_REQUEST:
    case actionTypes.GET_ANY_SERVICE_REQUEST:
    case actionTypes.ADD_SERVICE_REQUEST:
    case actionTypes.EDIT_SERVICE_REQUEST:
    case actionTypes.APPROVE_SERVICE_REQUEST:
    case actionTypes.REMOVE_SERVICE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_SERVICES_SUCCESS:
    case actionTypes.GET_OWN_SERVICES_SUCCESS:
    case actionTypes.GET_ALL_SERVICES_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: null,
        services: action.payload,
      };
    case actionTypes.GET_SERVICE_SUCCESS:
    case actionTypes.GET_OWN_SERVICE_SUCCESS:
    case actionTypes.GET_ANY_SERVICE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: null,
        service: action.payload,
      };
    case actionTypes.ADD_SERVICE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        isAdded: true,
        error: null,
        services: state.services.concat([action.payload]),
      };
    case actionTypes.REMOVE_SERVICE_SUCCESS:
      const removeIndex = state.services.findIndex((service) => service._id === action.payload._id);
      state.services.splice(removeIndex, 1);
      return {
        ...state,
        loading: false,
        isRemoved: true,
        error: null,
        success: true,
      };
    case actionTypes.EDIT_SERVICE_SUCCESS:
    case actionTypes.APPROVE_SERVICE_SUCCESS:
      const editIndex = state.services.findIndex((service) => service._id === action.payload._id);
      state.services[editIndex] = action.payload;
      return {
        ...state,
        loading: false,
        isUpdated: true,
        error: null,
        success: true,
      };
    case actionTypes.GET_SERVICES_FAIL:
    case actionTypes.GET_OWN_SERVICES_FAIL:
    case actionTypes.GET_SERVICE_FAIL:
    case actionTypes.GET_OWN_SERVICE_FAIL:
    case actionTypes.ADD_SERVICE_FAIL:
    case actionTypes.EDIT_SERVICE_FAIL:
    case actionTypes.REMOVE_SERVICE_FAIL:
    case actionTypes.GET_ALL_SERVICES_FAIL:
    case actionTypes.GET_ANY_SERVICE_FAIL:
    case actionTypes.APPROVE_SERVICE_FAIL:
      return {
        ...state,
        error: action.payload,
        success: false,
        loading: false,
      };
    case actionTypes.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        success: null,
      };
    case actionTypes.ADD_SERVICE_RESET:
      return {
        ...state,
        isAdded: null,
      };
    case actionTypes.EDIT_SERVICE_RESET:
      return {
        ...state,
        isUpdated: null,
      };
    case actionTypes.REMOVE_SERVICE_RESET:
      return {
        ...state,
        isRemoved: null,
      };
    default:
      return state;
  }
};
