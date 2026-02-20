export function getTimeLabel() {
    const now = new Date()
    const hours = now.getHours()

    if (hours >= 5 && hours <= 11) {
        return "Доброе утро"
    } else if (hours >= 12 && hours <= 17) {
        return "Добрый день"
    } else if (hours >= 18 && hours <= 22) {
        return "Добрый вечер"
    } else {
        return "Доброй ночи"
    }
}