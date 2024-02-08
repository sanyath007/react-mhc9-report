
export const numberToCurrency = (number) => {
    return Intl.NumberFormat().format(number);
}
