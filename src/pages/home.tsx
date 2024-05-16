import { useEffect } from "react"
import Navbar from "../components/Navbar"
import { Link } from "react-router-dom"
import { add } from "../questionSlice"
import { useDispatch } from "react-redux"

let initialState=[]
export default function Home(){
    return(
        <>
        <Navbar></Navbar>
        <div className="flex h-[450px] mt-20 mx-10 flex-wrap">
            <Link to='/createquiz' className='card '>Create New Quiz</Link>
            <Link to='/myquizzes' className='card px-5'>My Quizzes</Link>
            <Link  to='/playquiz' className='card px-5'>Play Quiz</Link>
        </div>
        </>
    )
}

