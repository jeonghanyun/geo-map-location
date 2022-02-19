<template>
  <form class="form-horizontal">
    <div class="form-group col-md-4">
      <TextField id="address" v-model="address" @keyup.enter="updateByAddress"/>
    </div>
    <div class="form-group col-md-4">
      <TextField id="coords" v-model="coords" @keyup.enter="updateByCoords"/>
    </div>
    <div class="form-group col-md-4">
      <CopyableTextField id="url" v-model="url"/>
    </div>
  </form>
</template>

<script setup lang="ts">
import TextField from '@/components/TextField.vue'
import CopyableTextField from '@/components/CopyableTextField'
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { Address } from '@/models/Address'

// data
const store = useStore()
const address = ref<Address>(store.state.address.legalAddress)
const coords = computed(() => {
  return `${store.state.address.coords.x},${store.state.address.coords.y}`
})

const updateByAddress = () => {
  console.log('updateByAddress invoked:', address.value)
}
const updateByCoords = () => {
  const part = coords.value.split(',')
  console.log('updateByAddress invoked:', 'x:', part[0], 'y:', part[1])
}

// computed
const url = computed(() => {
  const urlParser = document.createElement('a')
  urlParser.href = window.location.href
  const port = (urlParser.port.length > 0) ? ':' + urlParser.port : ''
  return `${urlParser.protocol}//${urlParser.hostname}${port}?x=${store.state.address.coords.x}&y=${store.state.address.coords.y}`
})
</script>
