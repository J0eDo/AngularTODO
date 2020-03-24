import { Component, OnInit, Input } from '@angular/core';
import { todosService, RemoteBtn, Todo } from '../shared/todos.service';
import { MatDialog } from '@angular/material/dialog'
import { CreateTodoComponent } from '../create-todo/create-todo.component'
export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'remote-table',
  templateUrl: './remote-table.component.html',
  styleUrls: ['./remote-table.component.scss']
})
export class RemoteTableComponent implements OnInit {
  public changedList: any
  activeChange: boolean = true
  public add: any
  public remove: any
  public redact: any
  public btns: RemoteBtn

  constructor(public todosService: todosService, public dialog: MatDialog) {
    this.btns = todosService.remoteBtn
    this.redact = todosService.todoRedact
    this.remove = todosService.todoDelete
    this.changedList = todosService.changedList
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateTodoComponent, {
      minWidth: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  deleteMode() {
    this.todosService.deleteMode = !this.todosService.deleteMode
    /* this.remove() */
  }

  ngOnInit(): void {
  }

}
