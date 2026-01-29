import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TodoService } from './services/todo.service';
import { StatsCardComponent } from './components/stats-card/stats-card.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { AddTodoDialogComponent } from './components/add-todo-dialog/add-todo-dialog.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatTooltipModule,
    StatsCardComponent,
    TodoListComponent
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {
  selectedFilter = 0;
  isLoading = signal(true);

  constructor(
    public todoService: TodoService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // Simula um pequeno delay para mostrar o loading
    setTimeout(() => {
      this.isLoading.set(false);
    }, 300);
  }

  openAddTodoDialog(): void {
    const dialogRef = this.dialog.open(AddTodoDialogComponent, {
      width: 'calc(100vw - 32px)',
      maxWidth: '600px',
      data: {
        isEditing: false
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.todoService.addTodo(result.title, result.description);
      }
    });
  }

  deleteCompletedTodos(): void {
    const completedCount = this.todoService.completedCount();
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirmar exclusão',
        message: `Deseja excluir ${completedCount} tarefa(s) concluída(s)?`
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.todoService.deleteCompletedTodos();
      }
    });
  }
}
