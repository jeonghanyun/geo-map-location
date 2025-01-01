<template>
  <div class="input-group">
    <input
      type="text"
      class="form-control"
      :value="modelValue"
      readonly
    >
    <button
      class="btn btn-outline-secondary"
      type="button"
      @click="copyToClipboard"
    >
    복사
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps<{
  modelValue: string
}>()

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(props.modelValue)
    alert('클립보드에 복사되었습니다!')
  } catch (err) {
    console.error('클립보드 복사 실패:', err)
    alert('클립보드 복사에 실패했습니다.')
  }
}
</script>
