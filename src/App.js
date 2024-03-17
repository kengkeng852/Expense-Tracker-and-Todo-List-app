import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home'; 
import TodoList from './pages/todo/Todo'; 
import ExpenseTracker from './pages/expense/Expense'; 
import Navbar from './components/navbar/Navbar'; 
import { useState, useEffect } from 'react';

function App() {
    const [currentPage, setCurrentPage] = useState('home'); // State to track current page
  
    return (
      <div className="App">
        <BrowserRouter> 
          <Navbar /> 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/todo" element={<TodoList />} />
            <Route path="/expense" element={<ExpenseTracker />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }

export default App;
