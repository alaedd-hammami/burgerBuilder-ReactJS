import { put } from "redux-saga/effects";
import * as actions from "../actions/index";
import axios from "../../axios-order";

export function* initIngredientsSaga(action) {
  try {
    const resp = yield axios.get("/ingredients.json");
    yield put(actions.setIngredients(resp.data));
  } catch (error) {
    yield put(actions.fetchIngredientsFailed());
  }
}
