import type { IAddContractInitialValues } from "../../components/Customer/AddContractModal";
import { ContractAxiosInstance } from "../../config/AxiosInstance";





/**
 * 
 * Contract
 * 
 */
//-------------------------------- add new contract
export const addContract = async (form:IAddContractInitialValues) =>{
    const response = await ContractAxiosInstance.post("/contract/add-contract",form);
    return response;
};
//-------------------------------- get contract
export const getContract = async () =>{
    const response = await ContractAxiosInstance.get("/contract/get-contract");
    return response;
};


export const getServiceTypesForcontract = async () =>{
    const response = await ContractAxiosInstance.get("/service/get-services");
    return response;
};

//--------------------------------- get customer contracts
export const getCustomerContracts = async (page:number,limit:number,search:string,filter:string) =>{
    const response = await ContractAxiosInstance.get('/contract/customer/contracts',{
        params:{
            page,
            limit,
            search,
            filter
        }
    })

    return response
}