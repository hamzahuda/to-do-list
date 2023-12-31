import { addToDo } from "./projects";

const todoFactory = (title, description, dueDate, priority) => {
    return {
        title,
        description,
        dueDate,
        priority,
        completed: false,
    };
};

export default function createToDo(
    projectIndex,
    title,
    description,
    dueDate,
    priority
) {
    addToDo(projectIndex, todoFactory(title, description, dueDate, priority));
}
