import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home'; 
import TodoList from './pages/todo/Todo'; 
import ExpenseTracker from './pages/expense/Expense'; 
import Navbar from './components/navbar/Navbar'; 

function App() {
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
