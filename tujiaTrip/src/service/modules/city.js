import MyRequest from '../request/index'
export function getAllCities(){
    return MyRequest.get({
        url: '/city/all'
    })
}