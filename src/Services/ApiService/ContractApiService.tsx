import type { IAddContractInitialValues } from "../../components/Customer/AddContractModal";
import type { IUpdateContractValues } from "../../components/Customer/EditContract";
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
export const getSelectedContract= async (id:string) =>{
    const response = await ContractAxiosInstance.get(`/contract/get-contract/${id}`);
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

//--------------------------------- get vendor works
export const editContractData=async (contractId:string ,data:IUpdateContractValues) =>{

    const response = await ContractAxiosInstance.put(`/contract/edit/${contractId}`,data)
    return response
}


//------------------------ Remove vendor from the contract chat page
export const removeVendorFromContractandChatRoom = async (contractId:string , vendorId:string) =>{
  const response = await ContractAxiosInstance.delete(`/contract/room/vendor-remove/${contractId}/${vendorId}`)
  return response
} 

//--------------------------------- get vendor works
export const getVendorWorks = async (page?:number,limit?:number,search?:string,filter?:string,lat?:number|null,lng?:number|null) =>{

    const response = await  ContractAxiosInstance.get('/contract/vendor/works',{
        params:{
            page,
            limit,
            search,
            filter,
            lat,
            lng
        }
    })

    return response

}   

//--------------------------------- appply for a contract
export const applyContract = async (contractId:string) =>{
    const response = await ContractAxiosInstance.patch(`/contract/apply/${contractId}`)
    return response
}

//--------------------------------- contract request handle -- customer can reject or accept vendor for the contract
export const updateContractRequest = async (contractId:string,vendorId:string,decision:'accept'|'reject')=>{
    const response =  await ContractAxiosInstance.patch('/contract/applied-request',{contractId,vendorId,decision})
    return response
}

//---------------------------------  get vendor contracts - vendors that accepted the customer for the contract
export const vendorContracts = async (page?:number,limit?:number,search?:string) =>{
    const response = await ContractAxiosInstance.get('/contract/vendor/contracts',{
        params:{
            page,
            limit,
            search
        }
    })
    return response
}