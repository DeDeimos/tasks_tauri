import { TaskApi, TaskModel, normalizeTask } from "../model";
import { API_URL } from "../../../shared/config";
import { fetch } from "@tauri-apps/api/http";

// export async function fetchTasks(
//   title: string | null = null
// ): Promise<TaskModel[]> {
//   let response;

//   if (title) {
//     title = title?.toLocaleLowerCase();
//     response = await fetch(`${API_URL}/tasks?title=${title}`);
//   } else {
//     response = await fetch(`${API_URL}/tasks`);
//   }

//   const { tasks } = await response.json();

//   return tasks.map(normalizeTask);
// }

// export async function fetcTask(id: string): Promise<TaskModel> {
//   const response = await fetch(`${API_URL}/tasks/${id}`);
//   const task = await response.json();

//   if (!task) {
//     throw new Error(`Task with id ${id} not found`);
//   }

//   return normalizeTask(task);
// }

export async function fetchTasks(
  title: string | null = null
): Promise<TaskModel[]> {
  let response;
  if (title) {
    response = await fetch(`${API_URL}/tasks?title=${title}`, {
      method: "GET",
      timeout: 30,
    });
  } else {
    response = await fetch(`${API_URL}/tasks`, {
      method: "GET",
      timeout: 30,
    });
  }

  if (response.ok) {
    const tasks = response.data as {
      ActiveRequestID: number | null;
      tasks: TaskApi[];
    };
    console.log(tasks);

    return tasks.tasks.map(normalizeTask);
  } else {
    throw new Error(response.status.toString());
  }
}

export async function fetcTask(id: string): Promise<TaskModel> {
  let response = await fetch(`${API_URL}/tasks/${id}`, {
    method: "GET",
    timeout: 30,
  });

  if (response.ok) {
    const task = response.data as TaskApi;
    console.log(task);

    return normalizeTask(task);
  } else {
    throw new Error(response.status.toString());
  }
}
