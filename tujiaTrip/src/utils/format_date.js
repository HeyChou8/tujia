import dayjs from "dayjs";

export function formatMonthDay(date,formatStr="MM月DD日"){
    return dayjs(date).format(formatStr)
}

export function getDiffDay(startDate,endDate){
    return dayjs(endDate).diff(startDate,"day")
}