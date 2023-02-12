import { v4 } from "uuid"
import { SerializedObject } from "../../models/common"

export const StandardDataflowEvents = {
    UPDATE_STATUS: 'UPDATE_STATUS'
}


export abstract class Application {
    uuid: string

    name: string

    description: string

    container?: SerializedObject

    hub: Map<string, Function[]>

    provider: Application[]

    constructor(name: string, description: string) {
        this.uuid = v4();

        this.name = name

        this.description = description

        this.hub = new Map()

        this.provider = []
    }

    abstract store(): void
    abstract restore(): void

    abstract getContainer(): SerializedObject

    subscribe(topic: string, callback: Function) {
        let callbacks = this.hub.get(topic) || []
        callbacks.push(callback)
        this.hub.set(topic, callbacks)

        return this
    }

    publish(topic: string, data?: unknown) {
        let callbacks = this.hub.get(topic)

        if (callbacks && callbacks.length) {
            callbacks.forEach(callback => callback(data))
        }

        return this
    }
}
