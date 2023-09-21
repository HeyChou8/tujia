import useMainStore from "@/store/modules/main";
import axios from "axios";
import { BASE_URL,TIMEOUT} from './config'
const mainStore = useMainStore()
class MyRequest {
    constructor(baseURL,timeout){
        this.instance = axios.create({
            baseURL,
            timeout
        })
        this.instance.interceptors.request.use((config) => {
            mainStore.isLoading = true
            return config
        },err => {
            return err
        })
        this.instance.interceptors.response.use(config => {
            mainStore.isLoading = false
            return config
        },err => {
            mainStore.isLoading = false
            return err
        }
        )
    }
    request(config){
        return new Promise((resolve,reject) => {
            this.instance.request(config).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    }
    get(config){
        return this.request({...config,method: 'get'})
    }
    post(config){
        return this.request({...config,method: 'post'})
    }
}
export default new MyRequest(BASE_URL,TIMEOUT)