const storage = {
    saveProjects: (projects) => {
      localStorage.setItem('projects', JSON.stringify(projects));
    },
    getProjects: () => {
      return JSON.parse(localStorage.getItem('projects')) || [];
    },
    saveTodos: (projectTitle, todos) => {
      localStorage.setItem(`todos_${projectTitle}`, JSON.stringify(todos));
    },
    getTodos: (projectTitle) => {
      return JSON.parse(localStorage.getItem(`todos_${projectTitle}`)) || [];
    }
  };
  
  const leftF = () => {
    document.addEventListener("DOMContentLoaded", () => {
      const projects = storage.getProjects();
      const prBtn = document.getElementById("prBtnId");
      const prHead = document.getElementById("prHead");
      let inputActive = false;
  
      projects.forEach(project => {
        createProjectElement(project);
      });
  
      prBtn.addEventListener("click", () => {
        if (inputActive) return;
        inputActive = true;
        const inputCont = document.createElement("div");
        inputCont.classList.add("inputCont");
        const input = document.createElement("input");
        input.classList.add("input");
        const inputBtn = document.createElement("button");
        inputBtn.classList.add("inputBtn");
        inputBtn.textContent = "submit";
        inputCont.appendChild(input);
        inputCont.appendChild(inputBtn);
        prHead.appendChild(inputCont);
  
        inputBtn.addEventListener("click", () => {
          if (input.value.trim() === "") return;
          const projectTitle = input.value.trim();
          projects.push(projectTitle);
          storage.saveProjects(projects);
          createProjectElement(projectTitle);
          input.value = "";
          inputCont.remove();
          inputActive = false;
        });
      });
    });
  
    function createProjectElement(projectTitle) {
      const innerDiv = document.createElement("div");
      innerDiv.classList.add("innerDiv");
      const title = document.createElement("h2");
      title.classList.add("title");
      title.id = "title";
      title.textContent = projectTitle;
      innerDiv.appendChild(title);
      document.getElementById("prHead").appendChild(innerDiv);
    }
  };
  

  const rightF = () => {
    let currentProject = null;
    let currentTitle = null;
  
    const handleClick = (titleElement) => {
      const titleText = titleElement.textContent;
      if (currentTitle === titleText) return;
      
      currentTitle = titleText;
      const right = document.getElementById("right");
      right.innerHTML = "";
      
      const rDiv = document.createElement("div");
      rDiv.classList.add("rDiv");
      const header = document.createElement("h1");
      header.classList.add("header");
      header.textContent = titleText;
      header.style.background = "gray";
      header.style.fontSize = "100px";
      header.style.borderRadius = "20px";
      const remove = document.createElement("button");
      remove.classList.add("remove");
      remove.textContent = "delete";
      rDiv.appendChild(header);
      rDiv.appendChild(remove);
      right.appendChild(rDiv);
      
      const addBtn = document.createElement("button");
      addBtn.classList.add("inputBtn");
      addBtn.textContent = "Add-Todo";
      right.appendChild(addBtn);
      addBtn.addEventListener("click", () => openToDoModal(titleText));
      
      remove.addEventListener("click", () => {
        right.innerHTML = "";
        if (currentProject) {
          currentProject.remove();
          const projects = storage.getProjects().filter(p => p !== titleText);
          storage.saveProjects(projects);
          localStorage.removeItem(`todos_${titleText}`);
        }
      });
  
    
      const todos = storage.getTodos(titleText);
      todos.forEach(todo => createTodoElement(todo, right));
    };
  
    document.addEventListener("click", (e) => {
      if (e.target && e.target.classList.contains("title")) {
        const titleElement = e.target;
        currentProject = titleElement.closest(".innerDiv");
        handleClick(titleElement);
      }
    });
  
    const openToDoModal = (projectTitle) => {
      const modal = document.createElement("div");
      modal.classList.add("modal");
  
      const modalContent = document.createElement("div");
      modalContent.classList.add("modal-content");
  
      const titleInput = document.createElement("input");
      titleInput.placeholder = "To-Do Title";
      titleInput.classList.add("todo-title");
  
      const descriptionInput = document.createElement("textarea");
      descriptionInput.placeholder = "To-Do Description";
      descriptionInput.classList.add("todo-description");
  
      const prioritySelect = document.createElement("select");
      prioritySelect.classList.add("todo-priority");
      const priorityOptions = ["Low", "Medium", "High"];
      priorityOptions.forEach((optionText) => {
        const option = document.createElement("option");
        option.value = optionText;
        option.textContent = optionText;
        prioritySelect.appendChild(option);
      });
  
      const submitBtn = document.createElement("button");
      submitBtn.textContent = "Submit";
      submitBtn.classList.add("submit-todo");
  
      const closeBtn = document.createElement("button");
      closeBtn.textContent = "Close";
      closeBtn.classList.add("close-modal");
  
      modalContent.appendChild(titleInput);
      modalContent.appendChild(descriptionInput);
      modalContent.appendChild(prioritySelect);
      modalContent.appendChild(submitBtn);
      modalContent.appendChild(closeBtn);
  
      modal.appendChild(modalContent);
  
      document.body.appendChild(modal);
  
      closeBtn.addEventListener("click", () => {
        modal.remove();
      });
  
      submitBtn.addEventListener("click", () => {
        const todoTitle = titleInput.value.trim();
        const todoDescription = descriptionInput.value.trim();
        const todoPriority = prioritySelect.value;
  
        if (todoTitle && todoDescription) {
          const todo = { title: todoTitle, description: todoDescription, priority: todoPriority };
          const todos = storage.getTodos(projectTitle);
          todos.push(todo);
          storage.saveTodos(projectTitle, todos);
  
          const right = document.getElementById("right");
          createTodoElement(todo, right);
  
          modal.remove();
        } else {
          alert("Please fill in all fields!");
        }
      });
    };
  
    function createTodoElement(todo, container) {
      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo-item");
      todoDiv.style.background = "gray";
  
      const todoHeader = document.createElement("h3");
      todoHeader.textContent = todo.title;
  
      const todoDesc = document.createElement("p");
      todoDesc.textContent = `Description: ${todo.description}`;
  
      const todoPrio = document.createElement("p");
      todoPrio.textContent = `Priority: ${todo.priority}`;
  
      const removeBtn = document.createElement("button");
      removeBtn.textContent = "remove";
      removeBtn.classList.add("Remove");
  
      todoDiv.appendChild(todoHeader);
      todoDiv.appendChild(todoDesc);
      todoDiv.appendChild(todoPrio);
      todoDiv.appendChild(removeBtn);
  
      container.appendChild(todoDiv);
  
      removeBtn.addEventListener("click", () => {
        todoDiv.remove();
        const todos = storage.getTodos(currentTitle).filter(t => t.title !== todo.title);
        storage.saveTodos(currentTitle, todos);
      });
    }
  };
  
  export { leftF, rightF };