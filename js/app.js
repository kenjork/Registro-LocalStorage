//Variables

const listaAlumnos = document.getElementById('lista-alumnos');


//Event Listeners

eventlistener();

function eventlistener(){
    
    // Función de añadir Alumno
    document.querySelector('#formulario').addEventListener('submit', agregarAlumno);
    // Funcion de Borrar Alumno
    listaAlumnos.addEventListener('click', borrarAlumno);
    //Contenido Gargado;
    document.addEventListener('DOMContentLoaded', localStorageListo);

}


// Funciones

    //Añadir Alumno
function agregarAlumno(e){
    e.preventDefault();
    
    //Obtener el Valor
    const dni = document.getElementById('dni').value;
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const grado = document.getElementById('grado').value;
    
    const tr = document.createElement('tr');

    listaAlumnos.appendChild(tr);
    
    var alumno = [dni,nombre,apellido,grado];
    //Crear Elemento y añadir a una lista

    for(i=0; i<alumno.length; i++){
        const td = document.createElement('td');
        tr.appendChild(td);
        console.log(i);
        td.innerText = alumno[i];
    }

    
    const td = document.createElement('td');
    tr.appendChild(td);
    td.innerHTML= '<button type="button" class="btn btn-danger float-right" id="borrar">Eliminar</button>';

    //Añadir por Local Storage
    agregarAlumnoLocalStorage(dni,nombre,apellido,grado);
  
}


//Eliminar el alumno del DOM
function borrarAlumno(e){
    e.preventDefault();
    if(e.target.classList.contains('btn')){
        console.log("Borrado");
        //console.log();
        borrarTextLocalStorage(e.target.parentElement.parentElement.innerText);
        e.target.parentElement.parentElement.remove();
        //console.log(e.target.parentElement.parentElement.innerText);
    }else{
        console.log("no Eliminar");
    }
}

//Mostrar Datos de Local Storage en la Lista
function localStorageListo(){

    let alumnos
    alumnos = obtenerAlumnoLocalStorage();
    
    //console.log(alumnos);
    for (const x in alumnos) {

        const tr = document.createElement('tr');
        listaAlumnos.appendChild(tr);

        var alumnoS = [alumnos[x].dni,alumnos[x].nombre,alumnos[x].apellido,alumnos[x].grado];

        for(i=0; i<alumnoS.length; i++){
            
            const td = document.createElement('td');
            tr.appendChild(td);
            td.innerText = alumnoS[i];
        }

        const td = document.createElement('td');
        tr.appendChild(td);
        td.innerHTML= '<button type="button" class="btn btn-danger float-right" id="borrar">Eliminar</button>';
    }

}

//Agregar Alumno Local Storage
function agregarAlumnoLocalStorage(dni,nombre,apellido,grado){

    var alumnos;
    var alumno = {'dni': dni, 'nombre': nombre, 'apellido': apellido, 'grado': grado};

    alumnos = obtenerAlumnoLocalStorage();
    alumnos.push(alumno);

    localStorage.setItem('alumnos', JSON.stringify(alumnos));
}


//Comprobar que haya elemento en LocalStorage
function obtenerAlumnoLocalStorage(){
    let alumnos;

    if(localStorage.getItem('alumnos') === null){

        alumnos = [];

    }else{
        alumnos = JSON.parse(localStorage.getItem('alumnos'));
    }
    return alumnos;
}

//Borrar Local
function borrarTextLocalStorage(alumno){

    let alumnos, alumnoBorrar;
    
    alumnos = obtenerAlumnoLocalStorage();
    console.log(alumnos);


    alumnoBorrar = alumno.substring(0, alumno.length - 8);
    var alumnoBorrarArray = alumnoBorrar.split("	");

    for (const x in alumnos) {
        if (alumnos[x].dni === alumnoBorrarArray[0]){
            alumnos.splice(x,1);
            console.log('ok');
        }
    }

    localStorage.setItem('alumnos', JSON.stringify(alumnos));
    console.log(alumnoBorrarArray);
};