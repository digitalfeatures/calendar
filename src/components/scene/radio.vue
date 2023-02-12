<script setup lang = "ts" >

import { ref, watch } from 'vue';

import { SlideRadio } from '../common';

import { DEFAULT_DAILY_SCENE } from '../../models/scene'

interface Radio {
    value: string
}

const props = defineProps<Radio>()

const emits = defineEmits(['update:value'])

const cache = ref<string>(props.value)

const SceneOptions = [
    {
        label: 'anytime',
        value: DEFAULT_DAILY_SCENE.ANYTIME
    },
    {
        label: 'wake up',
        value: DEFAULT_DAILY_SCENE.WAKE_UP
    },
    {
        label: 'morning',
        value: DEFAULT_DAILY_SCENE.MORNING
    },
    {
        label: 'noon',
        value: DEFAULT_DAILY_SCENE.NOON
    },
    {
        label: 'afternoon',
        value: DEFAULT_DAILY_SCENE.AFTERNOON
    },
    {
        label: 'evening',
        value: DEFAULT_DAILY_SCENE.EVENING
    },
    {
        label: 'before sleep',
        value: DEFAULT_DAILY_SCENE.BEFORE_SLEEP
    }
]

watch(cache, (n, _) => {
    emits('update:value', n)
})

</script>

<template>
    <SlideRadio :options="SceneOptions" v-model:value="cache" />
</template>

<style scoped>
</style>