DROP TABLE IF EXISTS Usuarios;

CREATE TABLE Usuarios (
  id INT PRIMARY KEY IDENTITY,
  nombre VARCHAR(100),
  edad INT,
  email VARCHAR(100),
  telefono VARCHAR(20),
  id_materia INT FOREIGN KEY REFERENCES Materias(id)
);

INSERT INTO Usuarios (nombre, edad, email, telefono) VALUES ('John Doe', 25, 'johndoe@example.com', '1234567890');
INSERT INTO Usuarios (nombre, edad, email, telefono) VALUES ('Jane Smith', 30, 'janesmith@example.com', '9876543210');
INSERT INTO Usuarios (nombre, edad, email, telefono) VALUES ('Robert Johnson', 28, 'robertjohnson@example.com', '4567890123');
INSERT INTO Usuarios (nombre, edad, email, telefono) VALUES ('Emily Davis', 22, 'emilydavis@example.com', '7890123456');
INSERT INTO Usuarios (nombre, edad, email, telefono) VALUES ('Michael Wilson', 27, 'michaelwilson@example.com', '2345678901');



DROP TABLE IF EXISTS Profesores;

CREATE TABLE Profesores (
  id INT PRIMARY KEY IDENTITY,
  nombre VARCHAR(255) NOT NULL,
  especialidad VARCHAR(255) NOT NULL
);

INSERT INTO Profesores (nombre, especialidad) VALUES ('Juan Pérez', 'Matemáticas');
INSERT INTO Profesores (nombre, especialidad) VALUES ('María González', 'Historia');
INSERT INTO Profesores (nombre, especialidad) VALUES ('Pedro Sánchez', 'Física');
INSERT INTO Profesores (nombre, especialidad) VALUES ('Laura García', 'Literatura');
INSERT INTO Profesores (nombre, especialidad) VALUES ('Carlos Rodríguez', 'Química');

DROP TABLE IF EXISTS Materias

CREATE TABLE Materias (
  id INT PRIMARY KEY IDENTITY,
  nombre VARCHAR(100),
  id_profesor INT FOREIGN KEY REFERENCES Profesores(id)
);

INSERT INTO Materias (nombre, id_profesor) VALUES ('Matemáticas', 2);
INSERT INTO Materias (nombre, id_profesor) VALUES ('Lectura', 1);
INSERT INTO Materias (nombre, id_profesor) VALUES ('Ciencias', 4);
INSERT INTO Materias (nombre, id_profesor) VALUES ('Sociales', 3);
INSERT INTO Materias (nombre, id_profesor) VALUES ('Inglés', 5);
