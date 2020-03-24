import { Component, OnInit, NgModule } from '@angular/core';
import { Todo, todosService, Importance } from '../shared/todos.service'


@Component({
  selector: 'app-todo',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})




export class TableComponent implements OnInit {
  public viewTodo: Todo | undefined
  public filter: string
  public filterApply: any
  constructor(public todosServise: todosService) {
    this.filterApply = todosServise.todoFilter
  }

  rowClick(e: any, id: number) {
    if (e.target.tagName !== 'INPUT') {
      this.todosServise.rowClick(id)
    }
  }

  onChangeComplete(id: number) {
    this.todosServise.onToggle(id)
  }

  setFilter = (e: any, filterName: string | null) => {
    if (filterName !== this.filter) {
      this.filter = filterName
      this.filterApply(filterName)
    }

  }

  ngOnInit(): void {
    this.filterApply(null)
  }

}
