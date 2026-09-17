export type Task = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  position: number;
  text: string;
  kanbanColumnId: number;
};

export type KanbanColumn = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  projectId: number;
  position: number;
  task: Task[];
};

export type Project = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  kanbanColumn: KanbanColumn[];
};

export type ProjectSummary = {
  id: string;
  name: string;
  date: string;
};
