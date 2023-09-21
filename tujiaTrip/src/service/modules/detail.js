import MyRequest from '../request/index'
export function getDetailInfos(houseId){
    return MyRequest.get({
        url:"/detail/infos",
        params: {
            houseId
        }
    })
}