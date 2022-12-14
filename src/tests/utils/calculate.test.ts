import { calculateFoam } from "../../utils/calculate";
import { convertCSVData, createFoamPricesData, createFabricsData } from "../../utils/convert_data";
import { CalculatedFoamData, FoamPriceDatum, UserFoamData } from "../../utils/types";

const rawFoamData: string = 
`density,name,thickness,price,sku
23-130,Medium Density Foam,25,0.33,25017
23-130,Medium Density Foam,38,0.48,25018
23-130,Medium Density Foam,50,0.64,25020
23-130,Medium Density Foam,75,0.97,25021
23-130,Medium Density Foam,100,1.28,25022
23-130,Medium Density Foam,125,1.61,25024
23-130,Medium Density Foam,150,1.92,25025
29-200,High Density Foam,25,0.45,25074
29-200,High Density Foam,38,0.66,25075
29-200,High Density Foam,50,0.9,25076
29-200,High Density Foam,75,1.35,25077
29-200,High Density Foam,100,1.8,25078
29-200,High Density Foam,125,2.26,25079
29-200,High Density Foam,150,2.71,25080
36-130,Enduro Foam,25,0.00,25037
36-130,Enduro Foam,38,0.00,25038
36-130,Enduro Foam,50,1.13,25039
36-130,Enduro Foam,75,1.69,25040
36-130,Enduro Foam,100,2.26,25041
36-130,Enduro Foam,125,2.82,25042
36-130,Enduro Foam,150,3.39,25043
29-400,High Load Foam,25,0.58,33462
29-400,High Load Foam,38,0.88,33464
29-400,High Load Foam,50,1.16,33466
29-400,High Load Foam,75,1.74,33467
29-400,High Load Foam,100,2.32,33469
29-400,High Load Foam,125,2.9,33470
29-400,High Load Foam,150,3.48,33471`;

describe("Calculate: foam", () => {

    let foamPrices: Array<FoamPriceDatum>;
    let calculatedFoamData: CalculatedFoamData;

    let validUserFoamData: UserFoamData;
    let invalidUserFoamData: UserFoamData;

    let targetName: string;
    let targetThickness: string;
    let targetMeasurementSystem: string;
    
    beforeAll(() => {

        foamPrices = createFoamPricesData(convertCSVData(rawFoamData));
        
        validUserFoamData = {
            density: "36-130",
            thickness: "75",
            length: 1000,
            width: 500,
            quantity: 1,
            measurementSystem: "mm"
        }

        invalidUserFoamData = {
            density: "29-200",
            thickness: "50",
            length: 1400,
            width: 600,
            quantity: 2,
            measurementSystem: "in"
        }

        targetName = "enduro";
        targetThickness = "75";
        targetMeasurementSystem = "in";
        

    })

    test("Calculated foam name contains correct target name", () => {

        calculatedFoamData = calculateFoam(validUserFoamData, foamPrices);
        expect(calculatedFoamData.name.toLowerCase().includes(targetName)).toBe(true);

    })

    test("Calculated foam name does not contain incorrect target name", () => {

        calculatedFoamData = calculateFoam(invalidUserFoamData, foamPrices);
        expect(calculatedFoamData.name.toLowerCase().includes(targetName)).toBe(false);

    })

    test("Calculated foam name contains correct target thickness", () => {

        calculatedFoamData = calculateFoam(validUserFoamData, foamPrices);
        expect(calculatedFoamData.name.toLowerCase().includes(targetThickness)).toBe(true);

    })

    test("Calculated foam name does not contain incorrect target thickness", () => {

        calculatedFoamData = calculateFoam(invalidUserFoamData, foamPrices);
        expect(calculatedFoamData.name.toLowerCase().includes(targetThickness)).toBe(false);

    })

    test("Calculated foam name contains correct target measurement system", () => {

        calculatedFoamData = calculateFoam(validUserFoamData, foamPrices);
        expect(calculatedFoamData.name.toLowerCase().includes(targetMeasurementSystem)).toBe(false);

    })

    test("Calculated foam name does not contain incorrect target measurement system", () => {

        calculatedFoamData = calculateFoam(invalidUserFoamData, foamPrices);
        expect(calculatedFoamData.name.toLowerCase().includes(targetMeasurementSystem)).toBe(true);

    })

})

export {};