import { Route } from "@angular/router";
import { TaskListComponent } from "./task-list.component";
import { AddTaskComponent } from "../add-task/add-task.component";
import { taskExistsGuard } from "../../core";

export const routes: Route[] = [
  {
    path: "",
    component: TaskListComponent,
  },
  {
    path: "add-task",
    component: AddTaskComponent
  },
  {
    path: "edit-task/:id",
    component: AddTaskComponent,
    canActivate: [taskExistsGuard]
  }
];
