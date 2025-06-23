const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 5001;

// API Key ficticia
const API_KEY = '12345ABCDEF';

// Middleware
app.use(cors());
app.use(express.json());

// Archivo donde se almacenan los estudiantes
const STUDENTS_FILE = './students.json';
const CAREERS_FILE = './careers.json';
const CATEGORIES_FILE = './categories.json';

//=====================================================================================================
// Función para leer estudiantes desde archivo
function loadStudents() {
    try {
        const data = fs.readFileSync(STUDENTS_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error loading students, using empty list.", error);
        return [];
    }
}
//=====================================================================================================
// Función para guardar estudiantes en archivo
function saveStudents(students) {
    try {
        fs.writeFileSync(STUDENTS_FILE, JSON.stringify(students, null, 2));
    } catch (error) {
        console.error("Error saving students:", error);
    }
}
//=====================================================================================================
// Función para leer carreras desde archivo
function loadCareers() {
    try {
        const data = fs.readFileSync(CAREERS_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error loading careers, using empty list.", error);
        return [];
    }
}
//=====================================================================================================
// Función para guardar carreras en archivo
function saveCareers(careers) {
    try {
        fs.writeFileSync(CAREERS_FILE, JSON.stringify(careers, null, 2));
    } catch (error) {
        console.error("Error saving careers:", error);
    }
}
//=====================================================================================================
// Función para leer categorías desde archivo
function loadCategories() {
    try {
        const data = fs.readFileSync(CATEGORIES_FILE, 'utf-8');
        return JSON.parse(data);
    }
    catch (error) {
        console.error("Error loading categories, using empty list.", error);
        return [];
    }
}
//=====================================================================================================
// Función para guardar categorías en archivo
function saveCategories(categories) {
    try {
        fs.writeFileSync(CATEGORIES_FILE, JSON.stringify(categories, null, 2));
    } catch (error) {
        console.error("Error saving categories:", error);
    }
}
//=====================================================================================================
// Inicializar estudiantes
let students = loadStudents();
// Inicializar carreras
let careers = loadCareers();
// Inicializar categorías
let categories = loadCategories();
//=====================================================================================================
// Middleware para validar API Key
app.use((req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || authHeader !== `Bearer ${API_KEY}`) {
        return res.status(401).json({ error: 'Unauthorized. Invalid API Key.' });
    }
    next();
});
//=====================================================================================================



//=====================================================================================================
// ============================
// Endpoints
// ============================
//=====================================================================================================


//=====================================================================================================
//=====================================================================================================
//=====================================CRUD PARA CARRERAS==============================================



// Registrar nuevo estudiante
app.post('/api/students', (req, res) => {
    const { name, career } = req.body;
    if (!name || !career) {
        return res.status(400).json({ error: "Missing required fields: name and career." });
    }
    const newStudentId = students.length ? students[students.length - 1].id + 1 : 1;
    const newStudent = {
        id: newStudentId,
        name,
        career
    };
    students.push(newStudent);
    saveStudents(students); // Guardar cambios
    return res.status(201).json({ message: "Student registered successfully.", student: newStudent });
});

//=====================================================================================================

// Consultar estudiante por ID
app.get('/api/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const student = students.find(s => s.id === id);
    if (!student) {
        return res.status(404).json({ error: "Student not found." });
    }
    return res.status(200).json(student);
});

//=====================================================================================================

// Consultar estudiantes por carrera
app.get('/api/students', (req, res) => {
    const career = req.query.career;
    // Si se proporciona un filtro de carrera, filtra los estudiantes
    if (career) {
        const filtered = students.filter(s => s.career.toLowerCase() === career.toLowerCase());
        return res.status(200).json(filtered);
    }
    // Si no se proporciona un filtro de carrera, devuelve todos los estudiantes
    return res.status(200).json(students); // Este es el cambio clave para que muestre todos
});

//=====================================================================================================

// Eliminar estudiante por ID
app.delete('/api/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = students.findIndex(s => s.id === id);
    if (index === -1) {
        return res.status(404).json({ error: "Student not found for deletion." });
    }
    students.splice(index, 1);
    saveStudents(students); // Guardar cambios
    return res.status(200).json({ message: "Student deleted successfully." });
});

//=====================================================================================================
//=====================================================================================================
//====================CRUD PARA CARRERAS=================================================================

// Registrar nueva carrera
app.post('/api/careers', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: "Missing required field: name." });
    }
    const existingCareer = careers.find(c => c.name.toLowerCase() === name.toLowerCase());
    // Verificar si la carrera ya existe  
    if (existingCareer) {
        return res.status(409).json({ error: "Career already exists." });
    }
    const newCareersId = careers.length ? careers[careers.length - 1].id + 1 : 1;
    // Logica para guardar la carrera en el archivo o base de datos
    const newCareer = {
        id: newCareersId,
        name
    };
    // Agregar la nueva carrera al array de carreras
    // Guardar la nueva carrera en el array de carreras
    careers.push(newCareer);
    saveCareers(careers); // Guardar cambios
    // Devolver una respuesta exitosa
    return res.status(201).json({ message: "Career registered successfully.", career: { name } });
});

