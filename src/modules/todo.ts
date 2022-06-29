import { v4 as uuidv4 } from 'uuid'

export enum TodoContentType {
    MARKDOWN = 'markdown',
    RICHTEXT = 'richtext'
}

export class TodoContent {
    type?: TodoContentType
    data?: string

    constructor() {}

    setType(type: TodoContentType) {
        this.type = type
    }

    setData(data: string) {
        this.data = data
    }
}

export class TodoItem {
    uuid: string

    level?: string

    title?: string

    content?: TodoContent

    createdAt: Date
    updatedAt: Date

    constructor() {
        this.uuid = uuidv4()

        this.createdAt = new Date()
        this.updatedAt = new Date()
    }

    _setFlushTime() {
        this.updatedAt = new Date()

        return this
    }

    getUUID() {
        return this.uuid
    }

    setLevel(level: string) {
        this.level = level

        return this._setFlushTime()
    }

    setTitle(title: string) {
        this.title = title

        this._setFlushTime();

        return this._setFlushTime()
    }

    setContent(content: TodoContent) {
        this.content = content

        return this._setFlushTime()
    }
}

export enum TodoItemType {
    COMMON = 'common',
    REPEAT = 'repeat'
}

export class CommonTodoItem extends TodoItem {
    type: TodoItemType

    deadline?: Date

    constructor() {
        super()

        this.type = TodoItemType.COMMON
    }

    setDeadline(deadline: Date) {
        this.deadline = deadline

        return this._setFlushTime()
    }
}

export class RepeatTodoItem extends TodoItem {
    type: TodoItemType

    deadline?: Date

    constructor() {
        super()

        this.type = TodoItemType.REPEAT
    }

    setDeadline(deadline: Date) {
        this.deadline = deadline

        return this._setFlushTime()
    }
}

export class Todo {
    common: Map<string, TodoItem>
    repeat: Map<string, TodoItem>

    constructor() {
        this.common = new Map()
        this.repeat = new Map()
    }

    insert(item: CommonTodoItem | RepeatTodoItem) {
        const { type } = item

        switch (type) {
            case TodoItemType.COMMON: {
                this.common.set(item.getUUID(), item)
                break
            }
            case TodoItemType.REPEAT: {
                this.repeat.set(item.getUUID(), item)
                break
            }
            default:

        }
    }

    query(uuid: string) {
        return this.common.get(uuid) || this.repeat.get(uuid)
    }

    delete(uuid: string) {
        this.common.delete(uuid)
        this.repeat.delete(uuid)
    }

    queryTodoItembyDay(date: Date): TodoItem[] {
        return []
    }

}