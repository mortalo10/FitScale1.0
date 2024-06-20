document.querySelector('form').addEventListener('submit', function(event) {
  // No se necesita event.preventDefault();

  const alimento = document.querySelector('#alimento').value;

  fetch('/pesar/alimento', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      alimento: alimento 
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      // No redirigir desde aquí
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
});
