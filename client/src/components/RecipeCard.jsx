import React from "react";
import { Link } from "react-router-dom";
import style from "./styles/RecipeCard.module.css";

const RecipeCard = ({ name, diets, img, id }) => {
  return (
    <div className={style.card}>
      <img src={img} alt={name} />
      <h3 className={style.name}> {name}</h3>
      <p className={style.diets}>{diets.join(",")}</p>
      <Link to={"/home/recipes" + id}>
        <button className={style.btn}>+</button>
      </Link>
    </div>
  );
};

export default RecipeCard;
