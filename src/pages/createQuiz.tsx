import { Store } from "@reduxjs/toolkit";
import Navbar from "../components/Navbar";
import { useEffect, useReducer, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Modal from "../components/Modal";
import Overlay from "../components/Overlay";
import { add } from "../redux-tk/questionSlice";
import { useDispatch } from "react-redux";
import SaveModal from "../components/SaveModal";
const initialState = [
  {
    quizName: "",
    question: ``,
    description: "",
    options: ["", "", "", ""],
    answer: [],
    questionType: "",
  },
];
function reducer(state, action) {
  switch (action.type) {
    case "quizName":
      return state.map((el, i) =>
        i === action.payload.questionNum
          ? { ...el, quizName: action.payload.value }
          : el
      );
    case "description":
      return state.map((el, i) =>
        i === action.payload.questionNum
          ? { ...el, description: action.payload.value }
          : el
      );
    case "question":
      return state.map((el, i) =>
        i === action.payload.questionNum
          ? { ...el, question: action.payload.value }
          : el
      );
    case "questionType":
      return state.map((el, i) =>
        i === action.payload.questionNum
          ? { ...el, questionType: action.payload.value }
          : el
      );
    case "optionAdd":
      return state.map((el, i) =>
        i === action.payload.questionNum
          ? {
              ...el,
              options: el.options.map((el, i) =>
                i == action.payload.index ? action.payload.value : el
              ),
            }
          : el
      );

    case "optionDel":
      if (state[action.payload.questionNum].questionType === `single`) {
        return state.map((el, i) =>
          i === action.payload.questionNum
            ? {
                ...el,
                options: el.options.map((el, i) =>
                  i == action.payload.index ? "" : el
                ),
                answer: [],
              }
            : el
        );
      } else {
        return state.map((el, i) =>
          i === action.payload.questionNum
            ? {
                ...el,
                options: el.options.map((el, i) =>
                  i == action.payload.index ? "" : el
                ),
                answer: el.answer.filter((el) => el !== action.payload.index),
              }
            : el
        );
      }
    case "answer":
      if (state[action.payload.questionNum].questionType === `single`) {
        return state.map((el, i) =>
          i === action.payload.questionNum
            ? { ...el, answer: [action.payload.index] }
            : el
        );
      } else {
        return state.map((el, i) =>
          i === action.payload.questionNum
            ? {
                ...el,
                answer: [...el.answer, action.payload.index],
              }
            : el
        );
      }
    case `addQuestion`:
      return [
        ...state,
        {
          quizName: state[state.length - 1].quizName,
          question: ``,
          description: state[state.length - 1].description,
          options: ["", "", "", ""],
          answer: [],
          questionType:
            state[state.length - 1].questionType === "single"
              ? `single`
              : "Multi",
        },
      ];
    case "reset":
      return [
        {
          quizName: "",
          question: ``,
          description: "",
          options: ["", "", "", ""],
          answer: [],
          questionType: "",
        },
      ];
    default:
      return { state };
  }
}

export default function CreateQuiz() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [modal, setModal] = useState(false);
  const [optionNumber, setOptionNumber] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [error, setError] = useState(false);
  const [saveModal, setSaveModal] = useState(false);
  const options = useRef([]);

  const Dispatch = useDispatch();
  function addOptionNumber() {
    if (optionNumber.length <= 3) {
      setOptionNumber([...optionNumber, true]);
    } else {
      let index = optionNumber.findIndex((el) => el === false);
      console.log(index);
      setOptionNumber(optionNumber.map((el, i) => (i === index ? true : el)));
    }
  }
  function questionAddition() {
    if (
      state[questionNumber].description == `` ||
      state[questionNumber].quizName === `` ||
      state[questionNumber].answer.length === 0 ||
      state[questionNumber].question.length < 10 ||
      state[questionNumber].question.length > 200 ||
      state[questionNumber].quizName.length > 30
    ) {
      return;
    }
    let ot = state[questionNumber].options.filter((el) => el != ``);
    if (ot.length < 2) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3500);
      return;
    }

    setOptionNumber([false, false, false, false]);
    dispatch({ type: `addQuestion` });
    setQuestionNumber(questionNumber + 1);
  }

  function saveQuestions() {
    let options = [];
    let answers = [];
    let questions = [];
    console.log(`saving`);
    for (let i = 0; i < state.length - 1; i++) {
      questions.push(state[i].question);
      answers.push(state[i].answer);
      options.push(state[i].options);
    }
    localStorage.setItem;
    console.log(options);
    const questionObj = {
      quizName: state[0].quizName,
      description: state[0].description,
      question: [...questions],
      options: [...options],
      answer: [...answers],
      visibility: false,
      questionType: state[0].questionType,
      createdAt: `${new Date().getDate()} ${new Date(Date.now()).toLocaleString(
        "default",
        { month: "long" }
      )}, ${new Date(Date.now()).toLocaleString("en-us", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })}`,
    };
    let localStorageData = JSON.parse(localStorage.getItem("quizzes"));
    if (localStorageData === null) {
      localStorage.setItem("quizzes", JSON.stringify([questionObj]));
    } else {
      localStorage.setItem(
        "quizzes",
        JSON.stringify([...localStorageData, questionObj])
      );
    }
    setQuestionNumber(0);
    Dispatch(add(questionObj));
    dispatch({ type: `reset` });
    setSaveModal(!saveModal);
  }

  useEffect(() => {
    setModal(!modal);
  }, []);
  return (
    <>
      {(saveModal || modal) && <Overlay></Overlay>}
      <Navbar></Navbar>
      {modal && (
        <Modal
          modal={modal}
          setModal={setModal}
          state={state}
          dispatch={dispatch}
          questionNumber={questionNumber}
        ></Modal>
      )}
      {saveModal && (
        <SaveModal
          saveModal={saveModal}
          setSaveModal={setSaveModal}
        ></SaveModal>
      )}
      <div className="mt-16 flex flex-col">
        <h1 className="text-3xl font-bold mb-6 w-3/4 self-center">
          Create New Quiz
        </h1>
        <div className="bg-white p-10  self-center w-3/4 border-2 rounded-xl flex flex-col">
          <input
            required
            type="text"
            placeholder="Enter Your Quiz Name..."
            value={state[questionNumber].quizName}
            onChange={(e) => {
              dispatch({
                type: "quizName",
                payload: {
                  value: e.target.value,
                  questionNum: questionNumber,
                },
              });
            }}
            className="border-2   mb-4 h-[50px] w-full border-slate-500    rounded-l pl-1"
          />
          <br />
          <textarea
            required
            value={state[questionNumber].description}
            onChange={(e) => {
              dispatch({
                type: "description",
                payload: {
                  value: e.target.value,
                  questionNum: questionNumber,
                },
              });
            }}
            placeholder="Add Description...."
            className="border-2  mt-4  h-[100px] w-full border-slate-500  rounded-l pl-2 pb-16 scrollbar"
          />
          <button></button>
          <div>
            <h1 className="text-center mt-3 mb-2 text-xl font-semibold">
              QUESTIONS
            </h1>
            {Array.from({ length: state.length }, (el, i) =>
              questionNumber > i ? (
                <DisplayQuestion
                  key={i}
                  state={state}
                  questionNumber={i}
                ></DisplayQuestion>
              ) : null
            )}
          </div>

          {
            <input
              value={state[questionNumber].question}
              onChange={(e) => {
                dispatch({
                  type: "question",
                  payload: {
                    value: e.target.value,
                    questionNum: questionNumber,
                  },
                });
              }}
              type="text"
              placeholder="Question"
              required
              className="border-2 mt-4  mb-4 h-[50px] w-full border-slate-500    rounded-l pl-1"
            />
          }
          <button
            onClick={() => addOptionNumber()}
            className=" font-bold mr-4 border-2 rounded-full p-2 transition-all duration-200	 hover:bg-black hover:text-white"
          >
            ADD
          </button>
          <button
            className={`btn-animation flex m-2 self-center font-semibold p-3 border-2 rounded-2xl ${
              error === false ? `hidden` : `block`
            }`}
          >
            {" "}
            <span className="relative inline-flex rounded-full h-2 w-2 bg-black animate-ping mr-2"></span>
            Add More than One Option
          </button>
          <OptionsGenerator
            options={options}
            questionNumber={questionNumber}
            state={state}
            dispatch={dispatch}
            optionNumber={optionNumber}
            setOptionNumber={setOptionNumber}
          ></OptionsGenerator>
          <button
            onClick={() => {
              questionAddition();
            }}
            className=" font-bold rounded-xl border-2 p-2 w-[185px] border-blue-600 text-blue-600 pb-[11px] self-center active:translate-y-0.5 "
          >
            <span className="border-2 pt-[1px] pr-2 pl-2 pb-[5px] mr-5 rounded-md border-blue-600 ">
              +
            </span>
            Add Question
          </button>
          <button
            onClick={() => {
              saveQuestions();
            }}
            disabled={questionNumber === 0 ? true : false}
            className={` sve-btn mt-4  border-0 text-l p-2 pl-5 pr-5 rounded-xl bg-blue-600 text-white font-semibold ${
              questionNumber === 0 ? "disable" : "btn--active"
            }`}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
}

