import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import Overlay from "../components/Overlay";
export default function MyQuiz() {
    const [state, setState] = useState([]);
    const [deletionindex, setDelitionIndex] = useState(-1);
    useEffect(() => {
        setState(JSON.parse(localStorage.getItem(`quizzes`)));
        console.log(23);
    }, []);
    function deleteQuizIndex(index) {
        setDelitionIndex(index);
    }
    function questiondel(value) {
        if (value === 1) {
            const index = deletionindex;
            let tempState = state.filter((el, i) => index != i);
            localStorage.setItem(`quizzes`, JSON.stringify(tempState));
            setState(tempState);
        } else {
        }
        setDelitionIndex(-1);
        console.log(state);
    }

    function setVisibility(index) {
        let tempState = state.map((el, i) => {
            return i === index ? { ...el, visibility: !el.visibility } : el;
        });
        localStorage.setItem(`quizzes`, JSON.stringify(tempState));
        setState(tempState);
    }
    console.log(state);
    return (
        <>
            <Navbar></Navbar>
            {deletionindex !== -1 ? <Overlay></Overlay> : null}
            {deletionindex !== -1 ? (
                <div className="modal pt-5 pb-5 px-2">
                    <h1 className="text-xl font-bold text-center mb-4">
                        Are you sure you want to Proceed?
                    </h1>
                    <h1 className=" mb-5 text-center">
                        Deleting this will result in permanent deletion and is
                        not recoverable
                    </h1>
                    <div className="flex justify-evenly">
                        <button
                            onClick={() => {
                                questiondel(1);
                            }}
                            className="border-2 px-4 py-2 k rounded-3xl font-semibold hover:bg-black hover:text-white text-xl"
                        >
                            Yes
                        </button>
                        <button
                            onClick={() => {
                                questiondel(2);
                            }}
                            className="border-2 px-4 py-2  rounded-3xl font-semibold hover:bg-black hover:text-white text-xl"
                        >
                            No
                        </button>
                    </div>
                </div>
            ) : null}
            <div className="pl-10 pr-10 p-6 mt-12 flex justify-between">
                <h1 className="text-2xl font-bold">My Quizzes</h1>
                <Link
                    className="border-2 p-2 pl-3 pr-3 rounded-lg bg-blue-600 text-white active:translate-y-1"
                    to={`/createquiz`}
                >
                    Create New Quiz
                </Link>
            </div>
            {state === null || state.length === 0 ? (
                <div>
                    <h1 className="text-center text-2xl font-thin">
                        No Quizzes Found <br /> GO!! Create Some Quizzes
                    </h1>
                </div>
            ) : null}
            {state !== null && state.length !== 0 ? (
                <div className="pl-0 ml-0 mr-0 bg-white sm:ml-12 sm:mr-20 sm:pl-12 rounded-2xl">
                    <div className="grid grid-rows-1 grid-cols-5 font-semibold gap-3">
                        <h1>Quiz No.</h1>
                        <h1>Title</h1>
                        <h1>Status</h1>
                        <h1>Created At</h1>
                        <h1>Actions</h1>
                    </div>
                    {state.map((el, index) => (
                        <div
                            key={index}
                            className="grid grid-rows-1 grid-cols-5 pt-2.5 gap-3"
                        >
                            <h1 className="text-center sm:text-justify">
                                {index + 1}
                            </h1>
                            <h1 className="">{el.quizName}</h1>
                            <div className="text-center sm:text-justify">
                                Active
                                <label className="switch ml-2.5">
                                    <input
                                        checked={el.visibility}
                                        onChange={() => {
                                            setVisibility(index);
                                        }}
                                        type="checkbox"
                                    />
                                    <span className="slider round"></span>
                                </label>
                            </div>
                            <h1 className="text-center sm:text-justify">
                                {el.createdAt}
                            </h1>
                            <button
                                onClick={() => deleteQuizIndex(index)}
                                className=" gg-trash  active:text-red-600 ml-5"
                            ></button>
                        </div>
                    ))}
                </div>
            ) : null}
        </>
    );
}