//=====================================================================================================

// Consultar todas las carreras
app.get('/api/careers', (req, res) => {
    const careers = loadCareers(); // <-- Lee el archivo cada vez
    const careerName = req.query.name;

    if (careerName) {
        const filteredCareers = careers.filter(c => c.name.toLowerCase() === careerName.toLowerCase());
        return res.status(200).json(filteredCareers);
    }
    return res.status(200).json(careers);
});

//=====================================================================================================

// Consultar carrera por ID
app.get('/api/careers/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const careers = loadCareers(); // <-- Lee el archivo cada vez
    const career = careers.find(c => c.id === id);

    if (!career) {
        return res.status(404).json({ error: "Career not found." });
    }

    return res.status(200).json(career);
});

//=====================================================================================================

// Borrar carrera por ID
app.delete('/api/careers/:id', (req, res) => {
    const id = parseInt(req.params.id); 
    const index = careers.findIndex(c => c.id === id);
    if (index === -1) {
        return res.status(404).json({ error: "Career not found for deletion." });
    }
    // Verificar si hay estudiantes asociados a la carrera
    const studentsInCareer = students.filter(s => s.career.toLowerCase() === careers[index].name.toLowerCase());
    if (studentsInCareer.length > 0) {
        return res.status(400).json({ error: "Cannot delete career with associated students." });
    }
    careers.splice(index, 1);
    saveCareers(careers); // Guardar cambios
    return res.status(200).json({ message: "Career deleted successfully." });
});

// ================================================================

// Actualizar carrera por ID
app.put('/api/careers/:id', (req, res) => {
    const id = req.params.id; // ⚠️ Lo dejamos como STRING
    const careers = loadCareers();
      // Comparación como string para evitar problemas de precisión o tipo
    const index = careers.findIndex(c => String(c.id) === String(id));
    if (index === -1) {
            return res.status(404).json({ error: "Career not found." });
    }
    careers[index] = {
        id: careers[index].id,
        name: req.body.name || careers[index].name
    };
    saveCareers(careers);
    // console.log("✅ Carrera actualizada correctamente:", careers[index]);
    return res.status(200).json({
        message: "Career updated successfully.",
        career: careers[index]
    });
});


// ====================================================================================================
//=====================================================================================================
//=====================================================================================================
//============CATEGORIAS DE CARRERAS====================================================================

//CRUD para categorías de carreras
app.post('/api/categories', (req, res) => {
    const { name } = req.body;
    // Validar que se haya proporcionado el nombre de la categoría
    if (!name) {
        return res.status(400).json({ error: "Missing required field: name." });
    }
    // Cargar las categorías desde el archivo
    const existingCategory = categories.find(c => c.name.toLowerCase() === name.toLowerCase());
    // Verificar si la categoría ya existe
    if (existingCategory) {
        return res.status(409).json({ error: "Career category already exists." });
    }
    // Crear una nueva categoría
    // Generar un nuevo ID para la categoría
    const newCategoryId = categories.length ? categories[categories.length - 1].id + 1 : 1;
    // Crear la nueva categoría
    const newCategory = {
        id: newCategoryId,
        name
    };
    // Agregar la nueva categoría al array de categorías
    // Guardar la nueva categoría en el array de categorías
    categories.push(newCategory);
    saveCategories(categories); 
    // Devolver una respuesta exitosa
    return res.status(201).json({ message: "Career category registered successfully.", category: { name } });
});

//=====================================================================================================


// Consultar categoría de carrera por ID
app.get('/api/categories/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const category = categories.find(c => c.id === id);
    // Cargar las categorías desde el archivo
    if (!category) {
        return res.status(404).json({ error: "Career category not found." });
    }
    // Devolver la categoría encontrada
    return res.status(200).json(category);
});

//=====================================================================================================

// Consultar todas las categorías de carreras
app.get('/api/categories', (req, res) => {
    const categoryName = req.query.name;
    // Cargar las categorías desde el archivo
    if (categoryName) {
        const filteredCategories = categories.filter(c => c.name.toLowerCase() === categoryName.toLowerCase());
        return res.status(200).json(filteredCategories);
    }
    return res.status(200).json(categories);
});

//=====================================================================================================

// Borrar categoría de carrera por ID
app.delete('/api/categories/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = categories.findIndex(c => c.id === id);
    // Cargar las categorías desde el archivo
    if (index === -1) {
        return res.status(404).json({ error: "Career category not found for deletion." });
    }
    // Verificar si hay carreras asociadas a la categoría
    const categoriesInCategory = categories.filter(c => c.categoryId === id);
    if (categoriesInCategory.length > 0) {
        return res.status(400).json({ error: "Cannot delete category with associated categories." });
    }
    // Eliminar la categoría del array de categorías
    categories.splice(index, 1);
    saveCategories(categories); // Guardar cambios
    // Devolver una respuesta exitosa
    return res.status(200).json({ message: "Career category deleted successfully." });
});


//=====================================================================================================

// ============================
// Start server
// ============================
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
