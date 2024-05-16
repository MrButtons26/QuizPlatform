import { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
export default function PlayQuiz() {
  const [state, setState] = useState([]);
  const [quizIndex, setQuizIndex] = useState(-1);
  useEffect(() => {
    setState(JSON.parse(localStorage.getItem("quizzes")));
  }, []);

  console.log(state);
  return (
    <>
      <div className="flex justify-between p-4 shadow-xl bg-white flex-wrap">
        <img src="logo.PNG" alt="" className=" sm:h-[45px]" />
        <div className="flex w-[405px] justify-evenly font-sans font-extralight align-middle">
          <Link
            to="/"
            className="text-xl transition-all  duration-100 hover:text-cyan-400"
          >
            Home
          </Link>
          <Link
            to="/myquizzes"
            className="text-xl transition-all  duration-100  hover:text-cyan-400"
          >
            My Quizzes
          </Link>
        </div>
      </div>
      {quizIndex === -1 && (
        <>
          {state === null || state.length === 0 ? (
            <div>
              <h1 className="text-center text-2xl font-thin mt-5">
                No Quizzes Found <br /> GO!! Create Some Quizzes
              </h1>
            </div>
          ) : null}
          {state !== null && state.length != 0 ? (
            <div className="rounded-xl flex flex-col m-6 mt-16 p-3  bg-white">
              {state.map((el, index) =>
                el.visibility === true ? (
                  <div
                    key={index}
                    className="flex flex-col border-2 rounded-3xl p-6 mt-4"
                  >
                    <h1 className="text-2xl font-bold">{el.quizName}</h1>
                    <button
                      onClick={() => {
                        setQuizIndex(index);
                      }}
                      className="self-end border-2 py-1 px-4 text-lg rounded-full font-semibold hover:bg-black hover:text-white"
                    >
                      Start
                    </button>
                    <h1 className="text-xl">{el.description}</h1>
                    <h1 className="mt-2 text-lg font-thin">
                      No. of questions :{" "}
                      <span className="font-semibold">
                        {el.question.length}
                      </span>
                    </h1>
                    <h1 className="font-thin text-lg">
                      Type of Quiz :{" "}
                      <span className="font-semibold">
                        {" "}
                        MCQ (
                        {el.questionType === `single`
                          ? ` Single Answer Correct`
                          : `Multi Answer Correct`}{" "}
                        )
                      </span>
                    </h1>
                  </div>
                ) : null
              )}
            </div>
          ) : null}
        </>
      )}
      {quizIndex !== -1 && (
        <DisplayQuestions
          state={state}
          quizIndex={quizIndex}
        ></DisplayQuestions>
      )}
    </>
  );
}

function DisplayQuestions({ state, quizIndex }) {
  const [score, setScore] = useState(0);
  const [questionNum, setQuestionNum] = useState(0);
  const [optionNum, setOptionNum] = useState([-1]);
  state[quizIndex].question.length;
  function setAnswer(i) {
    if (state[quizIndex].questionType === `single`) {
      setOptionNum([i]);
    } else {
      let temp = optionNum.filter((el) => el !== -1);
      temp.push(i);
      setOptionNum(temp);
    }
  }
  function nextQuestion() {
    let flag = true;
    for (let i of optionNum) {
      let t = state[quizIndex].answer[questionNum].some((el) => el === i);
      if (t === false) {
        flag = false;
        break;
      }
    }
    if (flag === true) {
      setScore(score + 1);
    }
    setQuestionNum(questionNum + 1);
    setOptionNum([-1]);
  }
  return (
    <>
      {questionNum === state[quizIndex].question.length && (
        <div className="pt-20 flex flex-col items-center gradient-background">
          <h1 className="text-3xl font-extralight">Congratulations</h1>
          <h1 className="text-3xl font-extralight">
            You have Scored <span className="font-semibold">{score}</span> out
            of{" "}
            <span className=" font-semibold">
              {state[quizIndex].question.length}
            </span>{" "}
          </h1>
        </div>
      )}
      {questionNum < state[quizIndex].question.length && (
        <>
          <h1 className="text-center mt-6 text-2xl font-bold">
            {state[quizIndex].quizName}
          </h1>
          <div className="m-5  flex flex-col sm:mx-80">
            <h1 className="mb-8 text-xl font-semibold self-center">
              <span className="text-xl font-semibold">
                {questionNum + 1} .{" "}
              </span>
              {state[quizIndex].question[questionNum]} ?
            </h1>
            {state[quizIndex].options[questionNum].map((el, i) =>
              el !== `` ? (
                <button
                  className={`py-2.5 m-3 border-[1.5px] border-gray-300 text-xl font-thin rounded-full hover:opacity-[0.7] transition-all duration-200 ${
                    optionNum.some((el) => el === i) ? `active-ans` : ``
                  }`}
                  onClick={() => setAnswer(i)}
                  key={i}
                >
                  {el}
                </button>
              ) : null
            )}

            <span className="ml-4 text-lg">
              {" "}
              Question {questionNum + 1}/{state[quizIndex].question.length}
            </span>
            <button
              disabled={optionNum[0] === -1}
              onClick={() => {
                nextQuestion();
              }}
              className={`mt-3 w-fit self-center border-2 px-10 py-2 rounded-xl bg-blue-600 text-white font-semibold ${
                optionNum[0] === -1 ? `opacity-70` : ``
              } active:translate-y-1`}
            >
              Next Question
            </button>
          </div>
        </>
      )}
    </>
  );
}
