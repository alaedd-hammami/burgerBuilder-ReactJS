import { put } from "redux-saga/effects";
import axios from "../../axios-order";
import * as actions from "../actions/index";

export function* purchaseBurgerSaga(action) {
  yield put(actions.purchaseBurgerStart());
  try {
    const resp = yield axios.post(
      "/orders.json?auth=" + action.token,
      action.orderData
    );
    yield put(actions.purchaseBurgerSuccess(resp.data.name, action.orderData));
  } catch (err) {
    yield put(actions.purchaseBurgerFail(err));
  }
}

export function* fetchOrdersSaga(action) {
  yield put(actions.fetchOrdersStart());
  const queryParams =
    "?auth=" +
    action.token +
    '&orderBy="userId"&equalTo="' +
    action.userId +
    '"';
  try {
    const res = yield axios.get("/orders.json" + queryParams);
    const fetchedOrders = [];
    for (const key in res.data) {
      fetchedOrders.push({
        ...res.data[key],
        id: key,
      });
    }
    yield put(actions.fetchOrdersSuccess(fetchedOrders));
  } catch (err) {
    yield put(actions.fetchOrdersFail(err));
  }
}
