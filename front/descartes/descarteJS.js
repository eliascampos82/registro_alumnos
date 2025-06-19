













// const API_STUDENT_URL = "http://localhost:5001/api/students";
// const API_CAREERS_URL = 'http://localhost:5001/api/careers'
// const API_CATEGORIES_URL = 'http://localhost:5001/api/categories'

// const API_KEY = "12345ABCDEF";

// // Headers comunes para todas las peticiones
// const headers = {
//     "Content-Type": "application/json",
//     "Authorization": `Bearer ${API_KEY}`
// };

// // Funciones de servicio que retornan Promesas
// async function registerStudentService(name, career) {
//     const response = await fetch(API_STUDENT_URL, {
//         method: "POST",
//         headers,
//         body: JSON.stringify({ name, career })
//     });
//     return response.json();
// }
// //funcion para buscar estudiantes por ID, este es el servicio
// async function getStudentByIdService(id) {
//     const response = await fetch(`${API_STUDENT_URL}/${id}`, {
//         method: "GET",
//         headers
//     });
//     return response.json();
// }
// //funcion para buscar estudiantes por carrera, este es el servicio
// // async function getStudentsByCareerService(career) {
// //     const response = await fetch(`${API_STUDENT_URL}?career=${career}`, {
// //         method: "GET",
// //         headers
// //     });
// //     return response.json();
// // }
// async function getStudentsByCareerService(career) {
//     const response = await fetch(`${API_STUDENT_URL}?career=${encodeURIComponent(career)}`, {
//         method: "GET",
//         headers
//     });
//     return response.json();
// }



// //borrar estudiantes en el servicio
// async function deleteStudentService(id) {
//     const response = await fetch(`${API_STUDENT_URL}/${id}`, {
//         method: "DELETE",
//         headers
//     });
//     return response.json();
// }
// // ==================================================================
// // ==================================================================
// // ==================================================================
// // 
// // =====================================================================
// // =====================================================================
// /**
//  * Carga las carreras desde el backend y las muestra en el select de búsqueda de estudiantes.
//  * Muestra por consola lo que recibe y si hay errores.
//  */
// /**
//  * Carga las carreras en el select del formulario de registro de estudiantes (id="career").
//  */
// async function loadCareersForStudentForm() {
//     console.log("UI: Iniciando carga de carreras para el select del formulario de estudiantes...");
//     try {
//         const careers = await getAllCareersService();
//         console.log("UI: Carreras recibidas para el formulario de estudiantes:", careers);

//         const select = document.getElementById('career');
//         if (!select) {
//             console.error("UI: No se encontró el select 'career' en el DOM.");
//             return;
//         }

//         select.innerHTML = '<option value="">Seleccione una carrera</option>';

//         if (!Array.isArray(careers) || careers.length === 0) {
//             console.warn("UI: No hay carreras para cargar en el select del formulario de estudiantes.");
//             return;
//         }

//         careers.forEach(career => {
//             const option = document.createElement('option');
//             option.value = career.name;
//             option.textContent = career.name;
//             select.appendChild(option);
//         });

//         console.log(`UI: Se cargaron ${careers.length} carreras en el select del formulario de estudiantes.`);
//     } catch (error) {
//         console.error("UI: Error al cargar carreras en el select del formulario de estudiantes:", error);
//     }
// }

// /**
//  * Carga las carreras en el select de búsqueda de estudiantes por carrera (id="searchCareer").
//  */
// async function loadCareersForSearchSelect() {
//     console.log("UI: Iniciando carga de carreras para el select de búsqueda de estudiantes...");
//     try {
//         const careers = await getAllCareersService();
//         console.log("UI: Carreras recibidas para el select de búsqueda:", careers);

//         const select = document.getElementById('searchCareer');
//         if (!select) {
//             console.error("UI: No se encontró el select 'searchCareer' en el DOM.");
//             return;
//         }

//         select.innerHTML = '<option value="">Seleccione una carrera</option>';

//         if (!Array.isArray(careers) || careers.length === 0) {
//             console.warn("UI: No hay carreras para cargar en el select de búsqueda.");
//             return;
//         }

//         careers.forEach(career => {
//             const option = document.createElement('option');
//             option.value = career.name;
//             option.textContent = career.name;
//             select.appendChild(option);
//         });

//         console.log(`UI: Se cargaron ${careers.length} carreras en el select de búsqueda.`);
//     } catch (error) {
//         console.error("UI: Error al cargar carreras en el select de búsqueda:", error);
//     }
// }




// /**
//  * Busca estudiantes por carrera y los muestra en la tabla principal.
//  * @param {string} career - El nombre de la carrera a buscar.
//  */
// async function searchStudentsByCareer(career) {
//     console.log("UI: Buscando estudiantes por carrera:", career);

//     try {
//         // Llama al backend para obtener los estudiantes filtrados
//         const response = await fetch(`${API_STUDENT_URL}?career=${encodeURIComponent(career)}`, {
//             method: "GET",
//             headers
//         });
//         const students = await response.json();
//         console.log("UI: Estudiantes filtrados recibidos del backend:", students);

//         const tbody = document.getElementById('studentsTableBody');
//         if (!tbody) {
//             console.error("UI: No se encontró el elemento 'studentsTableBody' en el DOM.");
//             return;
//         }

//         tbody.innerHTML = '';

//         if (!Array.isArray(students) || students.length === 0) {
//             console.warn("UI: No hay estudiantes para la carrera seleccionada.");
//             tbody.innerHTML = `<tr><td colspan="3" class="text-center text-muted">No hay estudiantes para esa carrera</td></tr>`;
//             return;
//         }

