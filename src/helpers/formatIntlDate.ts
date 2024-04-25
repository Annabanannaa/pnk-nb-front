export function formatIntlDate (
    date: string | Date,
    locale = 'ru-RU'
): string {
    return new Intl.DateTimeFormat(locale).format(new Date(date))
}
