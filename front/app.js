// ============================================================================================
// lo que hace este archivo app.js      =======
// ============================================================================================

// explicacion completa de este archivo app.js es el punto de entrada principal de la aplicación frontend.
// Este archivo contiene las constantes y configuraciones necesarias para interactuar con la API del backend,
// así como las funciones de servicio y lógica de UI para manejar estudiantes, carreras y categorías.
// Este archivo se encarga de registrar estudiantes, buscar estudiantes por carrera, eliminar estudiantes,
// cargar carreras en formularios, y manejar la visualización de detalles de estudiantes.
// tambien de los crud de carreras y categorias.
// Este archivo utiliza la API del backend para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar)
// y maneja la interacción con el usuario a través de formularios y tablas.
// ============================================================================================

// Estas líneas definen las constantes y configuraciones necesarias para interactuar con la API del backend.
// Estas constantes incluyen las URLs de los servicios de estudiantes, carreras y categorías,
// una clave de API para autenticación y los encabezados comunes que se utilizarán en las peticiones HTTP.
// =====================================================================


const API_STUDENT_URL = "http://localhost:5001/api/students";
const API_CAREERS_URL = 'http://localhost:5001/api/careers'
const API_CATEGORIES_URL = 'http://localhost:5001/api/categories'
// =====================================================================
const API_KEY = "12345ABCDEF";
// =====================================================================
// Headers comunes para todas las peticiones
const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${API_KEY}`
};
// =====================================================================


// =====================================================================
//             Funciones de Servicio (Frontend -> Backend) para Estudiantes
// =====================================================================


// =====================================================================
// =====================================================================
// =====      breve explicacion de lo que hace esta funcion      =======

//explicacion completa de  registerStudentService(name, career) hece que se registre un estudiante
// en el backend. La función realiza una petición al servicio para registrar el estudiante.
// Si la petición es exitosa, obtiene la respuesta del backend y la devuelve.
// En caso contrario, lanza un error.
//el metodo post hace una peticion al backend para registrar un estudiante.
//que hace post a la url de estudiantes.
//que envia un json con el nombre y la carrera del estudiante.
//que devuelve un json con el estudiante creado.
//
// =======================================================================================================================================
/**
 * Registra un nuevo estudiante en el backend.
 * @param {string} name - Nombre del estudiante.
 * @param {string} career - Carrera del estudiante.
 * @returns {Promise<object>} - Promesa con la respuesta del backend.
 */
//SERVICIOS
async function registerStudentService(name, career) {
    const response = await fetch(API_STUDENT_URL, {
        method: "POST",
        headers,
        body: JSON.stringify({ name, career })
    });
    return response.json();
}

// =======================================================================================================================================
// =====================================================================
// =====      breve explicacion de lo que hace esta funcion      =======

//explicacion completa de  getStudentByIdService(id) hece que se busque un estudiante
// por su ID en el backend. La función realiza una petición al servicio para buscar el estudiante.
// Si la petición es exitosa, obtiene la información del estudiante y lo devuelve.
// En caso contrario, lanza un error.
//el metodo get hace una peticion al backend para obtener un estudiante por su id.
//que hace get a la url de estudiantes.
//que envia un json con el id del estudiante.
//que devuelve un json con la informacion del estudiante encontrado.
// =====================================================================
// =======================================================================================================================================
/**
 * Busca un estudiante por su ID en el backend.
 * @param {number} id - ID del estudiante.
 * @returns {Promise<object>} - Promesa con la información del estudiante.
 */
//SERVICIOS
async function getStudentByIdService(id) {
    const response = await fetch(`${API_STUDENT_URL}/${id}`, {
        method: "GET",
        headers
    });
    return response.json();
}

// =======================================================================================================================================
// =====================================================================
// =====      breve explicacion de lo que hace esta funcion      =======

//explicacion completa de  getStudentsByCareerService(career) hece que se busque un estudiante
// por su carrera en el backend. La función realiza una petición al servicio para buscar el estudiante.
// Si la petición es exitosa, obtiene la información del estudiante y lo muestra en la consola.
// En caso contrario, muestra un mensaje de error en la consola.
//el metodo get hace una peticion al backend para obtener los estudiantes filtrados por carrera.
// que hace get a la url de estudiantes.
// que envia un json con el nombre de la carrera.
// que devuelve un json con la lista de estudiantes filtrados por carrera.
// =======================================================================================================================================
/**
 * Busca estudiantes filtrados por carrera en el backend.
 * @param {string} career - Nombre de la carrera para filtrar.
 * @returns {Promise<Array<object>>} - Promesa con la lista de estudiantes.
 */
//SERVICIOS
async function getStudentsByCareerService(career) {
    const response = await fetch(`${API_STUDENT_URL}?career=${encodeURIComponent(career)}`, {
        method: "GET",
        headers
    });
    return response.json();
}

// =====================================================================
// =======================================================================================================================================

// =====================================================================
// =====      breve explicacion de lo que hace esta funcion      =======

//explicacion completa de  deleteStudentService(id) hece que se elimine un estudiante
// por su ID en el backend. La función realiza una petición al servicio para eliminar el estudiante.
// Si la petición es exitosa, obtiene el mensaje de confirmación y lo muestra en la consola.
// En caso contrario, muestra un mensaje de error en la consola.
//el metodo delete hace una peticion al backend para eliminar un estudiante por su id.
// que hace delete a la url de estudiantes.
// que envia un json con el id del estudiante.
// que devuelve un json con el mensaje de confirmación de la eliminación del estudiante.
// =======================================================================================================================================
/**
 * Elimina un estudiante por su ID en el backend.
 * @param {number} id - ID del estudiante a eliminar.
 * @returns {Promise<object>} - Promesa con el mensaje de confirmación.
 */
//SERVICIOS
async function deleteStudentService(id) {
    const response = await fetch(`${API_STUDENT_URL}/${id}`, {
        method: "DELETE",
        headers
    });
    return response.json();
}


// ============================================================================================================================
//                   Funciones de Lógica de UI para Estudiantes
// ============================================================================================================================

// =====       explicacion de lo que hace esta funcion      =======

// La función registerStudent() se encarga de registrar nuevos estudiantes 
// a través de un formulario, donde primero valida que todos los campos 
// obligatorios estén completos. Cuando la información es correcta, envía los datos al 
// sistema(registerStudentService); si todo sale bien, notifica al usuario del registro exitoso, 
// limpia automáticamente los campos y refresca la lista de estudiantes. 
// Si ocurre algún problema, muestra un mensaje de error.
// Para que el formulario funcione correctamente, loadCareersForStudentForm carga 
// previamente todas las carreras disponibles desde el servidor, asegurando que 
// las opciones estén actualizadas al momento de registrar.
// =======================================================================================================================================
//Maneja el registro de un nuevo estudiante a través del formulario.

async function registerStudent() {
    // Obtiene los valores de los campos del formulario
    const name = document.getElementById('name').value.trim();
    const dni = document.getElementById('dni').value.trim();
    const age = document.getElementById('age').value.trim();
    const career = document.getElementById('career').value.trim();
    // Log de los datos a registrar
    console.log("UI: Datos a registrar estudiante:", { name, dni, age, career });
    // Verifica que el formulario tenga los campos necesarios
    // Validación de campos obligatorios
    if (!name || !dni || !age || !career) {
        console.warn("UI: Validación fallida. Faltan campos obligatorios.");
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Por favor complete todos los campos obligatorios"
        });
        return;
    }
    try {
        const result = await registerStudentService(name, career); // Utiliza el servicio
        console.log("UI: Respuesta del backend al registrar estudiante:", result);
        // Verifica si hay un error en la respuesta del backend
        if (result.error) {
            console.error("UI: Error recibido del backend:", result.error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: result.error
            });
            return;
        }
        // Muestra un mensaje de éxito con los detalles del estudiante registrado
        Swal.fire({
            icon: "success",
            title: "¡Registro exitoso!",
            html: `
                <strong>ID:</strong> ${result.student.id}<br>
                <strong>Nombre:</strong> ${result.student.name}<br>
                <strong>Carrera:</strong> ${result.student.career}
            `
        }).then(() => {
            loadStudentsTable(); // Recarga la tabla después de un registro exitoso
        });
        // Log de éxito del registro
        // Limpia los campos del formulario
        document.getElementById('name').value = '';
        document.getElementById('dni').value = '';
        document.getElementById('age').value = '';
        document.getElementById('career').value = '';
        // Resetea el formulario
        console.log("UI: Formulario de estudiante reseteado tras registro exitoso.");
    } catch (error) {
        console.error("UI: Error al registrar estudiante:", error);
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudo registrar el estudiante."
        });
    }
}

// =======================================================================================================================================

// =====      breve explicacion de lo que hace esta funcion      =======

//explicacion completa de  loadCareersForStudentForm() carga las carreras disponibles desde el backend
// y las muestra en el select del formulario de registro de estudiantes.
// La función realiza una petición al servicio getAllCareersService() para obtener todas las carreras.
// Si la petición es exitosa, obtiene las carreras y las muestra en el select. Si hay un error,
//  muestra un mensaje de error.
// La función también maneja casos donde el select no existe en el DOM o no hay carreras disponibles.
// La función se utiliza para llenar el select de carreras en el formulario de registro de estudiantes. 
// =======================================================================================================================================
// Carga las carreras desde el backend y las muestra en el select del 
// formulario de registro de estudiantes (id="career").

async function loadCareersForStudentForm() {
    console.log("UI: Iniciando carga de carreras para el select del formulario de estudiantes...");
    try {
        const careers = await getAllCareersService(); // Asume que getAllCareersService() existe y funciona
        console.log("UI: Carreras recibidas para el formulario de estudiantes:", careers);
        // Verifica que el select exista en el DOM
        const select = document.getElementById('career');
        if (!select) {
            console.error("UI: No se encontró el select 'career' en el DOM.");
            return;
        }
        // Limpia el select antes de agregar nuevas opciones
        select.innerHTML = '<option value="">Seleccione una carrera</option>'; // Opción por defecto
        // Verifica que las carreras sean un array y tenga elementos
        if (!Array.isArray(careers) || careers.length === 0) {
            console.warn("UI: No hay carreras para cargar en el select del formulario de estudiantes.");
            return;
        }
        // Agrega las opciones al select
        careers.forEach(career => {
            const option = document.createElement('option');
            option.value = career.name;
            option.textContent = career.name;
            select.appendChild(option);
        });
        // Log de éxito
        console.log(`UI: Se cargaron ${careers.length} carreras en el select del formulario de estudiantes.`);
    } catch (error) {
        console.error("UI: Error al cargar carreras en el select del formulario de estudiantes:", error);
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudieron cargar las carreras para el formulario de estudiante."
        });
    }
}

// =======================================================================================================================================

// =====      breve explicacion de lo que hace esta funcion      =======

//explicacion completa de loadCareersForSearchSelect() carga las carreras disponibles desde el backend
// y las muestra en el select de búsqueda de estudiantes por carrera.
// La función realiza una petición al servicio getAllCareersService() para obtener todas las carreras.
// Si la petición es exitosa, obtiene las carreras y las muestra en el select. Si hay un error,
//  muestra un mensaje de error.
// La función tambien se utiliza para llenar el select de carreras en la seccion de busqueda de estudiantes.
// =======================================================================================================================================
//Carga las carreras desde el backend y las muestra en el 
//select de búsqueda de estudiantes por carrera (id="searchCareer").

async function loadCareersForSearchSelect() {
    console.log("UI: Iniciando carga de carreras para el select de búsqueda de estudiantes...");
    try {
        const careers = await getAllCareersService(); // Asume que getAllCareersService() existe y funciona
        console.log("UI: Carreras recibidas para el select de búsqueda:", careers);
        // Verifica que el select exista en el DOM
        const select = document.getElementById('searchCareer');
        if (!select) {
            console.error("UI: No se encontró el select 'searchCareer' en el DOM.");
            return;
        }
        // Limpia el select antes de agregar nuevas opciones
        select.innerHTML = '<option value="">Seleccione una carrera</option>'; // Opción por defecto
        // Verifica que las carreras sean un array y tenga elementos
        if (!Array.isArray(careers) || careers.length === 0) {
            console.warn("UI: No hay carreras para cargar en el select de búsqueda.");
            return;
        }
        // Agrega las opciones al select
        careers.forEach(career => {
            const option = document.createElement('option');
            option.value = career.name;
            option.textContent = career.name;
            select.appendChild(option);
        });
        // Log de éxito
        console.log(`UI: Se cargaron ${careers.length} carreras en el select de búsqueda.`);
    } catch (error) {
        console.error("UI: Error al cargar carreras en el select de búsqueda:", error);
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudieron cargar las carreras para la búsqueda."
        });
    }
}

// =======================================================================================================================================

// =====      breve explicacion de lo que hace esta funcion      =======

// explicacion completa de searchStudentsByCareer busca estudiantes por carrera y los 
// muestra en la tabla principal.
// La función recibe el nombre de una carrera, realiza una petición al 
// servicio getStudentsByCareerService() para obtener los estudiantes asociados a esa 
// carrera. Si la petición es exitosa, obtiene los estudiantes y los muestra en la 
// tabla principal. Si hay un error, muestra un mensaje de error.
// La función tambien se utiliza para buscar estudiantes por carrera en la seccion de 
// busqueda de estudiantes.

// =======================================================================================================================================
//Busca estudiantes por carrera y los muestra en la tabla principal.
/**
 * Busca estudiantes por carrera y los muestra en la tabla principal.
 * @param {string} career - El nombre de la carrera a buscar.
 */

async function searchStudentsByCareer(career) {
    console.log("UI: Buscando estudiantes por carrera:", career);
    const searchSelect = document.getElementById('searchCareer'); // Captura el select de búsqueda
    // Verifica que el select exista 
    try {
        const students = await getStudentsByCareerService(career);
        console.log("UI: Estudiantes filtrados recibidos del backend:", students);
        // Verifica que el tbody exista en el DOM
        const tbody = document.getElementById('studentsTableBody');
        if (!tbody) {
            console.error("UI: No se encontró el elemento 'studentsTableBody' en el DOM.");
            return;
        }
        // Limpia el contenido actual del tbody
        tbody.innerHTML = '';
        // Verifica que los estudiantes sean un array y tenga elementos
        if (!Array.isArray(students) || students.length === 0) {
            console.warn("UI: No hay estudiantes para la carrera seleccionada.");
            tbody.innerHTML = `<tr><td colspan="4" class="text-center text-muted">No hay estudiantes para esa carrera</td></tr>`;
            return;
        }
        // Agrega los estudiantes filtrados a la tabla
        students.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.career}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="deleteStudent(${student.id})">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });
        // Inicializa DataTable con los nuevos datos
        console.log(`UI: Se cargaron ${students.length} estudiantes filtrados en la tabla.`);
    } catch (error) {
        console.error("UI: Error al buscar estudiantes por carrera:", error);
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudieron buscar los estudiantes por carrera"
        });
    } finally {
        // Limpia el select de búsqueda en cualquier caso
        if (searchSelect) searchSelect.value = '';
        console.log("UI: Campo de búsqueda de carrera reseteado");
    }
}

// =============================================================================================================================================

// =====      breve explicacion de lo que hace esta funcion      =======

// explicacion completa de getStudentById(id) busca un estudiante por ID y muestra
// el resultado en el bloque de detalles.
// La función recibe el ID del estudiante a buscar, realiza una petición al 
// servicio getStudentByIdService(id) para obtener el estudiante correspondiente. 
// Si la petición es exitosa, obtiene el estudiante y lo muestra en el bloque de 
// detalles. Si hay un error, muestra un mensaje de error.
// La función también limpia el bloque de detalles en cualquier caso.   


// ==================================================================================================================

/**
 * Busca un estudiante por ID y muestra el resultado en el bloque de detalles.
 * @param {number} id - ID del estudiante a buscar.
 */

async function getStudentById(id) {
    try {
        console.log("UI: Buscando estudiante por ID:", id);
        const student = await getStudentByIdService(id); // Utiliza el servicio
        console.log("UI: Respuesta del backend al buscar estudiante por ID:", student);
        // Verifica que el bloque de detalles y sus elementos existan en el DOM
        const detailsDiv = document.getElementById('studentDetails');
        const detailId = document.getElementById('detailId');
        const detailName = document.getElementById('detailName');
        const detailCareer = document.getElementById('detailCareer');
        const detailCategory = document.getElementById('detailCategory'); // Asume que la categoría puede venir en el objeto estudiante
        // Verifica que los elementos existan
        if (student.error) {
            detailsDiv.classList.add('d-none');
            Swal.fire({
                icon: "error",
                title: "No encontrado",
                text: student.error
            });
            return;
        }
        // Muestra los datos en el bloque de detalles
        detailId.textContent = student.id;
        detailName.textContent = student.name;
        detailCareer.textContent = student.career;
        detailCategory.textContent = student.category || "-"; // Maneja si no existe la categoría
        detailsDiv.classList.remove('d-none');
    } catch (error) {
        console.error("UI: Error al buscar estudiante por ID:", error);
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudo buscar el estudiante."
        });
    }
}

// ==================================================================================================================

// =====      breve explicacion de lo que hace esta funcion      =======

// explicacion completa de loadStudentsTable() carga todos los estudiantes y los muestra en la tabla principal.
// La función realiza una petición al servicio getAllStudentsService() para obtener todos los estudiantes.
// Si la petición es exitosa, obtiene la lista de estudiantes y los muestra en la tabla principal.
// Si hay un error, muestra un mensaje de error.
// La función también destruye el DataTable existente antes de cargar los nuevos datos.
// La función se utiliza para cargar los estudiantes en la tabla principal.
// La función también maneja el caso en que no hay estudiantes registrados, mostrando un mensaje adecuado.


// ==================================================================================================================


//Carga todos los estudiantes y los muestra en la tabla principal.

async function loadStudentsTable() {
    console.log("UI: Iniciando carga de estudiantes...");
    
    // 1. Destruye DataTable SI EXISTE
    const table = $('#studentsTable').DataTable();
    if (table) {
        table.destroy();
        console.log("DataTable destruido exitosamente");
    }
    // Verifica que el tbody exista en el DOM
    try {
        // 2. Obtiene datos
        const response = await fetch(API_STUDENT_URL, {
            method: "GET",
            headers
        });
        // Verifica si la respuesta es exitosa
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        // Verifica que la respuesta sea un JSON válido
        const students = await response.json();
        const tbody = document.getElementById('studentsTableBody');
        // Verifica que el tbody exista en el DOM
        if (!tbody) {
            console.error("Error: studentsTableBody no encontrado");
            return;
        }
        // Verifica que los estudiantes sean un array y tenga elementos
        // 3. Limpia y reconstruye la tabla
        tbody.innerHTML = '';
        
        if (!students?.length) {
            tbody.innerHTML = `<tr><td colspan="4" class="text-center">No hay datos</td></tr>`;
            return;
        }
        // Agrega los estudiantes a la tabla
        students.slice(-10).reverse().forEach(student => {
            tbody.innerHTML += `
                <tr>
                    <td>${student.id}</td>
                    <td>${student.name}</td>
                    <td>${student.career}</td>
                    <td>
                        <button class="btn btn-sm btn-danger" onclick="deleteStudent(${student.id})">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </td>
                </tr>
            `;
        });
        // Verifica que el tbody se haya actualizado correctamente
        // 4. Inicializa DataTable CON RETRASO mínimo
        setTimeout(() => {
            $('#studentsTable').DataTable({
                language: { url: '//cdn.datatables.net/plug-ins/1.13.7/i18n/es-ES.json' },
                lengthMenu: [ [5, 10, 25, 50, -1], [5, 10, 25, 50, "Todos"] ],
                pageLength: 5,
                destroy: true // Doble seguridad
            });
            console.log("DataTable recreado exitosamente");
        }, 100);
        // Log de éxito
    } catch (error) {
        console.error("Error cargando estudiantes:", error);
        Swal.fire("Error", `No se pudieron cargar los datos: ${error.message}`, "error");
    }
}

// ==================================================================================================================

// =====      breve explicacion de lo que hace esta funcion      =======

// explicacion completa de deleteStudent(studentId) elimina un estudiante con el ID proporcionado.
// La función realiza una petición al servicio deleteStudentService(studentId) para eliminar el estudiante.
// Si la petición es exitosa, muestra un mensaje de confirmación y recarga la tabla de estudiantes.
// Si hay un error, muestra un mensaje de error.
// La función se utiliza para manejar la eliminación de un estudiante.

// ==================================================================================================================

/**
 * Maneja la eliminación de un estudiante tras confirmación del usuario.
 * @param {number} studentId - ID del estudiante a eliminar.
 */

async function deleteStudent(studentId) {
    const confirm = await Swal.fire({
        title: '¿Estás seguro?',
        text: "Esta acción eliminará el estudiante de forma permanente.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    });
    // Verifica si el usuario confirmó la eliminación
    if (confirm.isConfirmed) {
        try {
            const result = await deleteStudentService(studentId); // Utiliza el servicio
            if (result.error) {
                throw new Error(result.error);
            }
            Swal.fire({
                icon: "success",
                title: "Eliminado",
                text: "El estudiante fue eliminado correctamente."
            });
            loadStudentsTable(); // Recargar la tabla para reflejar el cambio
        } catch (error) {
            console.error("UI: Error al eliminar estudiante:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: `No se pudo eliminar el estudiante. ${error.message || ''}`
            });
        }
    }
}
// =========================================================================================

// =====      breve explicacion de lo que hace esta funcion      =======

// explicacion completa de clearStudentDetailsBtn() limpia el bloque de detalles
// y el campo de búsqueda de ID en cualquier caso.
// La función se utiliza para limpiar el bloque de detalles del estudiante y el campo de búsqueda de ID.
// La función elimina la clase 'd-none' del bloque de detalles, limpia los textos de los elementos
// en el bloque de detalles y limpia el campo de búsqueda de ID.
// La función también se utiliza para limpiar el bloque de detalles en la sección de búsqueda de estudiantes.
// La función se utiliza para limpiar el bloque de detalles en la sección de búsqueda de estudiantes

// ==================================================================================================================


// Listener para el botón "Limpiar" en los detalles del estudiante
const clearStudentDetailsBtn = document.getElementById('clearStudentDetails');
if (clearStudentDetailsBtn) {
    clearStudentDetailsBtn.addEventListener('click', function() {
        document.getElementById('studentDetails').classList.add('d-none');
        document.getElementById('detailId').textContent = '';
        document.getElementById('detailName').textContent = '';
        document.getElementById('detailCareer').textContent = '';
        document.getElementById('detailCategory').textContent = '';
        document.getElementById('searchStudentId').value = ''; // Limpia el campo de búsqueda de ID
    });
}
// ===================================================================================================================================================
// ===================================================================================================================================================




// =========================================================================================
// ============================================================================================
// ===========================================================================================
// ===========================SERVICIO PARA CARRERAS===============================


// =====      breve explicacion de lo que hace esta funcion      =======

// explicacion completa de registerCareerService(careerData) registra una nueva carrera con los 
// datos proporcionados.
// La función realiza una petición al servicio API_CAREERS_URL para registrar la carrera.
// Si la petición es exitosa, obtiene la respuesta y la devuelve.
// Si hay un error, muestra un mensaje de error.
// La función se utiliza para registrar una nueva carrera en el backend.
// el metodo post hace una petición al backend para registrar una carrera.
// que hace post a la url de carreras.y devuelve la respuesta del backend.

// ==================================================================================================================


//SERVICIOS
//REGISTRO DE CARRERAS
async function registerCareerService(careerData) {
    const response = await fetch(API_CAREERS_URL, {
        method: "POST",
        headers,
        body: JSON.stringify(careerData)
    });
    return response.json();
}

// =====================================================================

// =====      breve explicacion de lo que hace esta funcion      =======

// explicacion completa de getCareerByIdService(id) obtiene una carrera por su ID.
// La función realiza una petición al servicio API_CAREERS_URL para obtener la carrera.
// Si la petición es exitosa, obtiene la respuesta y la devuelve.
// Si hay un error, muestra un mensaje de error.
// La función se utiliza para obtener una carrera en el backend.
// el metodo get hace una petición al backend para obtener una carrera.
// que hace get a la url de carreras.y devuelve la respuesta del backend.

// =========================⬇️⬇️⬇️⬇️=========================================
//SERVICIOS
// Obtiene una carrera por su ID
async function getCareerByIdService(id) {
    const response = await fetch(`${API_CAREERS_URL}/${id}`, {
        method: "GET",
        headers
    });
    return response.json();
}

// =====================================================================

// =====      breve explicacion de lo que hace esta funcion      =======

// explicacion completa de getAllCareersService() obtiene todas las carreras.
// La función realiza una petición al servicio API_CAREERS_URL para obtener todas las carreras.
// Si la petición es exitosa, obtiene la respuesta y la devuelve.   
// Si hay un error, muestra un mensaje de error.
// La función se utiliza para obtener todas las carreras en el backend.
// el metodo get hace una petición al backend para obtener todas las carreras.
// que hace get a la url de carreras.y devuelve la respuesta del backend.

// =======================⬇️⬇️⬇️⬇️===============================================

//SERVICIOS
// Obtiene todas las carreras
async function getAllCareersService() {
    const response = await fetch(API_CAREERS_URL, {
        method: "GET",
        headers
    });
    return response.json();
}

// =====================================================================

// =====      breve explicacion de lo que hace esta funcion      =======

// explicacion completa de deleteCareerService(id) elimina una carrera por su ID.
// La función realiza una petición al servicio API_CAREERS_URL para eliminar la carrera.
// Si la petición es exitosa, obtiene la respuesta y la devuelve.
// Si hay un error, muestra un mensaje de error.
// La función se utiliza para eliminar una carrera en el backend.
// el metodo delete hace una petición al backend para eliminar una carrera.
// que hace delete a la url de carreras.y devuelve la respuesta del backend.

// =======================⬇️⬇️⬇️⬇️===============================================


//SERVICIOS
// Elimina una carrera por su ID
async function deleteCareerService(id) {
    const response = await fetch(`${API_CAREERS_URL}/${id}`, {
        method: "DELETE",
        headers
    });
    return response.json();
}

// =====================================================================

// =====      breve explicacion de lo que hace esta funcion      =======

// explicacion completa de updateCareerService(id, careerData) actualiza una carrera por su ID.
// La función realiza una petición al servicio API_CAREERS_URL para actualizar la carrera.
// Si la petición es exitosa, obtiene la respuesta y la devuelve.
// Si hay un error, muestra un mensaje de error.
// La función se utiliza para actualizar una carrera en el backend.
// el metodo put hace una petición al backend para actualizar una carrera.
// que hace put a la url de carreras.y devuelve la respuesta del backend.

// =========================⬇️⬇️⬇️⬇️============================================

//SERVICIOS
// Actualiza una carrera por su ID
async function updateCareerService(id, careerData) {
    const response = await fetch(`${API_CAREERS_URL}/${id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(careerData)
    });
    if (!response.ok) {
        const text = await response.text();
        throw new Error(`(${response.status}) ${text}`);
    }
    return response.json();
}

