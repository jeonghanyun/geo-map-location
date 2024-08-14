<template>
  <div class="container" @keydown.meta.s.prevent="saveTemplate" @keydown.ctrl.s.prevent="saveTemplate">
    <div class="left-panel">
      <h2>JSON 템플릿 관리</h2>
      <div class="template-selection">
        <select v-model="selectedTemplateId" @change="loadSelectedTemplate">
          <option value="">새 템플릿 생성</option>
          <option v-for="template in templates" :key="template.id" :value="template.id">
            {{ template.name }} [{{ formatDate(template.updatedAt) }}]
          </option>
        </select>
        <input v-model="currentTemplateName" @change="updateTemplateName" placeholder="템플릿 이름" />
      </div>
      <button @click="saveTemplate">템플릿 저장</button>
      <button @click="deleteTemplate" :disabled="!selectedTemplateId">선택한 템플릿 삭제</button>
<!--      <button @click="createNewTemplate">새 템플릿 생성</button>-->
      <h3>JSON 예제 (편집 가능)</h3>
      <textarea class="json-input-textarea" v-model="jsonExampleString" @input="updateJsonExample" rows="20" cols="50"></textarea>
    </div>
    <div class="right-panel">
      <h2>결과</h2>
      <pre class="json-input-textarea">{{ JSON.stringify(filledJson, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import { v4 as uuidv4 } from 'uuid'

const store = useStore()

const jsonExampleString = ref('')
const jsonExample = ref({})
const placeholders = reactive({})
const inputValues = reactive({})
const templates = ref([])
const selectedTemplateId = ref('')
const currentTemplateName = ref('')

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

const formatDate = (date: string | Date) => {
  const d = new Date(date)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

const loadTemplates = () => {
  const storedTemplates = localStorage.getItem('jsonTemplates')
  if (storedTemplates) {
    templates.value = JSON.parse(storedTemplates)
  } else {
    const now = new Date().toISOString()
    const defaultTemplateId = uuidv4()
    templates.value = [{
      id: defaultTemplateId,
      name: '기본 템플릿',
      content: JSON.stringify({
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
      }, null, 2),
      createdAt: now,
      updatedAt: now
    }]
    saveTemplates()
  }
}

const saveTemplates = () => {
  localStorage.setItem('jsonTemplates', JSON.stringify(templates.value))
}

const loadSelectedTemplate = () => {
  if (selectedTemplateId.value === '') {
    createNewTemplate()
    return
  }
  const template = templates.value.find(t => t.id === selectedTemplateId.value)
  if (template) {
    jsonExampleString.value = template.content
    currentTemplateName.value = template.name
    updateJsonExample()
  }
}

const updateTemplateName = () => {
  if (selectedTemplateId.value && currentTemplateName.value) {
    const index = templates.value.findIndex(t => t.id === selectedTemplateId.value)
    if (index !== -1) {
      templates.value[index].name = currentTemplateName.value
      templates.value[index].updatedAt = new Date().toISOString()
      saveTemplates()
    }
  }
}

const createNewTemplate = () => {
  selectedTemplateId.value = ''
  currentTemplateName.value = '새 템플릿'
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
}

const saveTemplate = () => {
  if (!currentTemplateName.value) {
    alert('템플릿 이름을 입력해주세요.')
    return
  }

  const now = new Date().toISOString()

  if (selectedTemplateId.value) {
    // 기존 템플릿 업데이트
    const index = templates.value.findIndex(t => t.id === selectedTemplateId.value)
    if (index !== -1) {
      templates.value[index] = {
        ...templates.value[index],
        name: currentTemplateName.value,
        content: jsonExampleString.value,
        updatedAt: now
      }
    }
  } else {
    // 새 템플릿 생성
    const newTemplateId = uuidv4()
    templates.value.push({
      id: newTemplateId,
      name: currentTemplateName.value,
      content: jsonExampleString.value,
      createdAt: now,
      updatedAt: now
    })
    selectedTemplateId.value = newTemplateId
  }

  saveTemplates()
  alert('템플릿이 저장되었습니다.')
}

const deleteTemplate = () => {
  if (selectedTemplateId.value && confirm(`'${currentTemplateName.value}' 템플릿을 삭제하시겠습니까?`)) {
    templates.value = templates.value.filter(t => t.id !== selectedTemplateId.value)
    saveTemplates()
    if (templates.value.length > 0) {
      selectedTemplateId.value = templates.value[0].id
      loadSelectedTemplate()
    } else {
      createNewTemplate()
    }
  }
}

onMounted(() => {
  loadTemplates()
  if (templates.value.length > 0) {
    selectedTemplateId.value = templates.value[0].id
    loadSelectedTemplate()
  } else {
    createNewTemplate()
  }
  initializePlaceholdersAndInputs()
  console.log('Initial address state:', addressState)
})

watch(jsonExampleString, updateJsonExample)
watch(selectedTemplateId, loadSelectedTemplate)
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
}
.json-input-textarea {
  height: 100%;
  width: 100%;
}
.left-panel, .right-panel {
  width: 45%;
  margin: 10px;
}
pre, textarea {
  white-space: pre-wrap;
  word-wrap: break-word;
  width: 100%;
  font-family: monospace;
}
select, button, input {
  margin: 5px;
  padding: 5px;
}
.template-selection {
  display: flex;
  align-items: center;
}
.template-selection select {
  flex: 1;
  margin-right: 10px;
}
.template-selection input {
  flex: 2;
}
</style>
