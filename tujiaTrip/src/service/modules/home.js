import MyRequest from '../request/index'
export function getHomeHotSuggests(){
    return MyRequest.get({
        url:"/home/hotSuggests",
    })
}
export function getHomeCategories(){
    return MyRequest.get({
        url:"/home/categories"
    })
}
export function getHouseList(currrentPage){
    return MyRequest.get({
        url: "/home/houselist",
        params: {
            page:currrentPage
        }
    })
}