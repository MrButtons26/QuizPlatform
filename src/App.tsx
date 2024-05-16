import { useState } from 'react'
import { Route,BrowserRouter,Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/home'
import CreateQuiz from './pages/createQuiz'
import MyQuiz from './pages/myQuizzes'
import PlayQuiz  from './pages/playquiz'
function App() {

  return (
     <BrowserRouter>
     <Routes>
      <Route path='/'element={<Home/>}/>
      <Route path='/myquizzes'element={<MyQuiz/>}/>
      <Route path='/createquiz'element={<CreateQuiz/>}/>
            <Route path='/playquiz'element={<PlayQuiz/>}/>

     </Routes>
     </BrowserRouter>
  )
}

export default App
