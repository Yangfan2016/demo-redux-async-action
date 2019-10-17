import {
  ADD_TODO,
  DELETE_TODO,
  SET_VISIBLE,
  FETCH_TOPICS_START,
  FETCH_TOPICS_SUCCESS,
  FETCH_TOPICS_FAIL
} from "./actiontypes";

const initState = {
  todo: [1, 2],
  visible: true,
  list: [],
  start: false
};

export function todo(state = initState.todo, action) {
  const map = {
    [ADD_TODO]: payload => {
      return [...state, payload];
    },
    [DELETE_TODO]: payload => {
      return state.todo.filter(item => item !== payload);
    }
  };

  const actionCase = map[action.type];

  if (actionCase === void 0) return state;

  return actionCase(action.payload);
}

export function visible(state = initState.visible, action) {
  const map = {
    [SET_VISIBLE]: payload => {
      return payload;
    }
  };

  const actionCase = map[action.type];

  if (actionCase === void 0) return state;

  return actionCase(action.payload);
}

export function start(state = initState.start, action) {
  const map = {
    [FETCH_TOPICS_START]: () => {
      return true;
    },
    [FETCH_TOPICS_SUCCESS]: () => {
      return false;
    },
    [FETCH_TOPICS_FAIL]: () => {
      return false;
    }
  };

  const actionCase = map[action.type];

  if (actionCase === void 0) return state;

  return actionCase(action.payload);
}

export function list(state = initState.list, action) {
  const map = {
    [FETCH_TOPICS_SUCCESS]: payload => {
      start(FETCH_TOPICS_SUCCESS, action);
      return payload;
    },
    [FETCH_TOPICS_FAIL]: payload => {
      start(FETCH_TOPICS_FAIL, action);
      return [];
    }
  };

  const actionCase = map[action.type];

  if (actionCase === void 0) return state;

  return actionCase(action.payload);
}
