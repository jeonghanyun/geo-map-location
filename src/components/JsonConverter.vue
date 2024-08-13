<template>
  <div class="container">
    <div class="left-panel">
      <h2>JSON 예제 (편집 가능)</h2>
      <textarea v-model="jsonExampleString" @input="updateJsonExample" rows="20" cols="50"></textarea>
    </div>
    <div class="right-panel">
      <h2>결과</h2>
      <pre>{{ JSON.stringify(filledJson, null, 2) }}</pre>
    </div>
<!--    <div class="input-panel">-->
<!--      <h2>입력 필드</h2>-->
<!--      <div v-for="(value, key) in placeholders" :key="key">-->
<!--        <label>{{ key }}:</label>-->
<!--        <input v-model="inputValues[key]" @input="updateFilledJson" />-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import { CoordsAddress } from '@/models/Address'
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
    'roadAddress'
  ]

  fields.forEach(field => {
    const key = `store.${field}`
    placeholders[key] = ''
    inputValues[key] = addressState[field] || ''
  })

  // coords는 별도로 처리
  placeholders['store.coords.x'] = ''
  placeholders['store.coords.y'] = ''
  inputValues['store.coords.x'] = addressState.coords?.x || ''
  inputValues['store.coords.y'] = addressState.coords?.y || ''
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
        obj[key] = inputValues[placeholder] || ''
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
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object' && value !== null) {
      extractPlaceholders(value)
    } else if (typeof value === 'string' && value.match(/{{.*}}/)) {
      const placeholder = value.replace(/[{}]/g, '')
      if (!placeholders[placeholder]) {
        placeholders[placeholder] = ''
        inputValues[placeholder] = inputValues[placeholder] || ''
      }
    }
  }
}

const updateAddress = (address: string) => {
  geoService.updateStateByAddress(address)
}

onMounted(() => {
  jsonExampleString.value = JSON.stringify({
    dest_address: {
      beonji_address: {
        si_do: '{{store.region1DepthName}}',
        si_gun_gu: '{{store.region2DepthName}}',
        eup_myeon_dong_ri: '{{store.region3DepthName}}',
        legal_dong: '{{store.region3DepthName}}',
        legal_ri: '{{store.region4DepthName}}',
        admin_dong: '{{store.region3DepthHName}}',
        beonji: '{{store.mainAddressNo}}',
        is_mountain: '{{store.mountainYn}}',
        detail_address: '',
        is_refined: 'false',
        raw_address: '{{store.legalAddress}}'
      },
      road_address: {
        si_do: '{{store.roadRegion1DepthName}}',
        si_gun_gu: '{{store.roadRegion2DepthName}}',
        road_name: '{{store.roadRegionRoadName}}',
        building_number: '{{store.roadRegionMainBuildingNo}}',
        building_name: '{{store.roadRegionBuildingName}}',
        is_basement: '{{store.roadRegionUndergroundYn}}',
        detail_address: '',
        is_refined: 'false',
        raw_address: '{{store.roadAddress}}'
      },
      latlng: {
        lat: '{{store.coords.y}}',
        lng: '{{store.coords.x}}'
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
