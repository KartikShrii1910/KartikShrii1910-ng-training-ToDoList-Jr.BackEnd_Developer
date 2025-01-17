import { Component, Inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [MatToolbarModule, MatCardModule, MatButtonModule, MatTableModule, MatPaginatorModule, MatIconModule, ReactiveFormsModule, MatNativeDateModule, MatDialogModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatDatepickerModule
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css',
  providers: [DatePipe]
})
export class TaskFormComponent {
  taskForm: FormGroup;
  isEditMode: boolean = false;

  constructor(
    private datePipe: DatePipe,
    private fb: FormBuilder,
    private taskService: TaskService,
    private dialogRef: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!data.task;

    // Initialize the form with task data if in edit mode
    this.taskForm = this.fb.group({
      assignedTo: [data.task?.assignedTo, [Validators.required, Validators.pattern('^[a-zA-Z ]+$'), Validators.maxLength(30)]],
      status: [data.task?.status || 'Not Started', Validators.required],
      dueDate: [data.task?.dueDate || '', Validators.required],
      priority: [data.task?.priority || 'Normal', Validators.required],
      description: [data.task?.description || '', Validators.required],
    });
  }

  // Save or update the task
  saveTask(): void {
    if (this.taskForm.valid) {
      Swal.fire({
        title: 'Are you sure?',
        text: this.isEditMode ? 'Do you want to update this task?' : 'Do you want to create this task?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
          const formData = { ...this.taskForm.value };
          formData.dueDate = this.datePipe.transform(formData.dueDate, 'yyyy-MM-dd');

          if (this.isEditMode) {
            // Update task
            this.taskService.updateTask(this.data.task.id, formData).subscribe(() => {
              Swal.fire('Success!', 'The task has been updated.', 'success');
              this.dialogRef.close(true);
            });
          } else {
            // Create task
            this.taskService.createTask(formData).subscribe(() => {
              Swal.fire('Success!', 'The task has been created.', 'success');
              this.dialogRef.close(true);
            });
          }
        }
      });
    } else {
      Swal.fire('Error!', 'Please fill in all required fields.', 'error');
    }
  }

}