function OptionsGenerator({
  options,
  optionNumber,
  setOptionNumber,
  state,
  dispatch,
  questionNumber,
}) {
  return (
    <div className="flex  flex-wrap p-4 mt-2 ">
      {Array.from({ length: 4 }, (el, index) => {
        return optionNumber[index] ? (
          <AddOption
            state={state}
            dispatch={dispatch}
            setOptionNumber={setOptionNumber}
            index={index}
            key={index}
            optionNumber={optionNumber}
            options={options}
            questionNumber={questionNumber}
          ></AddOption>
        ) : null;
      })}
    </div>
  );
}

function AddOption({
  index,
  options,
  setOptionNumber,
  optionNumber,
  state,
  dispatch,
  questionNumber,
}) {
  function removaloption(index) {
    dispatch({
      type: "optionDel",
      payload: { index, questionNum: questionNumber },
    });
    removeOption(index);
  }
  function removeOption(index) {
    let element = options.current[index];
    setOptionNumber(optionNumber.map((el, i) => (i === index ? false : el)));
    element.removechild(element);
    options.current.splice(index, 1, null);
  }

  return (
    <div
      ref={(el) => (options.current[index] = el)}
      key={index}
      className="border-2  border-slate-500 m-2 flex flex-wrap justify-between"
    >
      <input
        value={state[questionNumber].options[index]}
        onChange={(e) => {
          dispatch({
            type: `optionAdd`,
            payload: {
              value: e.target.value,
              index,
              questionNum: questionNumber,
            },
          });
        }}
        type="text"
        className="border-2 ml-3 mt-3 mb-3 w-4/5"
      />
      <button
        onClick={() => removaloption(index)}
        className="gg-trash mt-5 mr-3 active:text-red-500"
      ></button>
      <button
        disabled={state[questionNumber].answer.some((el) => el === index)}
        onClick={() => {
          dispatch({
            type: "answer",
            payload: { index, questionNum: questionNumber },
          });
        }}
        className={`text-slate-600 bg-blue-200 w-full text-l active:text-white border-t-2 font-semibold ${
          state[questionNumber].answer.some((el) => el === index)
            ? "bg-green-400"
            : ``
        }`}
      >
        Correct Answer
      </button>
    </div>
  );
}

