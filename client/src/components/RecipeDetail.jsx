import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, React } from "react";
import { getRecipeDetail } from "../actions/index";
import style from "./styles/RecipeDetail.module.css";

function RecipeDetail() {
  const dispatch = useDispatch();
  const { recipeDetail } = useSelector((state) => state);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getRecipeDetail(id));
  }, [dispatch, id]);

  return (
    <div className={style.container}>
      <h1 className={style.name}> Detail:</h1>
      <nav className={style.navbar}>
        <Link to="/home/recipes">
          <button className={style.btn}> Back to Home </button>
        </Link>
      </nav>
      {recipeDetail ? (
        <div className={style.infoContainer}>
          <h3 className={style.info}>Name:</h3>
          <p>{recipeDetail.name ? recipeDetail.name : null}</p>
          <h3 className={style.info}>Diets:</h3>
          <p>{recipeDetail.diets ? recipeDetail.diets.join(", ") : null}</p>
          <h3 className={style.info}>Summary:</h3>
          <p>{recipeDetail.summary ? recipeDetail.summary.replace(/<[^>]*>?/g) : null}</p>
          <h3 className={style.info}>spoonacularScore:</h3>
          <p>{recipeDetail.spoonacularScore}</p>
          <h3 className={style.info}> Healt score</h3>
          <p>{recipeDetail.healthScore}</p>
          <h3 className={style.info}>Instructions:</h3>
          <p>{recipeDetail.instructions ? recipeDetail.replace(/<[^>]*>?/g) : null}</p>
          <img src= {recipeDetail.img} width='400px' height= '400px' alt= {recipeDetail.name} />
        </div>
      ) : (
        <h1 className={style.loading}> loading... </h1>
      )}
    </div>
  );
}

export default RecipeDetail;
