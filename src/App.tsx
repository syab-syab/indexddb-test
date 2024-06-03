import React from 'react';
import './App.css';
import Task from './components/Task';
import DeadlineSpace from './components/DeadlineSpace';


// const { todos } = db

function App() {


  return (
    <div className="container">
      <Task />
      <hr />
      <DeadlineSpace />
    </div>
  );
}

export default App;
