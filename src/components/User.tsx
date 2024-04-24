

import React from "react";
import { useSortable } from "@dnd-kit/sortable";

interface Person {
  name: string;
  id: number;
}

interface UserProps {
  user: Person;
}

 export const User: React.FC<UserProps> = ({ user }) => {
  const { attributes, listeners, setNodeRef } = useSortable({
    id: user.id,
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="rounded-md text-center w-[300px] text-sm flex flex-col mx-auto items-center justify-center space-y-6 m-9 p-2 bg-orange-300"
    >
      <h1>{user.name}</h1>
    </div>
  );
};

