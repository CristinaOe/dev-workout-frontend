const slides = Array.from(document.querySelectorAll(".slide"));
const slider = document.querySelectorAll(".slider");
let timeoutId;

function getNextPrev() {
  const activeSlide = document.querySelector(".slide.active");
  const activeIndex = slides.indexOf(activeSlide);
  let next, prev;
  if (activeIndex === slides.length - 1) {
    next = slides[0];
  } else {
    next = slides[activeIndex + 1];
  }
  if (activeIndex === 0) {
    prev = slides[slides.length - 1];
  } else {
    prev = slides[activeIndex - 1];
  }
  return [next, prev];
}
function getPosition() {
  const activeSlide = document.querySelector(".slide.active");
  const activeIndex = slides.indexOf(activeSlide);
  const [next, prev] = getNextPrev();
  slides.forEach((slide, index) => {
    if (index === activeIndex) {
      slide.style.transform = "translateX(0)";
    } else if (slide === prev) {
      slide.style.transform = "translateX(-100%)";
    } else if (slide === next) {
      slide.style.transform = "translateX(100%)";
    } else {
      slide.style.transform = "translateX(100%)";
    }
    slide.addEventListener("transitionend", () => {
      slide.classList.remove("top");
    });
  });
}

function getNextSlide() {
  clearInterval(timeoutId);
  const current = document.querySelector(".slide.active");
  const [next, prev] = getNextPrev();
  if (current.classList.contains("top")) {
    return;
  }
  current.classList.add("top");
  next.classList.add("top");
  current.style.transform = "translate(-100%)";
  current.classList.remove("active");
  next.style.transform = "translateX(0)";
  next.classList.add("active");
  getPosition();
  autoLoop();
}

getPosition();

function autoLoop() {
  timeoutId = setTimeout(() => {
    getNextSlide();
  }, 8000);
}

autoLoop();
