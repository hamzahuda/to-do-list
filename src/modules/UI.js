import { projects } from "./projects";

export function loadProjectList() {
    const projectList = document.getElementById("projectList");
    projectList.innerHTML = "";
    projects.forEach((project) => {
        const node = document.createElement("li");
        node.textContent = project.title;
        node.classList.add("project");
        projectList.appendChild(node);
    });
}

export function loadToDoList(projectIndex) {
    if (projects[projectIndex] !== undefined) {
        const todoList = document.getElementById("todoList");
        todoList.innerHTML = "";
        projects[projectIndex].todoList.forEach((todo) => {
            const node = document.createElement("div");
            node.textContent = todo.title;
            node.classList.add("todo");
            todoList.appendChild(node);
        });
    }
}
