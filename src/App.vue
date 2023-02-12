<script setup lang="ts">
import './App.css'

import Header from './components/header/header.vue';
import Calendar from './components/calendar/calendar.vue'
import Toolbar from './components/toolbar/toolbar.vue'
import Screensaver from './components/screensaver/screensaver.vue'

import { DailyTodo, CreateTodo } from './components/todo'

import { CreateHabit } from './components/habit'

import { ref } from "vue"

import { darkTheme, lightTheme } from 'naive-ui'

import {
  BulbOutline, PencilOutline, SettingsOutline,
  LogoInstagram
} from '@vicons/ionicons5'

import Runtime from './modules/runtime'

import Todo, { ComponentEvents as TodoComponentEvents } from './modules/application/todo'
import Habit, { ComponentEvents as HabitComponentEvents } from './modules/application/habit'

const config = Runtime.getConfig();

const theme = ref(config.isDarkMode ? darkTheme : lightTheme)

let isDarkMode = ref<boolean>(config.isDarkMode)
function handleChangeMode() {
  isDarkMode.value = !isDarkMode.value
  Runtime.setConfig('isDarkMode', isDarkMode.value)

  if (isDarkMode.value) {
    theme.value = darkTheme
  } else {
    theme.value = lightTheme
  }
}

let isOpenScreen = ref<boolean>(config.isOpenScreen)
function handleOpenScreen(status: boolean) {
  isOpenScreen.value = status

  Runtime.setConfig('isOpenScreen', isOpenScreen.value)
}

const ToolbarItems = [
  {
    icon: PencilOutline,
    callback: () => {
      Todo
        .getApplication()
        .publish(TodoComponentEvents.OPEN_CREATE_TODO)
    }
  },
  {
    icon: LogoInstagram,
    callback: () => {
      Habit
        .getApplication()
        .publish(HabitComponentEvents.OPEN_CREATE_HABIT)
    }
  },
  {
    icon: BulbOutline,
    callback: handleChangeMode
  },
  {
    icon: SettingsOutline,
    callback: () => {

    }
  }
]

// TODO List

let isDailyTodoDrawerShow = ref<boolean>(false)
let date = ref<Date>(new Date())

function handleDayClick(event: any) {
  const { year, month, day } = event;
  date.value = new Date(year + '/' + month + '/' + day);
  isDailyTodoDrawerShow.value = true
}

</script>

<template>
  <n-config-provider v-model:theme="theme">
    <Header :is-dark="isDarkMode" />

    <Screensaver :is-dark="isDarkMode" :is-show="isOpenScreen" @show="handleOpenScreen" />

    <Calendar :is-dark="isDarkMode" @onDayClick="handleDayClick" />

    <Toolbar :items="ToolbarItems" />

    <CreateTodo />
    <DailyTodo :is-shown="isDailyTodoDrawerShow" :date="date" />

    <CreateHabit />

  </n-config-provider>
</template>