// =================================================================================================
// ===============================================================================================



// ===========================================================================================
// ==========================CRUD PARA CARRERAS (FUNCIONES)==================================




// =====      breve explicacion de lo que hace esta funcion      =======

// explicacion completa de registerCareer() registra una carrera.
// obtiene los datos del formulario y los envia al backend.
// si la petición es exitosa, muestra un mensaje de éxito.
// si hay un error, muestra un mensaje de error.
// la funcion se utiliza para registrar una nueva carrera en el backend.  
//valida los campos del formulario antes de enviar la petición al backend.
//try catch maneja los errores de la petición al backend.
//await se utiliza para esperar la respuesta del backend antes de continuar.
// =========================⬇️⬇️⬇️⬇️============================================
//REGISTRO DE CARRERAS
async function registerCareer() {
    console.log("📌 UI: Iniciando proceso de registro de carrera...");
    // Obtiene los datos del formulario
    const id = document.getElementById('careerId').value;
    const name = document.getElementById('registerName').value.trim();
    const code = document.getElementById('careerCode').value.trim();
    const duration = document.getElementById('careerDuration').value.trim();
    const category = document.getElementById('careerCategory').value;
    const modality = document.getElementById('careerModality').value;
    // Log de los datos recolectados del formulario
    console.log("📥 UI: Datos recolectados del formulario:", {
        id, name, code, duration, category, modality
    });
    // Validación
    if (!name || !duration || !category || !modality) {
        console.warn("⚠️ UI: Validación fallida. Campos faltantes:", {
            name, duration, category, modality
        });
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Completa todos los campos obligatorios.'
        });
        return;
    }
    // Datos listos para enviar
    const data = { name, code, duration, category, modality };
    console.log("📦 UI: Datos listos para enviar al backend:", data);
    // Si hay un ID, es modo edición; si no, es modo registro
    try {
        let result;
        // Determina si es modo edición o registro
        if (id) {
            console.log("🔁 UI: Modo edición. Actualizando carrera con ID:", id);
            result = await updateCareerService(id, data);
        } else {
            console.log("🆕 UI: Modo registro. Registrando nueva carrera...");
            result = await registerCareerService(data);
        }
        // Respuesta del backend
        console.log("✅ UI: Respuesta recibida del backend:", result);
        // Verifica si hay un error en la respuesta del backend
        if (result.error) {
            console.error("❌ UI: Error del backend:", result.error);
            throw new Error(result.error);
        }
        // Mensaje de éxito
        Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: id ? 'Carrera actualizada.' : 'Carrera registrada.'
        });
        // Limpieza del formulario
        console.log("🧹 UI: Limpiando formulario...");
        document.getElementById('careerForm').reset();
        document.getElementById('careerId').value = '';

        const btn = document.querySelector('#careerForm button[type="submit"]');
        btn.innerHTML = `<i class="fas fa-save me-1"></i>Registrar`;
        btn.classList.remove('btn-success');
        btn.classList.add('btn-primary');

        console.log("📄 UI: Recargando tabla de carreras...");
        await loadCareersTable();
        // Limpia el bloque de detalles si existe
    } catch (error) {
        console.error("💥 UI: Excepción durante el registro:", error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message || 'No se pudo completar la operación.'
        });
    }
}
// ==================================================================================================================
// =====      breve explicacion de lo que hace esta funcion      =======

