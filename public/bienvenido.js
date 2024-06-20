// Obtener el nombre del usuario desde localStorage
const usuario = localStorage.getItem('usuario');

// Mostrar el saludo
if (usuario) {
    document.querySelector('#greeting').textContent = `¡Bienvenido, ${usuario}!`;
} else {
    document.querySelector('#greeting').textContent = '¡Bienvenido!';
}
