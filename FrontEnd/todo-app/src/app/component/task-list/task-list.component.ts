import { Component, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { TaskService } from '../../services/task.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskModal } from '../../modal/task.modal';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import Swal from 'sweetalert2';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [  MatToolbarModule, MatCardModule, MatButtonModule, MatTableModule, MatPaginatorModule, MatIconModule, ReactiveFormsModule, MatNativeDateModule,
    MatDialogModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatDatepickerModule, MatMenuModule, FormsModule, CommonModule,
    MatCheckboxModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {

  displayedColumns: string[] = ['select', 'assignedTo', 'status', 'dueDate', 'priority', 'comments', 'action'];
  tasks: TaskModal[] = [];
  filteredTasks: any[] = [];
  searchQuery: string = '';
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dialog: MatDialog, private taskService: TaskService) { }


  ngOnInit(): void {
    this.fetchTasks();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  toggleAllSelection(event: MatCheckboxChange): void {
    const isChecked = event.checked;
    this.filteredTasks.forEach(task => (task.selected = isChecked));
  }

  // Fetch tasks from the backend
  fetchTasks(): void {
    this.taskService.getAllTasks().subscribe((data) => {
      this.tasks = data;
      this.filteredTasks = [...this.tasks];
      this.dataSource.data = this.filteredTasks;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Open the modal to create a new task
  openNewTaskModal(): void {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '800px',
      data: { task: null }, // No task data for a new task
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.fetchTasks(); // Refresh tasks after saving
      }
    });
  }

  // Open the modal to edit an existing task
  editTask(task: any): void {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      // width: '800px',
      data: { task },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.fetchTasks(); // Refresh tasks after updating
      }
    });
  }

  deleteTask(taskId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.taskService.deleteTask(taskId).subscribe(() => {
          Swal.fire(
            'Deleted!',
            'Your task has been deleted.',
            'success'
          );
          this.fetchTasks();
        });
      }
    });
  }


  // Refresh task list
  refresh(): void {
    // this.fetchTasks();
    location.reload();
  }

  currentPage: number = 1; // Current page number
  pageSize: number = 10;
  paginate(event: any): void {
    this.currentPage = event.page;
    this.pageSize = event.pageSize;

    // Logic to fetch paginated data (if applicable)
    console.log(`Page: ${this.currentPage}, PageSize: ${this.pageSize}`);
  }

}
