export const formatMoney = (value: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(value);
};

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

export const formatAmountForStripe = (
  amount: number,
  currency: string
) => {
  let numberFormat = new Intl.NumberFormat(['en-IN'], {
    style: 'currency',
    currency: currency,
    // currencyDisplay: 'symbol',
  })
  const parts = numberFormat.formatToParts(amount)
  let zeroDecimalCurrency: boolean = true
  for (let part of parts) {
    if (part.type === 'decimal') {
      zeroDecimalCurrency = false
    }
  }
  return zeroDecimalCurrency ? amount : Math.round(amount * 100)
}