//         students.forEach(student => {
//             const row = document.createElement('tr');
//             row.innerHTML = `
//                 <td>${student.id}</td>
//                 <td>${student.name}</td>
//                 <td>${student.career}</td>
//             `;
//             tbody.appendChild(row);
//         });

//         console.log(`UI: Se cargaron ${students.length} estudiantes filtrados en la tabla.`);
//     } catch (error) {
//         console.error("UI: Error al buscar estudiantes por carrera:", error);
//         Swal.fire({
//             icon: "error",
//             title: "Error",
//             text: "No se pudieron buscar los estudiantes por carrera"
//         });
//     }
// }

// // Listener para el formulario de búsqueda por carrera
// // document.addEventListener('DOMContentLoaded', () => {
// //     const searchCareerForm = document.getElementById('searchStudentByCareerForm');
// //     if (searchCareerForm) {
// //         searchCareerForm.addEventListener('submit', function(e) {
// //             e.preventDefault();
// //             const selectedCareer = document.getElementById('searchCareer').value;
// //             if (selectedCareer) {
// //                 searchStudentsByCareer(selectedCareer);
// //             } else {
// //                 loadStudentsTable(); // Si elige "todas", muestra todos
// //             }
// //         });
// //     }
// // });




// // BUSCAR ESTUDIANNTES POR ID
// /**
//  * Busca un estudiante por ID y muestra el resultado en el bloque de detalles.
//  */
// async function getStudentById(id) {
//     try {
//         console.log("UI: Buscando estudiante por ID:", id);
//         // Llama al backend para obtener el estudiante por ID
//         const response = await fetch(`${API_STUDENT_URL}/${id}`, {
//             method: "GET",
//             headers
//         });
//         const student = await response.json();
//         console.log("UI: Respuesta del backend al buscar estudiante por ID:", student);

//         // Elementos del bloque de detalles
//         const detailsDiv = document.getElementById('studentDetails');
//         const detailId = document.getElementById('detailId');
//         const detailName = document.getElementById('detailName');
//         const detailCareer = document.getElementById('detailCareer');
//         const detailCategory = document.getElementById('detailCategory');

//         if (student.error) {
//             detailsDiv.classList.add('d-none');
//             Swal.fire({
//                 icon: "error",
//                 title: "No encontrado",
//                 text: student.error
//             });
//             return;
//         }

//         // Muestra los datos en el bloque de detalles
//         detailId.textContent = student.id;
//         detailName.textContent = student.name;
//         detailCareer.textContent = student.career;
//         detailCategory.textContent = student.category || "-";
//         detailsDiv.classList.remove('d-none');
//     } catch (error) {
//         console.error("UI: Error al buscar estudiante por ID:", error);
//         Swal.fire({
//             icon: "error",
//             title: "Error",
//             text: "No se pudo buscar el estudiante."
//         });
//     }
// }




// const clearBtn = document.getElementById('clearStudentDetails');
// if (clearBtn) {
//     clearBtn.addEventListener('click', function() {
//         document.getElementById('studentDetails').classList.add('d-none');
//         document.getElementById('detailId').textContent = '';
//         document.getElementById('detailName').textContent = '';
//         document.getElementById('detailCareer').textContent = '';
//         document.getElementById('detailCategory').textContent = '';
//         // Limpia el campo de búsqueda de ID
//         document.getElementById('searchStudentId').value = '';
//     });
// }

// async function registerStudent() {
//     // Obtiene los valores de los campos del formulario
//     const name = document.getElementById('name').value.trim();
//     const dni = document.getElementById('dni').value.trim();
//     const age = document.getElementById('age').value.trim();
//     const career = document.getElementById('career').value.trim();

//     // Log de los datos que se van a enviar
//     console.log("UI: Datos a registrar estudiante:", { name, dni, age, career });

//     // Validación de campos obligatorios
//     if (!name || !dni || !age || !career) {
//         console.warn("UI: Validación fallida. Faltan campos obligatorios.");
//         Swal.fire({
//             icon: "error",
//             title: "Error",
//             text: "Por favor complete todos los campos obligatorios"
//         });
//         return;
//     }

//     try {
//         // Llama al servicio para registrar el estudiante
//         const result = await registerStudentService(name, career);
//         console.log("UI: Respuesta del backend al registrar estudiante:", result);

//         if (result.error) {
//             console.error("UI: Error recibido del backend:", result.error);
//             Swal.fire({
//                 icon: "error",
//                 title: "Error",
//                 text: result.error
//             });
//             return;
//         }

//         // Muestra los datos en un SweetAlert con "Nombre" en negrita
//        Swal.fire({
//        icon: "success",
//        title: "¡Registro exitoso!",
//        html: `
//           <strong>ID:</strong> ${result.student.id}<br>
//            <strong>Nombre:</strong> ${result.student.name}<br>
//            <strong>Carrera:</strong> ${result.student.career}
//          `
//          }).then(() => {
//              // Solo se ejecuta después de apretar OK
//              loadStudentsTable();
//          });

//         // Limpia los campos del formulario
//         document.getElementById('name').value = '';
//         document.getElementById('dni').value = '';
//         document.getElementById('age').value = '';
//         document.getElementById('career').value = '';

//         console.log("UI: Formulario de estudiante reseteado tras registro exitoso.");
//     } catch (error) {
//         // Manejo de errores
//         console.error("UI: Error al registrar estudiante:", error);
//         Swal.fire({
//             icon: "error",
//             title: "Error",
//             text: "No se pudo registrar el estudiante."
//         });
//     }
// }


// // async function loadStudentsTable() {
// //     console.log("UI: Iniciando carga de estudiantes en la tabla...");

// //     try {
// //         const response = await fetch(API_STUDENT_URL, {
// //             method: "GET",
// //             headers
// //         });
// //         console.log("UI: Respuesta completa del fetch de estudiantes:", response);

