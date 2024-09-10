const structure = (()=>{

const body = ()=>{
    const content = document.getElementById("app")
    const left = document.createElement("div")
    left.classList.add("left")
    const right = document.createElement("div")
    right.classList.add("right")
    right.id = "right"
    content.appendChild(left)
    content.appendChild(right)
    
    const prHead = document.createElement("div")
    prHead.classList.add("prHead")
    prHead.id = "prHead"
    const prName = document.createElement("h2")
    prName.classList.add("prName")
    prName.textContent = "PROJECTS"
    const prBtn = document.createElement("button")
    prBtn.classList.add("prBtn")
    prBtn.id = "prBtnId"
    prBtn.textContent = "Add"
    prHead.appendChild(prName)
    prHead.appendChild(prBtn)
    
    left.appendChild(prHead)
}


return{body}

})()

export default structure