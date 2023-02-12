<script setup lang="ts">
import _ from 'lodash';

import { StandardDataflowEvents } from '../../modules/application';
import HABIT from '../../modules/application/habit';
import { Habit } from '../../models/habit';

import { ref } from 'vue';

import {
    RepeatSharp,
    EllipsisVerticalOutline
} from '@vicons/ionicons5'

const options = [
    {
        label: 'Finished the Habit',
        key: 'finished'
    }
]

const application = HABIT.getApplication();

const habits = ref<Habit[]>([])

function handleGetHabits() {
    const container = application.getContainer()

    habits.value = container.selectAllUnfinishedHabits()
}

handleGetHabits()

application.subscribe(StandardDataflowEvents.UPDATE_STATUS, () => {
    handleGetHabits()
})

function handleHabitSelect(uuid: string, key: string) {
    switch (key) {
        case 'finished': {
            application.finishHabit(uuid, true)
        }
    }
}

</script>

<template>
    <n-card title="MY HABIT" class="habit-statistic-card">
        <n-collapse>
            <template #arrow>
            </template>
            <n-collapse-item v-for="(item, i) in habits" :id="i" :title="item.name" :name="item.name">
                <div style="padding: 0px 4px;">{{ item.description }}</div>
                <template #header-extra>
                    <n-element class="habit-statistic-item">
                        <n-element class="habit-status">
                            <n-text>{{ item.periodic[0] }}</n-text>
                        </n-element>
                        <n-element class="habit-count">
                            <n-text>Finished: </n-text>
                            <n-text class="count" type="primary">{{ item.count }}</n-text>
                        </n-element>
                        <n-dropdown trigger="hover" :options="options"
                            @select="(key: string) => handleHabitSelect(item.uuid, key)">
                            <n-icon :component="EllipsisVerticalOutline" />
                        </n-dropdown>
                    </n-element>
                </template>
            </n-collapse-item>
        </n-collapse>
    </n-card>
</template>

<style scoped>
.habit-item+.habit-item {
    margin-top: 8px;
}

.habit-statistic-item {
    display: flex;
    align-items: center;
}

.habit-status {
    width: 20px;
    height: 20px;

    background: var(--n-divider-color);

    padding: 4px;

    display: flex;
    align-items: center;
    justify-content: center;

    margin: 0px 4px;
}

.habit-status>.n-text {
    margin-top: 2px;
}

.habit-count {
    margin-left: 2px;

    display: flex;

    align-items: center;
}

.habit-count>.count {
    width: 32px;
}
</style>
