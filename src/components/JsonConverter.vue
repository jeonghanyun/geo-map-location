<template>
  <div class="container">
    <div class="left-panel">
      <h2>JSON 예제 (편집 가능)</h2>
      <textarea class="json-input-textarea" v-model="jsonExampleString" @input="updateJsonExample" rows="20" cols="50"></textarea>
    </div>
    <div class="right-panel" >
      <h2>결과</h2>
      <pre class="json-input-textarea">{{ JSON.stringify(filledJson, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import { GeoService } from '@/services/GeoService'

const store = useStore()
const geoService = new GeoService()

const jsonExampleString = ref('')
const jsonExample = ref({})
const placeholders = reactive({})
const inputValues = reactive({})

// Store의 address 상태를 reactive로 만듭니다.
const addressState = reactive(store.state.address)

// placeholders와 inputValues를 초기화하는 함수
const initializePlaceholdersAndInputs = () => {
  const fields = [
    'region1DepthName', 'region2DepthName', 'region3DepthName', 'region4DepthName',
    'region3DepthHName', 'mainAddressNo', 'mountainYn', 'legalAddress',
    'roadRegion1DepthName', 'roadRegion2DepthName', 'roadRegionRoadName',
    'roadRegionMainBuildingNo', 'roadRegionBuildingName', 'roadRegionUndergroundYn',
    'roadAddress', 'lat', 'lng'
  ]

  fields.forEach(field => {
    const storeKey = `store.${field}`
    placeholders[storeKey] = ''
    placeholders[field] = ''
    inputValues[storeKey] = addressState[field] || ''
    inputValues[field] = addressState[field] || ''
  })

  // lat와 lng는 별도로 처리
  inputValues.lat = addressState.coords?.y || ''
  inputValues.lng = addressState.coords?.x || ''
}

// watch를 사용하여 store의 address 상태 변경을 추적합니다.
watch(() => store.state.address, (newValue) => {
  Object.assign(addressState, newValue)
  initializePlaceholdersAndInputs()
}, { deep: true })

const filledJson = computed(() => {
  const updatedJson = JSON.parse(JSON.stringify(jsonExample.value))
  const updateValues = (obj: any) => {
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'object' && value !== null) {
        updateValues(value)
      } else if (typeof value === 'string' && value.match(/{{.*}}/)) {
        const placeholder = value.replace(/[{}]/g, '')
        const withoutStore = placeholder.replace('store.', '')
        obj[key] = inputValues[placeholder] || inputValues[withoutStore] || ''
      }
    }
  }
  updateValues(updatedJson)
  return updatedJson
})

const updateJsonExample = () => {
  try {
    jsonExample.value = JSON.parse(jsonExampleString.value)
    extractPlaceholders(jsonExample.value)
  } catch (error) {
    console.error('Invalid JSON:', error)
  }
}

const extractPlaceholders = (obj: any) => {
  for (const [, value] of Object.entries(obj)) {
    if (typeof value === 'object' && value !== null) {
      extractPlaceholders(value)
    } else if (typeof value === 'string' && value.match(/{{.*}}/)) {
      const placeholder = value.replace(/[{}]/g, '')
      const withoutStore = placeholder.replace('store.', '')
      if (!placeholders[placeholder]) {
        placeholders[placeholder] = ''
        inputValues[placeholder] = inputValues[placeholder] || ''
      }
      if (!placeholders[withoutStore]) {
        placeholders[withoutStore] = ''
        inputValues[withoutStore] = inputValues[withoutStore] || ''
      }
    }
  }
}

onMounted(() => {
  jsonExampleString.value = JSON.stringify({
    dest_address: {
      beonji_address: {
        si_do: '{{region1DepthName}}',
        si_gun_gu: '{{region2DepthName}}',
        eup_myeon_dong_ri: '{{region3DepthName}}',
        legal_dong: '{{region3DepthName}}',
        legal_ri: '{{region4DepthName}}',
        admin_dong: '{{region3DepthHName}}',
        beonji: '{{mainAddressNo}}',
        is_mountain: '{{mountainYn}}',
        detail_address: '',
        is_refined: 'false',
        raw_address: '{{legalAddress}}'
      },
      road_address: {
        si_do: '{{roadRegion1DepthName}}',
        si_gun_gu: '{{roadRegion2DepthName}}',
        road_name: '{{roadRegionRoadName}}',
        building_number: '{{roadRegionMainBuildingNo}}',
        building_name: '{{roadRegionBuildingName}}',
        is_basement: '{{roadRegionUndergroundYn}}',
        detail_address: '',
        is_refined: 'false',
        raw_address: '{{roadAddress}}'
      },
      latlng: {
        lat: '{{lat}}',
        lng: '{{lng}}'
      }
    },
    caller: 'requestDelivery'
  }, null, 2)
  updateJsonExample()
  initializePlaceholdersAndInputs()
  console.log('Initial address state:', addressState)
})

watch(jsonExampleString, updateJsonExample)
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
}
.json-input-textarea {
  height: 100%;
}
.left-panel, .right-panel, .address-panel {
  width: 45%;
  margin: 10px;
}
.input-panel {
  width: 100%;
  margin: 10px;
}
pre, textarea {
  white-space: pre-wrap;
  word-wrap: break-word;
  width: 100%;
  font-family: monospace;
}
span {
  margin-right: 0.4em;
}
.label {
  font-weight: bold;
}
</style>