// //         const students = await response.json();
// //         console.log("UI: Estudiantes recibidos del backend:", students);

// //         const tbody = document.getElementById('studentsTableBody');
// //         if (!tbody) {
// //             console.error("UI: No se encontró el elemento 'studentsTableBody' en el DOM.");
// //             return;
// //         }

// //         tbody.innerHTML = '';

// //         if (!Array.isArray(students) || students.length === 0) {
// //             console.warn("UI: No hay estudiantes registrados para mostrar.");
// //             tbody.innerHTML = `<tr><td colspan="3" class="text-center text-muted">No hay estudiantes registrados</td></tr>`;
// //             return;
// //         }

// //         // Tomar los últimos 10 estudiantes (los más recientes al final del array)
// //         const lastTen = students.slice(-10).reverse(); // reverse para mostrar el más nuevo arriba

// //         lastTen.forEach(student => {
// //             console.log("UI: Agregando estudiante a la tabla:", student);
// //             const row = document.createElement('tr');
// //             row.innerHTML = `
// //                 <td>${student.id}</td>
// //                 <td>${student.name}</td>
// //                 <td>${student.career}</td>
// //             `;
// //             tbody.appendChild(row);
// //         });

// //         console.log(`UI: Se cargaron ${lastTen.length} estudiantes en la tabla.`);
// //     } catch (error) {
// //         console.error("UI: Error al cargar estudiantes:", error);
// //         Swal.fire({
// //             icon: "error",
// //             title: "Error",
// //             text: "No se pudieron cargar los estudiantes"
// //         });
// //     }
// // }
// async function loadStudentsTable() {
//     console.log("UI: Iniciando carga de estudiantes en la tabla...");

//     try {
//         const response = await fetch(API_STUDENT_URL, { // Ahora el backend responderá con todos si no hay 'career'
//             method: "GET",
//             headers
//         });
//         console.log("UI: Respuesta completa del fetch de estudiantes:", response);

//         const students = await response.json();
//         console.log("UI: Estudiantes recibidos del backend:", students);

//         const tbody = document.getElementById('studentsTableBody');
//         if (!tbody) {
//             console.error("UI: No se encontró el elemento 'studentsTableBody' en el DOM.");
//             return;
//         }

//         tbody.innerHTML = '';

//         if (!Array.isArray(students) || students.length === 0) {
//             console.warn("UI: No hay estudiantes registrados para mostrar.");
//             // Cambiado colspan a 4 ya que ahora hay 4 columnas (ID, Nombre, Carrera, Acciones)
//             tbody.innerHTML = `<tr><td colspan="4" class="text-center text-muted">No hay estudiantes registrados</td></tr>`;
//             return;
//         }

//         // Tomar los últimos 10 estudiantes (los más recientes al final del array)
//         const lastTen = students.slice(-10).reverse(); // reverse para mostrar el más nuevo arriba

//         lastTen.forEach(student => {
//             console.log("UI: Agregando estudiante a la tabla:", student);
//             const row = document.createElement('tr');
//             row.innerHTML = `
//                 <td>${student.id}</td>
//                 <td>${student.name}</td>
//                 <td>${student.career}</td>
//                 <td>
//                     <button class="btn btn-danger btn-sm" onclick="deleteStudent(${student.id})">
//                         <i class="fas fa-trash"></i> Eliminar
//                     </button>
//                 </td>
//             `;
//             tbody.appendChild(row);
//         });

//         console.log(`UI: Se cargaron ${lastTen.length} estudiantes en la tabla.`);
//     } catch (error) {
//         console.error("UI: Error al cargar estudiantes:", error);
//         Swal.fire({
//             icon: "error",
//             title: "Error",
//             text: "No se pudieron cargar los estudiantes"
//         });
//     }
// }

// // Lógica para eliminar estudiante
// async function deleteStudent(studentId) {
//     const confirm = await Swal.fire({
//         title: '¿Estás seguro?',
//         text: "Esta acción eliminará el estudiante.",
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#d33',
//         cancelButtonColor: '#3085d6',
//         confirmButtonText: 'Sí, eliminar',
//         cancelButtonText: 'Cancelar'
//     });

//     if (confirm.isConfirmed) {
//         try {
//             const response = await fetch(`${API_STUDENT_URL}/${studentId}`, {
//                 method: "DELETE",
//                 headers
//             });
//             if (response.ok) {
//                 Swal.fire({
//                     icon: "success",
//                     title: "Eliminado",
//                     text: "El estudiante fue eliminado correctamente"
//                 });
//                 loadStudentsTable(); // Recargar la tabla
//             } else {
//                 throw new Error("No se pudo eliminar el estudiante");
//             }
//         } catch (error) {
//             console.error("UI: Error al eliminar estudiante:", error);
//             Swal.fire({
//                 icon: "error",
//                 title: "Error",
//                 text: "No se pudo eliminar el estudiante"
//             });
//         }
//     }
// }

// //QUE SIGNIFICA ESTA LINEA
// // Esta línea se ejecuta al cargar el script para inicializar 
// // la tabla de estudiantes
// loadStudentsTable();



// // ============================================================================================
// // ===========================================================================================
// // =====================================Servicios para Carreras===============================


// async function registerCareerService(careerData) {
//     const response = await fetch(API_CAREERS_URL, {
//         method: "POST",
//         headers,
//         body: JSON.stringify(careerData)
//     });
//     return response.json();
// }

// async function getCareerByIdService(id) {
//     const response = await fetch(`${API_CAREERS_URL}/${id}`, {
//         method: "GET",
//         headers
//     });
//     return response.json();
// }

// async function getAllCareersService() {
//     const response = await fetch(API_CAREERS_URL, {
//         method: "GET",
//         headers
//     });
//     return response.json();
// }

