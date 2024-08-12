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
  roadAddress?: string
  zipCode?: string
  legalCode?: string
  adminCode?: string
  roadCode?: string
  coords?: Coords

  constructor(legalAddress: string,
    region1DepthName: string, region2DepthName: string, region3DepthName: string, region3DepthHName: string,
    roadRegion1DepthName: string, roadRegion2DepthName: string, roadRegion3DepthName: string, roadRegion4DepthName: string,
    adminAddress: string, roadAddress: string, zipCode: string, legalCode: string, adminCode: string, roadCode: string, coords: Coords) {
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
    this.roadAddress = roadAddress
    this.zipCode = zipCode
    this.legalCode = legalCode
    this.adminCode = adminCode
    this.roadCode = roadCode
    this.coords = coords
  }
}
