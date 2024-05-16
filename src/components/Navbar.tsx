
import { Link } from "react-router-dom"



export default function Navbar(){
    return (
        <>
        <div className="flex justify-between p-4 shadow-xl bg-white flex-wrap">
            <img src="logo.PNG" alt=""className=" sm:h-[45px]" />
            <div className="flex w-[405px] justify-evenly font-sans font-extralight align-middle">
                <Link to='/' className="text-xl transition-all  duration-100 hover:text-cyan-400">Home</Link>
                <Link to='/myquizzes' className="text-xl transition-all  duration-100  hover:text-cyan-400">My Quizzes</Link>
                <Link to='/playquiz' className="text-xl transition-all  duration-100 hover:text-cyan-400">Play Quiz</Link>
            </div>
        </div>
        </>
    )
}