import * as actionTypes from "../constants/product";
import axios from "axios";

// GET /api/product/search
export const searchProducts =
  ({ query, category, brand, pet, sort, min, max }) =>
  async (dispatch) => {
    try {
      dispatch({ type: actionTypes.SEARCH_PRODUCTS_REQUEST });
      const params = [`?q=${query || ""}`];
      if (category) params.push(`category=${category}`);
      if (brand) params.push(`brand=${brand}`);
      if (pet) params.push(`pet=${pet}`);
      if (sort) params.push(`sort=${sort}`);
      if (min) params.push(`min=${min}`);
      if (max) params.push(`max=${max}`);
      const { data } = await axios.get(`/api/product/search${params.join("&")}`);
      dispatch({ type: actionTypes.SEARCH_PRODUCTS_SUCCESS, payload: data.results });
    } catch (error) {
      dispatch({ type: actionTypes.SEARCH_PRODUCTS_FAIL, payload: error.response.data.error });
    }
  };

// GET /api/product/
export const getProducts = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_PRODUCTS_REQUEST });
    const { data } = await axios.get("/api/product");
    dispatch({ type: actionTypes.GET_PRODUCTS_SUCCESS, payload: data.products });
  } catch (error) {
    dispatch({ type: actionTypes.GET_PRODUCTS_FAIL, payload: error.response.data.error });
  }
};

// GET /api/product/:id
export const getProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_PRODUCT_REQUEST });
    const { data } = await axios.get(`/api/product/${id}`);
    dispatch({ type: actionTypes.GET_PRODUCT_SUCCESS, payload: data.product });
  } catch (error) {
    dispatch({ type: actionTypes.GET_PRODUCT_FAIL, payload: error.response.data.error });
  }
};

// POST /api/product/review/:id
export const reviewProduct = (review, id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.REVIEW_PRODUCT_REQUEST });
    const { data } = await axios.post(`/api/product/review/${id}`, review);
    dispatch({ type: actionTypes.REVIEW_PRODUCT_SUCCESS, payload: data.review });
  } catch (error) {
    dispatch({ type: actionTypes.REVIEW_PRODUCT_FAIL, payload: error.response.data.error });
  }
};

// DEL /api/product/review/remove/:id
export const removeReview = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.REMOVE_PRODUCT_REVIEW_REQUEST });
    const { data } = await axios.delete(`/api/product/review/remove/${id}`);
    dispatch({ type: actionTypes.REMOVE_PRODUCT_REVIEW_SUCCESS, payload: data.review });
  } catch (error) {
    dispatch({
      type: actionTypes.REMOVE_PRODUCT_REVIEW_FAIL,
      payload: error.response.data.error,
    });
  }
};

// POST /api/product/question/:id
export const addQuestion = (question, id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.QUESTION_PRODUCT_REQUEST });
    const { data } = await axios.post(`/api/product/question/${id}`, question);
    dispatch({ type: actionTypes.QUESTION_PRODUCT_SUCCESS, payload: data.question });
  } catch (error) {
    dispatch({ type: actionTypes.QUESTION_PRODUCT_FAIL, payload: error.response.data.error });
  }
};

// DEL /api/product/question/remove/:id
export const removeQuestion = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.REMOVE_PRODUCT_QUESTION_REQUEST });
    const { data } = await axios.delete(`/api/product/question/remove/${id}`);
    dispatch({ type: actionTypes.REMOVE_PRODUCT_QUESTION_SUCCESS, payload: data.question });
  } catch (error) {
    dispatch({
      type: actionTypes.REMOVE_PRODUCT_QUESTION_FAIL,
      payload: error.response.data.error,
    });
  }
};

// POST /api/product/answer/:id/:qid
export const addAnswer = (answer, id, qid) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.ANSWER_PRODUCT_REQUEST });
    const { data } = await axios.post(`/api/product/answer/${id}/${qid}`, answer);
    dispatch({ type: actionTypes.ANSWER_PRODUCT_SUCCESS, payload: data.question });
  } catch (error) {
    dispatch({ type: actionTypes.ANSWER_PRODUCT_FAIL, payload: error.response.data.error });
  }
};

