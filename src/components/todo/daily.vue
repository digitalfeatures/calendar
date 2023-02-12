<script setup lang="ts">
import dayjs from 'dayjs';

import _ from 'lodash';

import {
    CalendarOutline,
    Create,
} from '@vicons/ionicons5'

import TodoList from './common/list.vue'

import TODO, { ComponentEvents } from '../../modules/application/todo';

interface Daily {
    isShown: boolean

    date: Date
}

defineProps<Daily>()

const application = TODO.getApplication();

function handleCreateTodo() {
    application?.publish(ComponentEvents.OPEN_CREATE_TODO)
}

</script>

<template>
    <n-drawer v-model:show="isShown" :width="520">
        <n-drawer-content class="todo-list">
            <template #header>
                <n-element tag="div" class="todo-list-header">
                    <n-icon :component="CalendarOutline" />
                    <n-text depth="3">{{ dayjs(date).format("YYYY/MM/DD") }}</n-text>

                    <n-tooltip placement="left" trigger="hover">
                        <template #trigger>
                            <n-button quaternary round @click="handleCreateTodo">
                                <n-icon :component="Create" />
                            </n-button>
                        </template>
                        <span> create The todo task </span>
                    </n-tooltip>

                </n-element>
            </template>

            <TodoList :date="date"></TodoList>
        </n-drawer-content>
    </n-drawer>
</template>

<style scoped>
</style>
