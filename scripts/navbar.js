document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.querySelector('.navbar');
  const navbarToggle = document.querySelector('.navbar-toggle');
  const navbarSidebar = document.querySelector('.navbar-sidebar');
  const sidebarClose = document.querySelector('.sidebar-close');

  // Cambiar el estilo del navbar al hacer scroll
  window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
          navbar.classList.add('navbar-scrolled');
      } else {
          navbar.classList.remove('navbar-scrolled');
      }
  });

  // Abrir el menú lateral
  navbarToggle.addEventListener('click', () => {
      navbarSidebar.classList.add('active');
  });

  // Cerrar el menú lateral
  sidebarClose.addEventListener('click', () => {
      navbarSidebar.classList.remove('active');
  });

  // Cerrar el menú lateral al hacer clic fuera de él
  document.addEventListener('click', (event) => {
      if (!navbarSidebar.contains(event.target) && !navbarToggle.contains(event.target)) {
          navbarSidebar.classList.remove('active');
      }
  });

  // Animación del botón hamburguesa
  navbarToggle.addEventListener('click', () => {
      navbarToggle.classList.toggle('active');
  });
});

