<script setup lang="ts">
import './list.css'

import { ref, watch } from 'vue'

import { TodoContainer, TodoItem } from '../../../models/todo'

import { StandardDataflowEvents, TODO } from '../../../modules/application'

import Card from './card.vue';

interface ListProps {
    date: Date
}

const props = defineProps<ListProps>()

const application = TODO.getApplication();

const todos = ref<TodoItem[]>([])

function handleQueryTodoItems() {
    const container = application?.getContainer() as TodoContainer;

    const items = container.selectAllTodoItemsByDay(props.date)

    todos.value = items
}

handleQueryTodoItems()

application.subscribe(StandardDataflowEvents.UPDATE_STATUS, () => {
    handleQueryTodoItems()
})

function handleTodoFinished(uuid: string, finished: boolean) {
    application.finishTodo(uuid, finished)
}


</script>

<template>
    <n-element class="todo-list">
        <Card v-for="item in todos" :key="item.uuid" :item="item" @finished="handleTodoFinished" />

        <n-element v-if="!todos.length" class="bitmap-tip-container">
            <n-text tag="p" :depth="3" type="success" style="font-size: 14px; text-align: center;">
                我们常常高估一天所能做的事，却低估一年所能做的事
            </n-text>
        </n-element>
    </n-element>
</template>

<style scoped>
</style>
