import * as actionTypes from "../constants/user";
import axios from "axios";

const headers = { "Content-Type": "application/json" };

const getConfig = () => {
  const authToken = localStorage.getItem(process.env.REACT_APP_TOKEN_NAME);
  const Authorization = `Bearer ${authToken}`;
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization,
    },
  };
  return config;
};

const getConfigFD = () => {
  const config = getConfig();
  config.headers["Content-Type"] = "multipart/form-data";
  return config;
};

// POST /api/user/login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.LOGIN_REQUEST });
    const { data } = await axios.post("/api/user/login", { email, password }, { headers });
    localStorage.setItem(process.env.REACT_APP_TOKEN_NAME, data.token);
    dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: actionTypes.LOGIN_FAIL, payload: error.response.data.error });
  }
};

export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem(process.env.REACT_APP_TOKEN_NAME);
    dispatch({ type: actionTypes.LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: actionTypes.LOGOUT_FAIL, payload: "Logout failed" });
  }
};

// POST /api/user/register
export const register = (user) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.REGISTER_REQUEST });
    const { data } = await axios.post("/api/user/register", user, { headers });
    dispatch({ type: actionTypes.REGISTER_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: actionTypes.REGISTER_FAIL, payload: error.response.data.error });
  }
};

// GET /api/user/verify/:verificationToken
export const verify = (token) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.VERIFY_REQUEST });
    const { data } = await axios.get(`/api/user/verify/${token}`, { headers });
    localStorage.setItem(process.env.REACT_APP_TOKEN_NAME, data.token);
    dispatch({ type: actionTypes.VERIFY_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: actionTypes.VERIFY_FAIL, payload: error.response.data.error });
  }
};

// POST /api/user/forgotpassword
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.FORGOT_PASSWORD_REQUEST });
    const { data } = await axios.post("/api/user/forgotpassword", { email }, { headers });
    dispatch({ type: actionTypes.FORGOT_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({ type: actionTypes.FORGOT_PASSWORD_FAIL, payload: error.response.data.error });
  }
};

// PUT /api/user/resetpassword/:resetToken
export const resetPassword = (token, password) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.RESET_PASSWORD_REQUEST });
    const { data } = await axios.put(`/api/user/resetpassword/${token}`, { password }, { headers });
    dispatch({ type: actionTypes.RESET_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    console.log(error.response);
    dispatch({ type: actionTypes.RESET_PASSWORD_FAIL, payload: error.response.data.error });
  }
};

// GET /api/user/me
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.LOAD_REQUEST });
    const { data } = await axios.get("/api/user/me", getConfig());
    dispatch({ type: actionTypes.LOAD_SUCCESS, payload: data.user });
  } catch (error) {
    localStorage.removeItem(process.env.REACT_APP_TOKEN_NAME);
    dispatch({ type: actionTypes.LOAD_FAIL, payload: error.response.data.error });
  }
};

// PUT /api/user/updateprofile
export const updateProfile = (user) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.UPDATE_PROFILE_REQUEST });
    const { data } = await axios.put("/api/user/updateprofile", user, getConfigFD());
    dispatch({ type: actionTypes.UPDATE_PROFILE_SUCCESS, payload: data.user });
    dispatch({ type: actionTypes.LOAD_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: actionTypes.UPDATE_PROFILE_FAIL, payload: error.response.data.error });
  }
};

// PUT /api/user/updatepassword
export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.UPDATE_PASSWORD_REQUEST });
    const { data } = await axios.put("/api/user/updatepassword", passwords, getConfig());
    localStorage.setItem(process.env.REACT_APP_TOKEN_NAME, data.token);
    dispatch({ type: actionTypes.UPDATE_PASSWORD_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: actionTypes.UPDATE_PASSWORD_FAIL, payload: error.response.data.error });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: actionTypes.CLEAR_ERRORS });
};
