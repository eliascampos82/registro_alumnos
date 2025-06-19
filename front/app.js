

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
// Funciones de Servicio (Frontend -> Backend) para Estudiantes
// =====================================================================


// =====================================================================
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

// =====================================================================
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

// =====================================================================
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
// =====================================================================


// =====================================================================
// Funciones de Lógica de UI para Estudiantes
// =====================================================================

// =====================================================================
/**
 * Carga las carreras desde el backend y las muestra en el select del 
 * formulario de registro de estudiantes (id="career").
 */
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

// =====================================================================


/**
 * Carga las carreras desde el backend y las muestra en el 
 * select de búsqueda de estudiantes por carrera (id="searchCareer").
 */
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

// =====================================================================


/**
 * Busca estudiantes por carrera y los muestra en la tabla principal.
 * @param {string} career - El nombre de la carrera a buscar.
 */
/**
 * Busca estudiantes por carrera y los muestra en la tabla principal.
 * @param {string} career - El nombre de la carrera a buscar.
 */
async function searchStudentsByCareer(career) {
    console.log("UI: Buscando estudiantes por carrera:", career);
    const searchSelect = document.getElementById('searchCareer'); // Captura el select de búsqueda
    
    try {
        const students = await getStudentsByCareerService(career);
        console.log("UI: Estudiantes filtrados recibidos del backend:", students);
        
        const tbody = document.getElementById('studentsTableBody');
        if (!tbody) {
            console.error("UI: No se encontró el elemento 'studentsTableBody' en el DOM.");
            return;
        }
        
        tbody.innerHTML = '';
        
        if (!Array.isArray(students) || students.length === 0) {
            console.warn("UI: No hay estudiantes para la carrera seleccionada.");
            tbody.innerHTML = `<tr><td colspan="4" class="text-center text-muted">No hay estudiantes para esa carrera</td></tr>`;
            return;
        }
        
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
// =====================================================================


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

// =====================================================================


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

/**
 * Maneja el registro de un nuevo estudiante a través del formulario.
 */
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
    // Log de inicio del registro
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

// =====================================================================


/**
 * Carga todos los estudiantes y los muestra en la tabla principal.
 */

async function loadStudentsTable() {
    console.log("UI: Iniciando carga de estudiantes...");
    
    // 1. Destruye DataTable SI EXISTE
    const table = $('#studentsTable').DataTable();
    if (table) {
        table.destroy();
        console.log("DataTable destruido exitosamente");
    }

    try {
        // 2. Obtiene datos
        const response = await fetch(API_STUDENT_URL, {
            method: "GET",
            headers
        });
        
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        
        const students = await response.json();
        const tbody = document.getElementById('studentsTableBody');
        
        if (!tbody) {
            console.error("Error: studentsTableBody no encontrado");
            return;
        }
        
        // 3. Limpia y reconstruye la tabla
        tbody.innerHTML = '';
        
        if (!students?.length) {
            tbody.innerHTML = `<tr><td colspan="4" class="text-center">No hay datos</td></tr>`;
            return;
        }
        
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
        
    } catch (error) {
        console.error("Error cargando estudiantes:", error);
        Swal.fire("Error", `No se pudieron cargar los datos: ${error.message}`, "error");
    }
}
// ...código existente...
// =====================================================================


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
// ============================================================================================
// ===========================================================================================
// =====================================Servicios para Carreras===============================

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

// ================Servicios para Carreras=============================
// ===========================================================================================
// ====================================================================



//REGISTRO DE CARRERAS
// async function registerCareer() {
//     const id = document.getElementById('careerId').value;
//     const name = document.getElementById('registerName').value.trim();
//     const code = document.getElementById('careerCode').value.trim();
//     const duration = document.getElementById('careerDuration').value.trim();
//     const category = document.getElementById('careerCategory').value;
//     const modality = document.getElementById('careerModality').value;
//     // Log de los datos a registrar
//     if (!name || !duration || !category || !modality) {
//         Swal.fire({ icon: 'error', title: 'Error', text: 'Completa todos los campos obligatorios.' });
//         return;
//     }
//     // Log de los datos a enviar
//     const data = { name, code, duration, category, modality }; // Asegúrate de enviar todos los campos si los usas
//     console.log("UI: Datos a enviar:", data);
//     // Verifica si estamos en modo edición o registro
//     try {
//         let result;
//         if (id) {
//             console.log("UI: Modo edición. Actualizando carrera ID:", id);
//             result = await updateCareerService(id, data);
//         } else {
//             console.log("UI: Modo registro. Creando nueva carrera.");
//             result = await registerCareerService(data);
//         }
//         // Log de la respuesta del backend
//         if (result.error) {
//             throw new Error(result.error);
//         }
//         // Muestra un mensaje de éxito
//         Swal.fire({ icon: 'success', title: 'Éxito', text: id ? 'Carrera actualizada.' : 'Carrera registrada.' });
//         // Limpia el formulario    
//         document.getElementById('careerForm').reset();
//         document.getElementById('careerId').value = '';
//         // Resetea el botón del formulario
//         const btn = document.querySelector('#careerForm button[type="submit"]');
//         btn.innerHTML = `<i class="fas fa-save me-1"></i>Registrar`;
//         btn.classList.remove('btn-success');
//         btn.classList.add('btn-primary');
//         // Carga nuevamente la tabla de carreras
//         loadCareersTable();
//         // Carga las categorías en el select del formulario de carreras
//     } catch (error) {
//         console.error("UI: Error en la operación:", error);
//         Swal.fire({ icon: 'error', title: 'Error', text: error.message || 'No se pudo completar la operación.' });
//     }
// }
async function registerCareer() {
    const id = document.getElementById('careerId').value;
    const name = document.getElementById('registerName').value.trim();
    const code = document.getElementById('careerCode').value.trim();
    const duration = document.getElementById('careerDuration').value.trim();
    const category = document.getElementById('careerCategory').value;
    const modality = document.getElementById('careerModality').value;
    if (!name || !duration || !category || !modality) {
        Swal.fire({ icon: 'error', title: 'Error', text: 'Completa todos los campos obligatorios.' });
        return;
    }
    const data = { name, code, duration, category, modality };
    console.log("UI: Datos a enviar:", data);
    try {
        let result;
        if (id) {
            console.log("UI: Modo edición. Actualizando carrera ID:", id);
            result = await updateCareerService(id, data);
        } else {
            console.log("UI: Modo registro. Creando nueva carrera.");
            result = await registerCareerService(data);
        }
        if (result.error) {
            throw new Error(result.error);
        }
        Swal.fire({ icon: 'success', title: 'Éxito', text: id ? 'Carrera actualizada.' : 'Carrera registrada.' });
        await loadCareersTable(); // Carga nuevamente la tabla de carreras
        document.getElementById('careerForm').reset();
        document.getElementById('careerId').value = '';
        const btn = document.querySelector('#careerForm button[type="submit"]');
        btn.innerHTML = `<i class="fas fa-save me-1"></i>Registrar`;
        btn.classList.remove('btn-success');
        btn.classList.add('btn-primary');
        // === AQUÍ, CON await ===
        await loadCareersTable();
    } catch (error) {
        console.error("UI: Error en la operación:", error);
        Swal.fire({ icon: 'error', title: 'Error', text: error.message || 'No se pudo completar la operación.' });
    }
}

// =====================================================================

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
    // Log del ID a buscar
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

// ========================================================================================



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


// ===================================================================================


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





// ===========================================================================

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


// Resetea el formulario de carrera
function resetCareerForm() {
    document.getElementById('careerForm').reset();
    document.getElementById('careerId').value = '';
    const btn = document.querySelector('#careerForm button[type="submit"]');
    btn.innerHTML = `<i class="fas fa-save me-1"></i>Registrar`;
    btn.classList.remove('btn-success');
    btn.classList.add('btn-primary');
}



// ===========================================================================
// ===================================================================================
// ======================== FUNCIONES DE SERVICIO PARA CATEGORÍAS ====================
// ===================================================================================
// ===========================================================================


// SERVICIO 
// REGISTRO para las categorías
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

// SERVICIO 
// Obtiene una categoría por su ID
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

// SERVICIO 
// Obtiene todas las categorías
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

//SERVICIO 
// Actualiza una categoría por su ID
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

// ====================================================================================
// ======================== FUNCIONES DE LÓGICA DE UI PARA CATEGORÍAS =================
// ====================================================================================

/*
 * Maneja el envío del formulario de categorías.
 * Se encarga de registrar nuevas categorías.
 * @param {Event} event El evento de submit del formulario.
 */

//REGISTRA NUEVAS CATEGORÍAS

async function handleCategoryForm(event) {
    console.log("UI: handleCategoryForm - Iniciando (solo registro).");
    event.preventDefault();
    const name = document.getElementById('categoryName').value.trim();

    if (!name) {
        console.log("UI: handleCategoryForm - Validación fallida: nombre vacío.");
        Swal.fire({ icon: 'error', title: 'Error', text: 'Por favor ingrese el nombre de la categoría' });
        return;
    }

    try {
        console.log("UI: handleCategoryForm - Llamando a registerCategoryService para un nuevo registro.");
        const result = await registerCategoryService(name);

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

    } catch (error) {
        console.error('UI: handleCategoryForm - Error en la operación:', error);
        Swal.fire({ icon: 'error', title: 'Error', text: error.message || 'No se pudo completar la operación' });
    }
}

// ===========================================================================


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

// Carga la tabla de categorías

async function loadCategoriesTable() {
  console.log("UI: loadCategoriesTable - Iniciando carga de tabla.");
  
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
/**
 * Limpia y reinicia todos los campos del formulario de categorías a su estado inicial.
 * También restablece el texto y el estilo del botón de submit.
 */


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

// ===========================================================================
// ====================================================================================
// Inicialización al cargar el DOM
// ====================================================================================
// ===========================================================================    


// Espera a que el DOM esté completamente cargado antes de agregar los listeners
// y ejecutar las funciones de carga inicial.
// ====================================================================================
// ====================================================================================
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


