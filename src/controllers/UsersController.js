import usersResource from "@/resources/users.resource";

class UsersController{
    async getUsers(){
        try {
            let response = await usersResource.getUsers();
            let users = [];

            if (response.status){
                //users = response.data.users;
                users = response.data.data;
                return {
                    status: response.status,
                    users,
                };
            }
        } catch (error) {
            console.error(error);
        }
    }
}
export default UsersController;
