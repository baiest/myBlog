import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Menu from './Menu';
import Usuarios from './Usuarios';
//import Tareas from './Tareas';
 const Tareas = () => (
   <h2>Tareas</h2>
 );
const App = () => (
  <BrowserRouter history= 'history'>
    <Menu/>
    <div className='margen'>
        <Route exact path='/' component={ Usuarios }/>
        <Route exact path='/tareas' component={ Tareas }/>
    </div>
  </BrowserRouter>
);

export default App;