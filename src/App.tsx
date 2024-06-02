import React from 'react';
import './App.css';
import Task from './components/Task';
import Deadline from './components/Deadline';


// const { todos } = db

function App() {


  return (
    <div className="container">
      <Task />
      <hr />
      <Deadline />
    </div>
  );
}

export default App;
