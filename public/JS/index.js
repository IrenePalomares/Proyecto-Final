// const session = require('express-session');
// const app = express();

btnInicio = document.getElementById('inicio');
btnSesion = document.getElementById('iniciars');
btnConfirmar = document.getElementById('confirmar');
btnRegistrar = document.getElementById('registrar');
btnRanking = document.getElementById('ranking');
btnContacto = document.getElementById('contacto');
btnPreguntas = document.getElementById('preguntas');
btnJugar = document.getElementById('jugar');
btnCerrar = document.getElementById('cerrar')

const menu = () => {
    btnInicio.addEventListener("click", function() {
        window.location.href="/";
    });
    
    if (btnSesion && btnRegistrar) {
        btnSesion.addEventListener("click", function(){
            window.location.href="IniciarSesion";
        });
        btnRegistrar.addEventListener("click", function(){
            window.location.href="Registrar";
        });
    }
    if(btnJugar) {
        btnJugar.addEventListener("click", function(){
            window.location.href="ElegirOpciones";
        });
    }
    btnRanking.addEventListener("click", function(){
        window.location.href="Ranking";
    });
    btnContacto.addEventListener("click", function(){
        window.location.href="Contacto";
    });
    if(btnPreguntas) {
        btnPreguntas.addEventListener("click", function(){
        window.location.href="InsertarPreguntas";
    });
    }
    
}
menu();

