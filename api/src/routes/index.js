const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {API_KEY} = process.env;
// requerimos axios
const axios = require("axios");
// requerimos los controllers
const { getAllInfo } = require("./getInfos");
// requerimos los modelos
const { Diet, Recipe } = require("../db");

const router = Router();

//router.use(express.json()); 

// router.use("/recipes",recipesRoute)
//router.use("/types",dietsRoute)

// ruta para obtener todas las recetas
router.get('/recipes', async (req, res) => {
  let { name } = req.query;
  let allRecipes = await getAllInfo();
  //console.log('llamada a la api',allRecipes)
  try {
    if (name) {
      let searchRecipe = await allRecipes.filter((el) =>
        el.title.toLowerCase().includes(name.toLowerCase())
      );
      searchRecipe.length
        ? res.status(200).send(searchRecipe)
        : res.status(404).send("no encontramos la receta lo siento");
    } else {
      res.status(200).send(allRecipes);
    }
  } catch (error) {
    console.log(error);
  }
});

//ruta para obtener una receta por id
router.get("/recipes/:id", async (req, res) => {
  let {id} = req.params;
  let recipeTotal = await getAllInfo()
  if(id){
    let recipeId = await recipeTotal.filter(el => el.id == id)
    recipeId.length?
    res.status(200).json(recipeId):
    res.status(400).send('no hay esa receta')

    }

})


// ruta para obtener los tipos de dietas get/tipes

router.get('/types' , async (req,res) => {
try {
  let infoApi = await getAllInfo();
  let diets = infoApi.map(r => r.diets);
  let eachDiet = diets.map(d => {
   for(let i=0 ; i< d.length ;i++) return d[i];
  });
  console.log(eachDiet)
  eachDiet.push(
    "ketogenic",
    "vegetarian",
    "lacto vegetarian",
    "ovo vegetarian",
    "vegan",
    "pescetarian",
    "paleo",
    "primal",
    "low fodmap",
    "whole30"
  );
 eachDiet.forEach((e) => {
   Diet.findOrCreate({where: {name: e}});
 });
 let allDiets = await Diet.findAll();
 res.send(allDiets);
 } catch (error) {
 res.send(error)
}
} )



// ruta para publicar la receta por el usuario 

router.post("/recipe", async (req, res) => {
  let { name, summary, spoonacularScore, healthScore, instructions, diets } = req.body;
  try {
    let newRecipe = await Recipe.findOrCreate({
      name,
      summary,
      spoonacularScore,
      healthScore,
      instructions,
    });
    let recipeDiet = await Diet.findAll({ where: { name: diets } });
    newRecipe.addDiet(recipeDiet);
    res.send("Nueva Receta creada con éxito!");
  } catch (error) {
    console.log(error);
  }
});

// router.post("/create", async (req,res,next) => {
//   try {
//       const {title, summary, spoonacularScore, healthScore, instructions, image, diets} = req.body

//       const newRecipe = await Recipe.create({
//           title,
//           summary,
//           spoonacularScore,
//           healthScore,
//           instructions,
//           image
//       })

//       let recipeDiet = await Diet.findAll({ where: { name: diets } });
//     newRecipe.addDiet(recipeDiet);
//     res.send("Nueva Receta creada con éxito!");

//   } catch (error) {
//       next(error)
//   }
// })


module.exports = router;
