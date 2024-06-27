
export const numberToCurrency = (number) => {
    return Intl.NumberFormat().format(number);
}

export const toShortTHDate = (dateStr) => {
    if (!dateStr || dateStr === '') return '';

    const [year, month, day] = dateStr.split('-');

    return `${day}/${month}/${parseInt(year, 10) + 543}`;
};

export const toLongTHDate = (date) => {
    return date.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

export const toLongTHDateWithBE = (dateStr) => {
    if (!dateStr || dateStr === '') return '';

    const [year, month, day] = dateStr.split('-');

    return `${day} ${MONTH_NAMES[parseInt(month) - 1]} พ.ศ. ${parseInt(year, 10) + 543}`;
}

export const generateQueryString = (inputs) => {
    let queryStr = '';

    for (const [key, val] of Object.entries(inputs)) {
        queryStr += `&${key}=${val}`;
    }

    return queryStr;
};
