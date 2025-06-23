# 📘 README - Sistema de Gestión de Estudiantes, Carreras y Categorías

## 🧾 ¿Qué hace este archivo?

Este archivo describe el funcionamiento general y la arquitectura del sistema de gestión que permite registrar, buscar, actualizar y eliminar **estudiantes**, **carreras** y **categorías**. Además, documenta el flujo de datos entre el frontend y el backend, y detalla el uso de inteligencia artificial durante el desarrollo.

---

## 🧩 Descripción General del Sistema

El sistema permite gestionar información a través de tres vistas principales del **frontend**:

- 📄 `estudiantes.html`
- 🏫 `carreras.html`
- 🗂️ `categorias.html`

Desde allí, el usuario puede realizar operaciones como:

- ➕ Registrar  
- 🔍 Buscar  
- 📝 Actualizar  
- 🗑️ Eliminar  

Toda la lógica de estas interacciones se encuentra en `app.js`, donde:

- Se capturan datos del DOM.
- Se crean peticiones HTTP asíncronas (`GET`, `POST`, `PUT`, `DELETE`).
- Se incluye la autenticación por `🔑 API_KEY`.
- Se envían datos al backend mediante un **endpoint** específico.

---

## 🛠️ Backend

El backend está desarrollado en **Node.js** con **Express**, donde:

- Cada ruta está definida en `index.js`.
- Se manejan endpoints específicos:

  - `/api/students` 👨‍🎓
  - `/api/careers` 🎓
  - `/api/categories` 📚

- Se validan las solicitudes y la API_KEY 🔐.
- Se procesan datos provenientes del frontend.
- Se trabaja con archivos `.json`:

  - `students.json`
  - `careers.json`
  - `categories.json`

Las operaciones que se realizan son:

- 📖 Lectura de datos
- 🆕 Creación de nuevos registros
- ♻️ Actualización
- ❌ Eliminación

La respuesta del backend se devuelve al `app.js`, que se encarga de mostrar los resultados en pantalla y notificar al usuario.

---

## 🔄 Flujo de Trabajo

1. 👤 El usuario interactúa con la interfaz HTML.
2. 📋 `app.js` toma los datos y arma una solicitud HTTP GET, POST, PUT, DELETE.
3. 🚀 La solicitud se envía al backend usando funciones asíncronas.
4. 📥 El backend recibe la solicitud y la procesa.
5. 🗃️ Se realizan operaciones sobre los datos JSON.
6. 📤 El backend envía una respuesta al frontend.
7. 🎯 El frontend actualiza la interfaz con los resultados.

---

## 🤖 Inteligencia Artificial aplicada

Para optimizar el desarrollo, se utilizaron diferentes modelos de IA que ayudaron a resolver errores, escribir funciones y mejorar el diseño.

### 🧠 Modelos utilizados

- 🔵 Gemini  
- 🧠 DeepSeek  
- 💬 ChatGPT (OpenAI)  

### 💬 Prompts más efectivos

1. `Quiero que seas un experto en desarrollo web y me ayudes a solucionar este error: [error]`
2. `Necesito que seas un experto en desarrollo web y me ayudes a optimizar este código: [código]`
3. `Quiero que seas un experto en desarrollo web y me ayudes a entender este concepto: [concepto]`
4. `Necesito que me ayudes a crear una función que haga esto: [función]`
5. `Quiero que me ayudes a crear una interfaz amigable y fácil de usar con Bootstrap 5: [html]`
6. `Necesito una función para mostrar datos de un archivo JSON en una tabla HTML: [json]`

---


