import { DropdownItem } from "./types"

export const densityList: Array<DropdownItem> = [
    {
        key: "23-130",
        text: "Medium Density",
        value: "23-130",
        image: {avatar: false, src: `${process.env.PUBLIC_URL}/cream.jpeg`}
    },
    {
        key: "29-200",
        text: "High Density",
        value: "29-200",
        image: {avatar: false, src: `${process.env.PUBLIC_URL}/light_green.jpeg`}
    },
    {
        key: "36-130",
        text: "Enduro",
        value: "36-130",
        image: {avatar: false, src: `${process.env.PUBLIC_URL}/yellow.jpeg`}
    },
    {
        key: "29-400",
        text: "High Load",
        value: "29-400",
        image: {avatar: false, src: `${process.env.PUBLIC_URL}/charcoal.png`}
    }
]

export const measurementSystemList: Array<DropdownItem> = [
    {
        key: "mm",
        text: "mm",
        value: "mm"
    },
    {
        key: "in",
        text: "in",
        value: "in"
    }
]

export const thicknessList: Array<DropdownItem> = [
    {
        key: "25",
        text: "25mm",
        value: "25"
    },
    {
        key: "38",
        text: "38mm",
        value: "38"
    },
    {
        key: "50",
        text: "50mm",
        value: "50"
    },
    {
        key: "75",
        text: "75mm",
        value: "75"
    },
    {
        key: "100",
        text: "100mm",
        value: "100"
    },
    {
        key: "125",
        text: "125mm",
        value: "125"
    },
    {
        key: "150",
        text: "150mm",
        value: "150"
    }
]