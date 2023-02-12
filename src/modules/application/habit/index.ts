import StoreEngine from '../../../libraries/store'

import { DailyPeriodic, Habit, HabitContainer, HabitPeriodicType, WeeklyPeriodic } from '../../../models/habit'

import { Application, StandardDataflowEvents } from '../common'

import runtime, { Runtime } from '../../runtime'
import TODO, { CODE as TODO_CODE, TodoApplication } from '../todo';
import { TodoContainer, TodoItem } from '../../../models/todo';

export const CODE = 'HABIT'
export const Description = 'This is a habit application'

export const ComponentEvents = {
    OPEN_CREATE_HABIT: 'OPEN_CREATE_HABIT'
}

export const DataflowEvents = {
    CREATE_HABIT: 'CREATE_HABIT',
}

export class HabitApplication extends Application {
    runtime: Runtime

    engine: StoreEngine

    container: HabitContainer

    constructor(runtime: Runtime) {
        super(CODE, Description)

        this.runtime = runtime

        this.engine = new StoreEngine()
        this.container = new HabitContainer()

        this._handleInlineInit()
    }

    _handleInlineInit() {
        this.subscribe(StandardDataflowEvents.UPDATE_STATUS, () => this.store())
    }

    getContainer(): HabitContainer {
        return this.container
    }

    createHabit(habit: Habit) {
        this.container.insert(habit)

        const TODO = runtime.getApplication(TODO_CODE) as TodoApplication

        if (TODO) {
            const container = TODO.getContainer() as TodoContainer

            const items = container.selectAllTodoItems()

            let todo = null;

            switch (habit.periodic) {
                case HabitPeriodicType.DAILY: {
                    const periodic = new DailyPeriodic();
                    todo = periodic.inspect(habit, items);
                }
                case HabitPeriodicType.WEEKLY: {
                    const periodic = new WeeklyPeriodic();
                    todo = periodic.inspect(habit, items);
                }
            }

            if (todo) {
                TODO.createTodo(todo)

                todo.setCallback((n: TodoItem) => {

                    n.finished ? habit.count++ : habit.count--;

                    this.publish(
                        StandardDataflowEvents.UPDATE_STATUS
                    )
                })
            }
        }

        this.publish(StandardDataflowEvents.UPDATE_STATUS)

        return this
    }

    finishHabit(uuid: string, finished: boolean) {
        const index = this.container._indexes.get(uuid);

        if (index) {
            this.container.habits[index - 1].setFinished(finished)
        }

        this.publish(StandardDataflowEvents.UPDATE_STATUS)

        return this
    }

    store() {
        const state = this.container.toEncode()

        this.engine.set(this.name, state)
    }

    restore() {
        const content = this.engine.get(this.name)

        if (content) {
            this.container.toDecode(content)

            this.container.habits.forEach(habit => this.createHabit(habit))
        }
    }

}

function getApplication(): HabitApplication {
    let application = runtime.getApplication(CODE)

    if (!application) {
        application = new HabitApplication(runtime)
        runtime.registerApplication(application)

        runtime.registerShortcut('command+h', () => {
            application?.publish(ComponentEvents.OPEN_CREATE_HABIT)
        })
    }

    return application as HabitApplication
}

export default {
    getApplication
}