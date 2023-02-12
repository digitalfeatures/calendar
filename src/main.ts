import { createApp, defineComponent } from 'vue'
import App from './App.vue'

import VCalendar from 'v-calendar';
import 'v-calendar/dist/style.css';

import {
    // create naive ui
    create,
    // component
    NConfigProvider,
    NDrawer,
    NDrawerContent,
    NInput,
    NElement,
    NButtonGroup,
    NButton,
    NRadioGroup,
    NRadio,
    NRadioButton,
    NDatePicker,
    NCollapse,
    NCollapseItem,
    NDropdown,
    NSwitch,
    NSelect,
    NText,
    NIcon,
    NTooltip,
    NCard,
    NTag,
} from 'naive-ui'

const naive = create({
    components: [
        NConfigProvider,
        NDrawer,
        NDrawerContent,
        NInput,
        NElement,
        NButtonGroup,
        NButton,
        NRadioGroup,
        NRadio,
        NRadioButton,
        NDatePicker,
        NCollapse,
        NCollapseItem,
        NDropdown,
        NSwitch,
        NSelect,
        NTooltip,
        NText,
        NIcon,
        NCard,
        NTag,
    ]
})

const app = createApp(App)

app.use(VCalendar, {})
app.use(naive)

app.mount('#app')
