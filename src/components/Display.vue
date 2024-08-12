<template>
  <p>
    <span v-if="store.state.address.legalAddress">
      <span class="label label-primary">법정주소</span> {{ store.state.address.legalAddress }}
    </span>
    <span v-if="store.state.address.adminAddress">
      <span class="label label-primary">행정주소</span> {{ store.state.address.adminAddress }}
    </span>
    <span v-if="store.state.address.roadAddress">
      <span class="label label-primary">도로명주소</span>{{ store.state.address.roadAddress }}
    </span>
  </p>
  <div>
    <br>
    지번 상세주소 (address) <br>
    <span v-if="store.state.address.region1DepthName">
      <span class="label label-primary">1번</span>{{ store.state.address.region1DepthName }}
    </span>
    <span v-if="store.state.address.region2DepthName">
      <span class="label label-primary">2번</span>{{ store.state.address.region2DepthName }}
    </span>
    <span v-if="store.state.address.region3DepthName">
      <span class="label label-primary">3번</span>{{ store.state.address.region3DepthName }}
    </span>
    <span v-if="store.state.address.region3DepthHName">
      <span class="label label-primary">3H번</span>{{ store.state.address.region3DepthHName }}
    </span>
  </div>
  <br>
  <div>
    도로명 상세 (road_address) <br>
    <span v-if="store.state.address.roadRegion1DepthName">
      <span class="label label-primary">1번</span>{{ store.state.address.roadRegion1DepthName }}
    </span>
    <span v-if="store.state.address.roadRegion2DepthName">
      <span class="label label-primary">2번</span>{{ store.state.address.roadRegion2DepthName }}
    </span>
    <span v-if="store.state.address.roadRegion3DepthName">
      <span class="label label-primary">3번</span>{{ store.state.address.roadRegion3DepthName }}
    </span>
    <span v-if="store.state.address.roadRegion4DepthName">
      <span class="label label-primary">4번</span>{{ store.state.address.roadRegion4DepthName }}
    </span>
  </div>
  <br>
  <p style="font-size: 1em">
    <span v-if="store.state.address.zipCode">
      <span class="label label-default">우편번호</span> {{ store.state.address.zipCode }}
    </span>
    <span v-if="store.state.address.legalCode">
      <span class="label label-default">법정코드</span> {{ store.state.address.legalCode }}
    </span>
    <span v-if="store.state.address.adminCode">
      <span class="label label-default">행정코드</span> {{ store.state.address.adminCode }}
    </span>
    <span v-if=" store.state.address.roadCode">
      <span class="label label-default">도로명코드</span> {{ store.state.address.roadCode }}
    </span>
  </p>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'

const store = useStore()
</script>

<style scoped>
span {
  margin-right: 0.4em;
}
</style>
