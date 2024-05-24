import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {

  snackBar = inject(MatSnackBar);

  warning(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: 'warning'
    });
  }

  success(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: 'success'
    });
  }

  error(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: 'error'
    });
  }
}
