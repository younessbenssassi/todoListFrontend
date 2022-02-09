import api from '@/resources/api.resource'

export default {
    getUsers(params){
        return api.get(`/users`,{params})
    },
}
