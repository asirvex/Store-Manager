window.addEventListener('DOMContentLoaded', getAllProducts, false)
document.getElementById("edit-product-fm").addEventListener("submit", putProduct)
let token = localStorage.getItem("token")
console.log("the token is", token)
let productid

function getAllProducts(e){
    e.preventDefault()
    document.getElementById("edit-product-fm").style.display = "none"
    fetch('http://127.0.0.1:5000/api/v2/products', {
        method: 'GET',
        headers: {
            "access_token": token
        }
    })
    .then(handleResponse)
    .then(data => {
        console.log("The fetched data is", data.products[0].name)
        output = `<div id="products" class="flex-container">`
        closetag = `</div>`
        products = data.products
        localStorage.setItem("products", products)
        products.forEach(product => {
            console.log("element ", product.name)
            output += `
            <div class="item" onclick="toEdit('${product.name}')">
            <img src="" class="center" width="98%" height="100">
            <div class="detailstext" ><p> ${product.name}</p></div>
            <div class="detailstext" ><p> Ksh ${product.price}</p></div>
            </div>
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

function toEdit(productname){
    document.getElementById("edit-product-fm").style.display = "block"
    let name = productname
    let prd
    for(prd in products){
        console.log(products[prd])
        if (products[prd].name == name){
            document.getElementById("product-name").value = products[prd].name
            document.getElementById("description").value = products[prd].description
            document.getElementById("quantity").value = products[prd].quantity
            document.getElementById("price").value = products[prd].price
            document.getElementById("category").value = products[prd].category
            productid = products[prd].id
        }
    }
    
}

function putProduct(e){
    e.preventDefault()
    let productName = document.getElementById("product-name").value;
    let description = document.getElementById("description").value;
    let quantity = document.getElementById("quantity").value;
    let price = document.getElementById("price").value;
    let category = document.getElementById("category").value;
    let token = localStorage.getItem("token");
    console.log(productid)
    fetch(`http://127.0.0.1:5000/api/v2/products/${productid}`, {
        method: 'PUT',
        headers: {
            "Content-type": "application/json",
            "access_token": token
        },
        body: JSON.stringify({
            "name": productName,
            "description": description,
            "price": price,
            "quantity": quantity,
            "category": category
        })
    })
    .then(handleResponse)
    .then(data => {
        document.getElementById("add-product-title").innerHTML = 
        `<h1>Edit product</h1>
        <h4 color="green">${data.message}<h4>        
        `
    })
    .catch(error => {
        if (error.message === "invalid token"){
            msg = "please log in again"
        } else {
            msg = error.message
        }
        document.getElementById("add-product-title").innerHTML = 
        `<h1>Edit Product</h1>
        <h3>${msg}<h3>        
        `
    })

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