// async function deleteCareerService(id) {
//     const response = await fetch(`${API_CAREERS_URL}/${id}`, {
//         method: "DELETE",
//         headers
//     });
//     return response.json();
// }

// // async function getAllCategoriesService() {
// //     const response = await fetch(API_CATEGORIES_URL, {
// //         method: "GET",
// //         headers
// //     });
// //     return response.json();
// // }


// // async function updateCareerService(id, careerData) {
// //     const response = await fetch(`${API_CAREERS_URL}/${id}`, {
// //         method: "PUT",
// //         headers,
// //         body: JSON.stringify(careerData)
// //     });
// //     if (!response.ok) {
// //         const text = await response.text();
// //         throw new Error(`(${response.status}) ${text}`);
// //     }
// //     return response.json();
// // }
// // ...código existente...
// async function updateCareerService(id, careerData) {
//     const response = await fetch(`${API_CAREERS_URL}/${id}`, {
//         method: "PUT",
//         headers,
//         body: JSON.stringify(careerData)
//     });
//     if (!response.ok) {
//         const text = await response.text();
//         throw new Error(`(${response.status}) ${text}`);
//     }
//     return response.json();
// }
// // ...código existente...


// // =======================================Servicios para Carreras=============================
// // ===========================================================================================
// // ====================================================================
// // ============================================================================================
// // ===========================================================================================



// async function registerCareer() {
//     // const id = document.getElementById('careerId').value;
//     const id = document.getElementById('careerId').value;
//     const name = document.getElementById('registerName').value.trim();
//     const code = document.getElementById('careerCode').value.trim();
//     const duration = document.getElementById('careerDuration').value.trim();
//     const category = document.getElementById('careerCategory').value;
//     const modality = document.getElementById('careerModality').value;

//     if (!name || !duration || !category || !modality) {
//         Swal.fire({ icon: 'error', title: 'Error', text: 'Completa todos los campos obligatorios.' });
//         return;
//     }

//     const data = { name };
//     console.log("UI: Datos a enviar:", data);

//     try {
//         let result; 
//         if (id) {
//             console.log("UI: Modo edición. Actualizando carrera ID:", id);
//             result = await updateCareerService(id, data);
//         } else {
//             console.log("UI: Modo registro. Creando nueva carrera.");
//             result = await registerCareerService(data);
//         }

//         if (result.error) {
//             throw new Error(result.error);
//         }

//         Swal.fire({ icon: 'success', title: 'Éxito', text: id ? 'Carrera actualizada.' : 'Carrera registrada.' });

//         document.getElementById('careerForm').reset();
//         document.getElementById('careerId').value = '';

//         const btn = document.querySelector('#careerForm button[type="submit"]');
//         btn.innerHTML = `<i class="fas fa-save me-1"></i>Registrar`;
//         btn.classList.remove('btn-success');
//         btn.classList.add('btn-primary');

//         loadCareersTable();

//     } catch (error) {
//         console.error("UI: Error en la operación:", error);
//         Swal.fire({ icon: 'error', title: 'Error', text: error.message || 'No se pudo completar la operación.' });
//     }
// }



// async function getCareerById() {
//     const id = document.getElementById('studentId').value.trim();

//     if (!id) {
//         Swal.fire({
//             icon: "error",
//             title: "Error",
//             text: "Por favor ingrese un ID válido"
//         });
//         return;
//     }

//     try {
//         const career = await getCareerByIdService(id);
//         const resultContainer = document.getElementById('getResult');

//         if (career.error) {
//             resultContainer.innerHTML = `<span class="text-danger">${career.error}</span>`;
//         } else {
//             resultContainer.innerHTML = `
//                 <div class="alert alert-info">
//                     <strong>ID:</strong> ${career.id}<br>
//                     <strong>Nombre:</strong> ${career.name}
//                 </div>
//                 <button id="clearSearchBtn" type="button" class="btn btn-secondary mt-2">Limpiar</button>
//             `;
//             // Agrega el evento al botón limpiar
//             document.getElementById('clearSearchBtn').onclick = () => {
//                 document.getElementById('studentId').value = '';
//                 resultContainer.innerHTML = '';
//             };
//         }
//     } catch (error) {
//         console.error("Error al buscar carrera:", error);
//         document.getElementById('getResult').textContent = "Error al buscar carrera";
//     }
// }

// // ...existing code...

// // Cargar categorías en el select del formulario de carreras
// async function loadCategoriesSelect() {
//     const select = document.getElementById('careerCategory');
//     if (!select) return;
//     select.innerHTML = '<option value="">Seleccione una categoría</option>'; // Opción por defecto
//     try {
//         const categories = await getAllCategoriesService();
//         categories.forEach(cat => {
//             const option = document.createElement('option');
//             option.value = cat.id;
//             option.textContent = cat.name;
//             select.appendChild(option);
//         });
//     } catch (error) {
//         console.error("Error al cargar categorías en el select:", error);
//         // Puedes mostrar un mensaje si quieres
//     }
// }


// // async function loadCareersTable() {
// //     console.log("UI: Iniciando carga de carreras en la tabla...");
// //     try {
// //         const careers = await getAllCareersService();
// //         console.log("UI: Carreras recibidas del backend:", careers);

// //         const tbody = document.getElementById('careersTableBody');
// //         if (!tbody) {
// //             console.error("UI: No se encontró el elemento 'careersTableBody' en el DOM.");
// //             return;
// //         }

// //         tbody.innerHTML = '';

// //         if (!Array.isArray(careers) || careers.length === 0) {
// //             console.warn("UI: No hay carreras registradas para mostrar.");
// //             tbody.innerHTML = `<tr><td colspan="3" class="text-center text-muted">No hay carreras registradas aún</td></tr>`;
// //             return;
// //         }

