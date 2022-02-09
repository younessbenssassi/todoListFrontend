import todosResource from "@/resources/todos.resource";

class TodosController{
    async getTodos(){
        try {
            let response = await todosResource.getTodos();
            let todos = [];
            if (response.status){
                todos = response.data.todos;
                return {
                    status: response.status,
                    todos,
                };
            }
        } catch (error) {
            console.error(error);
        }
    }
    async addTodo(data){
        try {
            let response = await todosResource.addTodo(data);
            let todo = [];

            if (response.data.status){
                todo = response.data.todo;
                return {
                    status: response.data.status,
                    todo,
                };
            }
        } catch (error) {
            console.error(error);
        }
    }
    async editTodo(data){
        try {
            let response = await todosResource.editTodo(data);
            let todo = [];

            if (response.data.status){
                todo = response.data.todo;
                return {
                    status: response.data.status,
                    todo,
                };
            }
        } catch (error) {
            console.error(error);
        }
    }
    async deleteTodo(todoId){
        try {
            let response = await todosResource.deleteTodo(todoId);

            if (response.data.status){
                return {
                    status: response.data.status,
                };
            }
        } catch (error) {
            console.error(error);
        }
    }
    async markAsNotDone(todoId){
        try {
            let response = await todosResource.markAsNotDone(todoId);

            if (response.data.status){
                return {
                    status: response.data.status,
                };
            }
        } catch (error) {
            console.error(error);
        }
    }
    async markAsDone(todoId){
        try {
            let response = await todosResource.markAsDone(todoId);

            if (response.data.status){
                return {
                    status: response.data.status,
                };
            }
        } catch (error) {
            console.error(error);
        }
    }
}
export default TodosController;
