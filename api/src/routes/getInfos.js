const { Router } = require("express");
const axios = require("axios");
const { Recipe, Diet } = require("../db");
const { API_KEY } = process.env;

// obtener las recetas de la api
const getApiInfo = async () => {
  let apiUrl = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
  );
  let apiData = await apiUrl.data.results.slice(0,100);
  apiData.map((el) => {
    return {
      id: el.id,
      healthScore: el.healthScore,
      spoonacularScore: el.spoonacularScore,
      name: el.title,
      image: el.image,
      summary: el.summary,
      diets: el.diets,
      instructions: el.analyzedInstructions,
    };
  });
  return apiData;
};

// traer la info que encontramos en la db

const dbInfo = async () => {
  return await Recipe.findAll({
    include: Diet,
    attributes: ["name"],
    through: {
      attributes: [],
    },
  });
};

// unir la info de la api y la bd

const getAllInfo = async () => {
  let apiData = await getApiInfo();
  let dbData = await dbInfo();
  let dataTotal = [...apiData, ...dbData];
  return dataTotal;
};

module.exports = {
  getApiInfo,
  dbInfo,
  getAllInfo,
};
