document.addEventListener('DOMContentLoaded', (event) => {
  const apiKey = 'oPNgYFprb0PqcWLOiKgUzInSfuOJjquBfxZeRKiv';
  const apiUrl = 'https://api.nal.usda.gov/fdc/v1/foods/search?api_key='+apiKey+'&query=Cheddar%20Cheese';

  fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
          console.log(data);
          displayData(data);
      })
      .catch(error => {
          console.error('Error fetching data:', error);
      });
});

function displayData(data) {
  const apiContent = document.getElementById('api-content');
  
  // Example of displaying data: adapt to your specific API response
  if (data.results && data.results.length > 0) {
      data.results.forEach(item => {
          const div = document.createElement('div');
          div.className = 'api-item';
          div.innerHTML = `
              <h2>${item.title}</h2>
              <p>${item.description}</p>
          `;
          apiContent.appendChild(div);
      });
  } else {
      apiContent.innerHTML = '<p>No data found</p>';
  }
}