function DisplayQuestion({ state, questionNumber }) {
  return (
    <>
      <h1 className="font-light text-xl font-semibold mt-3 mb-2 border-b-2 border-black">
        <span className="font-bold mr-2">{questionNumber + 1}.</span>
        {state[questionNumber].question}
      </h1>
      <ul className="list-decimal">
        {state[questionNumber].options[0] !== `` ? (
          <li
            className={`${
              state[questionNumber].answer.some((el) => el === 0)
                ? "bg-green-400   "
                : ``
            }`}
          >
            {state[questionNumber].options[0]}
          </li>
        ) : (
          true
        )}
        {state[questionNumber].options[1] !== `` ? (
          <li
            className={`${
              state[questionNumber].answer.some((el) => el === 1)
                ? "bg-green-400  "
                : ``
            }`}
          >
            {state[questionNumber].options[1]}
          </li>
        ) : (
          true
        )}
        {state[questionNumber].options[2] !== `` ? (
          <li
            className={`${
              state[questionNumber].answer.some((el) => el === 2)
                ? "bg-green-400  "
                : ``
            }`}
          >
            {state[questionNumber].options[2]}
          </li>
        ) : (
          true
        )}
        {state[questionNumber].options[3] !== `` ? (
          <li
            className={`${
              state[questionNumber].answer.some((el) => el === 3)
                ? "bg-green-400 "
                : ``
            }`}
          >
            {state[questionNumber].options[3]}
          </li>
        ) : (
          true
        )}
      </ul>
    </>
  );
}
