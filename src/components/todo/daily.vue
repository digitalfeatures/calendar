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

function getMonthName(date: Date) {
    const month = date.getMonth();
    switch (month) {
        case 0: {
            return 'January';
        }
        case 1: {
            return 'February';
        }
        case 2: {
            return 'March';
        }
        case 3: {
            return 'April';
        }
        case 4: {
            return 'May';
        }
        case 5: {
            return 'June';
        }
        case 6: {
            return 'July';
        }
        case 7: {
            return 'August';
        }
        case 8: {
            return 'September';
        }
        case 9: {
            return 'October';
        }
        case 10: {
            return 'November';
        }
        case 11: {
            return 'December';
        }
    }
}

function getDayName(date: Date) {
    const day = date.getDay();
    switch (day) {
        case 0: {
            return 'Sunday';
        }
        case 1: {
            return 'Monday';
        }
        case 2: {
            return 'Tuesday';
        }
        case 3: {
            return 'Wednesday';
        }
        case 4: {
            return 'Thursday';
        }
        case 5: {
            return 'Friday';
        }
        case 6: {
            return 'Saturday';
        }
    }
}

</script>

<template>
    <n-drawer v-model:show="isShown" :width="720">
        <n-drawer-content class="todo-list">
            <template #header>
                <n-element tag="div" class="todo-list-header">
                    <n-icon :component="CalendarOutline" />
                    <n-text depth="3">
                        {{ getMonthName(date) }} {{ dayjs(date).format("DD, YYYY") }} ｜ {{
                            getDayName(date)
                        }}
                    </n-text>

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
