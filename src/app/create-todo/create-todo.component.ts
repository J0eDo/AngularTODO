import { Component, OnInit, Inject, NgModule } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Todo, Importance } from '../shared/todos.service'
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss']
})
export class CreateTodoComponent implements OnInit {
  public todo: Todo = {
    id: '',
    name: '',
    description: '',
    importance: Importance.lv1,
    create: '',
    deadline: '',
    completed: '',
    changed: false
  }

  constructor(
    public dialogRef: MatDialogRef<CreateTodoComponent>,
    //@Inject(MAT_DIALOG_DATA) public data: IWindowData
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onSaveClick = () => {
    if (this.todo.name && this.todo.deadline) {
      this.todo.create = new Date()
      this.todo.id = uuidv4()
      console.log(this.todo);
    }else{
      alert('заполние все обязательные поля')
    }

   

  }
  ngOnInit(): void {
  }

}
