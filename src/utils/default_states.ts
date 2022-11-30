import { UserExtrasData, UserFoamData, UserUpholsteryData } from "./types";

export const foamDefaultState: UserFoamData = {density: "", thickness: "", length: 0, width: 0, quantity: 1, measurementSystem: "mm"};
export const extrasDefaultState: UserExtrasData = {polyRequired: false, layers: 1, glueRequired: true, polyAreasToCover: { top: true, sides: true, bottom: true }};
export const upholsteryDefaultState: UserUpholsteryData = {upholsteryRequired: false, fabric: { name: "", width: "", price: "", sku: "" }, labourRequired: true};