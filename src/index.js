import "./css/reset.css";
import "./css/style.css";
import {
    createProject,
    deleteProject,
    removeToDo,
    moveToDo,
    projects,
} from "./modules/projects";
import createToDo from "./modules/todos";
import {
    loadAddProjectButton,
    loadAddTodoButton,
    loadProjectList,
    loadToDoList,
} from "./modules/UI";

createProject("Inbox");
createToDo(0, "First To-Do in the inbox");
createToDo(0, "Second To-Do in the inbox");
createToDo(0, "Third To-Do in the inbox");
createToDo(0, "Fourth To-Do in the inbox");
createProject("Next");
createToDo(1, "fsdax");
createToDo(1, "Second To-Dodfasfas in the inbox");
createToDo(1, "Third To-Do fadsfin the inbox");
createToDo(1, "Fourth To-Do fadin athe inbox");

window.addEventListener("DOMContentLoaded", () => {
    loadAddProjectButton();
    loadAddTodoButton();
    loadProjectList();
    loadToDoList(0);
});
