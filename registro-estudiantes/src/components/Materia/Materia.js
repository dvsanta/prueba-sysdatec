import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import './Materia.css';
import { Modal, Button } from 'react-bootstrap';

const Materia = () => {
  const [materias, setMaterias] = useState([]);
  const [nuevaMateria, setNuevaMateria] = useState({
    nombre: '',
    id_profesor: null
  });
  const [editandoMateria, setEditandoMateria] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [profesores, setProfesores] = useState([]);

  useEffect(() => {
    obtenerMaterias();
    obtenerProfesores();
  }, []);

  const obtenerMaterias = () => {
    axios.get('http://localhost:3001/materias')
      .then(response => {
        setMaterias(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const obtenerProfesores = () => {
    axios.get('http://localhost:3001/profesores')
      .then(response => {
        setProfesores(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleEliminarMateria = id => {
    axios.delete(`http://localhost:3001/materias/${id}`)
      .then(response => {
        const updatedMaterias = materias.filter(materia => materia.id !== id);
        setMaterias(updatedMaterias);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleGuardarMateria = () => {
    if (editandoMateria) {
      // Editar materia existente
      axios.put(`http://localhost:3001/materias/${editandoMateria.id}`, nuevaMateria)
        .then(response => {
          console.log('Materia actualizada exitosamente', response.data);
          const updatedMaterias = materias.map(materia => {
            if (materia.id === editandoMateria.id) {
              return response.data;
            }
            return materia;
          });
          setMaterias(updatedMaterias);
          setNuevaMateria({
            nombre: '',
            id_profesor: null
          });
          setShowModal(false);
          setEditandoMateria(null);
          window.location.reload();
        })
        .catch(error => {
          console.error('Error al actualizar la materia', error);
        });
    } else {
      // Crear nueva materia
      axios.post('http://localhost:3001/materias', nuevaMateria)
        .then(response => {
          console.log('Materia creada exitosamente', response.data);
          setMaterias(prevMaterias => [...prevMaterias, response.data]);
          setNuevaMateria({
            nombre: '',
            id_profesor: null
          });
          setShowModal(false);
        })
        .catch(error => {
          console.error('Error al crear la materia', error);
        });
    }
  };

  const handleEditarMateria = materia => {
    setNuevaMateria({
      id: materia.id,
      nombre: materia.nombre,
      id_profesor: materia.id_profesor
    });
    setEditandoMateria(materia);
    setShowModal(true);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setNuevaMateria(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCerrarModal = () => {
    setNuevaMateria({
      nombre: '',
      id_profesor: null
    });
    setShowModal(false);
    setEditandoMateria(null);
  };

  // Función para obtener el nombre del profesor
  const obtenerNombreProfesor = idProfesor => {
    const profesor = profesores.find(profesor => profesor.id === idProfesor);
    return profesor ? profesor.nombre : 'N/A';
  };

  return (
    <div className="ListaDeMaterias">
      <div className="d-flex justify-content-between">
        <h1>Listado de Materias</h1>
        <button type="button" className="btn btn-primary" onClick={() => setShowModal(true)}>
          Añadir Materia
        </button>
      </div>

      <Modal show={showModal} onHide={handleCerrarModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editandoMateria ? 'Editar Materia' : 'Añadir Materia'}</Modal.Title>
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
                value={nuevaMateria.nombre}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="id_profesor" className="form-label">Profesor</label>
              <select
                className="form-control"
                id="id_profesor"
                name="id_profesor"
                value={nuevaMateria.id_profesor || ''}
                onChange={handleChange}
                required
              >
                <option value="">Seleccionar Profesor</option>
                {profesores.map(profesor => (
                  <option key={profesor.id} value={profesor.id}>
                    {profesor.nombre}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCerrarModal}>Cerrar</Button>
          <Button variant="primary" onClick={handleGuardarMateria}>
            {editandoMateria ? 'Guardar Cambios' : 'Guardar'}
          </Button>
        </Modal.Footer>
      </Modal>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nombre</th>
            <th scope="col">Profesor</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {materias.map(materia => (
            <tr key={materia.id}>
              <th scope="row">{materia.id}</th>
              <td>{materia.nombre}</td>
              <td>{obtenerNombreProfesor(materia.id_profesor)}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() => handleEditarMateria(materia)}
                >
                  Editar
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleEliminarMateria(materia.id)}
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

export default Materia;
