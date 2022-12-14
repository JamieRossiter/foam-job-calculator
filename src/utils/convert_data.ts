import { FabricDatum, FoamPriceDatum } from "./types";

// Format CSV data as an Array of string arrays
export function convertCSVData(csvStream: string): Array<Array<string>>{
    const splitData: Array<string> = csvStream.split("\n");
    return splitData.map((splitDatum: string, index: number) => { 
        let datum: Array<string>;
        if(index != 0){
            datum = splitDatum.split(",");
        } else {
            datum = [];
        }
        return datum.map((element: string) => { return element.trim() })
    })
}

// Organise fabrics array into array of FabricDatum JS objects
export function createFabricsData(csvArray: Array<Array<string>>): Array<FabricDatum>{
    return csvArray.map((fabricDatum: Array<string>, index: number) => {
        if(index != 0) return { name: fabricDatum[1], width: fabricDatum[3], price: fabricDatum[2], sku: fabricDatum[0] };
        else return { name: "", width: "", price: "", sku: "" };
    })
}

// Create an array containing foam price data
export function createFoamPricesData(csvArray: Array<Array<string>>): Array<FoamPriceDatum>{
    return csvArray.map((foamPriceDatum: Array<string>, index: number) => {
        if(index != 0) return { density: foamPriceDatum[0], name: foamPriceDatum[1], thickness: parseInt(foamPriceDatum[2]), price: parseFloat(foamPriceDatum[3]), sku: foamPriceDatum[4] };
        else return { density: "", name: "", thickness: 0, price: 0.0, sku: "" }
    })
}