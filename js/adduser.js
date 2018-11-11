document.getElementById("adduser-fm").addEventListener
("submit", postUser)

function postUser(e){
    e.preventDefault();
    let username = document.getElementById("username").value;
    let firstname = document.getElementById("firstname").value;
    let secondname = document.getElementById("secondname").value;
    let password = document.getElementById("password").value;
    let role = document.getElementById("usertype").value;
    let token = localStorage.getItem("token");
    console.log("the token is ", token);
    fetch('http://127.0.0.1:5000/api/v2/auth/signup', {
        method: 'POST',
        headers: {
            "Content-type": "application/json",
            "access_token": token
        },
        body: JSON.stringify({
            "username": username,
            "first_name": firstname,
            "second_name": secondname,
            "password": password
        })
    })
    .then(handleResponse)
    .then(data => {
        document.getElementById("msg").innerHTML = 
        `<h3>${data.message}</h3>`
    })
    .catch(error => {
        if (error.message === "invalid token"){
            msg = "please log in again"
        } else {
            msg = error.message
        }
        document.getElementById("adduser-title").innerHTML = 
        `<h1>Add a New User</h1>
        <h3>${msg}<h3>        
        `
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