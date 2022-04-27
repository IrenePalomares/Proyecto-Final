btnInicio = document.getElementById('inicio');
btnSesion = document.getElementById('iniciars');
btnConfirmar = document.getElementById('confirmar');
btnRegistrar = document.getElementById('registrar');
btnRanking = document.getElementById('ranking');
btnContacto = document.getElementById('contacto');

const menu = () => {
    btnInicio.addEventListener("click", function() {
        window.location.href="./index.html";
    });
    btnSesion.addEventListener("click", function(){
        window.location.href="./InicioSesion.html";
    });
    btnRegistrar.addEventListener("click", function(){
        window.location.href="./registrar.html";
    });
    btnRanking.addEventListener("click", function(){
        window.location.href="./ranking.html";
    });
    btnContacto.addEventListener("click", function(){
        window.location.href="./contacto.html";
    });
}
menu();

document.querySelector('.first-button').addEventListener('click', function () {

    document.querySelector('.animated-icon1').classList.toggle('open');
    });