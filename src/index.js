import imgs1 from "./images/portfolio_1.png";
import imgs2 from "./images/portfolio_2.png";
import imgs3 from "./images/portfolio_3.png";
import imgs4 from "./images/portfolio_4.png";
import arrow from "./images/bi_arrow-right.svg";
import style from "./style.css";
import slide_left from "./images/slide_left.svg";
import slide_right from "./images/slide_right.svg";

/* Get DOM Elements*/
const content = document.querySelector(".content");
const carousel = document.getElementById("carousel");

/* Sliders */
const slideLeft = document.createElement("div");
slideLeft.innerHTML = `<img src="./images/slide_left.svg" alt="slide_left"/>`;
slideLeft.className = "slide_left";

const slideRight = document.createElement("div");
slideRight.innerHTML = `<img src="./images/slide_right.svg" alt="slide_right"/>`;
slideRight.className = "slide_right";

let slideIndex = 0;
slideLeft.addEventListener("click", () => {
  if (slideIndex !== 0) {
    slideIndex += 25;
    carousel.style.transform = `translateX(${slideIndex}%)`;
  }
});

slideRight.addEventListener("click", () => {
  console.log(slideIndex);
  if (slideIndex !== -75) {
    slideIndex -= 25;
    carousel.style.transform = `translateX(${slideIndex}%)`;
  }
});

content.append(slideLeft, slideRight);

/* Selectors */
let selectorsCount =
  document.getElementsByClassName("carousel__card").length / 2;
let currentSelector = 0;
const selectors = document.createElement("div");
selectors.className = "selectors";

/* Function for creating selectors */
const createSelectors = (
  selectorsCount,
  offsetTranslate,
  pxOrPercentString
) => {
  for (let i = 0; i < selectorsCount; i++) {
    const selector = document.createElement("div");
    selector.id = i + "";
    currentSelector === +selector.id
      ? (selector.className = "activeSelector")
      : null;
    selector.onclick = (e) => {
      document.querySelector(".activeSelector").className = "";
      currentSelector = e.target.id;
      e.target.className = "activeSelector";
      carousel.style.transform = `translateX(-${
        currentSelector * offsetTranslate
      }${pxOrPercentString})`;
    };
    selectors.append(selector);
  }
  content.after(selectors);
};

window.addEventListener("resize", () => {
  /* Selectors for screen 600px*/
  if (document.documentElement.clientWidth <= 600) {
    while (selectors.firstChild) {
      selectors.removeChild(selectors.firstChild);
    }
    createSelectors(selectorsCount, 580, "px");
  }

  /* Selectors for screen 414px*/
  if (document.documentElement.clientWidth <= 414) {
    while (selectors.firstChild) {
      selectors.removeChild(selectors.firstChild);
    }
    createSelectors(4, 100, "%");
  }
});