// //         careers.forEach(career => {
// //             const row = document.createElement('tr');
// //             row.innerHTML = `
// //                 <td>${career.id}</td>
// //                 <td>${career.name}</td>
// //                 <td>
// //                     <button class="btn btn-sm btn-warning me-2" onclick="editCareer(${career.id})">
// //                         <i class="fas fa-edit"></i> Editar
// //                     </button>
// //                     <button class="btn btn-sm btn-danger" onclick="deleteCareerById(${career.id})">
// //                         <i class="fas fa-trash-alt"></i> Eliminar
// //                     </button>

// //                 </td>`;
// //             tbody.appendChild(row);
// //         });

// //         console.log(`UI: Se cargaron ${careers.length} carreras en la tabla.`);
// //     } catch (error) {
// //         console.error("UI: Error al cargar carreras:", error);
// //         Swal.fire({
// //             icon: "error",
// //             title: "Error",
// //             text: "No se pudieron cargar las carreras"
// //         });
// //     }
// // }
// async function loadCareersTable() {
//     console.log("UI: Iniciando carga de carreras en la tabla...");
//     try {
//         const careers = await getAllCareersService();
//         console.log("UI: Carreras recibidas del backend:", careers);

//         const tbody = document.getElementById('careersTableBody');
//         if (!tbody) {
//             console.error("UI: No se encontró el elemento 'careersTableBody' en el DOM.");
//             return;
//         }

//         tbody.innerHTML = '';

//         if (!Array.isArray(careers) || careers.length === 0) {
//             console.warn("UI: No hay carreras registradas para mostrar.");
//             tbody.innerHTML = `<tr><td colspan="3" class="text-center text-muted">No hay carreras registradas aún</td></tr>`;
//             return;
//         }

//         careers.forEach(career => {
//             console.log("Renderizando carrera:", career); // <-- Nuevo log para depuración
//             const row = document.createElement('tr');
//             row.innerHTML = `
//                 <td>${career.id}</td>
//                 <td>${career.name}</td>
//                 <td>
//                     <button class="btn btn-sm btn-warning me-2" onclick="editCareer(${career.id})">
//                         <i class="fas fa-edit"></i> Editar
//                     </button>
//                     <button class="btn btn-sm btn-danger" onclick="deleteCareerById(${career.id})">
//                         <i class="fas fa-trash-alt"></i> Eliminar
//                     </button>
//                 </td>`;
//             tbody.appendChild(row);
//         });

//         console.log(`UI: Se cargaron ${careers.length} carreras en la tabla.`);
//     } catch (error) {
//         console.error("UI: Error al cargar carreras:", error);
//         Swal.fire({
//             icon: "error",
//             title: "Error",
//             text: "No se pudieron cargar las carreras"
//         });
//     }
// }

// // ELIMINAR CARRERA POR ID
// async function deleteCareerById(id) {
//     try {
//         const confirm = await Swal.fire({
//             title: "¿Está seguro?",
//             text: `¿Desea eliminar la carrera con ID ${id}?`,
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonText: "Sí, eliminar",
//             cancelButtonText: "Cancelar"
//         });

//         if (!confirm.isConfirmed) return;

//         const result = await deleteCareerService(id);

//         if (result.error) {
//             Swal.fire({
//                 icon: "error",
//                 title: "Error",
//                 text: result.error
//             });
//             return;
//         }

//         Swal.fire({
//             icon: "success",
//             title: "Eliminado",
//             text: "Carrera eliminada correctamente"
//         });

//         loadCareersTable();

//     } catch (error) {
//         console.error("Error al eliminar carrera:", error);
//         Swal.fire({
//             icon: "error",
//             title: "Error",
//             text: "No se pudo eliminar la carrera"
//         });
//     }
// }



// // // ===================================================================================
// // // ===================================================================================
// // // ===================================================================================

// async function registerCategoryService(name) {
//     console.log("SERVICIO: registerCategoryService - Llamando con nombre:", name);
//     const response = await fetch(API_CATEGORIES_URL, {
//         method: "POST",
//         headers,
//         body: JSON.stringify({ name }) // Envía solo 'name' como lo espera tu index.js
//     });
//     const result = await response.json();
//     console.log("SERVICIO: registerCategoryService - Respuesta:", result);
//     return result;
// }
// async function getCategoryByIdService(id) {
//     console.log("SERVICIO: getCategoryByIdService - Llamando con ID:", id);
//     const response = await fetch(`${API_CATEGORIES_URL}/${id}`, {
//         method: "GET",
//         headers
//     });
//     if (!response.ok) {
//         const txt = await response.text();
//         console.error("SERVICIO: Error en getCategoryByIdService - Estado:", response.status, "Texto:", txt);
//         throw new Error(`(${response.status}) ${txt}`);
//     }
//     const result = await response.json();
//     console.log("SERVICIO: getCategoryByIdService - Respuesta:", result);
//     return result;
// }

// async function getAllCategoriesService() {
//   console.log("SERVICIO: getAllCategoriesService - Llamando.");
//   const response = await fetch(API_CATEGORIES_URL, {
//     method: 'GET',
//     headers
//   });
//   if (!response.ok) {
//     const txt = await response.text();
//     console.error("SERVICIO: Error en getAllCategoriesService - Estado:", response.status, "Texto:", txt);
//     throw new Error(`(${response.status}) ${txt}`);
//   }
//   const result = await response.json();
//   console.log("SERVICIO: getAllCategoriesService - Respuesta:", result);
//   return result;
// }
// // El servicio updateCategoryService ha sido eliminado ya que la edición se ha quitado.
// async function deleteCategoryService(id) {
//     console.log("SERVICIO: deleteCategoryService - Llamando con ID:", id);
//     const response = await fetch(`${API_CATEGORIES_URL}/${id}`, {
//         method: "DELETE",
//         headers
//     });
//     const result = await response.json();
//     console.log("SERVICIO: deleteCategoryService - Respuesta:", result);
//     return result;
// }

