export function createToDoListItem(
  title,
  description,
  dueDate,
  priority,
  projects,
  status = false
) {
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
