import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TaskService } from '../../services';

export const taskExistsGuard: CanActivateFn = (route, state) => {
  const taskService = inject(TaskService);
  const router = inject(Router);

  const taskId = +route.params['id'];

  if(!!taskService.getTask(taskId)){
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};