// explicacion completa de getCareerById() obtiene una carrera por ID y muestra los detalles en el formulario.
// obtiene el ID del estudiante a buscar desde el formulario.
// verifica que el ID no este vacio.
// log del ID a buscar.
// utiliza el servicio getCareerByIdService(id) para obtener la carrera correspondiente.
// si la petición es exitosa, muestra los detalles de la carrera en el formulario.
// si hay un error, muestra un mensaje de error.
// =========================⬇️⬇️⬇️⬇️============================================
// Obtiene una carrera por ID y muestra los detalles en el formulario
async function getCareerById() {
    const id = document.getElementById('studentId').value.trim(); // Nota: 'studentId' aquí parece un error, debería ser para buscar carreras
    // Verifica que el ID no esté vacío
    if (!id) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Por favor ingrese un ID válido"
        });
        return;
    }
    try {
        const career = await getCareerByIdService(id);
        const resultContainer = document.getElementById('getResult');
        // Verifica que el contenedor de resultados exista
        if (career.error) {
            resultContainer.innerHTML = `<span class="text-danger">${career.error}</span>`;
        } else {
            resultContainer.innerHTML = `
                <div class="alert alert-info">
                    <strong>ID:</strong> ${career.id}<br>
                    <strong>Nombre:</strong> ${career.name}
                </div>
                <button id="clearSearchBtn" type="button" class="btn btn-secondary mt-2">Limpiar</button>
            `;
            document.getElementById('clearSearchBtn').onclick = () => {
                document.getElementById('studentId').value = '';
                resultContainer.innerHTML = '';
            };
        }
    } catch (error) {
        console.error("Error al buscar carrera:", error);
        document.getElementById('getResult').textContent = "Error al buscar carrera";
    }
}

