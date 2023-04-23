import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddMeal from './components/AddMeal/AddMeal';
import ViewMeals from './components/ViewMeals/ViewMeals';
import Landing from './components/Landing';
import CalorieCalculator from './components/CalorieCalculator/CalorieCalculator';
import LoginPage from './components/Login/LoginPage';
import Profile from './components/Profile/Profile'
import RecipePage from './components/RecipePage/index'
import { AuthContextProvider } from './components/AuthContext/AuthContext';

ReactDOM.render(
  <AuthContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/enterMeal' element={<AddMeal />} />
        <Route path='/viewMeals' element={<ViewMeals />} />
        <Route path='/calorieCalculator' element={<CalorieCalculator />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
        <Route path='/recipePage' element={<RecipePage />}></Route>
      </Routes>
    </BrowserRouter>
  </AuthContextProvider>,
  document.getElementById('root')
);