import {
  ADD_TODO,
  DELETE_TODO,
  SET_VISIBLE,
  FETCH_TOPICS_START,
  FETCH_TOPICS_SUCCESS,
  FETCH_TOPICS_FAIL
} from "./actiontypes";

export function addTodo(payload) {
  return {
    type: ADD_TODO,
    payload
  };
}

export function deleteTodo(payload) {
  return {
    type: DELETE_TODO,
    payload
  };
}

export function setVisible(payload) {
  return {
    type: SET_VISIBLE,
    payload
  };
}

export function fetchTopicsStart() {
  return {
    type: FETCH_TOPICS_START
  };
}

export function fetchTopicsSuccess(payload) {
  return {
    type: FETCH_TOPICS_SUCCESS,
    payload
  };
}

export function fetchTopicsFail(payload) {
  return {
    type: FETCH_TOPICS_FAIL,
    payload
  };
}

export function getTopicsByThunk() {
  return dispatch => {
    dispatch(fetchTopicsStart());
    fetch("https://cnodejs.org/api/v1/topics")
      .then(res => res.json())
      .then(res => {
        dispatch(fetchTopicsSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchTopicsFail(err));
      });
  };
}

export function getTopicsByPromise() {
  return fetch("https://cnodejs.org/api/v1/topics")
    .then(res => res.json())
    .then(res => {
      return fetchTopicsSuccess(res.data);
    })
    .catch(err => {
      return fetchTopicsFail(err);
    });
}

export function getTopicsByDiyPromise() {
  return {
    async: fetch("https://cnodejs.org/api/v1/topics")
      .then(res => res.json())
      .then(res => {
        return fetchTopicsSuccess(res.data);
      })
      .catch(err => {
        return fetchTopicsFail(err);
      }),
    types: [FETCH_TOPICS_START, FETCH_TOPICS_SUCCESS, FETCH_TOPICS_FAIL]
  };
}

export function getTopicsBySaga() {
  return dispatch => {
    dispatch(fetchTopicsStart());
  };
}
