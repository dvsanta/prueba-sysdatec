import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Inicio.css'
class Inicio extends React.Component {
  render() {
    return (
      <div class="align-middle principal-banner">
      <div class="container text-center">
      <div class="card text-center"  id="inicio">
        <div class="card-header">
            Sysdatec
        </div>
        <div class="card-body">
            <h5 class="card-title">Prueba Técnica</h5>
            <p class="card-text">Samuel Santa</p>
        </div>

        </div>
      <div class="row">
        <div class="col">
        <div class="card">
        <div class="card-body">
            <h5 class="card-title">1. Crea un profesor</h5>
            <p class="card-text">Los profesores son la materia prima del sistema, una vez los tengas podrás asignarlos a una materia.</p>
            <a href="/profesores" class="btn btn-primary">Ir al panel de profesores</a>
        </div>
        </div>
        </div>
        <div class="col">
        <div class="card">
        <div class="card-body">
            <h5 class="card-title">2. Crea una materia</h5>
            <p class="card-text">Las materias serán asignadas a los estudiantes, estas deberán tener un profesor asociado.</p>
            <a href="/materias" class="btn btn-primary">Ir al panel de materias</a>
        </div>
        </div>
        </div>
        <div class="col">
        <div class="card">
        <div class="card-body">
            <h5 class="card-title">3. Crea un estudiante</h5>
            <p class="card-text">Finalmente podrás crear un estudiante  y asignarle una materia.</p>
            <a href="/estudiantes" class="btn btn-primary">Ir al panel de estudiantes</a>
        </div>
        </div>
        </div>
      </div>
    </div>
      </div>
    );
  }
}

export default Inicio;
