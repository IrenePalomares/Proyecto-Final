// const session = require('express-session');
// const app = express();

btnInicio = document.getElementById('inicio');
btnSesion = document.getElementById('iniciars');
btnConfirmar = document.getElementById('confirmar');
btnRegistrar = document.getElementById('registrar');
btnRanking = document.getElementById('ranking');
btnContacto = document.getElementById('contacto');
btnJugar = document.getElementById('jugar');
btnCerrar = document.getElementById('cerrar')
btnFinalizar = document.getElementById('finalizar')

const finalizar = () => {
    swal({
        title: "Estás seguro de que quieres terminar?",
        text: `${session.nombre} no se va a guardar la puntuación!`,
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          swal("Ya has finalizado la partida, te redirigiremos a la página de inicio", {
            icon: "success",
          });
          res.redirect('/');
        } else {
          swal(`Uf ${session.nombre}, por los pelos... Puedes seguir jugando!`);
        }
      });
}

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
    btnRanking.addEventListener("click", function(){
        window.location.href="Ranking";
    });
    btnContacto.addEventListener("click", function(){
        window.location.href="Contacto";
    });
    if(btnJugar) {
        btnJugar.addEventListener("click", function(){
            window.location.href="ElegirOpciones";
        });
    }
    // btnFinalizar.addEventListener("click", function(){
    //     finalizar();
    // });
}
menu();

