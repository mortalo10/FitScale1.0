const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const { authJwt, verifySignUp, } = require('../middlewares');
const { Types } = require("mongoose");
const apiKey = process.env.API_KEY;


const router = express.Router();

router.get('/', function (req, res) {
  res.render('layouts/index');
});

router.get('/index', (req, res) => {
  res.render('layouts/index');
});
  
router.get("/historial", (req, res) => {
    res.render('layouts/historial', { layout: false });
});

router.get("/pesar", (req, res) => {
  res.render('layouts/pesar', { layout: false });
});

router.post("/pesar/alimento", (req, res) => {
  console.log(req.body);
  const { alimento }  = req.body;
  const query = JSON.stringify(alimento);
  const apiUrl = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${apiKey}&query=${query}`;

  fetch(apiUrl)
  .then(response => {
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
  })
  .then(data => {
      console.log(data);// Ver la estructura de los datos en la consola
      res.json(data.food[0]); // Enviar los datos al cliente
      res.render('layouts/info_alimento', { layout: false });
  })
  .catch(error => {
      console.error('Error fetching data:', error);
      res.status(500).send('Error fetching data. Please try again later.');
  });

  
  
});

router.get("/info_alimento", (req, res) =>{
  res.render('layouts/info_alimento', { layout: false });

  function displayFoodData(foods) {
    const apiContent = document.getElementById('api-content');

    // Asegúrate de que 'foods' sea un array
    if (Array.isArray(foods)) {
        apiContent.innerHTML = ''; // Limpiar contenido anterior
        foods.forEach(food => {
            const foodDiv = document.createElement('div');
            foodDiv.className = 'food-item';
            foodDiv.innerHTML = `
                <h2>${food.description}</h2>
                <p><strong>Data Type:</strong> ${food.dataType}</p>
                <p><strong>Published Date:</strong> ${food.publishedDate}</p>
                <p><strong>Brand Name:</strong> ${food.brandName || 'N/A'}</p>
                <p><strong>Food Category:</strong> ${food.foodCategory || 'N/A'}</p>
                <p><strong>Ingredients:</strong> ${food.ingredients || 'N/A'}</p>
            `;
            apiContent.appendChild(foodDiv);
        });
    } else {
        apiContent.innerHTML = '<p>No food data found</p>';
    }
  }

})


module.exports = router;