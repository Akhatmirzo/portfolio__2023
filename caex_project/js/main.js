const navBtn = document.querySelector("#nav__btn");
const menuEl = document.querySelector("#menu");
const logoEl = document.querySelector("#logo");
const heroContent = document.querySelector(".hero__content");

navBtn.addEventListener("click", function () {
  if (menuEl.classList.contains("open")) {
    this.innerHTML = `<img src="./images/icon_bars.svg" alt="menu"></img>`;
    logoEl.innerHTML = `<img src="./images/logo__dark.svg" alt="CAEx Uzbekistan logo" width="328"/>`;
    menuEl.classList.remove("open");
    heroContent.classList.remove("moveToBottom");
  } else {
    menuEl.classList.toggle("open");
    logoEl.innerHTML = `<img src="./images/logo__light.svg" alt="CAEx Uzbekistan logo" width="328"/>`;
    heroContent.classList.add("moveToBottom");
    this.innerHTML = `<img src="./images/icon_exit.svg" alt="exit"></img>`;
  }
});

const calendarAt = document.querySelectorAll('.calendar-at');
const labelArrow = document.querySelectorAll(`.label-arrow`);
calendarAt.forEach((val, id) => {
  val.addEventListener('focus', () => {
    labelArrow[id].style.display = 'none';
  })
  val.addEventListener('blur', () => {
    labelArrow[id].style.display = 'block';
  })
});

const swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  slidesPerColumn: 4,
  // slidesPerView: 1,
  //  grid: {
  //    rows: 4,
  //    fill: "row",
  // },
  spaceBetween: 30,
  navigation: {
    nextEl: ".carusel__btn-right",
    prevEl: ".carusel__btn-left",
  },
});