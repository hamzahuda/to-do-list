"use strict";

import { projects, createProject, removeToDo } from "./projects";
import createToDo from "./todos";
import { format } from "date-fns";
import deleteIcon from "../images/delete.png";
import editIcon from "../images/edit.png";

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
        if (priority.value <= 3 && priority.value >= 1) {
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
        projects[projectIndex].todoList.forEach((todo, todoIndex) => {
            // Main element
            const todoNode = document.createElement("div");
            todoNode.classList.add("todo");
            todoNode.dataset.index = todoIndex;

            // Checkbox child element
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.classList.add("todo-checkbox");
            checkbox.checked = todo.completed ? true : false;
            checkbox.addEventListener("click", () => {
                todo.completed = !todo.completed;
            });
            todoNode.appendChild(checkbox);

            // -----MAIN CONTENT-----

            const todoMainContent = document.createElement("div");
            todoMainContent.classList.add("todo-main-content");

            // Title child element
            const todoTitle = document.createElement("div");
            todoTitle.classList.add("todo-title");
            todoTitle.textContent = todo.title;
            todoMainContent.appendChild(todoTitle);

            // Description child element
            if (todo.description) {
                const desc = document.createElement("div");
                desc.classList.add("todo-description");
                desc.textContent = todo.description;
                todoMainContent.appendChild(desc);
            }

            // Due Date child element

            if (todo.dueDate) {
                const dueDate = document.createElement("div");
                dueDate.classList.add("due-date");
                dueDate.textContent = format(new Date(todo.dueDate), "PP");
                todoMainContent.appendChild(dueDate);
            }

            todoNode.appendChild(todoMainContent);

            // -----MAIN CONTENT-----

            // Priority child element
            const priority = document.createElement("div");
            priority.classList.add(`priority-${todo.priority}`);
            todoNode.appendChild(priority);

            // Edit button
            const editButton = document.createElement("button");
            editButton.classList.add("edit-button");
            editButton.addEventListener("click", () => {
                editButton.style.display = "none";
                todoMainContent.style.display = "none";

                const editMainContent = document.createElement("div");
                editMainContent.classList.add("main-content");

                // Edit Title element
                const editTitle = document.createElement("input");
                editTitle.type = "text";
                editTitle.classList.add("edit-title");
                editTitle.value = todo.title;
                editMainContent.appendChild(editTitle);

                // Edit Description element
                const editDesc = document.createElement("input");
                editDesc.type = "textarea";
                editDesc.classList.add("edit-description");
                editDesc.value = todo.description;
                editMainContent.appendChild(editDesc);

                // Edit Date element
                const editDate = document.createElement("input");
                editDate.type = "date";
                editDate.classList.add("edit-date");
                editDate.value = todo.dueDate;
                editMainContent.appendChild(editDate);

                // Edit Priority element
                const editPriority = document.createElement("input");
                editPriority.type = "number";
                editPriority.max = 3;
                editPriority.min = 1;
                editPriority.classList.add("edit-priority");
                editPriority.value = todo.priority;
                editMainContent.appendChild(editPriority);

                // Save and Cancel buttons
                const saveBtn = document.createElement("button");
                saveBtn.classList.add("save-button");
                saveBtn.textContent = "Save";
                saveBtn.addEventListener("click", () => {
                    if (editTitle.value !== "") {
                        todo.title = editTitle.value;
                    }
                    todo.description = editDesc.value
                        ? editDesc.value
                        : undefined;
                    todo.dueDate = editDate.value ? editDate.value : undefined;
                    if (editPriority.value <= 3 && editPriority.value >= 1) {
                        todo.priority = editPriority.value;
                    }

                    loadToDoList(projectIndex);
                });
                editMainContent.appendChild(saveBtn);

                const cancelBtn = document.createElement("button");
                cancelBtn.classList.add("cancel-button");
                cancelBtn.textContent = "Cancel";
                cancelBtn.addEventListener("click", () => {
                    loadToDoList(projectIndex);
                });
                editMainContent.appendChild(cancelBtn);

                checkbox.after(editMainContent);
            });
            const editImg = new Image();
            editImg.src = editIcon;
            editButton.appendChild(editImg);
            todoNode.appendChild(editButton);

            // Delete button
            const deleteButton = document.createElement("button");
            deleteButton.classList.add("delete-button");
            deleteButton.addEventListener("click", () => {
                removeToDo(projectIndex, todoIndex);
                loadToDoList(projectIndex);
            });
            const deleteImg = new Image();
            deleteImg.src = deleteIcon;
            deleteButton.appendChild(deleteImg);
            todoNode.appendChild(deleteButton);

            // Add to DOM
            todoList.appendChild(todoNode);
            todoList.appendChild(document.createElement("hr"));
        });
    }
}
