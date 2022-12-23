/* // // DOM Traversing
const h1 = document.querySelector('h1');
console.log(h1);

// Going downwards: child
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

// Going upwards: parents
console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest('.header').style.background = 'var(--gradient-secondary)';

h1.closest('h1').style.background = 'var(--gradient-primary)';

// Going sideways: siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);


console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});
 */

// undo snakcbar  functionality
let nav = document.querySelector('.nav');
let navlinks = document.querySelector('.nav__links');
let undoBTn = document.querySelector('#undo');
let snackbar = document.getElementById('snackbar');
let restoreBTn = document.querySelector('#restore');
let db = [];

nav.addEventListener('click', function (e) {
  e.preventDefault();
  myFunction(e);
});

const myFunction = function (e) {
  let deletedTag = e.target.parentElement;
  deletedTag.style.display = 'none';
  let deleting = setTimeout(() => {
    e.target.parentElement.parentElement.removeChild(deletedTag);
    db.push(deletedTag);
  }, 2000);

  snackbar.className = 'show';
  hideSanckbar = setTimeout(() => {
    snackbar.className = deletedTag.className.replace('show', '');
  }, 2000);

  undoBTn.addEventListener('click', function (e) {
    deletedTag.style.display = 'block';
    clearTimeout(deleting);
  });
};

restoreBTn.addEventListener('click', e => {
  db.forEach(restoredTags => {
    restoredTags.style.display = 'block';
    navlinks.prepend(restoredTags);
  });
});

//content functionality
//tabed components
let operations = document.querySelector('.operations__tab-container');

operations.addEventListener('click', function (e) {
  let btn = e.target.closest('.btn');
  let btnID = btn.getAttribute('data-tab');
  let contents = document.querySelectorAll('.operations__content');
  let btns = document.querySelectorAll('.operations__tab');

  btns.forEach(allButtons => {
    allButtons.classList.remove('operations__tab--active');
  });
  btn.classList.add('operations__tab--active');

  contents.forEach(content => {
    content.classList.remove('operations__content--active');
  });
  let selectedContent = document.querySelector(
    `.operations__content--${btnID}`
  );
  selectedContent.classList.add('operations__content--active');
});

// Menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.2));
nav.addEventListener('mouseout', handleHover.bind(1));

/* // sticky navbar
let coords = document.getElementById('section--1').getBoundingClientRect();
let scrolligMode = false;

window.addEventListener('scroll', () => {
  scrolligMode = true;
});

setInterval(() => {
  if (scrolligMode) {
    console.log(window.scrollY);
    if (window.scrollY > coords.top) {
      nav.classList.add('sticky');
    }
    if (window.scrollY < coords.top) {
      nav.classList.remove('sticky');
    }
    scrolligMode = false;
  }
}, 1000); */

// Sticky navigation: Intersection Observer API

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height + 20;

const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entry.isIntersecting);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

// Reveal sections
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
  rootMargin: '-80px',
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// Lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.classList.remove('lazy-img');

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '-200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

////////////////////////////////////////////////////////////////
///////////////////////////////////////
// Slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}" data-src='xxx'></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

window.addEventListener('load', function () {
  console.log('page loaded');
})


