```html
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
```