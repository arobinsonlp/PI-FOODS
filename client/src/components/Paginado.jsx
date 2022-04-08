import React from "react";
import styles from "./styles/Paginado.module.css";

const Paginado = ({ recipesXPage, recipes, handlePaginado }) => {
  let pages = [];
  let displayRecipes = Math.ceil(recipes, recipesXPage);
  for (let i = 1; i < displayRecipes; i++) {
    if (i <= 15) pages.push(i);
  }

  return (
    <div className={styles.container}>
      <ul className={styles.listContainer}>
        {pages &&
          pages.map((p) => (
            <li>
              <button
                className={styles.number}
                onClick={() =>  handlePaginado(p)}>{p}</button>
            </li>
          ))}
      </ul>
    </div>
  )
};

export default Paginado;
