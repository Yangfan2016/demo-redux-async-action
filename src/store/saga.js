import { put, call, takeEvery } from "redux-saga/effects";
import { FETCH_TOPICS_START } from "./actiontypes";
import { fetchTopicsSuccess, fetchTopicsFail } from "./actions";

// function noramlFn() {
//   return {
//     success: true,
//     data: [
//       {
//         id: 1,
//         title: "fake data"
//       }
//     ]
//   };
// }

function* getTopicsBySaga() {
  try {
    // const res = yield fetch("https://cnodejs.org/api/v1/topics");
    const res = yield call(fetch, "https://cnodejs.org/api/v1/topics");
    const result = res.json();
    const { success, data } = yield result;

    // const res = yield call(noramlFn);
    // console.log(res);
    // const { success, data } = res;

    if (success) {
      yield put(fetchTopicsSuccess(data));
    } else {
      yield put(fetchTopicsFail("data err"));
    }
  } catch (err) {
    yield put(fetchTopicsFail(err));
  }
}

export default function*() {
  yield takeEvery(FETCH_TOPICS_START, getTopicsBySaga);
}
