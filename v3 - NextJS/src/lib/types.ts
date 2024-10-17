export interface Task {
  id: string;
  title: string;
  sectionId: string;
}

export interface User {
  email: string;
  password: string;
}

export interface TaskListProps {
  title: string;
  tasks: Task[] | undefined;
}

export interface TaskProps {
  task: Task;
  index: number;
}

export interface AddTaskInputProps {
  sectionId: string;
  hideAddTaskInput: () => void;
}

export interface DeleteModalProps {
  open: boolean;
  onClose: () => void;
  handleDeleteTask: () => void;
  isDeleting: boolean;
}
