const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const { authJwt, verifySignUp, } = require('../middlewares');
const { Types } = require("mongoose");
const apiKey = process.env.API_KEY;
const Comidas = require('../models/comidas.js');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


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

router.post("/pesar/alimento", async (req, res) => {
  const { alimento } = req.body ;
  const query = JSON.stringify(alimento);
  const dataType = ['Foundation', 'SR Legacy']; // Filtrando por tipos de datos relevantes para alimentos básicos
  const pageSize = 1; // Número de resultados por página
  const pageNumber = 1;// Número de página de los resultados
  const apiUrl = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${apiKey}&query=${query}&dataType=${dataType.join(',')}&pageSize=${pageSize}&pageNumber=${pageNumber}`;

  fetch(apiUrl)
  .then(response => {
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
  })
  .then(data => {
      console.log(data);// Ver la estructura de los datos en la consola
      res.json(data); // Enviar los datos al cliente
  })
  .catch(error => {
      console.error('Error fetching data:', error);
      res.status(500).send('Error fetching data. Please try again later.');
  });
});

router.post('/buscar-comida', async (req, res) => {
  try {
      const peso = 50;
      // Extraer el nombre del body de la petición
      console.log(req.body);
      const { alimento } = req.body;
      // Buscar la comida en la base de datos por nombre
      const comidaEncontrada = await Comidas.findOne({ name: alimento });

      if (comidaEncontrada) {
        // Devolver los atributos de la comida
        const calorias = comidaEncontrada.calorias * peso;
        const proteina = comidaEncontrada.proteina * peso;
        const grasa = comidaEncontrada.grasa * peso;
        const carbohidratos = comidaEncontrada.carbohidratos * peso;
        const fibra = comidaEncontrada.fibra * peso;
        const azucar = comidaEncontrada.azucar * peso;
        const sodio = comidaEncontrada.sodio * peso;

        res.render('layouts/info_alimento', { layout: false, calorias, proteina, grasa, carbohidratos, fibra, azucar, sodio });
        
      } else {
          res.status(404).json({ message: 'Comida no encontrada' });
      }
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error al buscar la comida' });
  }
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
router.get("/ingresado_con_exito",(req,res)=>{
  res.render('layouts/ingresado_con_exito');
});


module.exports = router;