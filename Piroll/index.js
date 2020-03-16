const anchors = document.querySelectorAll('a[href*="#"]')
let flag = false;
for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
        e.preventDefault()

        const blockID = anchor.getAttribute('href').substr(1)

        document.getElementById(blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    })
}

let a = document.getElementById('load__more');

a.addEventListener('click',qwerty);

function qwerty() {
    if (flag == false) {
        document.getElementById('qwe').style.display = "block";
        document.getElementById('qwer').style.display = "block";
        document.getElementById('qwet').style.display = "block";
        document.getElementById('qwey').style.display = "block";
        flag = true;
    } else {
        document.getElementById('qwe').style.display = "none";
        document.getElementById('qwer').style.display = "none";
        document.getElementById('qwet').style.display = "none";
        document.getElementById('qwey').style.display = "none";
        flag = false;
    }
}