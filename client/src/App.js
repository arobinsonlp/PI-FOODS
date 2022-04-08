import './App.css';
import React from 'react';
import {BrowserRouter, Route,/*,Switch */Routes} from 'react-router-dom'
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import RecipeDetail from './components/RecipeDetail';



function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Routes>
    <Route path='/' element= {<LandingPage />} />
    <Route exact path='/home/recipes' element= {<Home />} />
    <Route exact path='/home/recipes/:id' element= {<RecipeDetail />} />
    </Routes>
    </div>
    </BrowserRouter>
    );
}

export default App;
