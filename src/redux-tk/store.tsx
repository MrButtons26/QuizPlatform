import { ReducerType, configureStore } from "@reduxjs/toolkit";
import questionReducer from "./questionSlice";
import { add } from "./questionSlice";

//creating store out of the reducer

const store: store = configureStore({
  reducer: {
    question: questionReducer,
  },
});

console.log(store.getState());
export default store;
