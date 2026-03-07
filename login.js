document.getElementById("login-btn").addEventListener("click",function(){
const inputName = document.getElementById("input")
const userName = inputName.value;
console.log(userName)
const inputPassword = document.getElementById("password")
const password = inputPassword.value;
console.log(password)
if(userName==="admin" && password === "admin123"){
   window.location.assign("./home.html")
}else{
    alert("login failed")
    return;
}
});