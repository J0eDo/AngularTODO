import { Injectable } from '@angular/core'
import { element } from 'protractor'

export enum Importance {
    lv1 = 'Обычная',
    lv2 = 'Важная',
    lv3 = 'Очень важная'
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
    private changedList = new Set()
    public todos: Todo[] = [
        {
            id: 1, name: 'Second todo', description: 'it second todo',
            importance: Importance.lv1, create: dateTime,
            completed: dateTime, deadline: dateTime, changed: false
        },
        {
            id: 2, name: 'First todo', description: 'it no  second ha-ha todo(2)'
            , importance: Importance.lv1, create: dateTime,
            completed: dateTime, deadline: dateTime, changed: false
        },
        {
            id: 3, name: 'Thiard todo', description: 'it 4 todo',
            importance: Importance.lv3, create: dateTime,
            completed: dateTime, deadline: dateTime, changed: false
        },
        {
            id: 4, name: 'Five todo', description: 'it 5(five) todo',
            importance: Importance.lv2, create: dateTime,
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
        const todoElement = this.todos.find(element => element.id === id)
        if (todoElement.completed) {
            todoElement.completed = ''
        } else {
            todoElement.completed = new Date()
        }
    }

    rowClick(id: number) {
        if (this.changedList.has(id)) {
            this.changedList.delete(id)
            this.todos.find(element => element.id === id)
                .changed = false
        } else {
            this.changedList.add(id)
            this.todos.find(element => element.id === id)
                .changed = true
        }
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
        this.todos = this.todos.filter(element => !this.changedList.has(element.id))

    }

    todoAdd = () => {
        let id = this.todos.length + 1
        console.log(id);

        this.todos.push({
            id, name: 'First todo', description: 'it no  second ha-ha todo(2)'
            , importance: Importance.lv1, create: dateTime,
            completed: dateTime, deadline: dateTime, changed: false
        })
    }
    todoRedact() {
        alert('redact')
    }
}