// // ====================================================================================
// // ======================== FUNCIONES DE LÓGICA DE UI PARA CATEGORÍAS =================
// // ====================================================================================

// /**
//  * Maneja el envío del formulario de categorías.
//  * Se encarga de registrar nuevas categorías. La lógica de edición ha sido eliminada.
//  * @param {Event} event El evento de submit del formulario.
//  */
// async function handleCategoryForm(event) {
//   console.log("UI: handleCategoryForm - Iniciando (solo registro).");
//   event.preventDefault(); // Evita la recarga de la página

//   const name = document.getElementById('categoryName').value.trim();
//   // categoryId ya no se usa aquí para determinar si es edición.
//   console.log("UI: handleCategoryForm - Nombre de categoría:", name);

//   if (!name) {
//     console.log("UI: handleCategoryForm - Validación fallida: nombre vacío.");
//     Swal.fire({ icon: 'error', title: 'Error', text: 'Por favor ingrese el nombre de la categoría' });
//     return;
//   }

//   try {
//     console.log("UI: handleCategoryForm - Llamando a registerCategoryService para un nuevo registro.");
//     const result = await registerCategoryService(name); // Siempre es un nuevo registro
//     console.log("UI: handleCategoryForm - Respuesta del servicio:", result);

//     if (result.error) {
//       console.error("UI: handleCategoryForm - Error recibido del backend:", result.error);
//       Swal.fire({ icon: 'error', title: 'Error', text: result.error });
//       return;
//     }

//     console.log("UI: handleCategoryForm - Operación de registro exitosa. Mostrando SweetAlert.");
//     Swal.fire({
//       icon: 'success',
//       title: 'Éxito',
//       text: 'Categoría registrada correctamente',
//     });

//     console.log("UI: handleCategoryForm - Limpiando formulario y recargando tabla.");
//     resetCategoryForm(); // Limpia el formulario
//     loadCategoriesTable(); // Recarga la tabla para mostrar los cambios
//   } catch (error) {
//     console.error('UI: handleCategoryForm - Error en la operación:', error);
//     Swal.fire({ icon: 'error', title: 'Error', text: error.message || 'No se pudo completar la operación' });
//   }
// }

// // La función editCategory ha sido eliminada ya que la edición se ha quitado.

// /**
//  * Elimina una categoría específica después de solicitar una confirmación.
//  * @param {number} id El ID de la categoría a eliminar.
//  */
// async function deleteCategoryById(id) {
//   console.log("UI: deleteCategoryById - Iniciando eliminación para ID:", id);
//   try {
//     console.log("UI: deleteCategoryById - Llamando a getAllCategoriesService para obtener detalles.");
//     const categories = await getAllCategoriesService();
//     const category = categories.find((c) => c.id == id);
//     console.log("UI: deleteCategoryById - Categoría encontrada para confirmación:", category);

//     if (!category) {
//         console.error("UI: deleteCategoryById - Categoría no encontrada en el frontend para eliminar.");
//         Swal.fire({ icon: 'error', title: 'Error', text: 'Categoría no encontrada para eliminar.' });
//         return;
//     }

//     console.log("UI: deleteCategoryById - Mostrando SweetAlert de confirmación.");
//     const confirm = await Swal.fire({
//       title: `¿Deseas eliminar la categoría?`,
//       html: `<b>Categoría:</b> ${category.name}<br><b>ID:</b> ${category.id}`,
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonText: 'Sí, eliminar',
//       cancelButtonText: 'Cancelar',
//     });

//     if (confirm.isConfirmed) {
//       console.log("UI: deleteCategoryById - Confirmación aceptada. Llamando a deleteCategoryService.");
//       const result = await deleteCategoryService(id);
//       console.log("UI: deleteCategoryById - Respuesta del servicio de eliminación:", result);

//       if (result.error) {
//         console.error("UI: deleteCategoryById - Error recibido del backend al eliminar:", result.error);
//         Swal.fire({ icon: 'error', title: 'Error', text: result.error });
//         return;
//       }

//       console.log("UI: deleteCategoryById - Eliminación exitosa. Recargando tabla.");
//       Swal.fire({ icon: 'success', title: 'Eliminado', text: 'Categoría eliminada correctamente' });
//       loadCategoriesTable();
//     } else {
//         console.log("UI: deleteCategoryById - Eliminación cancelada por el usuario.");
//     }
//   } catch (error) {
//     console.error('UI: deleteCategoryById - Error en la operación:', error);
//     Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo eliminar la categoría' });
//   }
// }


