// function showAll(){
//     let el = document.getElementById("phones");
//     el.style.display = "none";
//     let all = document.getElementById("all");
//     all.style.display ="block";
// }

// function show(el){
//     el.style.display = "inline";
// }

// function showPhones(){
//     let all = document.getElementById("all");
//     all.style.display ="none";
//     let ph = document.getElementById("phones");
//     show(ph)
// }

// function goBack() {
//     window.history.back();
// }
let modal
function openModal(modalName) {
    modal = document.getElementById(modalName)
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

function modalClose() {
    modal.style.display = "none";
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

