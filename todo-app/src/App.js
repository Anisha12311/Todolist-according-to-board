import Board from "./Component/Board/Board";
import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Todo from "./Component/Todos/Todo";

const App = () => {
  
  return (

         <BrowserRouter>
      <Routes>
        <Route path="/" element = {<Board />}>
          <Route path  = "/:id" element = {<Todo/>}/>
          </Route>
          </Routes>
          </BrowserRouter>
 
  );
}

export default App;
