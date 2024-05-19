//modal component
export default function Modal({
  modal,
  setModal,
  state,
  dispatch,
  questionNumber,
}) {
  function singleCorrect() {
    dispatch({
      type: "questionType",
      payload: { value: "single", questionNum: questionNumber },
    });
    setModal(!modal);
  }
  function multiCorrect() {
    dispatch({
      type: "questionType",
      payload: { value: "multi", questionNum: questionNumber },
    });
    setModal(!modal);
  }

  return (
    <>
      <div className="modal flex flex-col p-4 pl-3 pr-4">
        <div className="font-semibold flex w-full justify-between text-xl mb-5">
          <h1 className="text-center w-full">Select Question Type</h1>
        </div>
        <div className="mb-3 flex w-full justify-center">
          <button
            onClick={() => singleCorrect()}
            className="font-bold mr-4 border-2 rounded-full p-2 transition-all duration-200	 hover:bg-black hover:text-white"
          >
            MCQ<span className="pl-1">Single Correct</span>
          </button>
          <button
            onClick={() => multiCorrect()}
            className=" font-bold ml-2 border-2 rounded-full p-2 transition-all duration-200	 hover:bg-black hover:text-white"
          >
            MCQ<span className="pl-1">Multi Correct</span>
          </button>
        </div>
      </div>
    </>
  );
}
