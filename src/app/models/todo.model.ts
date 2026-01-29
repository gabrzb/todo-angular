export interface Todo {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt: Date;
}

export class TodoModel implements Todo {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt: Date;

  constructor(
    id: string,
    title: string,
    description: string = '',
    isCompleted: boolean = false,
    createdAt: Date = new Date()
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.isCompleted = isCompleted;
    this.createdAt = createdAt;
  }

  // Método para criar uma cópia com alterações
  copyWith(updates: Partial<Todo>): TodoModel {
    return new TodoModel(
      updates.id ?? this.id,
      updates.title ?? this.title,
      updates.description ?? this.description,
      updates.isCompleted ?? this.isCompleted,
      updates.createdAt ?? this.createdAt
    );
  }

  // Converter para JSON
  toJson(): any {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      isCompleted: this.isCompleted,
      createdAt: this.createdAt.toISOString(),
    };
  }

  // Criar a partir de JSON
  static fromJson(json: any): TodoModel {
    return new TodoModel(
      json.id,
      json.title,
      json.description ?? '',
      json.isCompleted ?? false,
      new Date(json.createdAt)
    );
  }
}