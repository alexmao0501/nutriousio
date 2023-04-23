import React from 'react';
import './styles.scss';
import Navbar from '../Navbar';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import '../../assets/testdata/MealHistoryTest.json'
const MealHistory = () => {

  const [cookie] = useCookies(["user"]);
  const [mealHistory, setMealHistory] = useState({});

  function groupByDate(arr) {
    const groups = {};

    arr.forEach(item => {
      const date = item.date;
      const day = new Date(date.getFullYear(), date.getMonth(), date.getDate()).toISOString();

      if(!groups[day]) {
        groups[day] = [];
      }

      groups[day].push(item)
    });

    setMealHistory(groups);
  }
  
  useEffect(() => {
    if(cookie["user"]) {
      fetch("http://localhost:5000/mealHistory", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          email: cookie["user"].email
        })
      })
      .then(response => response.json)
      .then(data => console.log(data))
    }
  }, [])

  return (
    <div className="meal-history-container">
      <Navbar />
      <div className="header-row">
          <Link to="/" className="back-btn">
            <span>Back</span>
          </Link>
          <h1>My Meal History</h1>
        </div>
        <div className="functional-section">
          <div className="meals">
          </div>
        </div>
    </div>
  )
}

export default MealHistory