// ==================================================================================================================

// =====      breve explicacion de lo que hace esta funcion      =======

// explicacion completa de loadCategoriesSelect() carga las categorías disponibles en el 
// select del formulario de carreras.
// La función realiza una petición al servicio getAllCategoriesService() para obtener todas las categorías.
// Si la petición es exitosa, obtiene las categorías y las muestra en el select. Si hay un error,
// muestra el mensaje de error en el contenedor de resultados.
// La función también maneja el caso en que el select no existe en el DOM.
// La función se utiliza para llenar el select de categorías en el formulario de carreras.
// =========================⬇️⬇️⬇️⬇️============================================
// Cargar categorías en el select del formulario de carreras
async function loadCategoriesSelect() {
    const select = document.getElementById('careerCategory');
    if (!select) return;
    select.innerHTML = '<option value="">Seleccione una categoría</option>'; // Opción por defecto
    try {
        const categories = await getAllCategoriesService(); // Asume que getAllCategoriesService() existe
        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat.id;
            option.textContent = cat.name;
            select.appendChild(option);
        });
    } catch (error) {
        console.error("Error al cargar categorías en el select:", error);
    }
}
// ==================================================================================================================


// =====      breve explicacion de lo que hace esta funcion      =======

// explicacion completa de loadCareersTable() carga las carreras en la tabla de carreras.
// La función realiza una petición al servicio getAllCareersService() para obtener todas las carreras
// y las muestra en el contenedor de resultados. Si hay un error, muestra el mensaje de error.
// La función también maneja el caso en que la tabla no existe en el DOM.
// La función se utiliza para llenar la tabla de carreras.
// =========================⬇️⬇️⬇️⬇️============================================
// Cargar carreras en la tabla
async function loadCareersTable() {
    console.log("UI: Iniciando carga de carreras en la tabla...");
    try {
        const careers = await getAllCareersService();
        console.log("UI: Carreras recibidas del backend:", careers);
        const tbody = document.getElementById('careersTableBody');
        if (!tbody) {
            console.error("UI: No se encontró el elemento 'careersTableBody' en el DOM.");
            return;
        }
        // === Destruye DataTable antes de modificar el DOM ===
        if ($.fn.DataTable.isDataTable('#careersTable')) {
            $('#careersTable').DataTable().destroy();
        }
        // Limpia el contenido actual de la tabla
        tbody.innerHTML = '';
        if (!Array.isArray(careers) || careers.length === 0) {
            console.warn("UI: No hay carreras registradas para mostrar.");
            tbody.innerHTML = `<tr><td colspan="3" class="text-center text-muted">No hay carreras registradas aún</td></tr>`;
            return;
        }
        // Agrega las carreras a la tabla
        careers.forEach(career => {
            console.log("Renderizando carrera:", career);
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${career.id}</td>
                <td>${career.name}</td>
                <td>
                    <button class="btn btn-sm btn-secondary me-2 boton" title="EDITAR CARRERA" onclick="editCareer(${career.id})">
                        <i class="fas fa-edit"></i> 
                    </button>
                    <button class="btn btn-sm btn-danger boton" title="ELIMINAR CARRERA"  onclick="deleteCareerById(${career.id})">
                        <i class="fas fa-trash-alt"></i> 
                    </button>
                </td>`;
            tbody.appendChild(row);
        });
        // === Inicializa DataTable después de modificar el DOM ===
        $('#careersTable').DataTable({
            language: {
                url: '//cdn.datatables.net/plug-ins/1.13.7/i18n/es-ES.json'
            },
            lengthMenu: [ [5, 10, 25, 50, -1], [5, 10, 25, 50, "Todos"] ],
            pageLength: 5
        });
        console.log(`UI: Se cargaron ${careers.length} carreras en la tabla.`);
    } catch (error) {
        console.error("UI: Error al cargar carreras:", error);
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudieron cargar las carreras"
        });
    }
}

// ===========================================================================



// =====      breve explicacion de lo que hace esta funcion      =======

// explicacion completa de deleteCareerById(id) elimina una carrera por 
// ID después de solicitar confirmación al usuario.
// La función busca la carrera por ID utilizando el servicio getAllCareersService().
// Si la carrera no se encuentra, muestra un mensaje de error.
// Si la carrera se encuentra, muestra un SweetAlert con los datos en negrita y la pregunta.
// Si el usuario confirma la eliminación, llama a removeCareerById() para eliminar la carrera.
// La función se utiliza para manejar la eliminación de una carrera.

// =========================⬇️⬇️⬇️⬇️============================================
/**
  * Elimina una carrera específica después de solicitar una confirmación.
  * @param {number} id El ID de la carrera a eliminar.
  */
// Elimina una carrera por ID después de confirmar con el usuario
async function deleteCareerById(id) {
    // 1. Busca la carrera por ID
    const careers = await getAllCareersService();
    const career = careers.find(c => c.id === id);

    if (!career) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Carrera no encontrada."
        });
        return;
    }
    // 2. Muestra el SweetAlert con los datos en negrita y la pregunta
    const confirm = await Swal.fire({
        title: "¿Está seguro?",
        html: `<b>Nombre:</b> "${career.name}"<br><b>ID:</b> ${career.id}<br><br>¿Realmente desea eliminar esta carrera?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar"
    });
    // 3. Si confirma, elimina la carrera
    if (!confirm.isConfirmed) return;
    const result = await deleteCareerService(id);
    if (result.error) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: result.error
        });
        return;
    }
    // 4. Mensaje de éxito
    Swal.fire({
    icon: "success",
    title: "Eliminado",
    html: `<br><b>ELIMINADA CORRECTAMENTE</b><br>`
    });
    // 5. Recarga la tabla
    loadCareersTable();
}
// =============================================================================================


