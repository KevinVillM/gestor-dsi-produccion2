
// var myHeaders = new Headers();
// myHeaders.append("x-token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NDRmZmE2YzI3ZDQ3NGNhNWFhNzY0ZDUiLCJpYXQiOjE2ODMwODgxOTIsImV4cCI6MTY4MzEwMjU5Mn0.4fEvjwPFzQ33hV8vLG1I1RyfCw1MKmTUZ2oRC0m_o2I");

// var requestOptions = {
//   method: 'GET',
//   headers: myHeaders,
//   redirect: 'follow'
// };

// const obtenerProyectos = async() => {
//     try {
//       const response = await fetch("http://localhost:8080/api/proyectos/6451b8f964fd35d08e29308a", requestOptions);
//       const proyectos = await response.json();

//       //Agregar un h1 con el nombre del proyecto
//       document.getElementById("nombreProyecto").innerHTML = proyectos.nombre;
//       //Desplegar los colaboradores del proyecto en una lista
//         var colaboradores = proyectos.colaboradores;
//         var listaColaboradores = document.getElementById("listaColaboradores");
//         for (var i = 0; i < colaboradores.length; i++) {
//             var li = document.createElement("li");
//             li.appendChild(document.createTextNode(colaboradores[i].nombre));
//             listaColaboradores.appendChild(li);
//         }
//       console.log(proyectos);
//     } catch (error) {
//       console.log('error', error);
//     }
//   }
  

//   const obtenerUsuario = async () => {
//     var raw = "{\r\n    \"email\":\"emailds@gmail.com\",\r\n    \"password\":\"1234567\"\r\n}";

//     var requestOptions = {
//       method: 'POST',
//       body: raw,
//       headers: {
//         "Content-Type": "application/json"
//       },
//       redirect: 'follow'
//     };

//   const usuario = await fetch("http://localhost:8080/api/auth/login", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));
//     console.log(usuario);
//   }
  
  

// obtenerUsuario();
//obtenerProyectos();

const logearUsuario = async () => {

  var raw = "{\r\n    \"email\":\"emailds@gmail.com\",\r\n    \"password\":\"123456\"\r\n}";

  var requestOptions = {
    method: 'POST',
    body: raw,
    redirect: 'follow',
    headers: {
      "Content-Type": "application/json"
    }
  };
  
  await fetch("http://localhost:8080/api/auth/login", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

}

logearUsuario();