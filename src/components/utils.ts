export function formatNumberToSquareFeet(val: number) {
    const rounded = Math.round(val);
    const usFormat = rounded.toLocaleString("en-US")
    return `${usFormat} sm.`
}


export function formatNumberToDollars(val: number) {
    const rounded = Math.round(val);
    const usFormat = rounded.toLocaleString("en-US")
    return `$${usFormat}`
}

export function formatNumberToSquareMeters(val: number) {
    const rounded = Math.round(val);
    const usFormat = rounded.toLocaleString("en-US")
    return `${usFormat} sm.`
}