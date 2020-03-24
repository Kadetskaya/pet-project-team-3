"use strict"
let head_click = document.querySelectorAll('.inner-head');

head_click.forEach(element => {
    element.addEventListener("click", (e) => {
        head_click.forEach(element => {
            if (element.classList.contains("nav-content_active")) {
                element.classList.remove("nav-content_active");
            }
        })
        e.currentTarget.classList.add("nav-content_active");
    })
})