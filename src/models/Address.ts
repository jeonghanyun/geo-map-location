import { Coords } from '@/models/Coords'

export class CoordsAddress {
  legalAddress?: string
  adminAddress?: string
  region1DepthName?: string
  region2DepthName?: string
  region3DepthName?: string
  region3DepthHName?: string
  roadRegion1DepthName?: string
  roadRegion2DepthName?: string
  roadRegion3DepthName?: string
  roadRegion4DepthName?: string
  mainAddressNo?: string
  subAddressNo?: string
  roadRegionUndergroundYn?: string
  mountainYn?: string
  roadAddress?: string
  roadRegionMainBuildingNo?: string
  roadRegionSubBuildingNo?: string
  roadRegionRoadName?: string
  roadRegionBuildingName?: string
  zipCode?: string
  legalCode?: string
  adminCode?: string
  roadCode?: string
  coords?: Coords
  lat?: string
  lng?: string

  constructor(legalAddress: string,
    region1DepthName: string, region2DepthName: string, region3DepthName: string, region3DepthHName: string,
    roadRegion1DepthName: string, roadRegion2DepthName: string, roadRegion3DepthName: string, roadRegion4DepthName: string,
    mainAddressNo: string, subAddressNo: string, roadRegionUndergroundYn: string,
    roadRegionMainBuildingNo: string, roadRegionSubBuildingNo: string, roadRegionRoadName: string,
    roadRegionBuildingName: string,
    lat: string, lng: string,
    adminAddress: string, mountainYn: string, roadAddress: string, zipCode: string, legalCode: string, adminCode: string, roadCode: string, coords: Coords
  ) {
    this.legalAddress = legalAddress
    this.adminAddress = adminAddress
    this.region1DepthName = region1DepthName
    this.region2DepthName = region2DepthName
    this.region3DepthName = region3DepthName
    this.region3DepthHName = region3DepthHName
    this.roadRegion1DepthName = roadRegion1DepthName
    this.roadRegion2DepthName = roadRegion2DepthName
    this.roadRegion3DepthName = roadRegion3DepthName
    this.roadRegion4DepthName = roadRegion4DepthName
    this.roadRegionMainBuildingNo = roadRegionMainBuildingNo
    this.roadRegionSubBuildingNo = roadRegionSubBuildingNo
    this.roadRegionRoadName = roadRegionRoadName
    this.roadRegionBuildingName = roadRegionBuildingName
    this.mainAddressNo = mainAddressNo
    this.subAddressNo = subAddressNo
    this.roadRegionUndergroundYn = roadRegionUndergroundYn
    this.mountainYn = mountainYn
    this.roadAddress = roadAddress
    this.zipCode = zipCode
    this.legalCode = legalCode
    this.adminCode = adminCode
    this.roadCode = roadCode
    this.coords = coords
    this.lat = lat
    this.lng = lng
  }
}
