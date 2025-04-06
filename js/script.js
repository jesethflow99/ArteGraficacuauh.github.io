document.addEventListener('DOMContentLoaded', function() {
  // Efecto de navbar al hacer scroll
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
      } else {
          navbar.classList.remove('scrolled');
      }
  });
  
  // Validación del formulario de contacto
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validar campos
        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const servicio = document.getElementById('servicio').value;
        const mensaje = document.getElementById('mensaje').value.trim();

        if (nombre === '' || email === '' || servicio === '' || mensaje === '') {
            alert('Por favor complete todos los campos obligatorios.');
            return;
        }

        if (!validateEmail(email)) {
            alert('Por favor ingrese un correo electrónico válido.');
            return;
        }

        // Formar el mensaje de WhatsApp
        const numeroWhatsApp = '+5216251069285'; // ← Reemplaza con el número real (sin espacios, con LADA)
        const texto = `Hola, soy *${nombre}*.\nEmail: ${email}\nServicio de interés: *${servicio}*\nMensaje:\n${mensaje}`;
        const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(texto)}`;

        // Abrir WhatsApp en nueva pestaña
        window.open(urlWhatsApp, '_blank');
    });
}

  
  // Función para validar email
  function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
  }
  
  // Smooth scrolling para enlaces internos
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
              window.scrollTo({
                  top: targetElement.offsetTop - 70,
                  behavior: 'smooth'
              });
          }
      });
  });
  
  // Animación de elementos al hacer scroll
  const animateOnScroll = function() {
      const elements = document.querySelectorAll('.servicio-card, .gallery-item, .contact-info, .contact-form');
      
      elements.forEach(element => {
          const elementPosition = element.getBoundingClientRect().top;
          const screenPosition = window.innerHeight / 1.3;
          
          if (elementPosition < screenPosition) {
              element.classList.add('fade-in');
          }
      });
  };
  
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Ejecutar al cargar la página
  
  // Inicializar carrusel
  const myCarousel = document.querySelector('#trabajosCarousel');
  if (myCarousel) {
      const carousel = new bootstrap.Carousel(myCarousel, {
          interval: 5000,
          pause: 'hover'
      });
  }
  
  const yearElement = document.querySelector('.footer .mb-0');
  if (yearElement) {
      const currentYear = new Date().getFullYear();
      yearElement.textContent = yearElement.textContent.replace('2025', currentYear);
  }
});

for (let i = 1; i <= 39; i++) { 
    const col = document.createElement("div");
    col.className = "col-md-4 mb-4";
  
    const imgPath = `img/galeria${i}.jpg`;
  
    col.innerHTML = `
      <div class="gallery-item">
        <img src="${imgPath}" class="img-fluid" alt="Trabajo ${i}">
        <div class="gallery-overlay">
          <h5>Trabajo ${i}</h5>
          <a href="${imgPath}" data-fslightbox="gallery" class="btn btn-sm btn-primary">Ver más</a>
        </div>
      </div>
    `;
  
    document.getElementById("galeria-dinamica").appendChild(col);
  }
  