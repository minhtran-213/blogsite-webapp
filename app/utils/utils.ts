import { Value } from "../types/custom-types";

export const formatDate = (value: Value) => {
    if (value instanceof Date) {
        return value
    }

    if (Array.isArray(value) && value[0] instanceof Date) {
        return value[0]
    }

    return null
}

export const genderList = [
    {
        value: 'MALE',
        label: 'Male'
    },
    {
        value: 'FEMALE',
        label: 'Female'
    },
    {
        value: 'OTHER',
        label: 'Other'
    }
]


export const getGenderLabelByValue = (value: string | null): string | null => {
    if (!value) return null
    const gender = genderList.find(gender => gender.value === value)
    return gender?.value ? gender.value : null
}

export const getGenderValueByLabel = (label: string) => {
    const gender = genderList.find(gender => gender.label === label)
    return gender?.value
}