// =====      breve explicacion de lo que hace esta funcion      =======

// explicacion completa de editCareer(id) edita una carrera por ID.
// La función busca la carrera por ID utilizando el servicio getCareerByIdService().
// Si la carrera no se encuentra, muestra un mensaje de error.
// Si la carrera se encuentra, muestra un SweetAlert con los datos en negrita y la pregunta.
// Si el usuario confirma la edición, llama a updateCareerService() para actualizar la carrera.
// La función se utiliza para manejar la edición de una carrera.
// La función también llena los campos del formulario con los datos de la carrera.
// La función cambia el texto y color del botón a "Actualizar".

// =========================⬇️⬇️⬇️⬇️============================================
// Edita una carrera por ID y carga sus datos en el formulario
async function editCareer(id) {
    console.log("UI: Editar carrera con ID:", id);
    // Verifica que el ID no esté vacío
    if (!id) {
        Swal.fire({
            icon: 'warning',
            title: 'ID inválido',
            text: 'No se proporcionó un ID de carrera válido.'
        });
        return;
    }
    try {
        const career = await getCareerByIdService(id);
        if (!career) {
            Swal.fire({
                icon: 'error',
                title: 'No encontrada',
                text: 'No se encontró la carrera solicitada.'
            });
            return;
        }
        // Llena los campos del formulario con los datos de la carrera
        document.getElementById('careerId').value = career.id || '';
        document.getElementById('registerName').value = career.name || '';
        document.getElementById('careerCode').value = career.code || '';
        document.getElementById('careerDuration').value = career.duration || '';
        document.getElementById('careerCategory').value = career.category || '';
        document.getElementById('careerModality').value = career.modality || '';
        // Cambia el texto y color del botón a "Actualizar"
        const btn = document.querySelector('#careerForm button[type="submit"]');
        btn.innerHTML = `<i class="fas fa-sync-alt me-1"></i>Actualizar`;
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-success');
        // Enfoca el primer campo del formulario (nombre)
        document.getElementById('registerName').focus();
    } catch (error) {
        console.error("UI: Error al cargar datos para edición:", error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo cargar la carrera para editar.'
        });
    }
}
// ===========================================================================

