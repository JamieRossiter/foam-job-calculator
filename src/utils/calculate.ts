import { CalculatedFoamData, FoamPriceDatum, UserFoamData, UserExtrasData, CalculatedExtrasData, UserUpholsteryData, CalculatedUpholsteryData } from "./types";

export function calculateFoam(data: UserFoamData, foamPrices: Array<FoamPriceDatum>): CalculatedFoamData {

    // Find target foam based on density and thickness
    const targetFoam: FoamPriceDatum | undefined = foamPrices.find((foamPrice: FoamPriceDatum) => foamPrice.density === data.density && foamPrice.thickness === parseInt(data.thickness));

    // Determine prices
    let units: number = 0;
    let finalPrice: number = 0;
    const unitPrice: number = targetFoam ? targetFoam.price : 0;
    if(unitPrice){
        switch(data.measurementSystem){
            case "mm":
                units = ((data.length / 10) * (data.width / 10)) / 100;
                finalPrice = (units * unitPrice) * data.quantity;
                break;
            case "in":
                units = (((data.length * 25.4) / 10) * ((data.width * 25.4) /10)) / 100;
                finalPrice = (units * unitPrice) * data.quantity;
                break;
        }
    }

    // Determine other info
    const finalThickness: string = `${data.measurementSystem === "mm" ? data.thickness : (parseInt(data.thickness) / 25.4).toFixed(2)}${data.measurementSystem}`;
    const foamName: string = `${targetFoam?.name} - ${finalThickness} (${data.thickness}mm)`;

    const totalPrice: string = finalPrice.toFixed(2);
    const eachPrice: string =  (units * unitPrice).toFixed(2);

    const dimensions: string = `${Number(data.length).toFixed(2)} x ${Number(data.width).toFixed(2)} x ${finalThickness}`;
    const sku: string = `SKU: ${targetFoam?.sku}`;

    return { 
        name: foamName,
        quantity: data.quantity, 
        totalPrice: totalPrice, 
        eachPrice: eachPrice, 
        units: `${(units * data.quantity).toFixed(2)} units`, 
        dimensions: dimensions, 
        sku: sku
    }

}

export function calculateExtras(foamData: UserFoamData, extrasData: UserExtrasData): CalculatedExtrasData {
    const POLY_WIDTH_MM: number = 1500;
    const POLY_COST: number = 16.95;

    let finalPrice: number = 0;

    const isAllCovered: boolean = extrasData.polyAreasToCover.bottom && extrasData.polyAreasToCover.top && extrasData.polyAreasToCover.sides;
    const isTopOrBottomCoveredOnly: boolean = 
        ((extrasData.polyAreasToCover.bottom && !extrasData.polyAreasToCover.top) ||
        (extrasData.polyAreasToCover.top && !extrasData.polyAreasToCover.bottom)) &&
        !(extrasData.polyAreasToCover.sides)

    const minPolyWidth: number = ((isTopOrBottomCoveredOnly ? Number(foamData.width) : Number(foamData.width) * 2) + (isAllCovered ? (parseInt(foamData.thickness) * 2) : 0));
    const isWiderThanPolyWidth: boolean = minPolyWidth > POLY_WIDTH_MM;
    const isLongerThanPolyWidth: boolean = foamData.length > POLY_WIDTH_MM;

    let totalPolyLength: number;
    if(isWiderThanPolyWidth && !isLongerThanPolyWidth) totalPolyLength = ((foamData.length * 2) * foamData.quantity)
    else if(isWiderThanPolyWidth && isLongerThanPolyWidth) totalPolyLength = (foamData.length * 2) + ((foamData.length - POLY_WIDTH_MM) * 2) + ((foamData.width - POLY_WIDTH_MM) * 2);
    else totalPolyLength = (foamData.length * foamData.quantity);

    finalPrice =  (totalPolyLength / 1000) * POLY_COST;

    console.log("Extras is all covered", isAllCovered);
    console.log("Extras is top or bottom only", isTopOrBottomCoveredOnly);
    console.log("Min poly width", minPolyWidth);
    console.log("Total poly length", totalPolyLength / 1000);

    if(extrasData.layers > 1) finalPrice = finalPrice * extrasData.layers

    let labourPrice: number = 0;
    if(extrasData.glueRequired) Number(foamData.length) > 1000 ? labourPrice += (20 * foamData.quantity) : labourPrice += (10 * foamData.quantity); 

    return { polyPrice: finalPrice.toFixed(2), polyLength: totalPolyLength.toFixed(2), labourPrice: labourPrice.toFixed(2) }
}

export function calculateUpholstery(foamData: UserFoamData, upholsteryData: UserUpholsteryData): CalculatedUpholsteryData {

    const fabricWidth: number = parseInt(upholsteryData.fabric.width.split("mm")[0]);

    const isFoamLengthWider: boolean = (Number(foamData.length) + parseInt(foamData.thickness) * 2) >= fabricWidth;
    const isFoamWidthWider: boolean = ((Number(foamData.width) + parseInt(foamData.thickness) * 2)) >= fabricWidth;
    const isHalfFoamWidthWider: boolean = ((Number(foamData.width) + parseInt(foamData.thickness) * 2)) >= fabricWidth / 2;

    let requiredFabricLength: number = 0; 
    if(isFoamLengthWider){

        if(!isHalfFoamWidthWider) requiredFabricLength = foamData.length * 1.5;
        else if(isFoamWidthWider) requiredFabricLength = foamData.length * 3.05;
        else requiredFabricLength = foamData.length * 2.05;

    } else if (!isFoamLengthWider && !isFoamWidthWider){
        requiredFabricLength = foamData.length * 1.05;
    } else {
        requiredFabricLength = foamData.width * 2.5;
    }
    requiredFabricLength *= foamData.quantity;

    // Get fabric name
    const fabricName: string = `${upholsteryData.fabric.name.charAt(0).toUpperCase() + upholsteryData.fabric.name.substring(1).toLowerCase()} Fabric`;

    // Calculate fabric cost
    let fabricCost: number = 0;
    fabricCost = (parseFloat(upholsteryData.fabric.price) * (requiredFabricLength / 1000));

    // Calculate estimated labour cost
    let estimatedLabourCost: number = 0;
    if(foamData.length < 1000 || foamData.width < 1000) estimatedLabourCost = 150;
    if (foamData.length > 1000 || foamData.width > 1000) estimatedLabourCost = 300;
    estimatedLabourCost *= foamData.quantity;
    
    return { 
        fabricName: fabricName, 
        fabricEachLength: (requiredFabricLength / foamData.quantity).toFixed(2), 
        fabricLength: requiredFabricLength.toFixed(2),
        fabricPmPrice: upholsteryData.fabric.price,
        fabricPrice: fabricCost.toFixed(2),
        estimatedLabour: estimatedLabourCost.toFixed(2) 
    };

}