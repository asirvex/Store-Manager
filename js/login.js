document.getElementById('login-fm').addEventListener
("submit", login);

function login(e){
    e.preventDefault();
    let username = document.getElementById("username").value;
    let password = document.getElementById("pwd").value;
    let token;
    fetch('http://127.0.0.1:5000/api/v2/auth/login', {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            "username": username,
            "password": password
        })
    })
    .then(handleResponse)
    .then(data => {
        token = data.token;
        localStorage.setItem("token", token)
        localStorage.setItem("user", username)
        if (username === "super_admin"){
            window.location.href = "addproduct.html"
        } else{
        window.location.href = "products.html";
    }
    })
    .catch(error => document.getElementById("login-title").innerHTML = `
        <h1>login</h1>
        <h3>${error.message}</h3>`);

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