document.addEventListener('DOMContentLoaded', (event) => {
    const apiKey = process.env.API_KEY;
    const query = 'apple'; // Cambia esto por el alimento que quieres buscar
    const apiUrl = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${apiKey}&query=${query}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Ver la estructura de los datos en la consola
            displayFoodData(data.foods);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('api-content').innerText = 'Error fetching data. Please try again later.';
        });
});

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
