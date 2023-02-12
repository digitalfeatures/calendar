<script setup lang="ts">
import './create.css';

import { ref } from 'vue';

import {
    CloseCircle,
    InformationCircleOutline
} from '@vicons/ionicons5'

import SceneRadio from '../scene/radio.vue';

import { DEFAULT_DAILY_SCENE } from '../../models/scene'

import { Habit, HabitPeriodicType } from '../../models/habit'

import { ComponentEvents } from '../../modules/application/habit'
import { HABIT } from '../../modules/application'

const state = ref<boolean>(false)
function handleClose() {
    state.value = false
}

let name = ref<string>('')
let description = ref<string>('')

let scene = ref<string>(DEFAULT_DAILY_SCENE.ANYTIME)

let periodic = ref<string>()

function handleReset() {
    periodic.value = ''

    name.value = ''
    description.value = ''
}

const application = HABIT.getApplication()

// TODO: 需要解决重复注册的问题
application.subscribe(ComponentEvents.OPEN_CREATE_HABIT, () => {
    state.value = true
})

function handleCreateHabit() {
    const habit = new Habit(name.value, description.value);

    habit.setScene(scene.value)

    switch (periodic.value) {
        case 'weekly': {
            habit.setPeriodic(HabitPeriodicType.WEEKLY)
            break;
        }
        case 'daily': {
            habit.setPeriodic(HabitPeriodicType.DAILY)
            break;
        }
    }

    application.createHabit(habit)

    handleReset()
    handleClose()
}

const options = [
    {
        label: '每周',
        value: 'weekly'
    },
    {
        label: '每天',
        value: 'daily'
    }
]
</script>

<template>
    <n-drawer v-model:show="state" :width="720">
        <n-drawer-content class="todo-drawer-content">
            <template #header>
                <n-element tag="div" class="todo-header">
                    <n-element tag="span">HABIT</n-element>
                    <n-button tertiary circle @click="handleClose">
                        <template #icon>
                            <n-icon :component="CloseCircle" />
                        </template>
                    </n-button>
                </n-element>
            </template>

            <n-element tag="div" class="habit-form-item">
                <n-element
                    style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                    <n-text>THE HABIT'S NAME</n-text>
                    <n-icon :component="InformationCircleOutline" />
                </n-element>
                <n-input v-model:value="name" type="text" placeholder="" />
            </n-element>

            <n-element tag="div" class="habit-form-item habit-datapicker-plan">
                <n-element
                    style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                    <n-text>THE HABIT'S PLAN</n-text>
                </n-element>

                <n-date-picker type="daterange">
                    <template #footer>
                    </template>
                </n-date-picker>

                <n-select :options="options" v-model:value="periodic" placeholder="计划的频率"></n-select>
            </n-element>

            <n-element tag="div" class="habit-form-item">
                <n-element
                    style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                    <n-text>THE HABIT'S SCENE</n-text>
                </n-element>
                <SceneRadio v-model:value="scene"></SceneRadio>
            </n-element>

            <n-element tag="div" class="habit-form-item">
                <n-element
                    style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                    <n-text>THE HABIT'S THINK</n-text>
                </n-element>
                <n-input v-model:value="description" type="textarea" :autosize="{ minRows: 10, maxRows: 10 }"
                    placeholder="请输入习惯的名称" />
            </n-element>

            <n-element tag="div" class="todo-confrim-button">
                <n-button type="primary" size="large" @click="handleCreateHabit">Confrim</n-button>
            </n-element>
        </n-drawer-content>
    </n-drawer>
</template>

<style scoped>
</style>
