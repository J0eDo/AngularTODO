import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo, todosService } from '../shared/todos.service'


@Component({
  selector: 'app-todo',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})




export class TableComponent implements OnInit {
  @Input() todos: Todo[]
  @Input() changedList: any
  constructor(public todosServise: todosService) { }
  _rowClick(e: any, id: number) {
    if (e.target.tagName !== 'INPUT') {
      this.todosServise.rowClick(id)
    }
  }

  onChangeComplete(id: number) {
    this.todosServise.onToggle(id)
  }

  ngOnInit(): void {

  }

}
