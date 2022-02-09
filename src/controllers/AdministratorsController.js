import administratorsResource from "@/resources/administrators.resource";

class AdministratorsController{
    async getAdministrators(){
        try {
            let response = await administratorsResource.getAdministrators();
            let administrators = [];

            if (response.status){
                //administrators = response.data.administrators;
                administrators = response.data.data;
                return {
                    status: response.status,
                    administrators,
                };
            }
        } catch (error) {
            console.error(error);
        }
    }
}
export default AdministratorsController;