// =====      breve explicacion de lo que hace esta funcion      =======

// explicacion completa de resetCareerForm() resetea el formulario de carrera.
// La función resetea los campos del formulario, establece el ID de carrera como 
// vacíos y cambia el texto y color del botón a "Registrar".
// La función se utiliza para limpiar el formulario de carrera después de registrar o editar una carrera.
// La función también elimina la clase 'd-none' del bloque de detalles, limpia los textos de los elementos
// en el bloque de detalles y limpia el campo de búsqueda de ID.
// =========================⬇️⬇️⬇️⬇️============================================
// ===========================================================================
// Resetea el formulario de carrera
function resetCareerForm() {
    document.getElementById('careerForm').reset();
    document.getElementById('careerId').value = '';
    const btn = document.querySelector('#careerForm button[type="submit"]');
    btn.innerHTML = `<i class="fas fa-save me-1"></i>Registrar`;
    btn.classList.remove('btn-success');
    btn.classList.add('btn-primary');
}




// ================================================================================================================================================
// ======================== FUNCIONES DE SERVICIO PARA CATEGORÍAS ====================
// ===================================================================================


// =====      breve explicacion de lo que hace esta funcion      =======

// explicacion completa de registerCategoryService(name) registra una nueva categoría con el nombre proporcionado.
// La función envía una solicitud POST a la API para registrar la categoría.
// Si la solicitud es exitosa, obtiene la respuesta y la devuelve.
// La función se utiliza para registrar una nueva categoría en el sistema.
// =========================⬇️⬇️⬇️⬇️============================================
// SERVICIO para las categorías - REGISTRO
async function registerCategoryService(name) {
    console.log("SERVICIO: registerCategoryService - Llamando con nombre:", name);
    const response = await fetch(API_CATEGORIES_URL, {
        method: "POST",
        headers,
        body: JSON.stringify({ name })
    });
    const result = await response.json();
    console.log("SERVICIO: registerCategoryService - Respuesta:", result);
    return result;
}

// ===========================================================================

// =====      breve explicacion de lo que hace esta funcion      =======

// explicacion completa de getCategoryByIdService(id) obtiene una categoría por su ID.
// La función envía una solicitud GET a la API para obtener la categoría.
// Si la solicitud es exitosa, obtiene la respuesta y la devuelve.
// La función se utiliza para obtener una categoría en el sistema.
// =========================⬇️⬇️⬇️⬇️============================================

// SERVICIO PARA CATEGORÍAS - OBTENCIÓN POR ID
async function getCategoryByIdService(id) {
    console.log("SERVICIO: getCategoryByIdService - Llamando con ID:", id);
    const response = await fetch(`${API_CATEGORIES_URL}/${id}`, {
        method: "GET",
        headers
    });
    if (!response.ok) {
        const txt = await response.text();
        console.error("SERVICIO: Error en getCategoryByIdService - Estado:", response.status, "Texto:", txt);
        throw new Error(`(${response.status}) ${txt}`);
    }
    const result = await response.json();
    console.log("SERVICIO: getCategoryByIdService - Respuesta:", result);
    return result;
}
// ===========================================================================

// =====      breve explicacion de lo que hace esta funcion      =======

// explicacion completa de getAllCategoriesService() obtiene todas las categorías.
// La función envía una solicitud GET a la API para obtener todas las categorías.
// Si la solicitud es exitosa, obtiene la respuesta y la devuelve.
// La función se utiliza para obtener todas las categorías en el sistema.
// =========================⬇️⬇️⬇️⬇️============================================

// SERVICIO PARA CATEGORÍAS - OBTENCIÓN DE TODAS LAS CATEGORÍAS 
async function getAllCategoriesService() {
  console.log("SERVICIO: getAllCategoriesService - Llamando.");
  const response = await fetch(API_CATEGORIES_URL, {
    method: 'GET',
    headers
  });
  if (!response.ok) {
    const txt = await response.text();
    console.error("SERVICIO: Error en getAllCategoriesService - Estado:", response.status, "Texto:", txt);
    throw new Error(`(${response.status}) ${txt}`);
  }
  const result = await response.json();
  console.log("SERVICIO: getAllCategoriesService - Respuesta:", result);
  return result;
}

//===========================================================================
// =====      breve explicacion de lo que hace esta funcion      =======

// explicacion completa de deleteCategoryService(id) elimina una categoría por su ID.
// La función envía una solicitud DELETE a la API para eliminar la categoría.
// Si la solicitud es exitosa, obtiene la respuesta y la devuelve.
// La función se utiliza para eliminar una categoría en el sistema.
// =========================⬇️⬇️⬇️⬇️============================================

//SERVICIO PARA CATEGORÍAS - ELIMINACIÓN POR ID - 
async function deleteCategoryService(id) {
    console.log("SERVICIO: deleteCategoryService - Llamando con ID:", id);
    const response = await fetch(`${API_CATEGORIES_URL}/${id}`, {
        method: "DELETE",
        headers
    });
    const result = await response.json();
    console.log("SERVICIO: deleteCategoryService - Respuesta:", result);
    return result;
}

// ====================================================================================================================================
// ======================== FUNCIONES DE LÓGICA DE UI PARA CATEGORÍAS =================
// ====================================================================================================================================





