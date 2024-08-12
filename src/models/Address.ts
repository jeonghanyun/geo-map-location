import { Coords } from '@/models/Coords'

export class CoordsAddress {
  legalAddress?: string
  adminAddress?: string
  region1DepthName?: string
  roadAddress?: string
  zipCode?: string
  legalCode?: string
  adminCode?: string
  roadCode?: string
  coords?: Coords

  constructor(legalAddress: string, region1DepthName: string, adminAddress: string, roadAddress: string, zipCode: string, legalCode: string, adminCode: string, roadCode: string, coords: Coords) {
    this.legalAddress = legalAddress
    this.adminAddress = adminAddress
    this.region1DepthName = region1DepthName
    this.roadAddress = roadAddress
    this.zipCode = zipCode
    this.legalCode = legalCode
    this.adminCode = adminCode
    this.roadCode = roadCode
    this.coords = coords
  }
}
