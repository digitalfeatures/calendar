<script setup lang="ts">
import Calendar from './components/calendar/calendar.vue'

import Screen from './components/screen/screen.vue'

import './App.css'

import { ref } from "vue"

import { darkTheme, lightTheme } from 'naive-ui'

import {
  Bulb,
  BulbOutline,
  PencilOutline,
  SettingsOutline,
  CloseCircle,
  TrendingUpOutline,
  RepeatOutline,
  CalendarOutline,
  Create,
} from '@vicons/ionicons5';

import key from 'keymaster'

import { Runtime } from './modules/runtime';

import { Todo, TodoItem } from './modules/todo';

const runtime = new Runtime();

const config = runtime.getConfig();

let isDarkMode = ref<boolean>(config.isDarkMode)

let isShown = ref<boolean>(false)
let date = ref<string>('')

const theme = ref(config.isDarkMode ? darkTheme : lightTheme)

function handleChangeMode() {
  isDarkMode.value = !isDarkMode.value
  runtime.setConfig('isDarkMode', isDarkMode.value)

  if (isDarkMode.value) {
    theme.value = darkTheme
  } else {
    theme.value = lightTheme
  }
}

let isCreateTodoShown = ref<boolean>(false)
let todo = new Todo()

let items = ref<TodoItem[]>([])

function handleCreateTodo() {
  isCreateTodoShown.value = true
}

function handleClosedTodo() {
  isCreateTodoShown.value = false
}

function handleDayClick(event: any) {
  const { year, month, day } = event;

  date.value = `${year}/0${month}/${day}`;

  isShown.value = true

  const _day = new Date(date.value);

  const _items = todo.queryTodoItembyDay(_day)

  items.value = _items
}

key('command+e', () => {
  handleCreateTodo()
})

// TODO Module

let isRepeat = ref<boolean>(false)

let level = ref<string>('middle')

let datarange = ref<number>(Date.now())

let title = ref<string>('')
let content = ref<string>('')

function handleCreateTodoItem() {
  // todo.create(
  //   level.value,
  //   title.value,
  //   content.value,
  //   {
  //     start: new Date(datarange.value[0]),
  //     end: new Date(datarange.value[1])
  //   }
  // )

  isCreateTodoShown.value = false

  console.warn(todo)
}


let options = [
  {
    label: '每天重复执行',
    key: 'marina bay sands',
  },
  {
    label: '每周重复执行',
    key: "brown's hotel, london"
  },
  {
    label: '每月重复执行',
    key: 'atlantis nahamas, nassau'
  },
]

</script>

<template>
  <n-config-provider v-model:theme="theme">
    <Calendar :is-dark="isDarkMode" @onDayClick="handleDayClick" />

    <Screen :is-dark="isDarkMode" />

    <n-drawer v-model:show="isShown" :width="520">
      <n-drawer-content class="todo-list">
        <template #header>
          <n-element tag="div" class="todo-list-header">
            <n-icon :component="CalendarOutline" />
            <n-text depth="3">{{ date }}</n-text>

            <n-tooltip placement="left" trigger="hover">
              <template #trigger>
                <n-button quaternary round @click="handleCreateTodo">
                  <n-icon :component="Create" />
                </n-button>
              </template>
              <span> create The todo task </span>
            </n-tooltip>

          </n-element>
        </template>
        <n-collapse>
          <template #arrow>
            <n-icon>
              <BulbOutline />
            </n-icon>
          </template>
          <n-collapse-item v-for="item in items" :key="item.uuid" :title="item.title">
            <template #header-extra>
              <span>{{ item.level }}</span>
            </template>
            <span>{{ item.content?.data }}</span>
          </n-collapse-item>
        </n-collapse>
      </n-drawer-content>
    </n-drawer>

    <n-element tag="div" class="vc-hover-button-group">
      <n-button size="large" strong circle @click="handleCreateTodo">
        <template #icon>
          <n-icon :component="PencilOutline">
          </n-icon>
        </template>
      </n-button>

      <n-button size="large" strong circle @click="handleChangeMode">
        <template #icon>
          <n-icon :component="BulbOutline" />
        </template>
      </n-button>

      <n-button size="large" strong circle @click="handleChangeMode">
        <template #icon>
          <n-icon :component="SettingsOutline" /> 
        </template>
      </n-button>
    </n-element>

    <n-drawer v-model:show="isCreateTodoShown" :width="520">
      <n-drawer-content class="todo-drawer-content">
        <template #header>
          <n-element tag="div" class="todo-header">
            <n-element tag="span">TODO</n-element>
            <n-button tertiary circle @click="handleClosedTodo">
              <template #icon>
                <n-icon :component="CloseCircle" />
              </template>
            </n-button>
          </n-element>
        </template>
        <n-element tag="div" class="todo-title">
          <n-input v-model:value="title" type="text" placeholder="">
          </n-input>
        </n-element>
        <n-element tag="div" class="todo-classify-button-group">
          <n-radio-group v-model:value="level" name="todo-classify-button-group">
            <!--  四象限法解析分析法 -->
            <n-radio-button value="highest" label="重要并且紧迫" />
            <n-radio-button value="high" label="紧迫但不重要" />
            <n-radio-button value="middle" label="重要但不紧迫" />
            <n-radio-button value="low" label="不重要不紧迫" />
          </n-radio-group>
        </n-element>
        <n-element tag="div" class="todo-date-picker">
          <n-date-picker v-model:value="datarange" type="date" clearable>
            <template #separator>
              <n-icon :size="16" :component="TrendingUpOutline" />
            </template>
          </n-date-picker>
        </n-element>
        <n-element tag="div" class="todo-repeat-switch">
          <n-element tag="div" class="todo-input-prefix">
            <n-icon style="font-size: 24px;">
              <RepeatOutline />
            </n-icon>
            <n-text>
              REPEAT
            </n-text>
          </n-element>

          <n-switch v-model:value="isRepeat" :round="false" />
        </n-element>
        <n-element v-if="isRepeat" tag="div" class="todo-repeat-switch">
          <n-select :options="options"></n-select>
        </n-element>

        <!-- <n-element tag="div" class="todo-editor">
          <n-input v-model:value="content" type="textarea" :autosize="{ minRows: 10, maxRows: 10 }"
            placeholder="基本的 Textarea" />
        </n-element> -->

        <n-element tag="div" class="todo-confrim-button">
          <n-button type="primary" size="large" @click="handleCreateTodoItem">Confrim</n-button>
        </n-element>
      </n-drawer-content>
    </n-drawer>


  </n-config-provider>
</template>
