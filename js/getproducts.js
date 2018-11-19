window.addEventListener('DOMContentLoaded', getAllProducts, false);
let token = localStorage.getItem("token")
console.log("the token is", token)

let products
function getAllProducts(){
    if (document.getElementById("allProducts").className != "active"){
        document.getElementById("allProducts").classList.toggle("active");
    }
    fetch('http://127.0.0.1:5000/api/v2/products', {
        method: 'GET',
        headers: {
            "access_token": token
        }
    })
    .then(handleResponse)
    .then(data => {
        console.log("The fetched data is", data.products[0].name)
        let output = `<h1>All Products</h1>
        <div id="products" class="flex-container">`
        let closetag = `</div>`
        products = data.products
        localStorage.setItem("products", products)
        products.forEach(product => {
            console.log("element ", product.name)
            output += `
            <div class="item" onclick="openModal('${product.name}')">
            <img src="" class="center" width="98%" height="100">
            <div class="detailstext" ><p> ${product.name}</p></div>
            <div class="detailstext" ><p> Ksh ${product.price}</p></div>
            </div>
            <div id="${product.name}" class="modal">
              <div class="modal-content">
                <div class="modal-header">
                  <span class="close" onclick="modalClose()">&times;</span>
                  <h2>Item details</h2>
                </div>
                <div class="modal-body">
                  <h2>Inventory</h2>
                  <table>
                    <th>Item</th>
                    <th>Remaining</th>
                    <tr>
                    <td>${product.name}</td>
                    <td>${product.quantity}</td>
                    </tr>
                  </table>
                  <h3>Details</h3>
                  <p>${product.description}</p>
                </div>
                <div class="modal-footer">
                <form id="f-${product.name}" method="GET" action="Submit">
                    Items to take
                    <input id="q-${product.name}" type="number" min="1" max="100" required />
                  <button class="modal-addbtn" id="addbtn" value="Submit" onclick="addToCart(event, 'f-${product.name}', 'q-${product.name}', '${product.name}')">
                  <i class="fa fa-cart-plus" aria-hidden="true"></i> Add</button>
                </form>    
              </div>
              </div>
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
            msg = "You need to log in to access this page!"
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

function addToCart(event, form, quantity, productname){
    event.preventDefault()
    console.log("tuko pamoja")
    quant = document.getElementById(quantity).value
    if (quant == 0){
        quant = 1
    }
    output = document.getElementById("cart-edit").innerHTML
    table = document.getElementById("cart-table")
    row = table.insertRow()
    cell1 = row.insertCell(0)
    cell2 = row.insertCell(1)
    cell3 = row.insertCell(2)
    for (i in products){
        if (productname == products[i].name){
            name = products[i].name
            price = products[i].price * quant
        }
    }
    cell1.appendChild(document.createTextNode(name))
    cell2.appendChild(document.createTextNode(quant))
    cell3.appendChild(document.createTextNode(price))
    modal.style.display = "none"
}

function createSale(){
    let table = document.getElementById("cart-table")
    let allprs = ``
    let prs = []
    for (i = 1; i<table.rows.length; i++){
        let pr = {}
        let ocells = table.rows.item(i).cells
        for (var j = 0; j<ocells.length-1; j++){
            if (j == 0){
            pr["name"] = ocells.item(j).innerHTML
            } else {
                pr["quantity"] = ocells.item(j).innerHTML
            }
            
        }
        prs.push(pr)

    }
    
    console.log(JSON.stringify(prs))
    fetch('http://127.0.0.1:5000/api/v2/sales', {
        method: 'POST',
        headers: {
            "Content-type": "application/json",
            "access_token": token
        },
        body: JSON.stringify(prs)
    })
    .then(handleResponse)
    .then(data => {
        alert(data.message)
        window.location.reload()
    })
    .catch(error => {
        if (error.message === "invalid token"){
            msg = "please log in again"
        } else {
            if (error.message.includes("Empty input")){
            document.getElementById("output").innerHTML = `
            <h4 color="red">please add an item to the cart first</h4>`
        } else {
            document.getElementById("output").innerHTML = 
            `<h4 color="red">${error.message}</h4>`
        }

        }
    });

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

function showPhones(){
    if (document.getElementById("phones").className != "active"){
        document.getElementById("phones").classList.toggle("active");
    }
    if(document.getElementById("allProducts").className == "active"){
        document.getElementById("allProducts").classList.toggle("active")
    }
    if(document.getElementById("clothes").className == "active"){
        document.getElementById("clothes").classList.toggle("active")
    }
    fetch('http://127.0.0.1:5000/api/v2/products', {
        method: 'GET',
        headers: {
            "access_token": token
        }
    })
    .then(handleResponse)
    .then(data => {
        console.log("The fetched data is", data.products[0].name)
        let output = `<h1>All Products</h1>
        <div id="products" class="flex-container">`
        let closetag = `</div>`
        products = data.products
        localStorage.setItem("products", products)
        products.forEach(product => {
            if (product.category == "phone"){
                console.log("element ", product.name)
                output += `
                <div class="item" onclick="openModal('${product.name}')">
                <img src="images/${product.name}.jpeg" class="center" width="98%" height="100">
                <div class="detailstext" ><p> ${product.name}</p></div>
                <div class="detailstext" ><p> Ksh ${product.price}</p></div>
                </div>
                <div id="${product.name}" class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                    <span class="close" onclick="modalClose()">&times;</span>
                    <h2>Item details</h2>
                    </div>
                    <div class="modal-body">
                    <h2>Inventory</h2>
                    <table>
                        <th>Item</th>
                        <th>Remaining</th>
                        <tr>
                        <td>${product.name}</td>
                        <td>${product.quantity}</td>
                        </tr>
                    </table>
                    <h3>Details</h3>
                    <p>${product.description}</p>
                    </div>
                    <div class="modal-footer">
                    <form id="f-${product.name}" method="GET" action="Submit">
                        Items to take
                        <input id="q-${product.name}" type="number" min="1" max="100" required />
                    <button class="modal-addbtn" id="addbtn" value="Submit" onclick="addToCart(event, 'f-${product.name}', 'q-${product.name}', '${product.name}')">
                    <i class="fa fa-cart-plus" aria-hidden="true"></i> Add</button>
                    </form>    
                </div>
                </div>
                </div>
                `
            }
        })
        output = output + closetag
        console.log("the output", output)
        document.getElementById("all").innerHTML = output
    })
    .catch(error => {
        console.log(error)
        if (error.message === "invalid token"){
            msg = "You need to log in to access this page!"
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

function showClothes(){
    if (document.getElementById("clothes").className != "active"){
        document.getElementById("clothes").classList.toggle("active");
    }
    if(document.getElementById("allProducts").className == "active"){
        document.getElementById("allProducts").classList.toggle("active")
    }
    if(document.getElementById("phones").className == "active"){
        document.getElementById("phones").classList.toggle("active")
    }
    fetch('http://127.0.0.1:5000/api/v2/products', {
        method: 'GET',
        headers: {
            "access_token": token
        }
    })
    .then(handleResponse)
    .then(data => {
        console.log("The fetched data is", data.products[0].name)
        let output = `<h1>All Products</h1>
        <div id="products" class="flex-container">`
        let closetag = `</div>`
        products = data.products
        localStorage.setItem("products", products)
        products.forEach(product => {
            if (product.category == "clothes"){
                console.log("element ", product.name)
                output += `
                <div class="item" onclick="openModal('${product.name}')">
                <img src="" class="center" width="98%" height="100">
                <div class="detailstext" ><p> ${product.name}</p></div>
                <div class="detailstext" ><p> Ksh ${product.price}</p></div>
                </div>
                <div id="${product.name}" class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                    <span class="close" onclick="modalClose()">&times;</span>
                    <h2>Item details</h2>
                    </div>
                    <div class="modal-body">
                    <h2>Inventory</h2>
                    <table>
                        <th>Item</th>
                        <th>Remaining</th>
                        <tr>
                        <td>${product.name}</td>
                        <td>${product.quantity}</td>
                        </tr>
                    </table>
                    <h3>Details</h3>
                    <p>${product.description}</p>
                    </div>
                    <div class="modal-footer">
                    <form id="f-${product.name}" method="GET" action="Submit">
                        Items to take
                        <input id="q-${product.name}" type="number" min="1" max="100" required />
                    <button class="modal-addbtn" id="addbtn" value="Submit" onclick="addToCart(event, 'f-${product.name}', 'q-${product.name}', '${product.name}')">
                    <i class="fa fa-cart-plus" aria-hidden="true"></i> Add</button>
                    </form>    
                </div>
                </div>
                </div>
                `
            }
        })
        output = output + closetag
        console.log("the output", output)
        document.getElementById("all").innerHTML = output
    })
    .catch(error => {
        console.log(error)
        if (error.message === "invalid token"){
            msg = "You need to log in to access this page!"
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

function showAll(){
    if (document.getElementById("allProducts").className != "active"){
        document.getElementById("allProducts").classList.toggle("active");
    }
    if(document.getElementById("clothes").className == "active"){
        document.getElementById("clothes").classList.toggle("active")
    }
    if(document.getElementById("phones").className == "active"){
        document.getElementById("phones").classList.toggle("active")
    }
    getAllProducts()
}