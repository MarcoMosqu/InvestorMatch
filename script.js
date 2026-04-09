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
  const slides = document.querySelector(".slides");
  const total = document.querySelectorAll(".slide").length;

  function showSlide(i) {
    if (i >= total) index = 0;
    else if (i < 0) index = total - 1;
    else index = i;

    slides.style.transform = `translateX(-${index * 100}%)`;
  }

  document.querySelector(".next").onclick = () => showSlide(index + 1);
  document.querySelector(".prev").onclick = () => showSlide(index - 1);

  
});
const filterBtn = document.querySelector(".filter-btn");
const slides = document.querySelectorAll(".slide");
const checkboxes = document.querySelectorAll(".services-filter input");
const noResults = document.querySelector("#noResults");

let filtersApplied = false;

filterBtn.addEventListener("click", () => {

  const checkedBoxes = document.querySelectorAll(".services-filter input:checked");

  // 🔴 CLEAR FILTERS
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

  // 🟢 APPLY FILTERS
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

  // 🔍 Show "No results"
  if (visibleCount === 0 && selectedValues.length > 0) {
    noResults.style.display = "block";
  } else {
    noResults.style.display = "none";
  }

  // 🔘 Update button
  if (selectedValues.length > 0) {
    filterBtn.textContent = "Clear Filters";
    filtersApplied = true;
  }
});