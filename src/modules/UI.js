import { projects, createProject } from "./projects";

export function loadAddProjectButton() {
    const addProject = document.getElementById("addProject");
    const projectModal = document.getElementById("projectModal");
    const confirmBtn = projectModal.querySelector("#confirmBtn");
    const newProjectTitle = document.getElementById("newProjectTitle");

    addProject.addEventListener("click", () => {
        projectModal.showModal();
        // TODO: Darken background on modal opening
    });

    // Confirm button shouldn't submit but does reset form
    // Close button has formmethod="dialog", form data stays and modal closes
    confirmBtn.addEventListener("click", (event) => {
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
