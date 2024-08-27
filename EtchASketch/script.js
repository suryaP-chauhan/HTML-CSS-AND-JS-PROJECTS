const container = document.getElementById("container");
const button = document.getElementById("bt");


const gr = (height = 16, width = 16) => {
  container.innerHTML = ""
  const squareSize = container.clientWidth / width
  console.log(squareSize);
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const grid = document.createElement("div")
      grid.style.height = `${squareSize}px`;
      grid.style.width = `${squareSize}px`;
      grid.style.flexShrink = "0";
      container.appendChild(grid);
    }
  }
};
gr();

button.addEventListener("click", () => {
  const size = prompt("enter grid size between 16 and 100");
  if (size >= 16 && size <= 100) { 
    gr(size, size);
  } else {
    alert("invalid input");
  }
});

container.addEventListener("mouseover", (event) => {
  let red = Math.floor(Math.random() * 10 * 28.33);
  let green = Math.floor(Math.random() * 10 * 28.33);
  let blue = Math.floor(Math.random() * 10 * 28.33);
  let target = event.target;
  target.style.background = `rgb(${red}, ${green}, ${blue})`;
});
