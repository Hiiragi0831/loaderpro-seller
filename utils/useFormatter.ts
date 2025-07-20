export function useFormatter(locale: string = 'ru-RU', defaultCurrency: string = 'RUB') {
  /**
   * Форматирует число как денежную сумму.
   * @param value - Число или строка, которое нужно отформатировать
   * @param options - настройки: валюту, формат отображения и флаг показа копеек
   * @returns строка, отформатированная как валюта
   */
  function formatMoney(
    value: number | string,
    options: {
      currency?: string
      currencyDisplay?: 'symbol' | 'code' | 'name'
      withDecimals?: boolean
    } = {}
  ): string {
    const number = typeof value === 'string' ? parseFloat(value) : value
    if (isNaN(number)) return String(value)

    const {
      currency = defaultCurrency,
      currencyDisplay = 'symbol',
      withDecimals = false,
    } = options

    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      currencyDisplay,
      minimumFractionDigits: withDecimals ? 2 : 0,
      maximumFractionDigits: withDecimals ? 2 : 0,
    }).format(number)
  }

  function formatNumber(
    value: number | string,
    options: Intl.NumberFormatOptions = {}
  ): string {
    const number = typeof value === 'string' ? parseFloat(value) : value
    if (isNaN(number)) return String(value)

    return new Intl.NumberFormat(locale, {
      useGrouping: true,
      ...options,
    }).format(number)
  }

  function formatDate(dateStr: string): string {
    const date = new Date(dateStr.replace(' ', 'T'))
    return new Intl.DateTimeFormat('ru-RU').format(date)
  }

  return {
    formatMoney,
    formatNumber,
    formatDate,
  }
}
