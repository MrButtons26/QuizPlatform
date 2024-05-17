import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    quizName: "",
    description: ``,
    question: [],
    options: [],
    questionType: "",
    answer: [],
    visibility: true,
    createdAt: "",
  },
];

const questionSlice: initialState = createSlice({
  name: "question",
  initialState,
  reducers: {
    add(state, action) {
      if (state.length === 1 && state[0].quizName === ``) {
        state[0].quizName = action.payload.quizName;
        state[0].description = action.payload.description;
        state[0].question = [...action.payload.question];
        state[0].options = action.payload.options;
        state[0].questionType = action.payload.questionType;
        state[0].answer = [...action.payload.answer];
        state[0].visibility = true;
        state[0].createdAt = action.payload.createdAt;
      } else {
        state.push({
          quizName: action.payload.quizName,
          description: action.payload.description,
          question: [...action.payload.question],
          options: action.payload.options,
          questionType: action.payload.questionType,
          answer: [...action.payload.answer],
          visibility: true,
          createdAt: action.payload.createdAt,
        });
      }
    },
  },
});
export default questionSlice.reducer;

export const { add } = questionSlice.actions;
