export const numberWithLength = (num, len) => {
    return `${num}`.padStart(len, "0")
}
export const getSecTomorrow = () => {
    let now = new Date()
    let tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)

    let diff = tomorrow - now
    return Math.round(diff / 1000)
}

export const getTimeDiffOverall = (start, end) => {
    if (end !== undefined){
        let diff = new Date(end) - new Date()
        return Math.round(diff / 1000)
    }else{
        return 0
    }
}

export const getDiffOverall = (start, end) => {
    if (end !== undefined){
        let diff = new Date(end) - new Date(start)
        return Math.round(diff / 1000)
    }else{
        return 0
    }
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

export const secondsToDhms = (seconds) => {
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600*24));
    var h = Math.floor(seconds % (3600*24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    // var s = Math.floor(seconds % 60);
    
    var dDisplay = d > 0 ? d + (d === 1 ? "day " : "days ") : "";
    var hDisplay = h > 0 ? h + (h === 1 ? "hour " : "hours ") : "";
    var mDisplay = m > 0 ? m + (m === 1 ? "minute " : "minutes ") : "";
    // var sDisplay = s > 0 ? s + (s === 1 ? "second" : "seconds") : "";
    return dDisplay + hDisplay + mDisplay;
}