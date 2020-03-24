import { Injectable } from '@angular/core'
import { element } from 'protractor'

export enum Importance {
    low = 'Обычная',
    midl = 'Важная',
    height = 'Очень важная'
}

export interface Todo {
    id: number | string,
    name: string | '',
    description: string | '',
    importance: Importance,
    create: any,
    deadline: any,
    completed: any,
    changed: boolean
}

export interface RemoteBtn {
    delete: {
        disabled: boolean
    },
    edite: {
        disabled: boolean
    },
    add: {
        disabled: boolean
    }
}

let dateTime = new Date().toUTCString()
@Injectable({ providedIn: 'root' })
export class todosService {
    public changedList = new Set()
    public viewTodo: Todo | null = null
    public todosTable: Todo[]
    public deleteMode: boolean = false
    public todosAll: Todo[] = [
        {
            id: 1, name: 'Second todo', description: 'it second todo',
            importance: Importance['low'], create: dateTime,
            completed: dateTime, deadline: dateTime, changed: false
        },
        {
            id: 2, name: 'First todo', description: 'it no  second ha-ha todo(2)'
            , importance: Importance['height'], create: dateTime,
            completed: dateTime, deadline: dateTime, changed: false
        },
        {
            id: 3, name: 'Thiard todo', description: 'it 4 todo',
            importance: Importance['midl'], create: dateTime,
            completed: dateTime, deadline: dateTime, changed: false
        },
        {
            id: 4, name: 'Five todo', description: 'it 5(five) todo',
            importance: Importance['midl'], create: dateTime,
            completed: '', deadline: dateTime, changed: false
        }
    ]

    public remoteBtn: RemoteBtn = {
        delete: {
            disabled: true
        },
        edite: {
            disabled: true
        },
        add: {
            disabled: false
        }
    }


    onToggle(id: number) {
        const todoElement = this.todosAll.find(element => element.id === id)
        if (todoElement.completed) {
            todoElement.completed = ''
        } else {
            todoElement.completed = new Date()
        }
    }

    rowClick = (id: number) => {
        const newViewTodo = this.todosAll.find(element => element.id === id)
        if (this.viewTodo === null || this.viewTodo.id !== id) {
            this.viewTodo ? this.viewTodo.changed = false : null
            this.viewTodo = newViewTodo
            this.viewTodo.changed = true
        } else {
            this.viewTodo.changed = false
            this.viewTodo = null
        }
        /*   if (this.changedList.has(id)) {
              this.changedList.delete(id)
              this.viewTodo.changed = false
          } else {
              this.changedList.add(id)
              this.viewTodo.changed = true
          } */
        this.remoteBtnsActivator()
    }

    remoteBtnsActivator() {
        const selectedItem = this.changedList.size
        if (selectedItem === 0) {
            this.remoteBtn.delete.disabled = true;
            this.remoteBtn.edite.disabled = true;
        } else if (selectedItem === 1) {
            this.remoteBtn.delete.disabled = false;
            this.remoteBtn.edite.disabled = false;
        } else {
            this.remoteBtn.delete.disabled = false;
            this.remoteBtn.edite.disabled = true;
        }
    }


    todoDelete = () => {
        this.todosAll = this.todosAll.filter(element => !this.changedList.has(element.id))
    }

    todoSave = (todo: Todo) => {
        this.todosAll.push(todo)
        localStorage.setItem('todo', JSON.stringify(todo))
    }
    todoFilter = (filter: string | null) => {
        if (filter) {
            this.todosTable = this.todosAll.filter(element => element.importance === Importance[filter])
        } else {
            this.todosTable = this.todosAll
        }
    }


    todoRedact() {
        alert('redact')
    }
}