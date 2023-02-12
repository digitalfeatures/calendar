<script setup lang="ts">
import './index.css'
import { ref } from 'vue';

interface SlideRadio {
    options: {
        label: string
        value: string | number
    }[]
    value: string
}

const props = defineProps<SlideRadio>()

const emits = defineEmits(['update:value'])

const index = ref<number>(0)
const width = ref<number>(100 / props.options.length)

{
    props.options.forEach((option, i) => {
        if (props.value === option.value) {
            index.value = i
        }
    })
}

function handleUpdateIndex(i: number) {
    index.value = i

    const { value } = props.options[i]

    emits('update:value', value)
}

</script>


<template>
    <n-element tag="div" class="slide-radio">
        <n-element v-for="(option, i) in options" :id="i" class="slide-radio-item" :style="{ width: `${width}%` }"
            @click="handleUpdateIndex(i)">
            <n-text>{{ option.label }}</n-text>
        </n-element>
        <n-element class="slide" :style="{ width: `${width}%`, left: `${index * width}%` }" />
    </n-element>
</template>