import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TodoModel } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { AddTodoDialogComponent } from '../add-todo-dialog/add-todo-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    MatIconModule,
    MatDialogModule,
    TodoItemComponent
  ],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  filter = input<number>(0); // 0: todas, 1: pendentes, 2: concluídas
  readonly filteredTodos = computed(() => {
    switch (this.filter()) {
      case 1:
        return this.todoService.pendingTodos();
      case 2:
        return this.todoService.completedTodos();
      default:
        return this.todoService.todos();
    }
  });

  readonly emptyMessage = computed(() => {
    const filter = this.filter();
    if (filter === 2) return 'Nenhuma tarefa concluída';
    if (filter === 1) return 'Nenhuma tarefa pendente';
    return 'Nenhuma tarefa criada';
  });

  readonly emptyIcon = computed(() => (this.filter() === 2 ? 'task_alt' : 'inbox'));

  constructor(
    public todoService: TodoService,
    private dialog: MatDialog
  ) {}

  onDrop(event: CdkDragDrop<TodoModel[]>): void {
    if (event.previousIndex !== event.currentIndex) {
      this.todoService.reorderTodos(event.previousIndex, event.currentIndex, this.filter());
    }
  }

  onToggleTodo(id: string): void {
    this.todoService.toggleTodoStatus(id);
  }

  onEditTodo(todo: TodoModel): void {
    const dialogRef = this.dialog.open(AddTodoDialogComponent, {
      width: 'calc(100vw - 32px)',
      maxWidth: '600px',
      data: {
        title: todo.title,
        description: todo.description,
        isEditing: true
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.todoService.editTodo(todo.id, result.title, result.description);
      }
    });
  }

  onDeleteTodo(todo: TodoModel): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirmar exclusão',
        message: 'Deseja realmente excluir esta tarefa?'
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.todoService.deleteTodo(todo.id);
      }
    });
  }

  trackByFn(index: number, item: TodoModel): string {
    return item.id;
  }
}
