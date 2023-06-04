const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

const config = {
  user: 'usuario',
  password: 'usuario',
  server: '192.168.1.18',
  database: 'registrodb',
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

sql.connect(config, (err) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

// Function to obtain all subjects
async function obtenerMaterias() {
  try {
    // Establish a connection to the database
    const pool = await sql.connect(config);

    // Query to retrieve all subjects
    const result = await pool.request().query('SELECT * FROM Materias');


    return result.recordset;

  } catch (error) {
    console.error('Error al obtener las materias', error);
    throw new Error('Error al obtener las materias');
  }
}

// Endpoint to get all users
app.get('/usuarios', async (req, res) => {
  try {
    // Establish a connection to the database
    const pool = await sql.connect(config);

    // Query to retrieve all users
    const result = await pool.request().query('SELECT * FROM Usuarios');

    // Return users as response
    res.json(result.recordset);
  } catch (error) {
    console.error('Error al obtener los usuarios', error);
    res.status(500).send('Error al obtener los usuarios');
  }
});

// Endpoint to create a new user
app.post('/usuarios', async (req, res) => {
  try {
    const { nombre, edad, email, telefono, id_materia } = req.body;

    // Establish a connection to the database
    const pool = await sql.connect(config);

    // Query to insert a new user
    await pool
      .request()
      .input('nombre', sql.VarChar, nombre)
      .input('edad', sql.Int, edad)
      .input('email', sql.VarChar, email)
      .input('telefono', sql.VarChar, telefono)
      .input('id_materia', sql.VarChar, id_materia)
      .query(
        'INSERT INTO Usuarios (nombre, edad, email, telefono, id_materia) VALUES (@nombre, @edad, @email, @telefono, @id_materia)'
      );

    res.send('Usuario creado exitosamente');
  } catch (error) {
    console.error('Error al crear el usuario', error);
    res.status(500).send('Error al crear el usuario');
  }
});

// Endpoint to update an existing user
app.put('/usuarios/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, edad, email, telefono, id_materia } = req.body;

    // Establish a connection to the database
    const pool = await sql.connect(config);

    // Query to update the user
    await pool
      .request()
      .input('id', sql.Int, id)
      .input('nombre', sql.VarChar, nombre)
      .input('edad', sql.Int, edad)
      .input('email', sql.VarChar, email)
      .input('telefono', sql.VarChar, telefono)
      .input('id_materia', sql.VarChar, id_materia)
      .query(
        'UPDATE Usuarios SET nombre = @nombre, edad = @edad, email = @email, telefono = @telefono, id_materia = @id_materia WHERE id = @id'
      );

    res.send('Usuario actualizado exitosamente');
  } catch (error) {
    console.error('Error al actualizar el usuario', error);
    res.status(500).send('Error al actualizar el usuario');
  }
});

// Endpoint to delete a user
app.delete('/usuarios/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Establish a connection to the database
    const pool = await sql.connect(config);

    // Query to delete the user
    await pool.request().input('id', sql.Int, id).query('DELETE FROM Usuarios WHERE id = @id');

    res.send('Usuario eliminado exitosamente');
  } catch (error) {
    console.error('Error al eliminar el usuario', error);
    res.status(500).send('Error al eliminar el usuario');
  }
});

// Endpoint to get all subjects
app.get('/materias', async (req, res) => {
  try {
    const materias = await obtenerMaterias();

    // Return subjects as response
    res.json(materias);
  } catch (error) {
    console.error('Error al obtener las materias', error);
    res.status(500).send('Error al obtener las materias');
  }
});

// Endpoint to create a new subject
app.post('/materias', async (req, res) => {
  try {
    const { nombre, id_profesor } = req.body;

    // Establish a connection to the database
    const pool = await sql.connect(config);

    // Query to insert a new subject
    await pool
      .request()
      .input('nombre', sql.VarChar(100), nombre)
      .input('id_profesor', sql.Int, id_profesor)
      .query('INSERT INTO Materias (nombre, id_profesor) VALUES (@nombre, @id_profesor)');

    res.send('Materia creada exitosamente');
  } catch (error) {
    console.error('Error al crear la materia', error);
    res.status(500).send('Error al crear la materia');
  }
});

// Endpoint to update an existing subject
app.put('/materias/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, id_profesor } = req.body;

    // Establish a connection to the database
    const pool = await sql.connect(config);

    // Query to update the subject
    await pool
      .request()
      .input('id', sql.Int, id)
      .input('nombre', sql.VarChar(100), nombre)
      .input('id_profesor', sql.Int, id_profesor)
      .query('UPDATE Materias SET nombre = @nombre, id_profesor = @id_profesor WHERE id = @id');

    res.send('Materia actualizada exitosamente');
  } catch (error) {
    console.error('Error al actualizar la materia', error);
    res.status(500).send('Error al actualizar la materia');
  }
});

// Endpoint to delete a subject
app.delete('/materias/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Establish a connection to the database
    const pool = await sql.connect(config);

    // Query to delete the subject
    await pool.request().input('id', sql.Int, id).query('DELETE FROM Materias WHERE id = @id');

    res.send('Materia eliminada exitosamente');
  } catch (error) {
    console.error('Error al eliminar la materia', error);
    res.status(500).send('Error al eliminar la materia');
  }
});

// Endpoint to get all teachers
app.get('/profesores', async (req, res) => {
  try {
    const profesores = await obtenerProfesores();

    // Return teachers as response
    res.json(profesores);
  } catch (error) {
    console.error('Error al obtener los profesores', error);
    res.status(500).send('Error al obtener los profesores');
  }
});

// Endpoint to create a new teacher
app.post('/profesores', async (req, res) => {
  try {
    const { nombre, especialidad } = req.body;

    // Establish a connection to the database
    const pool = await sql.connect(config);

    // Query to insert a new teacher
    await pool
      .request()
      .input('nombre', sql.VarChar, nombre)
      .input('especialidad', sql.VarChar, especialidad)
      .query('INSERT INTO Profesores (nombre, especialidad) VALUES (@nombre, @especialidad)');

    res.send('Profesor creado exitosamente');
  } catch (error) {
    console.error('Error al crear el profesor', error);
    res.status(500).send('Error al crear el profesor');
  }
});

// Endpoint to update an existing teacher
app.put('/profesores/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, especialidad } = req.body;

    // Establish a connection to the database
    const pool = await sql.connect(config);

    // Query to update the teacher
    await pool
      .request()
      .input('id', sql.Int, id)
      .input('nombre', sql.VarChar, nombre)
      .input('especialidad', sql.VarChar, especialidad)
      .query('UPDATE Profesores SET nombre = @nombre, especialidad = @especialidad WHERE id = @id');

    res.send('Profesor actualizado exitosamente');
  } catch (error) {
    console.error('Error al actualizar el profesor', error);
    res.status(500).send('Error al actualizar el profesor');
  }
});

// Endpoint to delete a teacher
app.delete('/profesores/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Establish a connection to the database
    const pool = await sql.connect(config);

    // Query to delete the teacher
    await pool.request().input('id', sql.Int, id).query('DELETE FROM Profesores WHERE id = @id');

    res.send('Profesor eliminado exitosamente');
  } catch (error) {
    console.error('Error al eliminar el profesor', error);
    res.status(500).send('Error al eliminar el profesor');
  }
});



// Function to get all teachers
async function obtenerProfesores() {
  const pool = await sql.connect(config);
  const result = await pool.request().query('SELECT * FROM Profesores');
  return result.recordset;
}

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
