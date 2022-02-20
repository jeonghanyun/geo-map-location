<template>
  <div class="row">
    <h2 class="page-header">주소/좌표로 위치 확인하기</h2>
    <ul class="help-block">
      <li><small>입력창에 주소 또는 좌표를 입력하고 엔터를 눌러 지도상의 위치를 확인할 수 있습니다.</small></li>
      <li><small>반대로 마우스로 지도상의 위치를 클릭하여 주소, 좌표, 행정구역코드를 확인할 수 있습니다.</small></li>
      <li><small>건물이 있는 위치를 선택했을때만 도로명이 출력됩니다.</small></li>
    </ul>
  </div>

  <div class="row">
    <Control/>
  </div>

  <div class="row">
    <Display/>
  </div>

  <div class="row">
    <Map/>
  </div>

  <teleport to="#alert">
    <Alert/>
  </teleport>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import { GeoService } from '@/services/GeoService'
import Control from '@/components/Control.vue'
import Display from '@/components/Display.vue'
import Map from '@/components/Map.vue'
import Alert from '@/components/Alert.vue'

const store = useStore()

onMounted(() => {
  const queryString = window.location.search.substring(1)
  if (queryString.length === 0) {
    return
  }

  const queries = queryString.match(/x=([0-9]+\.[0-9]+)&y=([0-9]+\.[0-9]+)/)
  if (queries === null || queries.length < 3) {
    // queryes = ["x=126.975&y=37.566&", "37.566", "126.975"]
    store.commit('setError', `url에 포함된 x, y 형식이 틀립니다: ${queryString}`)
    return
  }

  const geoService = new GeoService()
  geoService.updateStateByCoords(queries[1], queries[2])
})
</script>

<style>
@import "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css";

body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
