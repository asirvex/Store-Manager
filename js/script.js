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

document.getElementById("addbtn").addEventListener
("click", openModal)
var modal = document.getElementById('myModal');

// var btn = document.getElementById("addbtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
function openModal() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
