import StoreEngine from '../../../libraries/store'

import { TodoContainer, TodoItem } from '../../../models/todo'

import { Application, StandardDataflowEvents } from '../common'

import runtime from '../../runtime'

export const CODE = 'TODO'
export const Description = 'This is a todo application'

export const ComponentEvents = {
    OPEN_CREATE_TODO: 'OPEN_CREATE_TODO'
}

export const DataflowEvents = {
    CREATE_TODO_ITEM: 'CREATE_TODO_ITEM',

    UPDATE_STATUS: 'UPDATE_STATUS'
}

export class TodoApplication extends Application {
    engine: StoreEngine

    container: TodoContainer

    constructor() {
        super(CODE, Description)

        this.container = new TodoContainer()
        this.engine = new StoreEngine()

        this._handleInlineInit()
    }

    _handleInlineInit() {
        this.subscribe(StandardDataflowEvents.UPDATE_STATUS, () => this.store())
    }

    getContainer(): TodoContainer {
        return this.container
    }

    store() {
        const state = this.container.toEncode()

        this.engine.set(this.name, state)
    }

    restore() {
        const content = this.engine.get(this.name)

        if (content) {
            this.container.toDecode(content)
        }
    }

    createTodo(todo: TodoItem) {
        this.container.insert(todo)
        this
            .publish(StandardDataflowEvents.UPDATE_STATUS)
            .publish(DataflowEvents.CREATE_TODO_ITEM)
    }

    selectTodo(uuid: string) {
        this.container.select(uuid)
    }

    deleteTodo(uuid: string) {
        this.container.delete(uuid)
    }

    finishTodo(uuid: string, finished: boolean) {
        this.container.select(uuid)?.setFinished(finished)

        this.publish(StandardDataflowEvents.UPDATE_STATUS)
    }

}

function getApplication(): TodoApplication {
    let application = runtime.getApplication(CODE)

    if (!application) {
        application = new TodoApplication()
        runtime.registerApplication(application)

        runtime.registerShortcut('command+e', () => application?.publish(ComponentEvents.OPEN_CREATE_TODO))
    }

    return application as TodoApplication
}

export default {
    getApplication
}