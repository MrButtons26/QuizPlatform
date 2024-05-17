import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <>
      <div className="text-center mt-32">
        <h1 className="text-2xl font-thin mb-12">
          The page you are looking for is not available on this domain.
        </h1>
        <Link
          to={"/"}
          className="mt-8 py-3 px-6 rounded-xl bg-blue-600 text-white font-semibold transition-all duration-200 hover:opacity-[0.9]"
        >
          Back To Home
        </Link>
      </div>
    </>
  );
}
