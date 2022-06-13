var correo = document.getElementById('usuario');
var btnUsuario = document.getElementById('nombre');
// var nombre = document.getElementById('usuario');

async () => {
    if (correo !== '') {
        const arrayUsuario = await Usuario.findOne({ correo:correo });
        if (arrayUsuario !== '') {
            localStorage.setItem('nombre', arrayUsuario.nombre);
            var nombre = localStorage.getItem('nombre');
            btnUsuario.innerHTML = nombre;
        }
    }
}

