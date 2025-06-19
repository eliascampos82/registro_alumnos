
<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Registro y Gestión de Carreras</title>

  <!-- CSS de terceros -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css" />

  <!-- DataTables Bootstrap 5 CSS -->
<link rel="stylesheet" href="https://cdn.datatables.net/1.13.7/css/dataTables.bootstrap5.min.css" />
  <!-- Tu propio CSS -->
  <link rel="stylesheet" href="styles.css" />
</head>

<body class="profesores-page">
  <!-- NAVBAR -->
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
    <div class="container">
      <a class="navbar-brand" href="index.html">
        <i class="fas fa-university me-2"></i> Instituto Superior 57
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarContent">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item"><a class="nav-link" href="index.html"><i class="fa-solid fa-house"></i></i> Institucional</a></li>
          <li class="nav-item"><a class="nav-link" href="estudiantes.html"><i class="fas fa-user-graduate me-1"></i>Estudiantes</a></li>
          <li class="nav-item"><a class="nav-link" href="categorias.html"><i class="fas fa-list me-1"></i>Categorías</a></li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- CABECERA -->
  <header class="bg-dark text-white py-5">
    <div class="container text-center ">
      <h1 class="display-4 fw-bold mb-4">Registro y Gestión de Carreras</h1>
      <p class="lead">Sistema de Gestión Académica Integral</p>
    </div>
  </header>

  <!-- CONTENIDO PRINCIPAL -->
  <main class="container my-5">
    <!-- FORMULARIO ALTA -->
    <section class="row justify-content-center mb-5">
      <div class="col-lg-9">
        <div class="card shadow">
          <div class="card-header bg-success text-white">
            <h2 class="h4 mb-0"><i class="fas fa-plus-circle me-2"></i>Registro de Carrera</h2>
          </div>
          <div class="card-body">
            <form id="careerForm">
              <input type="hidden" id="careerId" />
              <div class="mb-3">
                <label for="registerName" class="form-label">Nombre de la Carrera</label>
                <input type="text" class="form-control" id="registerName" required />
              </div>
              <div class="row g-3">
                <div class="col-sm-6">
                  <label for="careerCode" class="form-label">Código (opcional)</label>
                  <input type="text" class="form-control" id="careerCode" />
                </div>
                <div class="col-sm-6">
                  <label for="careerDuration" class="form-label">Duración (años)</label>
                  <input type="number" class="form-control" id="careerDuration" min="1" />
                </div>
              </div>
              <div class="row g-3 mt-3">
                <div class="col-sm-6">
                  <label for="careerCategory" class="form-label">Categoría</label>
                  <select id="careerCategory" class="form-select">
                    <option value="">Seleccione</option>
                  </select>
                </div>
                <div class="col-sm-6">
                  <label for="careerModality" class="form-label">Modalidad</label>
                  <select id="careerModality" class="form-select">
                    <option value="">Seleccione</option>
                    <option>Presencial</option>
                    <option>Virtual</option>
                    <option>Híbrida</option>
                  </select>
                </div>
              </div>
              <div class="text-end mt-4">
                <button type="submit" class="btn btn-success">
                  <i class="fas fa-save me-1"></i>Registrar
                </button>
                <!-- Botón cancelar eliminado -->
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- BÚSQUEDA -->
    <section class="row justify-content-center mb-5">
      <div class="col-lg-9">
        <div class="card shadow">
          <div class="card-header bg-info text-white">
            <h2 class="h4 mb-0"><i class="fas fa-search me-2"></i>Buscar Carrera por ID</h2>
          </div>
          <div class="card-body">
            <form id="searchCareerForm" class="mb-3">
              <div class="input-group">
                  <input type="number" id="studentId" class="form-control" placeholder="ID de la carrera" required>
                  <button type="submit" class="btn btn-primary">Buscar</button>
              </div>
            </form>
             
            <div id="getResult" class="mt-4"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- LISTADO -->
    <section class="row justify-content-center">
      <div class="col-lg-9">
        <div class="card shadow">
          <div class="card-header bg-secondary text-white">
            <h3 class="h5 mb-0"><i class="fas fa-list me-2"></i>Carreras Registradas</h3>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-hover align-middle" id="careersTable" class="table table-striped">
                <thead class="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody id="careersTableBody">
                  <tr>
                    <td colspan="3" class="text-center text-muted py-4">Cargando...</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

  <!-- FOOTER -->
  <footer class="bg-dark text-white py-4 mt-5">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <h5><i class="fas fa-university me-2"></i>Instituto Superior 57</h5>
                    <p class="mb-0">Formando profesionales desde 1990</p>
                </div>
                <div class="col-md-6 text-md-end">
                    <h5>Contacto</h5>
                    <p class="mb-1"><i class="fas fa-phone me-2"></i> (123) 456-7890</p>
                    <p class="mb-0"><i class="fas fa-envelope me-2"></i> info@instituto.edu</p>
                </div>
            </div>
            <hr class="my-3" />
            <div class="text-center">
                <p class="mb-0">&copy; 2023 Gestión Instituto. Todos los derechos reservados.</p>
            </div>
        </div>
    </footer>

  <!-- SCRIPTS externos -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>


  <!-- jQuery -->
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<!-- DataTables JS -->
<script src="https://cdn.datatables.net/1.13.7/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/1.13.7/js/dataTables.bootstrap5.min.js"></script>
  <!-- Tu lógica de front separada -->
  <script src="app.js"></script>
</body>

</html>
