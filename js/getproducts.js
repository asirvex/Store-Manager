window.addEventListener('DOMContentLoaded', getAllProducts, false);
let token = localStorage.getItem("token")
console.log("the token is", token)

function getAllProducts(e){
    e.preventDefault()
    fetch('http://127.0.0.1:5000/api/v2/products', {
        method: 'GET',
        headers: {
            "access_token": token
        }
    })
    .then(handleResponse)
    .then(data => {
        console.log("The fetched data is", data.products[0].name)
        let output = `<div id="products" class="grid-container">`
        let closetag = `</div>`
        products = data.products
        products.forEach(product => {
            console.log("element ", product.name)
            output += `
            <div class="item">
            <img src="" class="center" width="98%" height="100">
            <div class="detailstext"><p> ${product.name} </br> Ksh ${product.price}</div>
            <button class="add-btn" id="addbtn"><i class="fa fa-cart-plus" aria-hidden="true"></i> Add</button>
            <div>
            `
        })
        output = output + closetag
        console.log("the output", output)
        document.getElementById("all").innerHTML = output
    })
    .catch(error => {
        console.log(error)
        if (error.message === "invalid token"){
            msg = "You must log in to access this page!"
            document.getElementsByTagName("body")[0].innerHTML = `
            <h1>${msg}</h1>`}
        }
        )

    function handleResponse(response) {
        return response.json()
          .then(json => {
              if (response.ok) {
              return json
            } else {
              return Promise.reject(json)
            }
        })
    }
}