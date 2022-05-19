const sesionUsuario = document.getElementById("")
if (window.sessionStorage) {



    sessionStorage.setItem("nombre", "Gonzalo");
  
  
  
    var nombre = sessionStorage.getItem("nombre");
  
  
  
    sessionStorage.removeItem("nombre");
  
  }
  
  else
  
   {
  
    throw new Error('Tu Browser no soporta sessionStorage!');
  
  }