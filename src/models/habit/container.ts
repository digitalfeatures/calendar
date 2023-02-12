import _ from "lodash";

import { SerializedObject } from "../common"

import { Habit } from './habit';

export class HabitContainer extends SerializedObject {
    habits: Habit[]

    _indexes: Map<string, number>

    constructor() {
        super()

        this._indexes = new Map()

        this.habits = [];
    }

    selectAllUnfinishedHabits(): Habit[] {
        return this.habits.filter(habit => !habit.finished)
    }

    insert(habit: Habit): boolean {
        const { _indexes, habits } = this
        const { uuid } = habit

        if (_indexes.get(uuid)) {
            return false
        }

        const i = habits.push(habit)

        return _indexes.set(uuid, i) && true
    }

    toEncode(): string {
        const habits = this.habits.map(habit => {
            const instance = _.cloneDeep(habit)
            return instance
        })

        let _indexes = {}

        this._indexes.forEach((value, key) => {
            Object.assign(_indexes, {
                [key]: value
            })
        })

        return JSON.stringify({
            _indexes,
            habits
        })
    }

    toDecode(content: string) {
        const { habits, _indexes } = JSON.parse(content)

        Object.entries(_indexes).forEach(([key, value]) => {
            this._indexes.set(key, value as number)
        })

        this.habits = habits.map((habit: Habit) => {
            const _habit = new Habit(habit.name, habit.description)

            _habit.setUUID(habit.uuid)

            if (habit.periodic) {
                _habit.setPeriodic(habit.periodic)
            }

            _habit.setCount(habit.count)
            _habit.setFinished(habit.finished)
            _habit.setScene(habit.scene)

            return _habit
        })
    }

}
