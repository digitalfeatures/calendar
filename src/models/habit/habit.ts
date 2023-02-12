import { v4 } from "uuid"

import { DEFAULT_DAILY_SCENE } from "../scene";

import { HabitPeriodicType } from './periodic';

export class Habit {
    uuid: string
    name: string
    description: string

    scene: string
    count: number

    finished: boolean
    periodic: HabitPeriodicType

    constructor(name: string, description: string) {
        this.uuid = v4()

        this.scene = DEFAULT_DAILY_SCENE.ANYTIME

        this.name = name

        this.description = description

        this.count = 0

        this.finished = false
        this.periodic = HabitPeriodicType.DAILY
    }

    getUUID() {
        return this.uuid
    }

    setUUID(uuid: string) {
        this.uuid = uuid
    }

    getScene() {
        return this.scene
    }

    setScene(scene: string) {
        this.scene = scene
    }

    getCount() {
        return this.count
    }

    setCount(count: number) {
        this.count = count
    }

    getPeriodic() {
        return this.periodic
    }

    setPeriodic(periodic: HabitPeriodicType) {
        this.periodic = periodic;
    }

    getFinished() {
        return this.finished
    }

    setFinished(finished: boolean) {
        this.finished = finished
    }

}
