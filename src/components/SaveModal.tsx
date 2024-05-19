// modal for question saving..
import { Link } from "react-router-dom";

export default function SaveModal({ saveModal, setSaveModal }) {
  return (
    <>
      <div className="modal flex flex-col p-2">
        <div className="text-lg flex justify-between font-bold">
          {" "}
          <h1 className="grow text-center">Quiz created successfully</h1>
          <button
            onClick={() => {
              setSaveModal(!saveModal);
            }}
            className="text-black"
          >
            &#10005;
          </button>
        </div>
        <Link
          to={`/myquizzes`}
          className="self-center my-2 p-2 border-2 rounded-2xl  text-black bg-white font-semibold hover:bg-black hover:text-white"
        >
          View All Quizzes
        </Link>
      </div>
    </>
  );
}
