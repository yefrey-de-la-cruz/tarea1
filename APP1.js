
// ======================
// DATOS
// ======================
const API = "http://192.168.1.56:3000/estudiantes";
let estudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [];

let editIndex = null;

// ======================
// CURSOS
// ======================
const cursos = [
  ['PROG1','Programación 1'],
  ['TECWEB','Tecnoweb'],
  ['FISICA','Física'],
  ['ESTAD','Estadística']
];

// ======================
// LOCALSTORAGE
// ======================
function save(){
  localStorage.setItem("estudiantes", JSON.stringify(estudiantes));
}

// ======================
// LOG
// ======================
function log(msg){
  document.getElementById("terminal").innerHTML += msg + "<br>";
}

// ======================
// ESTADO
// ======================
function estado(nota){
  return nota >= 3 ? "Aprobado " : "Reprobado ";
}

// ======================
// TABLA
// ======================
function render(lista = estudiantes){
  const tabla = document.getElementById("tabla");
  tabla.innerHTML = "";

  lista.forEach((e,i)=>{
    tabla.innerHTML += `
      <tr>
        <td>${e.nombre}</td>
        <td>${e.curso}</td>
        <td>${e.matricula}</td>
        <td>${e.promedio}</td>
        <td>${estado(e.promedio)}</td>
        <td>
          <button onclick="editar(${i})"></button>
          <button onclick="eliminar(${i})"></button>
        </td>
      </tr>
    `;
  });

  renderCursos();
}

// ======================
// CURSOS
// ======================
function renderCursos(){
  const div = document.getElementById("cursos");
  div.innerHTML = "";

  cursos.forEach(c=>{
    const count = estudiantes.filter(e=>e.curso===c[0]).length;
    div.innerHTML += `<p> ${c[1]} → ${count}</p>`;
  });
}

// ======================
// AGREGAR / EDITAR
// ======================
function guardarEstudiante(){
  try{
    const nombre = document.getElementById("nombre").value.trim();
    const curso = document.getElementById("curso").value;
    const matricula = Number(document.getElementById("matricula").value);
    const promedio = Number(document.getElementById("promedio").value);

    if(!nombre || promedio < 0 || promedio > 5){
      throw new Error("Datos inválidos");
    }

    const data = {nombre,curso,matricula,promedio};

    if(editIndex !== null){
      estudiantes[editIndex] = data;
      editIndex = null;
      log(" Editado");
    } else {
      estudiantes.push(data);
      log(" Agregado");
    }

    save();
    render();

  }catch(err){
    log(" " + err.message);
  }
}

// ======================
// ELIMINAR
// ======================
function eliminar(i){
  estudiantes.splice(i,1);
  save();
  render();
  log("Eliminado");
}

// ======================
// EDITAR
// ======================
function editar(i){
  const e = estudiantes[i];

  document.getElementById("nombre").value = e.nombre;
  document.getElementById("curso").value = e.curso;
  document.getElementById("matricula").value = e.matricula;
  document.getElementById("promedio").value = e.promedio;

  editIndex = i;
  log("✏️ Editando...");
}

// ======================
// BUSCAR
// ======================
function buscar(){
  const txt = document.getElementById("busqueda").value.toLowerCase();

  const filtrados = estudiantes.filter(e =>
    e.nombre.toLowerCase().includes(txt)
  );

  render(filtrados);
}

// ======================
// INIT
// ======================
window.onload = () => render();
