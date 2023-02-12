
import { TodoItem } from "./todo";
import { SerializedObject } from "../common"

export class TodoContainer extends SerializedObject {
    items: Map<string, TodoItem>

    constructor() {
        super()

        this.items = new Map()
    }

    insert(item: TodoItem) {
        const { uuid } = item;
        this.items.set(uuid, item);
    }

    select(uuid: string) {
        return this.items.get(uuid);
    }

    selectAllTodoItems() {
        return Array.from(this.items, ([_, value]) => (value))
    }

    selectAllTodoItemsByDay(date: Date): TodoItem[] {
        let items: TodoItem[] = []

        this.items.forEach(item => {
            const { deadline } = item;

            const x = deadline?.getTime() || 0;
            const t = new Date(date.setHours(0, 0, 0, 0)).getTime();

            if (t <= x && t + 24 * 60 * 60 * 1000 > x) {
                items.push(item)
            }
        })

        return items
    }

    delete(uuid: string) {
        this.items.delete(uuid)
    }

    toEncode() {
        let items = Array.from(this.items, ([_, value]) => (value.toEncode()))

        return JSON.stringify(items)
    }

    toDecode(content: string) {
        const _items = JSON.parse(content) as string[]

        _items.forEach(item => {
            const _item = new TodoItem().toDecode(item)
            this.insert(_item)
        });

        return this
    }
}