// =====      breve explicacion de lo que hace esta funcion      =======

// explicacion completa de handleCategoryForm(event) maneja el envío del formulario de categoría.
// La función obtiene el nombre de la categoría del formulario, valida que no esté vacío,
// y luego llama a registerCategoryService() para registrar la nueva categoría.
// La función se utiliza para registrar una nueva categoría en el sistema.
// =========================⬇️⬇️⬇️⬇️============================================
//REGISTRA NUEVAS CATEGORÍAS

async function handleCategoryForm(event) {
    console.log("UI: handleCategoryForm - Iniciando (solo registro).");
    event.preventDefault();
    const name = document.getElementById('categoryName').value.trim();
    // Log del nombre de la categoría
    if (!name) {
        console.log("UI: handleCategoryForm - Validación fallida: nombre vacío.");
        Swal.fire({ icon: 'error', title: 'Error', text: 'Por favor ingrese el nombre de la categoría' });
        return;
    }
    try {
        console.log("UI: handleCategoryForm - Llamando a registerCategoryService para un nuevo registro.");
        const result = await registerCategoryService(name);
        // Verifica si hay un error en la respuesta del backend
        if (result.error) {
            console.error("UI: handleCategoryForm - Error recibido del backend:", result.error);
            Swal.fire({ icon: 'error', title: 'Error', text: result.error });
            return;
        }
        // Muestra un mensaje de éxito y LUEGO actualiza la tabla
        await Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Categoría registrada correctamente',
        });
        console.log("UI: handleCategoryForm - SweetAlert cerrado. Limpiando formulario y recargando tabla.");
        resetCategoryForm();
        await loadCategoriesTable(); // Asegura que la tabla se cargue completamente
        // Limpia el bloque de detalles si existe
    } catch (error) {
        console.error('UI: handleCategoryForm - Error en la operación:', error);
        Swal.fire({ icon: 'error', title: 'Error', text: error.message || 'No se pudo completar la operación' });
    }
}

// ===========================================================================

// =====      breve explicacion de lo que hace esta funcion      =======

// explicacion completa de deleteCategoryById(id) elimina una categoría por ID después de solicitar confirmación al usuario.
// La función busca la categoría por ID utilizando el servicio getAllCategoriesService().
// Si la categoría no se encuentra, muestra un mensaje de error.
// Si la categoría se encuentra, muestra un SweetAlert de confirmación y llama a deleteCategoryService() para eliminarla.
// La función se utiliza para manejar la eliminación de una categoría.
// =========================⬇️⬇️⬇️⬇️============================================
/**
 * Elimina una categoría específica después de solicitar una confirmación.
 * @param {number} id El ID de la categoría a eliminar.
 */

// Elimina una categoría por ID después de confirmar con el usuario
async function deleteCategoryById(id) {
  console.log("UI: deleteCategoryById - Iniciando eliminación para ID:", id);
  try {
    console.log("UI: deleteCategoryById - Llamando a getAllCategoriesService para obtener detalles.");
    const categories = await getAllCategoriesService();
    const category = categories.find((c) => c.id == id);
    console.log("UI: deleteCategoryById - Categoría encontrada para confirmación:", category);
    // Verifica si la categoría existe
    if (!category) {
        console.error("UI: deleteCategoryById - Categoría no encontrada en el frontend para eliminar.");
        Swal.fire({ icon: 'error', title: 'Error', text: 'Categoría no encontrada para eliminar.' });
        return;
    }
    // Muestra un SweetAlert de confirmación
    console.log("UI: deleteCategoryById - Mostrando SweetAlert de confirmación.");
    const confirm = await Swal.fire({
      title: `¿Deseas eliminar la categoría?`,
      html: `<b>Categoría:</b> ${category.name}<br><b>ID:</b> ${category.id}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });
    // Verifica si el usuario confirmó la eliminación
    if (confirm.isConfirmed) {
      console.log("UI: deleteCategoryById - Confirmación aceptada. Llamando a deleteCategoryService.");
      const result = await deleteCategoryService(id);
      console.log("UI: deleteCategoryById - Respuesta del servicio de eliminación:", result);
      // Verifica si hay un error en la respuesta del backend 
    if (result.error) {
        console.error("UI: deleteCategoryById - Error recibido del backend al eliminar:", result.error);
        Swal.fire({ icon: 'error', title: 'Error', text: result.error });
        return;
    }
        // Muestra un mensaje de éxito
        console.log("UI: deleteCategoryById - Eliminación exitosa. Recargando tabla.");
        Swal.fire({ icon: 'success', title: 'Eliminado', text: 'Categoría eliminada correctamente' });
        loadCategoriesTable();
    } else {
        console.log("UI: deleteCategoryById - Eliminación cancelada por el usuario.");
    }
    } catch (error) {
        console.error('UI: deleteCategoryById - Error en la operación:', error);
        Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo eliminar la categoría' });
    }
}

// ===========================================================================
// =====      breve explicacion de lo que hace esta funcion      =======

// explicacion completa de loadCategoriesTable() carga la tabla de categorías en el DOM.
// La función obtiene las categorías utilizando el servicio getAllCategoriesService().
// Si hay categorías, las muestra en el DOM.
// Si no hay categorías, muestra un mensaje de "No hay categorías disponibles".
// La función se utiliza para cargar la tabla de categorías en el DOM.
// =========================⬇️⬇️⬇️⬇️============================================
// Carga la tabla de categorías

async function loadCategoriesTable() {
    console.log("UI: loadCategoriesTable - Iniciando carga de tabla.");
    // Manejo de errores con try-catch
    // Asegura que la función maneje errores de manera controlada
    try {
    // 1. Obtener categorías del servicio
    const categories = await getAllCategoriesService();
    console.log("UI: loadCategoriesTable - Categorías obtenidas:", categories);
    // 2. Obtener referencia al tbody
    const tbody = document.getElementById('categoriesTableBody');
    if (!tbody) {
        console.error("UI: loadCategoriesTable - Elemento 'categoriesTableBody' no encontrado en el DOM.");
        return;
    }
    // 3. Destruir DataTable si existe
    const table = $('#categoriesTable');
    if ($.fn.DataTable.isDataTable(table)) {
      table.DataTable().destroy();
      console.log("UI: loadCategoriesTable - DataTable destruido.");
    }
    // 4. Limpiar tabla
    tbody.innerHTML = '';
    // 5. Manejar caso sin categorías
    if (!Array.isArray(categories) || categories.length === 0) {
        tbody.innerHTML = `
        <tr>
            <td colspan="3" class="text-center text-muted">
                No hay categorías registradas
            </td>
        </tr>`;
        console.log("UI: loadCategoriesTable - No hay categorías para mostrar.");
        return;
    }
    // 6. Renderizar categorías
    categories.forEach((category) => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td class="text-center align-middle">${category.id}</td>
        <td class="text-center align-middle">${category.name}</td>
        <td class="text-center align-middle">
            <button class="btn btn-sm btn-danger boton" title="ELIMINAR CATEGORIA" onclick="deleteCategoryById(${category.id})">
                <i class="fas fa-trash-alt"></i> 
            </button>
        </td>`;
        tbody.appendChild(row);
    });
        console.log(`UI: loadCategoriesTable - ${categories.length} categorías renderizadas.`);
        // 7. Inicializar DataTable con configuración mejorada
    table.DataTable({
        language: {
        url: '//cdn.datatables.net/plug-ins/1.13.7/i18n/es-ES.json'
        },
        lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, "Todos"]],
        pageLength: 5,
        responsive: true,
        autoWidth: false,
      destroy: true // Asegura que se pueda reinicializar
    });
    console.log("UI: loadCategoriesTable - DataTable inicializado correctamente.");
    } catch (error) {
    console.error('UI: loadCategoriesTable - Error al cargar categorías:', error);
    // Mostrar error en la tabla
    const tbody = document.getElementById('categoriesTableBody');
    if (tbody) {
        tbody.innerHTML = `
        <tr>
            <td colspan="3" class="text-center text-danger">
                Error al cargar categorías: ${error.message || 'Error desconocido'}
            </td>
        </tr>`;
    }
    Swal.fire({ 
        icon: 'error', 
        title: 'Error', 
        text: 'No se pudieron cargar las categorías' 
    });
    }
}

