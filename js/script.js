///////////////////////////
// COMPONENTS
const tabs = document.querySelectorAll('.advantages__tab');
const tabsContainer = document.querySelector('.advantages__tab-container');
const tabsContent = document.querySelectorAll('.advantages__content');
const nav = document.querySelector('.nav-bar');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.icon__close-modal');
const btnOpenModal = document.querySelectorAll('.btn__show-modal');
const btnScrollTo = document.querySelector('.btn--learn-more');
const section1 = document.querySelector('.section-features');
const btnAdvantages = document.querySelector('.btn--advantages');
const sectionTestimonials = document.querySelector('.section-testimonials');

// MODAL WINDOW
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnOpenModal.forEach(b => b.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// STICKY BAR
const navHeight = nav.getBoundingClientRect().height;
const header = document.querySelector('.header');

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

// TABBED COMPONENT
tabsContainer.addEventListener('click', function (e) {
  // Matching Strategy
  const clicked = e.target.closest('.advantages__tab');
  console.log(clicked);
  // Guard Clause
  if (!clicked) return;

  // Clear Active Classes
  tabs.forEach(t => t.classList.remove('advantages__tab--active'));
  tabsContent.forEach(t => t.classList.remove('advantages__content--active'));

  // Activate TAB
  clicked.classList.add('advantages__tab--active');

  // Activate Contnet
  document
    .querySelector(`.advantages__content--${clicked.dataset.tab}`)
    .classList.add('advantages__content--active');
});

// SLIDER
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Go To Slide
  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translate(${100 * (i - slide)}%)`)
    );
  };

  // Next Slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }

    goToSlide(curSlide);
  };

  // Default State
  const init = function () {
    goToSlide(0);
  };
  init();

  // Event Handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
    else return;
  });
};
slider();

////////////////////////////////////////
// PAGE NAVIGATION
document
  .querySelector('.main-nav-list')
  .addEventListener('click', function (e) {
    e.preventDefault();

    // Matching
    if (e.target.classList.contains('main-nav-link')) {
      const id = e.target.getAttribute('href');
      if (id === '#') return;

      // console.log(id);
      document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }
  });

// Button Scrolling
btnScrollTo.addEventListener('click', function (e) {
  const sectionCoords = section1.getBoundingClientRect();
  console.log('action');
  console.log(section1);
  section1.scrollIntoView({ behavior: 'smooth' });
});

btnAdvantages.addEventListener('click', function (e) {
  sectionTestimonials.scrollIntoView({ behavior: 'smooth' });
});

// REVEAL SECTIONS
const allSections = document.querySelectorAll('.section');
// console.log(allSections);

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});