// async function loadCategoriesTable() {
//   console.log("UI: loadCategoriesTable - Iniciando carga de tabla.");
//   try {
//     const categories = await getAllCategoriesService();
//     console.log("UI: loadCategoriesTable - Categorías obtenidas:", categories);
//     const tbody = document.getElementById('categoriesTableBody');
//     if (!tbody) {
//         console.log("UI: loadCategoriesTable - Elemento 'categoriesTableBody' no encontrado en el DOM.");
//         return;
//     }
//     tbody.innerHTML = '';
//     if (!Array.isArray(categories) || categories.length === 0) {
//       tbody.innerHTML = '<tr><td colspan="3" class="text-center">No hay categorías registradas</td></tr>';
//       return;
//     }
//     categories.forEach((category) => {
//       const row = document.createElement('tr');
//       row.innerHTML = `
//         <td>${category.id}</td>
//         <td>${category.name}</td>
//         <td>
//             <button class="btn btn-sm btn-danger" onclick="deleteCategoryById(${category.id})">
//                 <i class="fas fa-trash-alt"></i> Eliminar
//             </button>
//         </td>`;
//       tbody.appendChild(row);
//     });
//     console.log(`UI: loadCategoriesTable - ${categories.length} categorías añadidas a la tabla.`);
//   } catch (error) {
//     console.error('UI: loadCategoriesTable - Error al cargar categorías en la tabla:', error);
//     Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudieron cargar las categorías' });
//   }
// }
// /**
//  * Limpia y reinicia todos los campos del formulario de categorías a su estado inicial.
//  * También restablece el texto y el estilo del botón de submit.
//  */
// function resetCategoryForm() {
//   console.log("UI: resetCategoryForm - Iniciando.");
//   document.getElementById('categoryForm').reset(); // Resetea todos los campos del formulario.
//   document.getElementById('categoryId').value = ''; // Limpia el ID oculto (aunque ya no se use para edición).
//   document.getElementById('categoryName').value = ''; // Limpiar campo de nombre

//   // Restablece el texto y estilo del botón de submit a "Guardar Categoría".
//   const submitButton = document.querySelector('#categoryForm button[type="submit"]');
//   if (submitButton) {
//       submitButton.innerHTML = `<i class="fas fa-save me-1"></i> Guardar Categoría`;
//       submitButton.classList.remove('btn-success'); // Asegura que no tenga la clase de éxito
//       submitButton.classList.add('btn-primary'); // Asegura que tenga la clase primaria
//       console.log("UI: resetCategoryForm - Botón de formulario restablecido a 'Guardar Categoría'.");
//   } else {
//       console.warn("UI: resetCategoryForm - Botón de submit del formulario no encontrado para reset.");
//   }
//   console.log("UI: resetCategoryForm - Formulario de categorías reseteado.");
// }

// // ===========================================================================

// async function getCategoryByIdUI(id) {
//     try {
//         const detailsDiv = document.getElementById('categoryDetails');
//         const detailId = document.getElementById('detailCategoryId');
//         const detailName = document.getElementById('detailCategoryName');
//         detailsDiv.classList.add('d-none');
//         detailId.textContent = '';
//         detailName.textContent = '';

//         const category = await getCategoryByIdService(id);
//         if (category.error) {
//             Swal.fire({ icon: "error", title: "No encontrado", text: category.error });
//             return;
//         }
//         detailId.textContent = category.id;
//         detailName.textContent = category.name;
//         detailsDiv.classList.remove('d-none');
//     } catch (error) {
//         Swal.fire({ icon: "error", title: "Error", text: "No se pudo encontrar la categoría. Intente con otro número." });
//     }
// }
// // ====================================================================================
// // ============================= INICIALIZACIÓN AL CARGAR EL DOM (Solo Categorías) ====
// // ====================================================================================



// // document.addEventListener('DOMContentLoaded', () => {
// //     // --- Categorías ---
// //     const categoryForm = document.getElementById('categoryForm');
// //     if (categoryForm) {
// //         categoryForm.addEventListener('submit', handleCategoryForm);
// //         console.log("UI: DOMContentLoaded - Listener de submit para categoryForm añadido (handleCategoryForm).");
// //     }
// //     if (document.getElementById('categoriesTableBody')) {
// //         loadCategoriesTable();
// //         console.log("UI: DOMContentLoaded - loadCategoriesTable() ejecutado.");
// //     }

// //     // --- Carreras ---
// //     const careerForm = document.getElementById('careerForm');
// //     if (careerForm) {
// //         careerForm.addEventListener('submit', (e) => {
// //             e.preventDefault();
// //             registerCareer();
// //         });
// //         loadCategoriesSelect();
// //     }
// //     if (document.getElementById('careersTableBody')) {
// //         loadCareersTable();
// //     }

// //     // --- Estudiantes ---
// //     if (document.getElementById('studentsTableBody')) {
// //         loadStudentsTable();
// //     }
// //     if (document.getElementById('studentForm')) {
// //         loadCareersForStudentForm();
// //         loadCareersForSearchSelect();
// //         document.getElementById('studentForm').addEventListener('submit', function(e) {
// //             e.preventDefault();
// //             registerStudent();
// //         });
// //     }
// //     const refreshBtn = document.getElementById('refreshStudentsBtn');
// //     if (refreshBtn) {
// //         refreshBtn.addEventListener('click', loadStudentsTable);
// //     }

// //     // --- Búsqueda por carrera ---
// //     const searchCareerForm = document.getElementById('searchStudentByCareerForm');
// //     if (searchCareerForm) {
// //         searchCareerForm.addEventListener('submit', function(e) {
// //             e.preventDefault();
// //             const selectedCareer = document.getElementById('searchCareer').value;
// //             if (selectedCareer) {
// //                 searchStudentsByCareer(selectedCareer);
// //             } else {
// //                 loadStudentsTable();
// //             }
// //         });
// //     }
// //     const searchForm = document.getElementById('searchCareerForm');
// //     if (searchForm) {
// //         searchForm.addEventListener('submit', function(e) {
// //             e.preventDefault();
// //             getCareerById();
// //         });
// //     }

// //     // --- Búsqueda por ID ---
// //     const searchStudentForm = document.getElementById('searchStudentForm');
// //     if (searchStudentForm) {
// //         searchStudentForm.addEventListener('submit', function(e) {
// //             e.preventDefault();
// //             const id = document.getElementById('searchStudentId').value.trim();
// //             if (id) {
// //                 getStudentById(id);
// //             }
// //         });
// //     }
// //     const clearBtn = document.getElementById('clearStudentDetails');
// //     if (clearBtn) {
// //         clearBtn.addEventListener('click', function() {
// //             document.getElementById('studentDetails').classList.add('d-none');
// //             document.getElementById('detailId').textContent = '';
// //             document.getElementById('detailName').textContent = '';
// //             document.getElementById('detailCareer').textContent = '';
// //             document.getElementById('detailCategory').textContent = '';
// //             document.getElementById('searchStudentId').value = '';
// //         });
// //     }
// // });


