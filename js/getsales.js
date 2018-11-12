window.addEventListener('DOMContentLoaded', getSales, false);
let token = localStorage.getItem("token")
console.log("the token is", token)

function getSales(e){
    e.preventDefault()
    fetch('http://127.0.0.1:5000/api/v2/sales', {
        method: 'GET',
        headers: {
            "access_token": token
        }
    })
    .then(handleResponse)
    .then(data => {
        console.log("The fetched data is", data[0])
        output = 
        `<table class="editablerecords">
        <tr>
            <th>Sale id</th>
            <th>Owner</th>
            <th>Date</th>
            <th>Products</th>
            <th>Total price</th>
        </tr>`
        data.forEach(sale => {
            console.log(sale)
            console.log(sale.products)
            let prods = `<table>`
            sale.products.forEach(product => {
                    prods += 
                    `<tr>
                    <td>${product.product_name}</td>
                    <td>${product.quantity}</td>
                    <td>${product.price}</td>
                    </tr>`
                });
            prods = prods + `</table>`
            output +=
            `<tr>
                <td>${sale.sale_id}</td>
                <td>${sale.owner}</td>
                <td>${sale.date}</td>
                <td>${prods}</td>
                <td>${sale.total_price}</td>
            </tr>`
        });
        document.getElementById("sales").innerHTML = output
        console.log(output)
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