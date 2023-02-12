<script setup lang="ts">
import './screensaver.css'

import dayjs from 'dayjs'
import _ from 'lodash'

import { ref } from 'vue'

import {
    CalendarOutline
} from '@vicons/ionicons5'

import { TodoContainer } from '../../models/todo'
import { StatisticTodo } from '../todo'
import TodoList from '../todo/common/list.vue'

import { StatisticHabit } from '../habit'

import TODO, { DataflowEvents } from '../../modules/application/todo'

interface ScreenProps {
    isDark: boolean
    isShow: boolean
}

const props = defineProps<ScreenProps>()

const emits = defineEmits(['show'])

let status = ref<boolean>(props.isShow)

let clock = ref<string>(dayjs().format())
setInterval(() => {
    clock.value = dayjs().format()
}, 1000)

function handleUpdateState() {
    status.value = !status.value
    emits('show', status.value)
}

const application = TODO.getApplication();

const todo = ref<TodoContainer>(handleRefreshTodoStatus());

function handleRefreshTodoStatus() {
    const _todo = application.getContainer();
    return _.cloneDeep(_todo)
}

application.subscribe(DataflowEvents.CREATE_TODO_ITEM, () => {
    todo.value = handleRefreshTodoStatus()
})

</script>

<template>
    <n-element tag="div" class="screen"
        :class="{ 'dark-mode': isDark, 'screen-opend': status, 'screen-close': !status }">
        <n-element tag="div" class="screen-header" @click="handleUpdateState">
            <n-element tag="div" class="screen-header-left-side">
            </n-element>
            <n-element tag="div" class="screen-header-center-side">
                <n-text>{{ clock }}</n-text>
            </n-element>
            <n-element tag="div" class="screen-header-right-side">
                <n-button tertiary circle size="tiny" style="margin-bottom: 8px;">
                    <template #icon>
                        <n-icon>
                            <CalendarOutline />
                        </n-icon>
                    </template>
                </n-button>
            </n-element>
        </n-element>
        <n-element tag="div" class="screen-content">
            <n-element tag="div" class="screen-content-left-side">
                <TodoList :todo="todo" :date="new Date()" />
            </n-element>
            <n-element class="screen-content-right-side">
                <StatisticTodo :date="new Date()" />

                <StatisticHabit />
            </n-element>
        </n-element>
    </n-element>
</template>

<style scoped>
</style>