// DEL /api/product/answer/remove/:id/:qid
export const removeAnswer = (id, qid) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.REMOVE_PRODUCT_ANSWER_REQUEST });
    const { data } = await axios.delete(`/api/product/answer/remove/${id}/${qid}`);
    dispatch({ type: actionTypes.REMOVE_PRODUCT_ANSWER_SUCCESS, payload: data.question });
  } catch (error) {
    dispatch({
      type: actionTypes.REMOVE_PRODUCT_ANSWER_FAIL,
      payload: error.response.data.error,
    });
  }
};

/*
 * Client routes
 */

// GET /api/product/own
export const getOwnProducts = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_OWN_PRODUCTS_REQUEST });
    const { data } = await axios.get("/api/product/own");
    dispatch({ type: actionTypes.GET_OWN_PRODUCTS_SUCCESS, payload: data.products });
  } catch (error) {
    dispatch({ type: actionTypes.GET_OWN_PRODUCTS_FAIL, payload: error.response.data.error });
  }
};

// GET /api/product/own/:id
export const getOwnProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_OWN_PRODUCT_REQUEST });
    const { data } = await axios.get(`/api/product/own/${id}`);
    dispatch({ type: actionTypes.GET_OWN_PRODUCT_SUCCESS, payload: data.product });
  } catch (error) {
    dispatch({ type: actionTypes.GET_OWN_PRODUCT_FAIL, payload: error.response.data.error });
  }
};

// POST /api/product/add
export const addProduct = (product) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.ADD_PRODUCT_REQUEST });
    const { data } = await axios.post("/api/product/add/", product);
    dispatch({ type: actionTypes.ADD_PRODUCT_SUCCESS, payload: data.product });
  } catch (error) {
    dispatch({ type: actionTypes.ADD_PRODUCT_FAIL, payload: error.response.data.error });
  }
};

// DEL /api/product/remove/:id
export const removeProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.REMOVE_PRODUCT_REQUEST });
    const { data } = await axios.delete(`/api/product/remove/${id}`);
    dispatch({ type: actionTypes.REMOVE_PRODUCT_SUCCESS, payload: data.product });
  } catch (error) {
    dispatch({ type: actionTypes.REMOVE_PRODUCT_FAIL, payload: error.response.data.error });
  }
};

// PUT /api/product/edit/:id
export const editProduct = (product, id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.EDIT_PRODUCT_REQUEST });
    const { data } = await axios.put(`/api/product/edit/${id}`, product);
    dispatch({ type: actionTypes.EDIT_PRODUCT_SUCCESS, payload: data.product });
  } catch (error) {
    dispatch({ type: actionTypes.EDIT_PRODUCT_FAIL, payload: error.response.data.error });
  }
};

/*
 * Admin specific routes
 */

// GET /api/product/all
export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_ALL_PRODUCTS_REQUEST });
    const { data } = await axios.get("/api/product/all");
    dispatch({ type: actionTypes.GET_ALL_PRODUCTS_SUCCESS, payload: data.products });
  } catch (error) {
    dispatch({ type: actionTypes.GET_ALL_PRODUCTS_FAIL, payload: error.response.data.error });
  }
};

// GET /api/product/any/:id
export const getAnyProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_ANY_PRODUCT_REQUEST });
    const { data } = await axios.get(`/api/product/any/${id}`);
    dispatch({ type: actionTypes.GET_ANY_PRODUCT_SUCCESS, payload: data.product });
  } catch (error) {
    dispatch({ type: actionTypes.GET_ANY_PRODUCT_FAIL, payload: error.response.data.error });
  }
};

// PUT /api/product/approve
export const approveProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.APPROVE_PRODUCT_REQUEST });
    const { data } = await axios.put(`/api/product/approve/${id}`);
    dispatch({ type: actionTypes.APPROVE_PRODUCT_SUCCESS, payload: data.product });
  } catch (error) {
    dispatch({ type: actionTypes.APPROVE_PRODUCT_FAIL, payload: error.response.data.error });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: actionTypes.CLEAR_ERRORS });
};

export const editProductReset = () => async (dispatch) => {
  dispatch({ type: actionTypes.EDIT_PRODUCT_RESET });
};

export const addProductReset = () => async (dispatch) => {
  dispatch({ type: actionTypes.ADD_PRODUCT_RESET });
};

export const removeProductReset = () => async (dispatch) => {
  dispatch({ type: actionTypes.REMOVE_PRODUCT_RESET });
};
