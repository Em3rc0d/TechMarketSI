const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importar cors
const { Client } = require('pg'); // Importar el cliente de PostgreSQL
const app = express();
const port = 3000;

app.use(cors()); // Habilitar CORS
app.use(bodyParser.json());

// Configura la conexión a PostgreSQL
const client = new Client({
  user: 'postgres', // Reemplaza con tu usuario
  host: 'localhost', // O la dirección de tu servidor
  database: 'TechMarket',
  password: '1234', // Reemplaza con tu contraseña
  port: 5432, // Puerto por defecto de PostgreSQL
});

// Conectar a la base de datos
client.connect()
  .then(() => console.log('Conectado a la base de datos'))
  .catch(err => console.error('Error de conexión a la base de datos', err));

// Ruta para manejar el POST de /contact
app.post('/contact', async (req, res) => {
  const { name, email, phone, message } = req.body;

  // Lógica para guardar en la base de datos
  try {
    const query = 'INSERT INTO clientesPot (name, email, phone, message) VALUES ($1, $2, $3, $4)';
    await client.query(query, [name, email, phone, message]);
    console.log('Datos guardados correctamente');
    // Responder al frontend
    res.status(200).send({ message: 'Datos guardados correctamente' });
  } catch (error) {
    console.error('Error al insertar datos:', error);
    res.status(500).send({ message: 'Error al guardar los datos' });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});


//CREATE TABLE POSTGRESQL
// CREATE TABLE contact_requests (
//   id SERIAL PRIMARY KEY,
//   name VARCHAR(100) NOT NULL,
//   email VARCHAR(100) NOT NULL,
//   phone VARCHAR(20),
//   message TEXT NOT NULL,
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );