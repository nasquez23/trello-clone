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
}

export interface AddTaskInputProps {
  hideAddTaskInput: () => void;
}