import React from "react";
import { Link } from "react-router-dom";
import style from "./styles/LandingPage.module.css"



const LandingPage = () => {
  return (
    <div className= {style.container} >
   <h1 className= {style.container} > Bienvenidos a mi real page</h1>
   <span className= {style.credit}> robinson lozano </span>
   <Link to = '/home/recipes'>
   <button className= {style.btn}> Ingresar</button>
   </Link>
    </div>
  )
};

export default LandingPage;
