export type DropdownItem = {
    key: string,
    text: string,
    value: string
    image?: { avatar: boolean, src: string }
}

export type FabricDatum = {
    name: string, 
    width: string, 
    price: string, 
    sku: string
}

export type UserItemObject = {
    foam: UserFoamData,
    extras: UserExtrasData,
    upholstery: UserUpholsteryData
}

export type UserFoamData = {
    density: string, 
    thickness: string, 
    length: number, 
    width: number, 
    quantity: number,
    measurementSystem: "mm" | "in"
}

export type UserExtrasData = {
    polyRequired: boolean, 
    layers: number, 
    glueRequired: boolean, 
    polyAreasToCover: { top: boolean, sides: boolean, bottom: boolean }
}

export type UserUpholsteryData = {
    required: boolean,
    fabric: FabricDatum, 
    labourRequired: boolean
}