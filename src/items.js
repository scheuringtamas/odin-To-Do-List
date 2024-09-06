export function createToDoListItem(
  title,
  description,
  dueDate,
  priority,
  projects = "default",
  status = false
) {
  const validPriorities = ["low", "medium", "high"];

  return {
    title,
    description,
    dueDate,
    priority,
    projects,
    status,
    toggleStatus() {
      this.status = !this.status;
    },
  };
}
