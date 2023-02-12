<script setup lang="ts">
interface Tool {
    icon: any
    callback: Function
}

interface Toolbar {
    items: Tool[]
}

defineProps<Toolbar>()
</script>

<template>
    <n-element tag="div" class="vc-hover-button-group">
        <n-button v-for="(item, i) in items" :key="i" :item="item" size="large" strong circle @click="item.callback">
            <template #icon>
                <n-icon :component="item.icon">
                </n-icon>
            </template>
        </n-button>
    </n-element>
</template>

<style scoped>
</style>
