import Link from "next/link";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import useSWR from "swr";

import { getTodos, addTodo } from "../api/api";

const swrOptions = {
  rollbackOnError: true,
  populateCache: false,
  revalidate: true,
};

console.log(swrOptions);

export default function AddTodos() {
  const [text, setText] = useState("");
  const { data, isValidating, mutate } = useSWR("/api/todos", getTodos);

  return (
    <div>
      <Toaster toastOptions={{ position: "bottom-center" }} />
      <h1>Todos </h1>
      <form onSubmit={(ev) => ev.preventDefault()}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          autoFocus
        />
        <button
          type="submit"
          onClick={async () => {
            setText("");

            const newTodo = {
              id: Date.now(),
              text
            };

            try {
              // Update the local state immediately and fire the
              // request. Since the API will return the updated
              // data, there is no need to start a new revalidation
              // and we can directly populate the cache.

              await mutate(addTodo(newTodo), {...swrOptions, optimisticData: [...data, newTodo]});
              toast.success("Successfully added the new item.");
            } catch (e) {
              console.log(e)
              // If the API errors, the original data will be
              // rolled back by SWR automatically.
              toast.error("Failed to add the new item.");
            }
          }}
        >
          Add
        </button>
      </form>
      <div hidden={!isValidating}>Loading...</div>
      <ul hidden={isValidating}>
        {data
          ? data.map((todo) => {
              return <li key={todo.id}>{todo.text}</li>;
            })
          : null}
      </ul>
      <Link href='./todo-dashboard'>Todo Dashboard</Link>
    </div>
  );
}
