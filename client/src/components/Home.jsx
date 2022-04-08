import { filterByDiets, orderRecipes, getRecipes, getDiets } from "../actions";
import React, { useState, useEffect } from "react"; // para usar en hooks
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import RecipeCard from "./RecipeCard";
import SearchBar from "./SearchBar";
import Paginado from "./Paginado";
import styles from "./styles/Home.module.css";

const Home = () => {
  const dispatch = useDispatch();
  const { recipes, diets } = useSelector((state) => state);

  // paginado
  let [page, setPage] = useState(1);
  let recipeXPage = 9;
  let lastPage = page * recipeXPage;
  let firstPage = lastPage - recipeXPage;
  let displayRecipes = recipes.slice(firstPage, lastPage);

  let handlePaginado = (pageNum) => {
    setPage(pageNum);
  };

  // filter by diets
  let handleDiets = (e) => {
    e.preventDefault();
    dispatch(filterByDiets(e.target.value));
  };
  // order
  let handleSort = (e) => {
    e.preventDefault();
    dispatch(orderRecipes(e.target.value));
  };

  // useEffect
  useEffect(() => {
    dispatch(getRecipes());
    dispatch(getDiets());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}> tasty recipes</h1>
      <nav className={styles.navbar}>
        <Link to="/home/recipe">
          <button className={styles.btns}>Create your own recipe!</button>
        </Link>
        <SearchBar />
        <label className={styles.labels}>Filter your recipes by:</label>
        <select onChange={(e) => handleDiets(e)}>
          {diets &&
            diets.map((d) => (
              <option value={d.name} key={d.id}>
                {" "}
                {d.name}
              </option>
            ))}
        </select>
        <label className={styles.labels}> Order:</label>
        <select onChange={(e) => handleSort(e)}>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
      </nav>
      <Paginado
        recipeXPage={recipeXPage}
        recipes={recipes.length}
        handlePaginado={handlePaginado}
            />
      <div className={styles.cardsContainer}>
        {displayRecipes &&
          displayRecipes.map((r, i) => {
            return (
              <RecipeCard
                key={i}
                name={r.title}
                diets={r.diets}
                img={r.image}
                id={r.id}
                summary={r.summary}
                instructions={r.instructions}
                score={r.score}
                health_score={r.healthScore}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Home;
