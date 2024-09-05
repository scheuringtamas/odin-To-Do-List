export function createToDoListItem(
  title,
  description,
  dueDate,
  priority,
  projects = "default"
) {
  const validPriorities = ["low", "medium", "high"];

  return {
    title,
    description,
    dueDate,
    priority,
    projects,
  };
}
