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
import { computed, ref, watch, onMounted } from 'vue'
import { useStore } from 'vuex'
import { CoordsAddress } from '@/models/Address'
import { GeoService } from '@/services/GeoService'
import TextField from '@/components/TextField.vue'
import CopyableTextField from '@/components/CopyableTextField.vue'

const store = useStore()
const inputAddress = ref<CoordsAddress>(store.state.address?.legalAddress || '')
const coordsStr = ref<string>(`${store.state.address?.coords?.x || 0},${store.state.address?.coords?.y || 0}`)
const geoService = ref<GeoService | null>(null)

watch(() => store.state.address, (address) => {
  if (address) {
    inputAddress.value = address.legalAddress || ''
    coordsStr.value = `${address.coords?.x || 0},${address.coords?.y || 0}`
  }
}, { deep: true })

const updateByAddress = () => {
  if (geoService.value) {
    geoService.value.updateStateByAddress(inputAddress.value)
  }
}

const updateByCoords = () => {
  const [x, y] = coordsStr.value.split(',')
  if (geoService.value) {
    geoService.value.updateStateByCoords(x, y)
  }
}

const url = computed(() => {
  const urlParser = document.createElement('a')
  urlParser.href = window.location.href
  const port = (urlParser.port.length > 0) ? ':' + urlParser.port : ''
  const x = store.state.address?.coords?.x || 0
  const y = store.state.address?.coords?.y || 0
  return `${urlParser.protocol}//${urlParser.hostname}${port}?x=${x}&y=${y}`
})

onMounted(async () => {
  try {
    geoService.value = await GeoService.getInstance()
  } catch (error) {
    console.error('GeoService 초기화 실패:', error)
  }
})
</script>
