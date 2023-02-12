import dayjs from "dayjs"

import { TodoItem } from "../todo"
import { Habit } from './habit';

export enum HabitPeriodicType {
    DAILY = 'DAILY',
    WEEKLY = 'WEEKLY'
}

export abstract class Periodic {
    abstract inspect(habit: Habit, items: TodoItem[]): TodoItem
}

export class DailyPeriodic extends Periodic {
    constructor() {
        super()
    }

    inspect(habit: Habit, items: TodoItem[]) {
        let target = items.find(item => {
            const { deadline, metadata } = item;
            if (deadline) {
                const t = new Date((deadline).setHours(0, 0, 0, 0));

                const s = new Date(new Date().setHours(0, 0, 0, 0)).getTime()

                let condition = s <= t.getTime() && t.getTime() <= s + 24 * 60 * 60 * 1000

                condition = condition && ('periodic' in metadata && metadata['periodic'] === HabitPeriodicType.DAILY)
                condition = condition && ('group_id' in metadata && metadata['group_id'] === habit.getUUID())

                return condition

            }

            return false
        });

        if (!target) {
            target = new TodoItem();

            target
                .setDeadline(new Date(new Date().setHours(23, 59, 59, 0)))
                .setScene(habit.scene)
                .setContent(habit.name)
        }

        target
            .setMetadata('periodic', HabitPeriodicType.DAILY)
            .setMetadata('group_id', habit.getUUID())

        return target
    }
}

export class WeeklyPeriodic extends Periodic {

    constructor() {
        super()
    }

    inspect(habit: Habit, items: TodoItem[]): TodoItem {

        let target = items.find(item => {
            const { deadline, metadata } = item;
            if (deadline) {
                const t = new Date((deadline).setHours(0, 0, 0, 0));

                const s = dayjs(t).day(0)
                const e = dayjs(t).day(6)

                let condition = s.toDate().getTime() <= t.getTime() && t.getTime() <= e.toDate().getTime() + 24 * 60 * 60 * 1000

                condition = condition && ('periodic' in metadata && metadata['periodic'] === HabitPeriodicType.WEEKLY)
                condition = condition && ('group_id' in metadata && metadata['group_id'] === habit.getUUID())

                return condition
            }

            return false
        });

        if (!target) {
            target = new TodoItem();
            target
                .setDeadline(new Date(new Date().setHours(23, 59, 59, 0)))
                .setScene(habit.scene)
                .setContent(habit.name)
        }

        if (target && !target.finished && target) {
            target.setDeadline(new Date(new Date().setHours(23, 59, 59, 0)))
        }

        target
            .setMetadata('periodic', HabitPeriodicType.WEEKLY)
            .setMetadata('group_id', habit.getUUID())

        return target
    }
}
