<script setup lang="ts">
import './calendar.css';

interface CalendarProps {
  isDark: boolean
}

defineProps<CalendarProps>()

const DayClickEmiter = defineEmits(['onDayClick'])
function handleDayClick(event: any) {
  DayClickEmiter('onDayClick', event)
}

const attributes = [
  // This is a single attribute
  {

    key: Math.floor(Math.random() * 100),
    // highlight: true,  // Boolean, String, Object
    dot: true,        // Boolean, String, Object
    // bar: true,        // Boolean, String, Object
    // content: 'red',   // Boolean, String, Object


    dates: new Date(),
    excludeDates: null,
    order: 0
  }
]

</script>

<template>
  <v-calendar class="calender" is-expanded trim-weeks :attributes="attributes" :is-dark="isDark" @dayclick="handleDayClick" />
</template>

<style scoped>
</style>
