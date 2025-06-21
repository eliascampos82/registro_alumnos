// Explicación del flujo de trabajo del sistema de gestión de estudiantes, carreras y categorías


// El sistema es una gestión integral para estudiantes carreras y 
// categorías iniciando toda interacción en el frontend específicamente 
// en `estudiantes.html`, `carreras.html`, `categorias.html` para 
// gestiones donde el usuario inicia una acción como registrar, buscar,
// actualizar o eliminar un elemento.
// La lógica asociada a estos archivos html se encuentran en `app.js` 
// donde se toman los datos o parámetros para cada acción mediante el DOM
//  y a través de su SERVICIOS materializada en funciones asíncronas. 
// Construye y prepara una petición HTTP ya sea `POST` `GET` `PUT` o `DELETE`,
// esta petición diseñada para una operación específica como escritura para crear
// o actualizar, o lectura para obtener datos, incluye la autenticación mediante 
// la `API_KEY` en sus cabeceras y los datos relevantes en su enviada a un 
// Endpoint( que es una URL en particular ) dedicado en el backend.
// La petición HTTP se realiza mediante una llamada asíncrona a un servidor 
// que actúa como servicio.  
// En este caso, el servicio es un servidor Node.js que utiliza Express 
// para manejar las rutas y las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre los datos.
// El backend está diseñado para recibir estas solicitudes y
// procesarlas de manera segura y eficiente. 

//  En el backend, las rutas están definidas en `index.js` donde se 
//  establecen los endpoints específicos para cada tipo de operación
//  como `/api/students` para estudiantes, `/api/careers` para carreras,
//  y `/api/categories` para categorías. Cada endpoint está asociado a
//  una función que maneja la lógica correspondiente,
//  como la validación de la `API_KEY`, la extracción de los datos de la
//  solicitud, y la ejecución de la operación solicitada sobre los datos
//  almacenados en archivos JSON como `students.json`, `careers.json` y `categories.json`.
//  Estas operaciones pueden incluir la lectura de datos existentes,
//  la creación de nuevos registros, la actualización de registros existentes,
//  o la eliminación de registros. Una vez que la operación se completa,
//  el backend envía una respuesta al frontend, que es capturada por la función
//  asíncrona en `app.js` del frontend. Esta respuesta puede incluir datos
//  actualizados, mensajes de éxito o error, y se utiliza para actualizar dinámicamente
//  la interfaz del usuario, mostrando los resultados de la operación,
//  notificando al usuario sobre el éxito o el fallo de la operación.

// En resumen, el flujo de trabajo es el siguiente:
// 1. El usuario interactúa con la interfaz del frontend (HTML).
// 2. La lógica en `app.js` captura los datos de la interfaz y prepara una solicitud HTTP.
// 3. La solicitud se envía al backend a través de un servicio (función asíncrona en `app.js` SERVICIOS).
// 4. El backend recibe la solicitud en un endpoint específico (`index.js`).
// 5. El backend valida la solicitud, procesa los datos y realiza la operación solicitada.
// 6. El backend envía una respuesta al frontend.
// 7. El frontend actualiza la interfaz del usuario con los resultados de la operación.



//Se debe utilizar al menos un modelo de IA para optimizar el avance del trabajo practico
// Detallar en un archivo que modelos se utilizar y los promts que más resultados positivos les dieron.


// la IA utilizada en este proyecto fu gemini, deep seek y un poco de chatGPT.
// Los prompts utilizados fueron:
// 1. quiero que seas un experto en desarrollo web y me ayudes solucionar este error: [error]
// 2. necesito que seas un experto en desarrollo web y me ayudes a optimizar este código: [código]
// 3. quiero que seas un experto en desarrollo web y me ayudes a entender este concepto: [concepto]
// 4. necesito que seas un experto en desarrollo web y me ayudes a crear una función que haga esto: [función],
//              y le decia lo que queria mostrar en la pantalla .
// 5. quiero que seas un experto en desarrollo web y me ayudes a crear una interfaz de 
//              usuario que sea amigable y fácil de usar usando bootstrap 5: [html].
// 6. necesito que seas un programador experto en front y backend y me crees una funcion para mostrar los datos
//              de un archivo json en una tabla html: [json].


