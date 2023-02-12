import { v4 } from "uuid"
import { DEFAULT_DAILY_SCENE } from "../scene"

export const TodoLevel = {
    HIGHEST: 'HIGHEST',
    HIGH: 'HIGH',
    MEDIUM: 'MEDIUM',
    LOW: 'LOW'
}

export const TodoLevelStyle = {
    HIGHEST: {
        code: 'HIGHEST',
        color: '#e88080'
    },
    HIGH: {
        code: 'HIGH',
        color: '#f2c97d',
    },
    MEDIUM: {
        code: 'MEDIUM',
        color: '#63e2b7',
    },
    LOW: {
        code: 'LOW',
        color: '#70c0e8'
    }
}

export class TodoItem {
    uuid: string

    scene: string

    level: string

    content?: string

    deadline?: Date

    finished: boolean
    deleted: boolean

    callback?: Function

    createTime: Date
    updateTime: Date

    metadata: Record<string, string | number>

    constructor() {
        this.uuid = v4()

        this.scene = DEFAULT_DAILY_SCENE.ANYTIME
        this.level = TodoLevel.LOW

        this.finished = false
        this.deleted = false

        this.metadata = {}

        this.createTime = new Date()
        this.updateTime = new Date()
    }

    _setFlushTime() {
        this.updateTime = new Date()

        return this
    }

    getUUID() {
        return this.uuid
    }

    setUUID(uuid: string) {
        this.uuid = uuid;
    }

    getScene() {
        return this.scene
    }

    setScene(scene: string) {
        this.scene = scene

        return this._setFlushTime()
    }

    setFinished(finished: boolean) {
        this.finished = finished

        if (this.callback) {
            this.callback(this)
        }
    }

    setDeleted(deleted: boolean) {
        this.deleted = deleted
    }

    setDeadline(time: Date) {
        this.deadline = time;

        return this._setFlushTime()
    }

    setLevel(level: string) {
        this.level = level

        return this._setFlushTime()
    }

    setContent(content: string) {
        this.content = content

        return this._setFlushTime()
    }

    setCallback(callback: Function) {
        this.callback = callback
    }

    setMetadata(key: string, value: string | number) {
        Object.assign(this.metadata, {
            [key]: value
        })

        return this._setFlushTime()
    }

    toEncode() {
        return JSON.stringify(this)
    }

    toDecode(content: string) {
        Object.assign(this, { ...JSON.parse(content) })

        if (typeof this.createTime === 'string') {
            this.createTime = new Date(this.createTime)
        }

        if (typeof this.updateTime === 'string') {
            this.createTime = new Date(this.updateTime)
        }

        if (typeof this.deadline === 'string') {
            this.deadline = new Date(this.deadline)
        }

        return this;
    }
}