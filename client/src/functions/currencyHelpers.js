const floatToDollarsConverter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
});

export { floatToDollarsConverter };
