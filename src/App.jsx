import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Exercise from './pages/Exercise'
import ExerciseVideo from './components/exercise/exercise-video/ExerciseVideo'
import ExerciseHistory from './components/exercise/exercise-history/ExerciseHistory'
import ExerciseInbody from './components/exercise/exercise-inbody/ExerciseInbody'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/exercise" element={<Exercise />} >
          <Route index element={<Navigate to="video" />} />
          <Route path="video" element={<ExerciseVideo />} />
          <Route path="history" element={<ExerciseHistory />} />
          <Route path="inbody" element={<ExerciseInbody />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