// // ====================================================================================
// // ============================= INICIALIZACIÓN AL CARGAR EL DOM (Solo Categorías) ====
// // ====================================================================================

// document.addEventListener('DOMContentLoaded', () => {
//     // --- Categorías ---
//     const categoryForm = document.getElementById('categoryForm');
//     if (categoryForm) {
//         categoryForm.addEventListener('submit', handleCategoryForm);
//         console.log("UI: DOMContentLoaded - Listener de submit para categoryForm añadido (handleCategoryForm).");
//     }
//     if (document.getElementById('categoriesTableBody')) {
//         loadCategoriesTable();
//         console.log("UI: DOMContentLoaded - loadCategoriesTable() ejecutado.");
//     }

//     // --- Buscar Categoría por ID ---
//     const searchCategoryForm = document.getElementById('searchCategoryForm');
//     if (searchCategoryForm) {
//         searchCategoryForm.addEventListener('submit', function(e) {
//             e.preventDefault();
//             const id = document.getElementById('searchCategoryId').value.trim();
//             if (id) {
//                 getCategoryByIdUI(id);
//             }
//         });
//     }
//     const clearCategoryBtn = document.getElementById('clearCategoryDetails');
//     if (clearCategoryBtn) {
//         clearCategoryBtn.addEventListener('click', function() {
//             document.getElementById('categoryDetails').classList.add('d-none');
//             document.getElementById('detailCategoryId').textContent = '';
//             document.getElementById('detailCategoryName').textContent = '';
//             document.getElementById('searchCategoryId').value = '';
//         });
//     }

//     // --- Carreras ---
//     const careerForm = document.getElementById('careerForm');
//     if (careerForm) {
//         careerForm.addEventListener('submit', (e) => {
//             e.preventDefault();
//             registerCareer();
//         });
//         loadCategoriesSelect();
//     }
//     if (document.getElementById('careersTableBody')) {
//         loadCareersTable();
//     }

//     // --- Estudiantes ---
//     if (document.getElementById('studentsTableBody')) {
//         loadStudentsTable();
//     }
//     if (document.getElementById('studentForm')) {
//         loadCareersForStudentForm();
//         loadCareersForSearchSelect();
//         document.getElementById('studentForm').addEventListener('submit', function(e) {
//             e.preventDefault();
//             registerStudent();
//         });
//     }
//     const refreshBtn = document.getElementById('refreshStudentsBtn');
//     if (refreshBtn) {
//         refreshBtn.addEventListener('click', loadStudentsTable);
//     }

//     // --- Búsqueda por carrera ---
//     const searchCareerForm = document.getElementById('searchStudentByCareerForm');
//     if (searchCareerForm) {
//         searchCareerForm.addEventListener('submit', function(e) {
//             e.preventDefault();
//             const selectedCareer = document.getElementById('searchCareer').value;
//             if (selectedCareer) {
//                 searchStudentsByCareer(selectedCareer);
//             } else {
//                 loadStudentsTable();
//             }
//         });
//     }
//     const searchForm = document.getElementById('searchCareerForm');
//     if (searchForm) {
//         searchForm.addEventListener('submit', function(e) {
//             e.preventDefault();
//             getCareerById();
//         });
//     }

//     // --- Búsqueda por ID de estudiante ---
//     const searchStudentForm = document.getElementById('searchStudentForm');
//     if (searchStudentForm) {
//         searchStudentForm.addEventListener('submit', function(e) {
//             e.preventDefault();
//             const id = document.getElementById('searchStudentId').value.trim();
//             if (id) {
//                 getStudentById(id);
//             }
//         });
//     }
//     const clearBtn = document.getElementById('clearStudentDetails');
//     if (clearBtn) {
//         clearBtn.addEventListener('click', function() {
//             document.getElementById('studentDetails').classList.add('d-none');
//             document.getElementById('detailId').textContent = '';
//             document.getElementById('detailName').textContent = '';
//             document.getElementById('detailCareer').textContent = '';
//             document.getElementById('detailCategory').textContent = '';
//             document.getElementById('searchStudentId').value = '';
//         });
//     }
// });

// async function editCareer(id) {
//     console.log("UI: Editar carrera con ID:", id);

//     try {
//         const career = await getCareerByIdService(id);
//         console.log("UI: Datos de la carrera para editar:", career);

//         document.getElementById('careerId').value = career.id;
//         document.getElementById('registerName').value = career.name;
//         document.getElementById('careerCode').value = career.code || '';
//         document.getElementById('careerDuration').value = career.duration || '';
//         document.getElementById('careerCategory').value = career.category || '';
//         document.getElementById('careerModality').value = career.modality || '';

//         const btn = document.querySelector('#careerForm button[type="submit"]');
//         btn.innerHTML = `<i class="fas fa-sync-alt me-1"></i>Actualizar`;
//         btn.classList.remove('btn-primary');
//         btn.classList.add('btn-success');
//     } catch (error) {
//         console.error("UI: Error al cargar datos para edición:", error);
//         Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo cargar la carrera para editar.' });
//     }
// }

// function resetCareerForm() {
//     document.getElementById('careerForm').reset();
//     document.getElementById('careerId').value = '';
//     const btn = document.querySelector('#careerForm button[type="submit"]');
//     btn.innerHTML = `<i class="fas fa-save me-1"></i>Registrar`;
//     btn.classList.remove('btn-success');
//     btn.classList.add('btn-primary');
// }

