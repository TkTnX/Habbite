export const getWeekDayIndex = (date: string) => {
    const day = new Date(date).getDay()

    return day === 0 ? 6 : day - 1
}