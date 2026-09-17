"use client";

import { DragDropProvider } from "@dnd-kit/react";

const KanbanDNDArea = ({ children }: { children: React.ReactNode }) => {
  return <DragDropProvider>{children}</DragDropProvider>;
};

export default KanbanDNDArea;
