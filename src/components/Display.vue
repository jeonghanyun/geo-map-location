<template>
  <div>
    <div v-if="store.state.address.legalAddress">
      <div class="label label-primary">법정주소(legal_address)</div> {{ store.state.address.legalAddress }}
    <!--address.address_name-->
    </div>
    <div v-if="store.state.address.adminAddress">
      <div class="label label-primary">행정주소(admin_address)</div> {{ store.state.address.adminAddress }}
      <!--법정동에서 3DepthName->3DepthHName 으로 변경-->
    </div>
    <div v-if="store.state.address.roadAddress">
      <div class="label label-primary">도로명주소(load_address)</div> {{ store.state.address.roadAddress }}
    </div>
    <!-- road_address.address_name + road_address.building_name -->
  </div>
  <div>
    <br>
    <h3>법정(행정) 지번 상세주소 (address)</h3> <br>
    <div v-if="store.state.address.region1DepthName">
      <div class="label label-primary">1번(시도)(region_1_depth_name)</div> {{ store.state.address.region1DepthName }}
    </div>
    <div v-if="store.state.address.region2DepthName">
      <div class="label label-primary">2번(시군구)(region_2_depth_name)</div> {{ store.state.address.region2DepthName }}
    </div>
    <div v-if="store.state.address.region3DepthName">
      <div class="label label-primary">3번(법정-legal동-읍면동)(region_3_depth_name)</div> {{ store.state.address.region3DepthName }}
    </div>
    <div v-if="store.state.address.region3DepthHName">
      <div class="label label-primary">3H번(행정-admin동-읍면동)(region_3_depth_h_name)</div> {{ store.state.address.region3DepthHName }}
    </div>
    <div v-if="store.state.address.region4DepthName">
      <div class="label label-primary">4번(리)(region_4_depth_name)</div> {{ store.state.address.region4DepthName }}
    </div>
    <div v-if="store.state.address.mainAddressNo">
      <div class="label label-primary">건물주번호(번지)(main_address_no)</div> {{ store.state.address.mainAddressNo }}
    </div>
    <div v-if="store.state.address.subAddressNo">
      <div class="label label-primary">건물부번호(sub_address_no)</div> {{ store.state.address.subAddressNo }}
    </div>
    <div v-if="store.state.address.coords?.x">
      <div class="label label-primary">위도(lat)</div> {{ store.state.address?.coords?.x }}
    </div>
    <div v-if="store.state.address?.coords?.y">
      <div class="label label-primary">경도(lang)</div> {{ store.state.address?.coords?.y }}
    </div>
    <div v-if="store.state.address.mountainYn">
      <div class="label label-primary">산(is_mountain)</div> {{ store.state.address.mountainYn }}
    </div>
  </div>
  <br>
  <div>
    <h3>도로명 상세주소 (road_address)</h3> <br>
    <div v-if="store.state.address.roadRegion1DepthName">
      <div class="label label-primary">1번(시)(road_region_1_depth_name)</div> {{ store.state.address.roadRegion1DepthName }}
    </div>
    <div v-if="store.state.address.roadRegion2DepthName">
      <div class="label label-primary">2번(군,구)(road_region_2_depth_name)</div> {{ store.state.address.roadRegion2DepthName }}
    </div>
    <div v-if="store.state.address.roadRegion3DepthName">
      <div class="label label-primary">3번(동)(road_region_3_depth_name)</div> {{ store.state.address.roadRegion3DepthName }}
    </div>
    <div v-if="store.state.address.roadRegion4DepthName">
      <div class="label label-primary">4번(road_region_4_depth_name)</div> {{ store.state.address.roadRegion4DepthName }}
    </div>
    <div v-if="store.state.address.roadRegionRoadName">
      <div class="label label-primary">도로명(road_name)</div> {{ store.state.address.roadRegionRoadName }}
    </div>
    <div v-if="store.state.address.roadRegionBuildingName">
      <div class="label label-primary">건물명(building_name)</div> {{ store.state.address.roadRegionBuildingName }}
    </div>
    <div v-if="store.state.address.roadRegionMainBuildingNo">
      <div class="label label-primary">도로명 주 건물번호(main_building_no)</div> {{ store.state.address.roadRegionMainBuildingNo }}
    </div>
    <div v-if="store.state.address.roadRegionSubBuildingNo">
      <div class="label label-primary">도로명 부 건물번호(sub_building_no)</div> {{ store.state.address.roadRegionSubBuildingNo }}
    </div>
    <div v-if="store.state.address.roadRegionUndergroundYn">
      <div class="label label-primary">지하여부(underground_yn)</div> {{ store.state.address.roadRegionUndergroundYn }}
    </div>
  </div>
  <br>
  <div style="font-size: 1em">
    <div v-if="store.state.address.zipCode">
      <div class="label label-default">우편번호(지번)(zone_no) </div> {{ store.state.address.zipCode }}
    </div>
    <div v-if="store.state.address.legalCode">
      <div class="label label-default">법정코드(legal_code)</div> {{ store.state.address.legalCode }}
    </div>
    <div v-if="store.state.address.adminCode">
      <div class="label label-default">행정코드(admin_code)</div> {{ store.state.address.adminCode }}
    </div>
    <div v-if=" store.state.address.roadCode">
      <div class="label label-default">도로명코드(road_code)</div> {{ store.state.address.roadCode }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'

const store = useStore()
</script>

<style scoped>
.address-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.address-section {
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.address-section h3 {
  margin-bottom: 10px;
  font-size: 1.2em;
  color: #333;
}

.label {
  display: inline-block;
  margin-bottom: 5px;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 4px;
}

.label-primary {
  background-color: #007bff;
  color: #fff;
}

.label-default {
  background-color: #6c757d;
  color: #fff;
}

.address-section p {
  margin: 0;
  padding: 5px 0;
}
</style>
