import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Exercise from './pages/Exercise'
import ExerciseVideo from './components/exercise/exercise-video/ExerciseVideo'
import ExerciseHistory from './components/exercise/exercise-history/ExerciseHistory'
import ExerciseInbody from './components/exercise/exercise-inbody/ExerciseInbody'
import Nutrition from './pages/Nutrition'
import NutritionDiet from './components/nutrition/nutrition-diet/NutritionDiet'
import NutritionCreate from './components/nutrition/nutrition-create/NutritionCreate'
import NutritionHistory from './components/nutrition/nutrition-history/NutritionHistory'
import RecipeList from './components/nutrition/nutrition-recipe/recipe-list/RecipeList'
import RecipeDetail from './components/nutrition/nutrition-recipe/recipe-detail/RecipeDetail'
import Signup from './pages/Signup'
import { useEffect } from 'react'

function App() {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/exercise" element={<Exercise />} >
          <Route index element={<Navigate to="video" />} />
          <Route path="video" element={<ExerciseVideo />} />
          <Route path="history" element={<ExerciseHistory />} />
          <Route path="inbody" element={<ExerciseInbody />} />
        </Route>
        <Route path="/nutrition" element={<Nutrition />} >
          <Route index element={<Navigate to="create" />} />
          <Route path="create" element={<NutritionCreate />} />
          <Route path="diet" element={<NutritionDiet />} />
          <Route path="recipe">
            <Route index element={<RecipeList />} />
            <Route path=":id" element={<RecipeDetail />} />
          </Route>
          <Route path="history" element={<NutritionHistory />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
