
export type TCampaignType = {
    information: TInformationType[]
    subCampaigns: TSubCampaignsType[]
}
export type TInformationType = {
    id: string
    name: string
    describe?: string
}

export type TSubCampaignsType = {
    id: string,
    name: string
    status?: boolean
    ads: TAdsType[]
}

export type TAdsType = {
    id: string
    name: string
    quantity: number
}
