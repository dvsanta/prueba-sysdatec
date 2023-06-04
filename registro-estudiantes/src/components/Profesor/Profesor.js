import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import './Profesor.css';
import { Modal, Button } from 'react-bootstrap';

const Profesor = () => {
  const [profesores, setProfesores] = useState([]);
  const [nuevoProfesor, setNuevoProfesor] = useState({
    nombre: '',
    especialidad: ''
  });
  const [editandoProfesor, setEditandoProfesor] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    obtenerProfesores();
  }, []);

  const obtenerProfesores = () => {
    axios.get('http://localhost:3001/profesores')
      .then(response => {
        setProfesores(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleEliminarProfesor = id => {
    axios.delete(`http://localhost:3001/profesores/${id}`)
      .then(response => {
        const updatedProfesores = profesores.filter(profesor => profesor.id !== id);
        setProfesores(updatedProfesores);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleGuardarProfesor = () => {
    if (editandoProfesor) {
      // Editar profesor existente
      axios.put(`http://localhost:3001/profesores/${editandoProfesor.id}`, nuevoProfesor)
        .then(response => {
          console.log('Profesor actualizado exitosamente', response.data);
          const updatedProfesores = profesores.map(profesor => {
            if (profesor.id === editandoProfesor.id) {
              return response.data;
            }
            return profesor;
          });
          setProfesores(updatedProfesores);
          setNuevoProfesor({
            nombre: '',
            especialidad: ''
          });
          setShowModal(false);
          setEditandoProfesor(null);
          window.location.reload();
        })
        .catch(error => {
          console.error('Error al actualizar el profesor', error);
        });
    } else {
      // Crear nuevo profesor
      axios.post('http://localhost:3001/profesores', nuevoProfesor)
        .then(response => {
          console.log('Profesor creado exitosamente', response.data);
          setProfesores(prevProfesores => [...prevProfesores, response.data]);
          setNuevoProfesor({
            nombre: '',
            especialidad: ''
          });
          setShowModal(false);
          window.location.reload();
        })
        .catch(error => {
          console.error('Error al crear el profesor', error);
        });
    }
  };

  const handleEditarProfesor = profesor => {
    setNuevoProfesor(profesor);
    setEditandoProfesor(profesor);
    setShowModal(true);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setNuevoProfesor(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCerrarModal = () => {
    setNuevoProfesor({
      nombre: '',
      especialidad: ''
    });
    setShowModal(false);
    setEditandoProfesor(null);
    window.location.reload();
  };

  return (
    <div className="ListaDeProfesores">
      <div className="d-flex justify-content-between">
        <h1>Listado de Profesores</h1>
        <button type="button" className="btn btn-primary" onClick={() => setShowModal(true)}>
          Añadir Profesor
        </button>
      </div>

      <Modal show={showModal} onHide={handleCerrarModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editandoProfesor ? 'Editar Profesor' : 'Añadir Profesor'}</Modal.Title>
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
                value={nuevoProfesor.nombre}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="especialidad" className="form-label">Especialidad</label>
              <input
                type="text"
                className="form-control"
                id="especialidad"
                name="especialidad"
                value={nuevoProfesor.especialidad}
                onChange={handleChange}
                required
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCerrarModal}>Cerrar</Button>
          <Button variant="primary" onClick={handleGuardarProfesor}>
            {editandoProfesor ? 'Guardar Cambios' : 'Guardar'}
          </Button>
        </Modal.Footer>
      </Modal>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nombre</th>
            <th scope="col">Especialidad</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {profesores.map(profesor => (
            <tr key={profesor.id}>
              <th scope="row">{profesor.id}</th>
              <td>{profesor.nombre}</td>
              <td>{profesor.especialidad}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() => handleEditarProfesor(profesor)}
                >
                  Editar
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleEliminarProfesor(profesor.id)}
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

export default Profesor;
