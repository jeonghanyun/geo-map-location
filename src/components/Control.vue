<template>
  <form class="form-horizontal">
    <div class="form-group col-md-4">
      <TextField id="inputAddress" v-model="inputAddress" @keyup.enter="updateByAddress"/>
    </div>
    <div class="form-group col-md-4">
      <TextField id="coordsStr" v-model="coordsStr" @keyup.enter="updateByCoords"/>
    </div>
    <div class="form-group col-md-4">
      <CopyableTextField id="url" v-model="url"/>
    </div>
  </form>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { CoordsAddress } from '@/models/Address'
import { GeoService } from '@/services/GeoService'
import TextField from '@/components/TextField.vue'
import CopyableTextField from '@/components/CopyableTextField'

const store = useStore()
const inputAddress = ref<CoordsAddress>(store.state.address.legalAddress)
const coordsStr = ref<string>(`${store.state.address.coords.x},${store.state.address.coords.y}`)
const geoService = new GeoService()

store.watch((state) => {
  return state.address
}, (address) => {
  inputAddress.value = address.legalAddress
  coordsStr.value = `${address.coords.x},${address.coords.y}`
})

const updateByAddress = () => {
  geoService.updateStateByAddress(inputAddress.value)
}

const updateByCoords = () => {
  const part = coordsStr.value.split(',')
  geoService.updateStateByCoords(part[0], part[1])
}

const url = computed(() => {
  const urlParser = document.createElement('a')
  urlParser.href = window.location.href
  const port = (urlParser.port.length > 0) ? ':' + urlParser.port : ''
  return `${urlParser.protocol}//${urlParser.hostname}${port}?x=${store.state.address.coords.x}&y=${store.state.address.coords.y}`
})
</script>
