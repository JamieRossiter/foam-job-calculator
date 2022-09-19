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

export type FoamPriceDatum = {
    density: string,
    name: string,
    thickness: number,
    price: number,
    sku: string
}

export type UserItemObject = {
    foam: CalculatedFoamData,
    extras: CalculatedExtrasData,
    upholstery: CalculatedUpholsteryData
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
    upholsteryRequired: boolean,
    fabric: FabricDatum, 
    labourRequired: boolean
}

export type CalculatedFoamData = {
    name: string, 
    quantity: number, 
    sku: string, 
    dimensions: string,
    totalPrice: string,
    eachPrice: string,
    units: string
}

export type CalculatedExtrasData = {
    polyLength: string,
    polyPrice: string,
    labourPrice: string
}

export type CalculatedUpholsteryData = {
    fabricName: string,
    fabricEachLength: string
    fabricLength: string,
    fabricPmPrice: string,
    fabricPrice: string,
    estimatedLabour: string
}