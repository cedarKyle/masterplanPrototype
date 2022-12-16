export function formatNumberToSquareFeet(val: number) {
    const rounded = Math.round(val);
    const usFormat = rounded.toLocaleString("en-US")
    return `${usFormat} sf.`
}


export function formatNumberToDollars(val: number) {
    const rounded = Math.round(val);
    const usFormat = rounded.toLocaleString("en-US")
    return `$${usFormat}`
}