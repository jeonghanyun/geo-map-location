import { Coords } from '@/models/Coords'

export class Address {
  legalAddress?: string
  adminAddress?: string
  roadAddress?: string
  zipCode?: string
  legalCode?: string
  adminCode?: string
  roadCode?: string
  coords?: Coords
  region1DepthName?: string
  region2DepthName?: string
  region3DepthName?: string
  region4DepthName?: string

  constructor(legalAddress: string, adminAddress: string, roadAddress: string, zipCode: string, legalCode: string, adminCode: string, roadCode: string, coords: Coords,
    region1DepthName: string, region2DepthName: string,region3DepthName: string, region4DepthName: string) {
    this.legalAddress = legalAddress
    this.adminAddress = adminAddress
    this.roadAddress = roadAddress
    this.zipCode = zipCode
    this.legalCode = legalCode
    this.adminCode = adminCode
    this.roadCode = roadCode
    this.coords = coords
    this.region1DepthName = region1DepthName
    this.region2DepthName = region2DepthName
    this.region3DepthName = region3DepthName
    this.region4DepthName = region4DepthName
  }
}
