import { Component, OnInit, Inject, NgModule } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Todo, Importance, todosService } from '../shared/todos.service'
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss']
})
export class CreateTodoComponent implements OnInit {
  private saveTodo: any
  private setedTodo: Todo
  public todo: Todo = {
    id: '',
    name: '',
    description: '',
    importance: Importance.midl,
    create: '',
    deadline: '',
    completed: '',
    changed: false
  }

  constructor(
    public dialogRef: MatDialogRef<CreateTodoComponent>,
    public todosService: todosService,
    //@Inject(MAT_DIALOG_DATA) public data: IWindowData
  ) {
    this.saveTodo = todosService.todoSave
    this.setedTodo = todosService.viewTodo
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onSaveClick = () => {
    if (this.todo.name && this.todo.deadline) {
      this.todo.create = new Date()
      this.todo.id = uuidv4()
      this.saveTodo(this.todo);
      this.dialogRef.close();
    } else {
      alert('заполние все обязательные поля')
    }
  }
  ngOnInit(): void {

  }

}
