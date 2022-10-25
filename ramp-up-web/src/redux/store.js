import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "../redux/slice/studentSlice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga/rootSaga";
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    students: studentReducer.reducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);
export default store;