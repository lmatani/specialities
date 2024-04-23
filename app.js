const express = require('express');
const app = express();

const webData = require('./data.js');

// path = path.substring(1)


const linkHome = '<a href="/">Home</a>';
//const links = '<ul><li><a href="/marketing">Marketing</a></li><li><a href="/ventas">Ventas</a></li><li><a href="/developers">Developers</a></li><li><a href="/QAs">QAs</a></li></ul>';
const links = '<a href="/marketing">Marketing</a> <a href="/ventas">Ventas</a> <a href="/developers">Developers</a> <a href="/QAs">QAs</a> ';

app.get('/', (req, res) => {
  console.log(req.url);
  res.send(
    `<h1>Listado de Usuarios por Especialidad</h1><hr>${links}<hr>`
  );
});


app.get('/marketing', (req, res) => {
    let speciality = req.path.substring(1);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(getHtml(speciality));
    res.send();
});


app.get('/ventas', (req, res) => {
    let speciality = req.path.substring(1);
   res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(getHtml(speciality));
    res.send();
});


app.get('/developers', (req, res) => {
    let speciality = req.path.substring(1);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(getHtml(speciality));
    res.send();
});


app.get('/QAs', (req, res) => {
    let speciality = req.path.substring(1);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(getHtml(speciality));
    res.send();
  });

app.use((req, res) => {
  res
    .status(404)
    .send(`<h1>Página ${req.path.substring(1)} no encontrada </h1><br>${linkHome}`);
});


app.listen(4000, () => {
  console.log('Node.js está escuchando en http://localhost:4000');
});



function getHtml(speciality){
    const usersList = webData.getUsersBySpecialty(speciality);
    const usersListHtml = webData.getUsersInHtml(usersList);
    const firstLetter = speciality.charAt(0);
    speciality = speciality.replace(firstLetter, firstLetter.toUpperCase(), 1);
    let webPage = `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=, initial-scale=1.0">
          <title>PRUEBA</title>
      </head>
      <body>
      <header>
        <h1><i>Datos Usuarios</i></h1>
        <hr>${links}<hr>
      </header>
      <main>
        <h3>Lista de usuarios de <b>${speciality}</b></h3>
        <div>${usersListHtml}</div>
      </main>
      <footer><hr>${linkHome}<br></footer>  
      </body>
      </html>`;
    return webPage;
  }
