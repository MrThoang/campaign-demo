export interface campaignType {
    information: informationType[]
    subCampaigns: subCampaignsType[]
}
export interface informationType {
    name: string
    describe?: string
}

export interface subCampaignsType {
    name: string
    status: boolean
    ads: adsType[]
}

export interface adsType {
    name: string
    quantity: number
}
