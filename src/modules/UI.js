import { projects } from "./projects";

export function loadProjectList() {
    const projectList = document.getElementById("projectList");
    projectList.innerHTML = "";
    projects.forEach((project) => {
        const projectNode = document.createElement("li");
        projectNode.textContent = project.title;
        projectNode.classList.add("project");
        projectList.appendChild(projectNode);
    });
}

export function loadToDoList(projectIndex) {
    if (projects[projectIndex] !== undefined) {
        // Update title
        document.getElementById("projectTitle").textContent =
            projects[projectIndex].title;

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
