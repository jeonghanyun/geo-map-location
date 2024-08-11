<template>
  <p>
    <span v-if="store.state.address.legalAddress">
      <span class="label label-primary">법정주소</span> {{ store.state.address.legalAddress }}
    </span>
    <span v-if="store.state.address.adminAddress">
      <span class="label label-primary">행정주소</span> {{ store.state.address.adminAddress }}
    </span>
    <span v-if="store.state.address.roadAddress">
      <span class="label label-primary">도로명주소</span> {{ store.state.address.roadAddress }}
    </span>
    <span v-if="store.state.address.region1DepthName">
      <span class="label label-primary">1차주소</span> {{ store.state.address.region1DepthName }}
    </span>
    <span v-if="store.state.address.region2DepthName">
      <span class="label label-primary">2차주소</span> {{ store.state.address.region2DepthName }}
    </span>
    <span v-if="store.state.address.region3DepthName">
      <span class="label label-primary">3차주소</span> {{ store.state.address.region3DepthName }}
    </span>
    <span v-if="store.state.address.region4DepthName">
      <span class="label label-primary">4차주소</span> {{ store.state.address.region4DepthName }}
    </span>
  </p>

  <p style="font-size: 0.8em">
    <span v-if="store.state.address.zipCode">
      <span class="label label-default">우편번호</span> {{ store.state.address.zipCode }}
    </span>
    <span v-if="store.state.address.legalCode">
      <span class="label label-default">법정코드</span> {{ store.state.address.legalCode }}
    </span>
    <span v-if="store.state.address.adminCode">
      <span class="label label-default">행정코드</span> {{ store.state.address.adminCode }}
    </span>
  </p>

  <p v-if="store.state.address.coords">
    <span class="label label-info">좌표</span>
    X: {{ store.state.address.coords.x }}, Y: {{ store.state.address.coords.y }}
  </p>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'
import { onMounted } from 'vue'

const store = useStore()

onMounted(() => {
  console.log('Vuex Store State:', store.state)
})
</script>

<style scoped>
span {
  margin-right: 0.4em;
}
</style>
