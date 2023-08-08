import { projects, createProject } from "./projects";
import createToDo from "./todos";

export function loadAddProjectButton() {
    const addProject = document.getElementById("addProject");
    const projectModal = document.getElementById("projectModal");
    const confirmProjectBtn = projectModal.querySelector("#confirmProjectBtn");
    const newProjectTitle = document.getElementById("newProjectTitle");

    addProject.addEventListener("click", () => {
        projectModal.showModal();
    });

    // Confirm button shouldn't submit but does reset form
    // Close button has formmethod="dialog", form data stays and modal closes
    confirmProjectBtn.addEventListener("click", (event) => {
        event.preventDefault();
        if (newProjectTitle.value !== "") {
            createProject(newProjectTitle.value);
            loadProjectList();
            loadToDoList(projects.length - 1);
            newProjectTitle.value = "";
        }
        projectModal.close();
    });
}

export function loadAddTodoButton() {
    const addTodo = document.getElementById("addTodo");
    const todoModal = document.getElementById("todoModal");
    const confirmTodoBtn = todoModal.querySelector("#confirmTodoBtn");
    const title = document.getElementById("newTodoTitle");
    const description = document.getElementById("newTodoDescription");
    const dueDate = document.getElementById("newTodoDueDate");
    const priority = document.getElementById("newTodoPriority");

    addTodo.addEventListener("click", () => {
        todoModal.showModal();
    });

    // Confirm button shouldn't submit but does reset form
    // Close button has formmethod="dialog", form data stays and modal closes
    confirmTodoBtn.addEventListener("click", (event) => {
        event.preventDefault();

        let validNewTodo = true;

        if (title.value !== "") {
            title.style.borderColor = "";
        } else {
            title.style.borderColor = "red";
            validNewTodo = false;
        }
        if (priority.value <= 3 && priority.value > 0) {
            priority.style.borderColor = "";
        } else {
            priority.style.borderColor = "red";
            validNewTodo = false;
        }

        if (validNewTodo) {
            const curProjectIndex =
                document.getElementById("projectTitle").dataset.index;
            createToDo(
                curProjectIndex,
                title.value,
                description.value,
                dueDate.value,
                priority.value
            );
            loadToDoList(curProjectIndex);
            title.value = "";
            description.value = "";
            dueDate.value = "";
            priority.value = "";
            todoModal.close();
        }
    });
}

export function loadProjectList() {
    const projectList = document.getElementById("projectList");
    projectList.innerHTML = "";
    projects.forEach((project, projectIndex) => {
        const projectNode = document.createElement("li");
        projectNode.textContent = project.title;
        projectNode.classList.add("project");
        projectNode.addEventListener("click", () => {
            loadToDoList(projectIndex);
        });
        projectList.appendChild(projectNode);
    });
}

export function loadToDoList(projectIndex) {
    if (projects[projectIndex] !== undefined) {
        // Update title
        const projectTitle = document.getElementById("projectTitle");
        projectTitle.textContent = projects[projectIndex].title;
        projectTitle.dataset.index = projectIndex;

        // Load todos
        const todoList = document.getElementById("todoList");
        todoList.innerHTML = "";
        projects[projectIndex].todoList.forEach((todo) => {
            // Main element
            const todoNode = document.createElement("div");
            todoNode.classList.add("todo");

            // Checkbox child element
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.classList.add("todo-checkbox");
            checkbox.checked = todo.completed ? true : false;
            checkbox.addEventListener("click", () => {
                todo.completed = !todo.completed;
            });

            // Title child element
            const todoTitle = document.createElement("div");
            todoTitle.classList.add("todo-title");
            todoTitle.textContent = todo.title;

            // Add to DOM
            todoNode.appendChild(checkbox);
            todoNode.appendChild(todoTitle);
            todoList.appendChild(todoNode);
        });
    }
}
