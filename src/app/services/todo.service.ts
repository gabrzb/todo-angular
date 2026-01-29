import { Injectable, computed, signal } from '@angular/core';
import { TodoModel } from '../models/todo.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private readonly STORAGE_KEY = 'todos_list';
  private readonly todosSignal = signal<TodoModel[]>([]);
  readonly todos = this.todosSignal.asReadonly();
  readonly completedTodos = computed(() => this.todosSignal().filter(todo => todo.isCompleted));
  readonly pendingTodos = computed(() => this.todosSignal().filter(todo => !todo.isCompleted));
  readonly totalTodos = computed(() => this.todosSignal().length);
  readonly completedCount = computed(() => this.completedTodos().length);
  readonly pendingCount = computed(() => this.pendingTodos().length);

  constructor(private storageService: StorageService) {
    this.loadTodos();
  }

  // Carregar tarefas do armazenamento local
  loadTodos(): void {
    try {
      console.log('📂 Carregando tarefas...');
      const todosJson = this.storageService.load<any[]>(this.STORAGE_KEY);
      
      if (todosJson && todosJson.length > 0) {
        const todos = todosJson.map(item => TodoModel.fromJson(item));
        this.todosSignal.set(todos);
        console.log(`✅ ${todos.length} tarefa(s) carregada(s)`);
      } else {
        console.log('ℹ️ Nenhuma tarefa salva encontrada');
      }
    } catch (error) {
      console.error('❌ Erro ao carregar tarefas:', error);
    }
  }

  // Salvar tarefas no armazenamento local
  private saveTodos(): void {
    try {
      const todosJson = this.todosSignal().map(todo => todo.toJson());
      this.storageService.save(this.STORAGE_KEY, todosJson);
      console.log(`💾 ${this.todosSignal().length} tarefa(s) salva(s)`);
    } catch (error) {
      console.error('❌ Erro ao salvar tarefas:', error);
    }
  }

  // Adicionar nova tarefa
  addTodo(title: string, description: string): void {
    const newTodo = new TodoModel(
      Date.now().toString(),
      title,
      description,
      false,
      new Date()
    );

    const updatedTodos = [newTodo, ...this.todosSignal()];
    this.todosSignal.set(updatedTodos);
    this.saveTodos();
  }

  // Alternar status de conclusão
  toggleTodoStatus(id: string): void {
    const todos = this.todosSignal().map(todo => 
      todo.id === id ? todo.copyWith({ isCompleted: !todo.isCompleted }) : todo
    );
    this.todosSignal.set(todos);
    this.saveTodos();
  }

  // Editar tarefa
  editTodo(id: string, title: string, description: string): void {
    const todos = this.todosSignal().map(todo =>
      todo.id === id ? todo.copyWith({ title, description }) : todo
    );
    this.todosSignal.set(todos);
    this.saveTodos();
  }

  // Deletar tarefa
  deleteTodo(id: string): void {
    const todos = this.todosSignal().filter(todo => todo.id !== id);
    this.todosSignal.set(todos);
    this.saveTodos();
  }

  // Deletar todas as tarefas concluídas
  deleteCompletedTodos(): void {
    const todos = this.todosSignal().filter(todo => !todo.isCompleted);
    this.todosSignal.set(todos);
    this.saveTodos();
  }

  // Reordenar tarefas
  reorderTodos(oldIndex: number, newIndex: number, filter: number): void {
    // Determina qual lista está sendo reordenada
    let targetList: TodoModel[];
    switch (filter) {
      case 1:
        targetList = [...this.pendingTodos()];
        break;
      case 2:
        targetList = [...this.completedTodos()];
        break;
      default:
        targetList = [...this.todosSignal()];
    }

    // Ajusta o índice
    if (oldIndex < newIndex) {
      newIndex -= 1;
    }

    // Reordena
    const [movedItem] = targetList.splice(oldIndex, 1);
    targetList.splice(newIndex, 0, movedItem);

    // Reconstruir a lista principal mantendo a nova ordem
    let finalList: TodoModel[];
    if (filter !== 0) {
      if (filter === 1) {
        finalList = [...targetList, ...this.completedTodos()];
      } else {
        finalList = [...this.pendingTodos(), ...targetList];
      }
    } else {
      finalList = targetList;
    }

    this.todosSignal.set(finalList);
    this.saveTodos();
  }
}
