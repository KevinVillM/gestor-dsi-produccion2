console.log('Animate.js loaded');

const myForm = document.getElementById('myForm');
const imput = document.getElementById('file-upload');
const bandera = document.getElementById('bandera');
const cargaIcon = document.getElementById('cargaIcon');

myForm.addEventListener('submit', async(e) => {
  e.preventDefault();


  bandera.innerHTML = "Subiendo archivo...";

  //Hacer visible el div cargaIcon
  cargaIcon.style.visibility = "visible";
  


  const formData = new FormData();
  console.log("/////////////"+imput);
  formData.append('archivo', imput.files[0]);
  console.log(formData);


var requestOptions = {
  method: 'PUT',
  body: formData,
  redirect: 'follow'
};
// Agregar un una pleca que gire mientras se sube el archivo
await fetch("https://gestor-dsi-produccion2-production.up.railway.app/api/uploads/64500a36140b2e6f85fd87d0", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  cargaIcon.style.visibility = "hidden";
  bandera.innerHTML = "Archivo subido con exito";
});



