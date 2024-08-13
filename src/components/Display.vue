<template>
  <div>
    <p>
      <span v-if="store.state.address.legalAddress">
        <span class="label label-primary">법정주소(legal_address)</span>
        {{ store.state.address.legalAddress }}
      </span>
      <span v-if="store.state.address.adminAddress">
        <span class="label label-primary">행정주소(admin_address)</span>
        {{ store.state.address.adminAddress }}
      </span>
      <span v-if="store.state.address.roadAddress">
        <span class="label label-primary">도로명주소(load_address)</span>
        {{ store.state.address.roadAddress }}
      </span>
    </p>

    <div class="detailed-address">
      <p>법정(행정) 지번 상세주소 (address)</p>
      <span v-if="store.state.address.region1DepthName">
        <span class="label label-primary">1번(시도)(region_1_depth_name)</span>
        {{ store.state.address.region1DepthName }}
      </span>
      <span v-if="store.state.address.region2DepthName">
        <span class="label label-primary">2번(시군구)(region_2_depth_name)</span>
        {{ store.state.address.region2DepthName }}
      </span>
      <span v-if="store.state.address.region3DepthName">
        <span class="label label-primary">3번(법정-legal동-읍면동)(region_3_depth_name)</span>
        {{ store.state.address.region3DepthName }}
      </span>
      <span v-if="store.state.address.region3DepthHName">
        <span class="label label-primary">3H번(행정-admin동-읍면동)(region_3_depth_h_name)</span>
        {{ store.state.address.region3DepthHName }}
      </span>
      <span v-if="store.state.address.region4DepthName">
        <span class="label label-primary">4번(리)(region_4_depth_name)</span>
        {{ store.state.address.region4DepthName }}
      </span>
      <span v-if="store.state.address.mainAddressNo">
        <span class="label label-primary">건물주번호(번지)(main_address_no)</span>
        {{ store.state.address.mainAddressNo }}
      </span>
      <span v-if="store.state.address.subAddressNo">
        <span class="label label-primary">건물부번호(sub_address_no)</span>
        {{ store.state.address.subAddressNo }}
      </span>
      <span v-if="store.state.address.coords?.x">
        <span class="label label-primary">위도(lat)</span>
        {{ store.state.address.coords?.x }}
      </span>
      <span v-if="store.state.address.coords?.y">
        <span class="label label-primary">경도(lang)</span>
        {{ store.state.address.coords?.y }}
      </span>
      <span v-if="store.state.address.mountainYn">
        <span class="label label-primary">산(is_mountain)</span>
        {{ store.state.address.mountainYn }}
      </span>
    </div>

    <div class="road-address">
      <p>도로명 상세주소 (road_address)</p>
      <span v-if="store.state.address.roadRegion1DepthName">
        <span class="label label-primary">1번(시)(road_region_1_depth_name)</span>
        {{ store.state.address.roadRegion1DepthName }}
      </span>
      <span v-if="store.state.address.roadRegion2DepthName">
        <span class="label label-primary">2번(군,구)(road_region_2_depth_name)</span>
        {{ store.state.address.roadRegion2DepthName }}
      </span>
      <span v-if="store.state.address.roadRegion3DepthName">
        <span class="label label-primary">3번(동)(road_region_3_depth_name)</span>
        {{ store.state.address.roadRegion3DepthName }}
      </span>
      <span v-if="store.state.address.roadRegion4DepthName">
        <span class="label label-primary">4번(road_region_4_depth_name)</span>
        {{ store.state.address.roadRegion4DepthName }}
      </span>
      <span v-if="store.state.address.roadRegionRoadName">
        <span class="label label-primary">도로명(road_name)</span>
        {{ store.state.address.roadRegionRoadName }}
      </span>
      <span v-if="store.state.address.roadRegionBuildingName">
        <span class="label label-primary">건물명(building_name)</span>
        {{ store.state.address.roadRegionBuildingName }}
      </span>
      <span v-if="store.state.address.roadRegionMainBuildingNo">
        <span class="label label-primary">도로명 주 건물번호(main_building_no)</span>
        {{ store.state.address.roadRegionMainBuildingNo }}
      </span>
      <span v-if="store.state.address.roadRegionSubBuildingNo">
        <span class="label label-primary">도로명 부 건물번호(sub_building_no)</span>
        {{ store.state.address.roadRegionSubBuildingNo }}
      </span>
      <span v-if="store.state.address.roadRegionUndergroundYn">
        <span class="label label-primary">지하여부(underground_yn)</span>
        {{ store.state.address.roadRegionUndergroundYn }}
      </span>
    </div>

    <div class="additional-info">
      <p style="font-size: 1em">
        <span v-if="store.state.address.zipCode">
          <span class="label label-default">우편번호(지번)(zone_no)</span>
          {{ store.state.address.zipCode }}
        </span>
        <span v-if="store.state.address.legalCode">
          <span class="label label-default">법정코드(legal_code)</span>
          {{ store.state.address.legalCode }}
        </span>
        <span v-if="store.state.address.adminCode">
          <span class="label label-default">행정코드(admin_code)</span>
          {{ store.state.address.adminCode }}
        </span>
        <span v-if="store.state.address.roadCode">
          <span class="label label-default">도로명코드(road_code)</span>
          {{ store.state.address.roadCode }}
        </span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'

const store = useStore()
</script>

<style scoped>
span {
  margin-right: 0.4em;
}

.detailed-address,
.road-address,
.additional-info {
  margin-bottom: 1em;
}

.label-primary {
  background-color: #337ab7;
  color: white;
  padding: 0.2em 0.4em;
  border-radius: 0.2em;
}

.label-default {
  background-color: #777;
  color: white;
  padding: 0.2em 0.4em;
  border-radius: 0.2em;
}
</style>
