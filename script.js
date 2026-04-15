
document.addEventListener("DOMContentLoaded", () => {

  // 1. Rain text animation
  const text = document.querySelector(".rain-text");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        text.classList.add("animate");

        setTimeout(() => {
          text.classList.add("shake");
        }, 2500);
      } else {
        text.classList.remove("animate");
        text.classList.remove("shake");
      }
    });
  });

  observer.observe(text);

  // 2. Scroll animations for cards
  const elements = document.querySelectorAll(".card-3d, .card-3dRev");

  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  });

  elements.forEach(el => cardObserver.observe(el));

  // 3. Active nav link
  const links = document.querySelectorAll("nav a");

  links.forEach(link => {
    if (link.href === window.location.href) {
      link.classList.add("active");
    }
  });

  let index = 0;
  const slideContainer = document.querySelector(".slides");
  const total = document.querySelectorAll(".slide").length;

  function showSlide(i) {
    if (i >= total) index = 0;
    else if (i < 0) index = total - 1;
    else index = i;

    slideContainer.style.transform = `translateX(-${index * 100}%)`;
  }

  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");

 if (nextBtn && prevBtn) {
   nextBtn.onclick = () => showSlide(index + 1);
   prevBtn.onclick = () => showSlide(index - 1);
 }
  // Imagen Dynamyc 
  const getRandomImage = () => {
    const id = Math.floor(Math.random() * 1000);
    return `https://picsum.photos/id/${id}/500/600?cacheBust=${Date.now()}`;
  };

  
  const sideImages = document.querySelectorAll(".side-image");
  const bannerImage = document.querySelector(".banner-image");

  
  const allImages = [...sideImages];

  if (bannerImage) {
    allImages.push(bannerImage);
  }

  
  function preloadImage(url, element) {
    const img = new Image();
    img.src = url;

    img.onload = () => {
      element.style.backgroundImage = `url(${url})`;
      element.style.opacity = 1;
    };
  }

  
  function changeImages() {
    

    allImages.forEach((element, index) => {
      const id = Math.floor(Math.random() * 1000);
      const url = `https://picsum.photos/id/${id}/500/600?cb=${Date.now()}-${index}`;

      element.style.opacity = 0;

      setTimeout(() => {
        preloadImage(url, element);
      }, 400);
    });
  }

  
  if (allImages.length > 0) {

    // initial load
    allImages.forEach((element, index) => {
      const id = Math.floor(Math.random() * 1000);
      const url = `https://picsum.photos/id/${id}/500/600?cb=${Date.now()}-${index}`;
      preloadImage(url, element);
    });

    // dynamic change
    setInterval(changeImages, 3000);
  }
  
  // Filter Seccion
  const filterBtn = document.querySelector(".filter-btn");
  const slides = document.querySelectorAll(".slide");
  const checkboxes = document.querySelectorAll(".services-filter input");
  const noResults = document.querySelector("#noResults");

  let filtersApplied = false;

 if (filterBtn) {

    filterBtn.addEventListener("click", () => {

      const checkedBoxes = document.querySelectorAll(".services-filter input:checked");

      
      if (filtersApplied) {
        checkboxes.forEach(cb => cb.checked = false);

        slides.forEach(slide => {
          slide.style.display = "flex";
        });

        filterBtn.textContent = "Apply Filters";
        filtersApplied = false;
        noResults.style.display = "none";
        return;
      }

      // APPLY FILTERS
      const selectedValues = Array.from(checkedBoxes).map(cb => cb.value);

      let visibleCount = 0;

      slides.forEach(slide => {
        const industry = slide.dataset.industry;
        const stage = slide.dataset.stage;

        const match =
          selectedValues.includes(industry) ||
          selectedValues.includes(stage);

        if (selectedValues.length === 0 || match) {
          slide.style.display = "flex";
          visibleCount++;
        } else {
          slide.style.display = "none";
        }
      });

      // Show "No results"
      if (visibleCount === 0 && selectedValues.length > 0) {
        noResults.style.display = "block";
      } else {
        noResults.style.display = "none";
      }

      //  Update button
      if (selectedValues.length > 0) {
        filterBtn.textContent = "Clear Filters";
        filtersApplied = true;
      }
    });
 }

  // CONTACT FORM VALIDATION

  const form = document.querySelector("#contactForm");

  if (form) {

    const nameInput = document.querySelector("#name");
    const emailInput = document.querySelector("#email");
    const messageInput = document.querySelector("#message");

    // Regex patterns
    const nameRegex = /^[a-zA-Z\s]{3,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const messageRegex = /^.{10,}$/;

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      let isValid = true;

      [nameInput, emailInput, messageInput].forEach(input => {
        input.style.border = "1px solid #ccc";
      });

      if (!nameRegex.test(nameInput.value)) {
        nameInput.style.border = "2px solid red";
        isValid = false;
      }

      if (!emailRegex.test(emailInput.value)) {
        emailInput.style.border = "2px solid red";
        isValid = false;
      }

      if (!messageRegex.test(messageInput.value)) {
        messageInput.style.border = "2px solid red";
        isValid = false;
      }

      if (isValid) {
        alert("Message sent successfully! ");
        form.reset();
      }
    });

  }


});
