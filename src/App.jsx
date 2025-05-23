import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Exercise from './pages/Exercise';
import ExerciseVideo from './components/exercise/exercise-video/ExerciseVideo';
import ExerciseHistory from './components/exercise/exercise-history/ExerciseHistory';
import ExerciseInbody from './components/exercise/exercise-inbody/ExerciseInbody';
import Nutrition from './pages/Nutrition';
import NutritionDiet from './components/nutrition/nutrition-diet/NutritionDiet';
import NutritionCreate from './components/nutrition/nutrition-create/NutritionCreate';
import NutritionHistory from './components/nutrition/nutrition-history/NutritionHistory';
import RecipeList from './components/nutrition/nutrition-recipe/recipe-list/RecipeList';
import RecipeDetail from './components/nutrition/nutrition-recipe/recipe-detail/RecipeDetail';
import Signup from './pages/Signup';
import { useEffect } from 'react';
import { AuthProvider, useAuthState } from './contexts/AuthContext';
import ProtectedLayout from './layouts/ProtectedLayout';
import UserInfoStep1 from './components/login/UserInfoStep1';
import UserInfoStep2 from './components/login/UserInfoStep2';
import { ExerciseProvider } from './contexts/ExerciseContext';
import { NutritionProvider } from './contexts/NutritionContext';

const AppRoutes = () => {
  const { isLoggedIn, isNewUser } = useAuthState();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (
      isLoggedIn &&
      isNewUser &&
      !location.pathname.startsWith("/signup/info")
    ) {
      navigate("/signup/info1");
    }
  }, [isLoggedIn, isNewUser, location, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
  
      {/* AuthContext에서 isLoggedIn이 true인 경우에만 접근 가능 */}
      <Route element={<ProtectedLayout />}>
      {/* 회원가입 이후 추가 정보 입력 - ExerciseProvider 필요 */}
        <Route
          path="/signup/info1"
          element={
            <ExerciseProvider>
              <UserInfoStep1 />
            </ExerciseProvider>
          }
          />
        <Route
          path="/signup/info2"
          element={
            <ExerciseProvider>
              <UserInfoStep2 />
            </ExerciseProvider>
          }
        />
  
        {/* 운동 기능 영역 - ExerciseProvider 필요 */}
        <Route
          path="/exercise"
          element={
            <ExerciseProvider>
              <Exercise />
            </ExerciseProvider>
          }
        >
          <Route index element={<Navigate to="video" />} />
          <Route path="video" element={<ExerciseVideo />} />
          <Route path="history" element={<ExerciseHistory />} />
          <Route path="inbody" element={<ExerciseInbody />} />
        </Route>
  
        {/* 영양 기능 영역 */}
        <Route
          path="/nutrition"
          element={
            <NutritionProvider>
              <Nutrition />
            </NutritionProvider>
          }
        >
          <Route index element={<Navigate to="create" />} />
          <Route path="create" element={<NutritionCreate />} />
          <Route path="diet" element={<NutritionDiet />} />
          <Route path="recipe">
            <Route index element={<RecipeList />} />
            <Route path=":id" element={<RecipeDetail />} />
          </Route>
          <Route path="history" element={<NutritionHistory />} />
        </Route>
      </Route>
    </Routes>
  );
};

function App() {
  const ScrollToTop = () => {
    const location = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [location]);
    return null;
  };

  return (
    <div className="App">
      <AuthProvider>
        <ScrollToTop />
        <AppRoutes />
      </AuthProvider>
    </div>
  );
}

export default App;