const toggleKey = document.querySelector(".mobile-toggle");
const navBar = document.querySelector(".side-nav");
const openBtn = document.querySelector("#nav-btn-open");
const closeBtn = document.querySelector("#nav-btn-close");
const navBtn = document.querySelectorAll("[data-nav-btns]");

toggleKey.addEventListener("click", () => {
  if (navBar.getAttribute("data-is-open") === "close") {
    navBar.setAttribute("data-is-open", "open");
    openBtn.style.display = "none";
    closeBtn.style.display = "block";
  } else if (navBar.getAttribute("data-is-open") === "open") {
    navBar.setAttribute("data-is-open", "close");
    openBtn.style.display = "block";
    closeBtn.style.display = "none";
  }
});

navBtn.forEach((btn) => {
  console.log(btn);
  btn.addEventListener("click", () => {
    navBar.setAttribute("data-is-open", "close");
    openBtn.style.display = "block";
    closeBtn.style.display = "none";
  });
});
