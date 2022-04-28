btnInicio = document.getElementById('inicio');
btnSesion = document.getElementById('iniciars');
btnConfirmar = document.getElementById('confirmar');
btnRegistrar = document.getElementById('registrar');
btnRanking = document.getElementById('ranking');
btnContacto = document.getElementById('contacto');

const menu = () => {
    btnInicio.addEventListener("click", function() {
        window.location.href="/";
    });
    btnSesion.addEventListener("click", function(){
        window.location.href="IniciarSesion";
    });
    btnRegistrar.addEventListener("click", function(){
        window.location.href="Registrar";
    });
    btnRanking.addEventListener("click", function(){
        window.location.href="Ranking";
    });
    btnContacto.addEventListener("click", function(){
        window.location.href="Contacto";
    });
}
menu();

document.querySelector('.first-button').addEventListener('click', function () {

    document.querySelector('.animated-icon1').classList.toggle('open');
    });