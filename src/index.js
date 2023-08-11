import "./css/reset.css";
import "./css/style.css";
import { loadProjectsFromLocalStorage } from "./modules/localStorage";
import { createProject, projects } from "./modules/projects";
import createToDo from "./modules/todos";
import {
    loadAddProjectButton,
    loadAddTodoButton,
    loadProjectList,
    loadToDoList,
} from "./modules/UI";

window.addEventListener("DOMContentLoaded", () => {
    loadProjectsFromLocalStorage();
    if (!projects[0]) {
        createProject("Inbox");
        createToDo(
            0,
            "An Example To-Do!",
            "This is an example of what a To-Do will look like, press the plus sign above to add your own To-Do, press the delete icon on the right to remove this example, and press the plus sign over on the left to create a new project.",
            "2023-08-18",
            1
        );
    }
    loadAddProjectButton();
    loadAddTodoButton();
    loadProjectList();
    loadToDoList(0);
});
