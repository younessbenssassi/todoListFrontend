import api from '@/resources/api.resource'

export default {
    getTodos(){
        return api.get(`/todos`)
    },
    getTodo(todoId){
        return api.get(`/todo/`+todoId)
    },
    addTodo(todo){
        return api.post(`/todo`,todo)
    },
    editTodo(todo){
        return api.put(`/todo/`+todo.id,todo)
    },
    deleteTodo(todoId){
        return api.delete(`/todo/`+todoId)
    },
    markAsNotDone(todoId){
        return api.put(`/markAsNotDone/`+todoId)
    },
    markAsDone(todoId){
        return api.put(`/markAsDone/`+todoId)
    },

}
