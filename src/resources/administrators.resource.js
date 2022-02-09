import api from '@/resources/api.resource'

export default {
    getAdministrators(params){
        return api.get(`/admins`,{params})
    },
}
