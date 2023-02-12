<script setup lang="ts">
import _ from 'lodash';

import { Todo, TodoLevel } from '../../models/todo'

import TODO, { DataflowEvents } from '../../modules/application/todo';

import { ref } from 'vue';

import {
    PlanetOutline
} from '@vicons/ionicons5'

interface Statistics {
    date: Date
}

const props = defineProps<Statistics>()

const application = TODO.getApplication();

const total = ref<number>(0)

const chart = ref<Object[]>([])

function handleGetTotal() {
    const _todo = application?.getContainer() as Todo;

    const items = _todo.selectAllTodoItemsByDay(props.date)

    total.value = items.length

    let _chart = []

    {
        let highest = items.filter(item => item.level == TodoLevel.HIGHEST).length
        _chart.push({
            width: `${(highest / total.value) * 100}%`,
            background: '#e88080'
        })
    }

    {
        let high = items.filter(item => item.level == TodoLevel.HIGH).length
        _chart.push({
            width: `${(high / total.value) * 100}%`,
            background: '#f2c97d'
        })
    }

    {
        let medium = items.filter(item => item.level == TodoLevel.MEDIUM).length
        _chart.push({
            width: `${(medium / total.value) * 100}%`,
            background: '#63e2b7'
        })
    }

    {
        let low = items.filter(item => item.level == TodoLevel.LOW).length
        _chart.push({
            width: `${(low / total.value) * 100}%`,
            background: '#70c0e8'
        })
    }

    chart.value = _chart
}

handleGetTotal()

application.subscribe(DataflowEvents.CREATE_TODO_ITEM, () => {
    handleGetTotal()
})

</script>

<template>
    <n-card title="TODAY'S SITUATION">
        <n-element class="totol-row" style="display: flex; align-items: center;">
            <n-element>
                <n-text>TODO</n-text>
                <n-text type="primary" style="padding: 0px 8px;">{{ total }}</n-text>
            </n-element>
            <n-element>
                <n-text>COMPLETION RATE</n-text>
                <n-text type="primary" style="padding: 0px 8px;">{{ total }}</n-text>
            </n-element>
            <n-element style="display: flex; align-items: center; margin-left: auto; width: 64px;">
                <n-element style="width: 18px; height: 18px; margin-bottom: 2px;">
                     <PlanetOutline />
                </n-element>
                <n-text style="margin-left: 4px;" type="error">BUSY</n-text>
            </n-element>
        </n-element>

        <n-element style="margin-top: 8px;">
            <n-text>THE STATISTICS</n-text>
            <n-element
                style="width: 100%; height: 8px; background: white; border-radius: 4px; display: flex; overflow: hidden; margin-top: 8px;">
                <n-element v-for="(item, i) in chart" :id="i" tag="div" :style="item" />
            </n-element>
            <n-element style="margin-top: 8px; display: flex; justify-content: space-between;">
                <n-element style="display: flex; align-items: center;">
                    <n-element tag="div"
                        style="width: 6px; height: 6px; border-radius: 50%; background: #e88080; margin-bottom: 2px;" />
                    <n-text style="font-size: 12px; margin-left: 2px;">HIGHEST</n-text>
                </n-element>
                <n-element style="display: flex; align-items: center;">
                    <n-element tag="div"
                        style="width: 6px; height: 6px; border-radius: 50%; background: #f2c97d; margin-bottom: 2px;" />
                    <n-text style="font-size: 12px; margin-left: 2px;">HIGH</n-text>
                </n-element>
                <n-element style="display: flex; align-items: center;">
                    <n-element tag="div"
                        style="width: 6px; height: 6px; border-radius: 50%; background: #e88080; margin-bottom: 2px;" />
                    <n-text style="font-size: 12px; margin-left: 2px;">MEDIUM</n-text>
                </n-element>
                <n-element style="display: flex; align-items: center;">
                    <n-element tag="div"
                        style="width: 6px; height: 6px; border-radius: 50%; background: #f2c97d; margin-bottom: 2px;" />
                    <n-text style="font-size: 12px; margin-left: 2px;">LOW</n-text>
                </n-element>
            </n-element>
        </n-element>
    </n-card>
</template>

<style scoped>
</style>
