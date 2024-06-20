document.querySelector('form').addEventListener('submit', function(event) {
  console.log('Form submitted');
  event.preventDefault();// No se necesita event.preventDefault();

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
  .then(response =>{
    console.log('Response status:', response.status);
    return response.json();
  })
  .then(data => {
    console.log('Response data:', data);
    if (data.success) {
    } else {
      console.error('Error: Success flag is false');
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
});
