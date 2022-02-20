<template>
  <input type="text" class="form-control" :id="id" :value="modelValue"
         @change="$emit('update:modelValue', $event.target.value)"/>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  id: string,
  modelValue: string
}>()
</script>
