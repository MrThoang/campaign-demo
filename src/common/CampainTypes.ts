
export type TCampaignType = {
    information: TInformationType[]
    subCampaigns: TSubCampaignsType[]
}
export type TInformationType = {
    name: string
    describe?: string
}

export type TSubCampaignsType = {
    id: number,
    name: string
    status: boolean
    ads: TAdsType[]
}

export type TAdsType = {
    id: number
    name: string
    quantity: number
}
