<script setup lang="ts">
import './screen.css'

import { ref } from 'vue';

import { CaretUp, CaretDown } from '@vicons/ionicons5';

import moment from 'moment';

interface ScreenProps {
    isDark: boolean
}

defineProps<ScreenProps>()

let status = ref<boolean>(false)
let icon = ref(CaretUp)

let clock =ref<string>(moment().format())

setInterval(() => {
    clock.value = moment().format()
}, 1000)

function handleUpdateState() {
    status.value = !status.value

    icon.value = status.value ? CaretDown : CaretUp
}

</script>

<template>
    <n-element tag="div" class="screen" :class="{ 'dark-mode': isDark, 'screen-opend': status, 'screen-close': !status }">
        <n-element tag="div" class="screen-header">
            <n-element tag="div" class="screen-header-left-side">
            </n-element>
            <n-element tag="div" class="screen-header-center-side">
                <n-text>{{clock}}</n-text>
            </n-element>
            <n-element tag="div" class="screen-header-right-side">
                <n-button size="tiny" circle @click="handleUpdateState">
                    <template #icon>
                        <n-icon :component="icon" />
                    </template>
                </n-button>
            </n-element>
        </n-element>
    </n-element>
</template>

<style scoped>
</style>
