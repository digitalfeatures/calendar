<script setup lang="ts">
import { ref } from 'vue';

import { SlideRadio } from '../common';

import SceneRadio from '../scene/radio.vue'

import {
    CloseCircle,
    TrendingUpOutline,
} from '@vicons/ionicons5'

import { DEFAULT_DAILY_SCENE } from '../../models/scene'
import { TodoLevel, TodoItem } from '../../models/todo'

import TODO, { ComponentEvents } from '../../modules/application/todo'

const LevelOptions = [
    {
        label: 'important, urgent',
        value: TodoLevel.HIGHEST
    },
    {
        label: 'not important',
        value: TodoLevel.HIGH
    },
    {
        label: 'urgent, not important',
        value: TodoLevel.MEDIUM
    },
    {
        label: 'not urgent',
        value: TodoLevel.LOW
    }
]

const state = ref<boolean>(false)
function handleClose() {
    state.value = false
}

let deadline = ref<number>(Date.now())

let level = ref<string>(TodoLevel.LOW)

const { ANYTIME } = DEFAULT_DAILY_SCENE
let sence = ref<string>(ANYTIME)

let content = ref<string>('')

function handleReset() {
    deadline.value = Date.now()
    level.value = TodoLevel.LOW
    content.value = ''
}

const application = TODO.getApplication()

// TODO: 需要解决重复注册的问题
application.subscribe(ComponentEvents.OPEN_CREATE_TODO, () => {
    state.value = true
})

function handleCreateTodoItem() {
    const item = new TodoItem();

    item
        .setDeadline(new Date(deadline.value))
        .setLevel(level.value)
        .setContent(content.value)

    application.createTodo(item)

    handleReset()
    handleClose()
}
</script>

<template>
    <n-drawer v-model:show="state" :width="630">
        <n-drawer-content class="todo-drawer-content">
            <template #header>
                <n-element tag="div" class="todo-header">
                    <n-element tag="span">TODO</n-element>
                    <n-button tertiary circle @click="handleClose">
                        <template #icon>
                            <n-icon :component="CloseCircle" />
                        </template>
                    </n-button>
                </n-element>
            </template>

            <n-element style="margin-bottom: 16px;">
                <!--  四象限法解析分析法 -->
                <n-element style="margin-bottom: 8px;">
                    <n-text>The importance level</n-text>
                </n-element>
                <SlideRadio :options="LevelOptions" v-model:value="level" />
            </n-element>

            <n-element tag="div" class="todo-date-picker">
                <n-text strong style="margin-bottom: 2px;">DEADLINE</n-text>
                <n-date-picker v-model:value="deadline" type="date" clearable>
                    <template #separator>
                        <n-icon :size="16" :component="TrendingUpOutline" />
                    </template>
                </n-date-picker>
            </n-element>

            <n-element style="margin-bottom: 16px;">
                <n-element style="margin-bottom: 8px;">
                    <n-text>The Best Finish Time</n-text>
                </n-element>
                <SceneRadio v-model:value="sence" />
            </n-element>

            <n-element tag="div" class="todo-title">
                <n-element style="margin-bottom: 8px;">
                    <n-text>The Todo Description</n-text>
                </n-element>
                <n-input v-model:value="content" type="textarea" :autosize="{ minRows: 10, maxRows: 10 }"
                    placeholder="">
                </n-input>
            </n-element>

            <n-element tag="div" class="todo-confrim-button">
                <n-button type="primary" size="large" @click="handleCreateTodoItem">Confrim</n-button>
            </n-element>
        </n-drawer-content>
    </n-drawer>
</template>

<style scoped>
</style>
