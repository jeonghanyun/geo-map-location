<template>
  <div class="container-fluid">
<!--    <div class="row">-->
<!--      <h2 class="page-header">주소/좌표로 위치 확인하기</h2>-->
<!--    </div>-->

    <div class="row">
      <!-- 왼쪽 열 -->
      <div class="col-md-4">
        <div class="row">
          <Control />
        </div>
        <div class="row">
          <Display />
        </div>
      </div>

      <div class="col-md-2">
        <div class="row">
          <Map />
        </div>
      </div>

      <!-- 오른쪽 열 -->
      <div class="col-md-4">
        <JsonConverter />
      </div>
    </div>
  </div>

  <teleport to="#alert">
    <Alert />
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
import JsonConverter from '@/components/JsonConverter.vue'

const store = useStore()

onMounted(() => {
  const queryString = window.location.search.substring(1)
  if (queryString.length === 0) {
    return
  }

  const queries = queryString.match(/x=([0-9]+\.[0-9]+)&y=([0-9]+\.[0-9]+)/)
  if (queries === null || queries.length < 3) {
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

.container-fluid {
  padding: 20px;
}

.page-header {
  margin-top: 0;
}

.row {
  margin-bottom: 20px;
}

.col-md-8 {
  padding-right: 15px;
}

.col-md-4 {
  padding-left: 15px;
}
</style>
