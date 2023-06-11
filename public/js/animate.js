console.log('Animate.js loaded');

const myForm = document.getElementById('myForm');
const imput = document.getElementById('file-upload');

myForm.addEventListener('submit', async(e) => {
  e.preventDefault();
  const formData = new FormData();
  console.log("/////////////"+imput);
  formData.append('archivo', imput.files[0]);
  console.log(formData);


var requestOptions = {
  method: 'PUT',
  body: formData,
  redirect: 'follow'
};

await fetch("http://localhost:8080/api/uploads/64500a36140b2e6f85fd87d0", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

});



