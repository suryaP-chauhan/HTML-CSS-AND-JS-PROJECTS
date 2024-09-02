let myLibrary = [];
const form = document.getElementById("form");

function book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${this.title}, by ${this.author}, ${this.pages}, ${this.read}`
    ;
  };
}

function addBookToLibrary() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const checkbox = document.getElementById("check");
  const dis = document.getElementById("display");

  if (title === "" || author === "" || pages === "") {
    alert("Please fill out all fields.");
    return; 
  }

  let checkValue = checkbox.checked ? "read" : "not read";
  const newBook = new book(title, author, pages, checkValue);
  myLibrary.push(newBook);
  const div = document.createElement("div");
  const text = document.createElement("h3");
  const btn = document.createElement("button");
  const btnn = document.createElement("button");
  btn.classList.add("btn");
  btnn.classList.add("btn");
  btn.textContent = "remove";
  btnn.textContent = "completed";
  div.classList.add("new");
  text.textContent = newBook.info();
  div.appendChild(text);
  div.appendChild(btn);
  if (checkValue === "not read") {
    div.appendChild(btnn);
  }
  dis.appendChild(div);

  btn.addEventListener("click", () => {
    div.remove();
    myLibrary.splice(myLibrary.indexOf(newBook), 1)
  });

  btnn.addEventListener("click", (e) => {
    newBook.read = "read"
    text.textContent = newBook.info()
    btnn.remove();
  });

  newBook.info();
}

const button = document.getElementById("button");
button.addEventListener("click", function () {
  addBookToLibrary();
});
