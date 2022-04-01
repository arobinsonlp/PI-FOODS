const {Diet,Recipe} = require('../db')
const axios = require('axios')
const {Sequalize} = require('sequelize')

const {API_KEY} = process.env

// let getData = async() =>{

// try {
//     let getUrl = await axios.get("https://api.spoonacular.com/recipes/complexSearch?apiKey="+YOUR_API_KEY+"&addRecipeInformation=true&number=100")
//     //`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}`)
//     let recipeUrl = await getUrl.data.results.map(el => {
//         return {
//             id: el.id,
//             title: el.title,
//             summary:el.summary,
//             spoonacularScore:el.spoonacularScore,
//             //healthScore:

//         }
//     })

// } catch (error) {
    
// }
// }