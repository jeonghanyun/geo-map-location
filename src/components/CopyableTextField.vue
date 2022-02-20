<template>
  <div class="input-group">
    <TextField :id="id" :modelValue="modelValue"/>
    <span class="input-group-btn">
        <button type="button" class="btn" data-clipboard-target="#url">
          <span class="glyphicon glyphicon-copy"></span>
        </button>
      </span>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import TextField from '@/components/TextField.vue'

const props = defineProps<{
  id: string,
  modelValue: string
}>()

new window.Clipboard('.btn')
</script>
