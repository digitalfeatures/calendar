<script setup lang="ts">
import './header.css'

interface HeaderProps {
    isDark: boolean
}

defineProps<HeaderProps>()

</script>

<template>
    <n-element tag="div" class="header" :style="{ background: isDark ? '#1b202b' : '#ffffff' }">
    </n-element>
</template>

<style scoped>

</style>
