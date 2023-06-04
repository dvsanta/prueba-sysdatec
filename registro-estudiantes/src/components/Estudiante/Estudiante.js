import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import './Estudiante.css';
import { Modal, Button } from 'react-bootstrap';

const Estudiante = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [cuposDisponibles, setCuposDisponibles] = useState(20);
  useEffect(() => {
    obtenerEstudiantes();
    obtenerMaterias();
    setCuposDisponibles(20 - estudiantes.length); // Inicializar cupos disponibles
  }, [estudiantes.length]);

  const obtenerEstudiantes = () => {
    axios.get('http://localhost:3001/usuarios')
      .then(response => {
        setEstudiantes(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const obtenerMaterias = () => {
    axios.get('http://localhost:3001/materias')
      .then(response => {
        setMaterias(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const [nuevoEstudiante, setNuevoEstudiante] = useState({
    nombre: '',
    edad: 0,
    email: '',
    telefono: '',
    id_materia: null
  });

  const [editandoEstudiante, setEditandoEstudiante] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleEliminarEstudiante = id => {
    axios.delete(`http://localhost:3001/usuarios/${id}`)
      .then(response => {
        const updatedEstudiantes = estudiantes.filter(estudiante => estudiante.id !== id);
        setEstudiantes(updatedEstudiantes);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleGuardarEstudiante = () => {
    if (cuposDisponibles === 0) {
      alert('Se ha alcanzado el máximo de estudiantes.');
      return;
    }
    if (editandoEstudiante) {
      // Editar estudiante existente
      axios.put(`http://localhost:3001/usuarios/${editandoEstudiante.id}`, nuevoEstudiante)
        .then(response => {
          console.log('Estudiante actualizado exitosamente', response.data);
          const updatedEstudiantes = estudiantes.map(estudiante => {
            if (estudiante.id === editandoEstudiante.id) {
              return response.data;
            }
            return estudiante;
          });
          setEstudiantes(updatedEstudiantes);
          setNuevoEstudiante({
            nombre: '',
            edad: 0,
            email: '',
            telefono: '',
            id_materia: null
          });
          setShowModal(false);
          setEditandoEstudiante(null);
          window.location.reload();
        })
        .catch(error => {
          console.error('Error al actualizar el estudiante', error);
        });
    } else {
      // Crear nuevo estudiante
      
      axios.post('http://localhost:3001/usuarios', nuevoEstudiante)
        .then(response => {
          console.log('Estudiante creado exitosamente', response.data);
          setEstudiantes(prevEstudiantes => [...prevEstudiantes, response.data]);
          setNuevoEstudiante({
            nombre: '',
            edad: 0,
            email: '',
            telefono: '',
            id_materia: null
          });
          setShowModal(false);
          setCuposDisponibles(prevCupos => prevCupos - 1);
        })
        .catch(error => {
          console.error('Error al crear el estudiante', error);
        });
    }
  };

  const handleEditarEstudiante = estudiante => {
    setNuevoEstudiante(estudiante);
    setEditandoEstudiante(estudiante);
    setShowModal(true);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setNuevoEstudiante(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCerrarModal = () => {
    setNuevoEstudiante({
      nombre: '',
      edad: 0,
      email: '',
      telefono: '',
      id_materia: null
    });
    setShowModal(false);
    setEditandoEstudiante(null);
  };


// Función para obtener el nombre de la materia
const obtenerNombreMateria = idMateria => {
  const materia = materias.find(materia => materia.id === idMateria);
  return materia ? materia.nombre : 'N/A';
};


  return (
    <div className="ListaDeEstudiantes">
      <div className="d-flex justify-content-between">
      <h1>Listado de Estudiantes</h1>
      <p>Cupos disponibles: {cuposDisponibles}</p>
        <button type="button" className="btn btn-primary" onClick={() => setShowModal(true)}>
          Añadir Estudiante
        </button>
      </div>

      <Modal show={showModal} onHide={handleCerrarModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editandoEstudiante ? 'Editar Estudiante' : 'Añadir Estudiante'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                name="nombre"
                value={nuevoEstudiante.nombre}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="edad" className="form-label">Edad</label>
              <input
                type="number"
                className="form-control"
                id="edad"
                name="edad"
                value={nuevoEstudiante.edad}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={nuevoEstudiante.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="telefono" className="form-label">Teléfono</label>
              <input
                type="text"
                className="form-control"
                id="telefono"
                name="telefono"
                value={nuevoEstudiante.telefono}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="id_materia" className="form-label">Materia</label>
              <select
                className="form-control"
                id="id_materia"
                name="id_materia"
                value={nuevoEstudiante.id_materia || ''}
                onChange={handleChange}
                required
              >
                <option value="">Seleccionar Materia</option>
                {materias.map(materia => (
                  <option key={materia.id} value={materia.id}>
                    {materia.nombre}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCerrarModal}>Cerrar</Button>
          <Button variant="primary" onClick={handleGuardarEstudiante}>
            {editandoEstudiante ? 'Guardar Cambios' : 'Guardar'}
          </Button>
        </Modal.Footer>
      </Modal>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nombre</th>
            <th scope="col">Edad</th>
            <th scope="col">Email</th>
            <th scope="col">Teléfono</th>
            <th scope="col">Materia</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
        {estudiantes.map(estudiante => (
          <tr key={estudiante.id}>
            <th scope="row">{estudiante.id}</th>
            <td>{estudiante.nombre}</td>
            <td>{estudiante.edad}</td>
            <td>{estudiante.email}</td>
            <td>{estudiante.telefono}</td>
            <td>{obtenerNombreMateria(estudiante.id_materia)}</td>
            <td>
              <button
                type="button"
                className="btn btn-warning"
                onClick={() => handleEditarEstudiante(estudiante)}
              >
                Editar
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleEliminarEstudiante(estudiante.id)}
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
      </table>
    </div>
  );
};

export default Estudiante;
