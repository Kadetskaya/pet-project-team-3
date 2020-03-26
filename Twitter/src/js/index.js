let head_click = document.querySelectorAll('.inner-head');

head_click.forEach(element => {
    element.addEventListener("click", (e) => {
        head_click.forEach(element => {
            if (element.classList.contains("active")) {
                element.classList.remove("active");
            }
        })
        e.currentTarget.classList.add("active");
    })
})