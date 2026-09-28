// Manual gallery for the project goals section. Add or remove slides in index.html.
const gallery = document.querySelector('.project-gallery');

if (gallery) {
  const slides = [...gallery.querySelectorAll('.gallery-slide')];
  const dots = [...gallery.querySelectorAll('.gallery-dot')];
  const count = gallery.querySelector('.gallery-count');
  let current = 0;

  function showSlide(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => { slide.hidden = i !== current; });
    dots.forEach((dot, i) => {
      if (i === current) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
    count.textContent = `${String(current + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
  }

  gallery.querySelector('.gallery-prev').addEventListener('click', () => showSlide(current - 1));
  gallery.querySelector('.gallery-next').addEventListener('click', () => showSlide(current + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => showSlide(i)));
}
