import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import useSWR from "swr";
import Link from "next/link";

import { getTodos, addTodo } from "../api/api";

export default function TodoDashboard() {
  const { data } = useSWR("/api/todos", getTodos, { revalidateOnMount: true });

  return (
    <div>
      <Toaster toastOptions={{ position: "bottom-center" }} />
      <h1>Todos </h1>
      <ul>
        {data
          ? data.map((todo) => {
              return <li key={todo.id}>{todo.text}</li>;
            })
          : null}
      </ul>
      <Link href='./add-todo'>Add Todo</Link>
    </div>
  );
}
