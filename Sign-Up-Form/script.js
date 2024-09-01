document.getElementById("form").addEventListener("submit", (e)=>{
    const password = document.getElementById("password")
    const confirmPass = document.getElementById("cpass")
    let passVal = password.value
    let cpass = confirmPass.value
    console.log(passVal);
    console.log(cpass);
    
    
    const res = document.getElementById("val")
    let valid = true

    res.textContent = ""

    if(passVal != cpass){
        res.textContent = "pass do not match"
        valid = false
    }

    if(valid === false){
        e.preventDefault()
    }

})