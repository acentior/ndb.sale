export const numberWithLength = (num, len) => {
    return `${num}`.padStart(len, "0")
}
export const getSecTomorrow = () => {
    let now = new Date()
    let tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)

    let diff = tomorrow - now
    return Math.round(diff / 1000)
}
export const numberSign = (num) => {
    return Math.sign(num) >= 0 ? "+" : ""
}
export const numberWithCommas = (x, ch = ",") => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ch)
}

export const formatBytes = (bytes, decimals = 0) => {
    if (bytes === 0) return "0 Bytes"

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
}
