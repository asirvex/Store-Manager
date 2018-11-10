document.getElementById("add-product-fm").addEventListener
("submit", postProduct)

function postProduct(e){
    e.preventDefault();
    let productName = document.getElementById("product-name").value;
    let description = document.getElementById("description").value;
    let quantity = document.getElementById("quantity").value;
    let price = document.getElementById("price").value;
    let category = document.getElementById("category").value;
    let token = localStorage.getItem("token");
    console.log("the token is ", token);
    fetch('http://127.0.0.1:5000/api/v2/products', {
        method: 'POST',
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
        console.log(data);
    })
    .catch(error => console.log(error));
    // .catch(error => document.getElementById("add-product-title").innerHTML = 
    //                             `<h1>Add product</h1>
    //                             <h3>${error.message}</h3>`);
    

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