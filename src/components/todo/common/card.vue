<script setup lang="ts">
import './card.css'

import { ref } from 'vue';

import { TodoLevel, TodoLevelStyle, TodoItem } from '../../../models/todo';

import { PricetagsOutline } from '@vicons/ionicons5';

interface CardProps {
    item: TodoItem
}

const props = defineProps<CardProps>()

const emits = defineEmits(['finished'])

function handleGetColorByLevel(level: string) {
    switch (level) {
        case TodoLevel.HIGHEST: {
            const { color } = TodoLevelStyle.HIGHEST
            return color
        }
        case TodoLevel.HIGH: {
            const { color } = TodoLevelStyle.HIGH
            return color
        }
        case TodoLevel.MEDIUM: {
            const { color } = TodoLevelStyle.MEDIUM
            return color
        }
        case TodoLevel.LOW: {
            const { color } = TodoLevelStyle.LOW
            return color
        }
        default: {
            return 'transparent'
        }
    }
}

let finished = ref<boolean>(props.item.finished)

function handleFinishTodo() {
    emits('finished', props.item.uuid, finished.value)
}

</script>

<template>
    <n-card class="todo-item-card">
        <n-element>
            <n-element class="todo-item-card-header" tag="div"
                style="display: flex; align-items: center; justify-content: space-between;">

                <n-element class="level" tag="div"
                    :style="{ background: handleGetColorByLevel(item.level || 'default') }" />

                <n-element class="todo-item-card-tag-group" tag="div">
                    <n-tag type="success" size="small" round :closable="false">
                        不该
                    </n-tag>
                    <n-icon :component="PricetagsOutline" />
                </n-element>
            </n-element>

            <n-element class="todo-item-card-content" style="margin-bottom: 8px;">
                <n-text>{{ item.content }}</n-text>
            </n-element>
        </n-element>
        <template #action>
            <n-element class="todo-item-card-action">
                <n-element class="deadline">
                    <n-text style="margin-right: 8px;">The Best Finish Time</n-text>
                    <n-text type="info">{{ item.scene }}</n-text>
                </n-element>
                <n-element>
                    <n-switch v-model:value="finished" @click="handleFinishTodo">
                        <template #checked>
                            完成
                        </template>
                        <template #unchecked>
                            待办
                        </template>
                    </n-switch>
                </n-element>
            </n-element>
        </template>
    </n-card>
</template>

<style scoped>
</style>