// ===========================================================================


// =====      breve explicacion de lo que hace esta funcion      =======

// explicacion completa de resetCategoryForm() limpia y reinicia el formulario de categorías.
// La función limpia los campos del formulario, establece el ID de la categoría en blanco,
// cambia el texto y el estilo del botón de submit a "Guardar Categoría".
// La función se utiliza para limpiar el formulario de categorías después de registrar o editar una categoría.
//Limpia y reinicia todos los campos del formulario de categorías a su estado inicial.
//También restablece el texto y el estilo del botón de submit.
// =========================⬇️⬇️⬇️⬇️============================================

// Reinicia el formulario de categorías
function resetCategoryForm() {
    console.log("UI: resetCategoryForm - Iniciando.");
    document.getElementById('categoryForm').reset();
    document.getElementById('categoryId').value = '';
    document.getElementById('categoryName').value = '';

    const submitButton = document.querySelector('#categoryForm button[type="submit"]');
    if (submitButton) {
        submitButton.innerHTML = `<i class="fas fa-save me-1"></i> Guardar Categoría`;
        submitButton.classList.remove('btn-success');
        submitButton.classList.add('btn-primary');
        console.log("UI: resetCategoryForm - Botón de formulario restablecido a 'Guardar Categoría'.");
    } else {
        console.warn("UI: resetCategoryForm - Botón de submit del formulario no encontrado para reset.");
    }
    console.log("UI: resetCategoryForm - Formulario de categorías reseteado.");
}
// ===========================================================================

// =====      breve explicacion de lo que hace esta funcion      =======

// explicacion completa de getCategoryByIdUI(id) obtiene una categoría por ID y muestra sus detalles en la UI.
// La función realiza una petición al servicio API_CATEGORIES_URL para obtener la categoría.
// Si la petición es exitosa, obtiene la respuesta y la muestra en la UI.
// Si la petición falla, muestra un mensaje de error en la consola.
// La función se utiliza para mostrar los detalles de una categoría en la UI.
// =========================⬇️⬇️⬇️⬇️============================================


// Obtiene una categoría por ID y muestra sus detalles en la UI
async function getCategoryByIdUI(id) {
    try {
        const detailsDiv = document.getElementById('categoryDetails');
        const detailId = document.getElementById('detailCategoryId');
        const detailName = document.getElementById('detailCategoryName');
        detailsDiv.classList.add('d-none');
        detailId.textContent = '';
        detailName.textContent = '';
        // Verifica que el ID no esté vacío
        const category = await getCategoryByIdService(id);
        if (category.error) {
            Swal.fire({ icon: "error", title: "No encontrado", text: category.error });
            return;
        }
        detailId.textContent = category.id;
        detailName.textContent = category.name;
        detailsDiv.classList.remove('d-none');
    } catch (error) {
        Swal.fire({ icon: "error", title: "Error", text: "No se pudo encontrar la categoría. Intente con otro número." });
    }
}


// ====================================================================================

// =====      breve explicacion de lo que hace esta funcion      =======

// explicacion completa de document.addEventListener('DOMContentLoaded', () => {})
// Esta función se ejecuta cuando el DOM está completamente cargado.
// Dentro de esta función, se agregan los listeners para los formularios de categorías, carreras y estudiantes.
// También se cargan las tablas de categorías, carreras y estudiantes.
// Se asegura de que los elementos del DOM existan antes de agregar los listeners y ejecutar las funciones de carga inicial.
// La función se utiliza para inicializar la UI al cargar el DOM.
// =========================⬇️⬇️⬇️⬇️============================================
// Inicialización al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    // --- Categorías ---
    const categoryForm = document.getElementById('categoryForm');
    // Verifica que el formulario de categorías exista antes de agregar el listener
    if (categoryForm) {
        categoryForm.addEventListener('submit', handleCategoryForm);
        console.log("UI: DOMContentLoaded - Listener de submit para categoryForm añadido (handleCategoryForm).");
    }
    // Carga la tabla de categorías al cargar el DOM
    if (document.getElementById('categoriesTableBody')) {
        loadCategoriesTable();
        console.log("UI: DOMContentLoaded - loadCategoriesTable() ejecutado.");
    }
    // --- Buscar Categoría por ID ---
    const searchCategoryForm = document.getElementById('searchCategoryForm');
    if (searchCategoryForm) {
        searchCategoryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const id = document.getElementById('searchCategoryId').value.trim();
            if (id) {
                getCategoryByIdUI(id);
            }
        });
    }
    const clearCategoryBtn = document.getElementById('clearCategoryDetails');
    if (clearCategoryBtn) {
        clearCategoryBtn.addEventListener('click', function() {
            document.getElementById('categoryDetails').classList.add('d-none');
            document.getElementById('detailCategoryId').textContent = '';
            document.getElementById('detailCategoryName').textContent = '';
            document.getElementById('searchCategoryId').value = '';
        });
    }
    // Resetea el formulario de categorías al cargar el DOM
    // --- Carreras ---
    const careerForm = document.getElementById('careerForm');
    if (careerForm) {
        careerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            registerCareer();
        });
        loadCategoriesSelect();
    }
    if (document.getElementById('careersTableBody')) {
        loadCareersTable();
    }

    // --- Estudiantes ---
    if (document.getElementById('studentsTableBody')) {
        loadStudentsTable(); // <-- Esta es la llamada clave para cargar la tabla de estudiantes
    }
    if (document.getElementById('studentForm')) {
        loadCareersForStudentForm(); // <-- Carga las carreras para el select de registro
        loadCareersForSearchSelect(); // <-- Carga las carreras para el select de búsqueda
        document.getElementById('studentForm').addEventListener('submit', function(e) {
            e.preventDefault();
            registerStudent();
        });
    }
    const refreshBtn = document.getElementById('refreshStudentsBtn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', loadStudentsTable);
    }
    
    // --- Búsqueda por carrera ---
    const searchCareerForm = document.getElementById('searchStudentByCareerForm');
    if (searchCareerForm) {
        searchCareerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const selectedCareer = document.getElementById('searchCareer').value;
            if (selectedCareer) {
                searchStudentsByCareer(selectedCareer);
            } else {
                loadStudentsTable(); // Si elige "todas", muestra todos
            }
        });
    }
    const searchForm = document.getElementById('searchCareerForm');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            getCareerById();
        });
    }

    // --- Búsqueda por ID de estudiante ---
    const searchStudentForm = document.getElementById('searchStudentForm');
    if (searchStudentForm) {
        searchStudentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const id = document.getElementById('searchStudentId').value.trim();
            if (id) {
                getStudentById(id);
            }
        });
    }
    const clearBtn = document.getElementById('clearStudentDetails');
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            document.getElementById('studentDetails').classList.add('d-none');
            document.getElementById('detailId').textContent = '';
            document.getElementById('detailName').textContent = '';
            document.getElementById('detailCareer').textContent = '';
            document.getElementById('detailCategory').textContent = '';
            document.getElementById('searchStudentId').value = '';
        });
    }
});


