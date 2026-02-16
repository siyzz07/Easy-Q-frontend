
import type { IAddContractInitialValues } from "../../components/Customer/AddContractModal";
import type { IUpdateContractValues } from "../../components/Customer/EditContract";
import { ContractAxiosInstance } from "../../config/AxiosInstance";
import { CONTRACT_API_ROUTES } from "../../Shared/Constants/ApiEndpoints";






/**
 * 
 * Contract
 * 
 */
//-------------------------------- add new contract
export const addContract = async (form:IAddContractInitialValues) =>{
    const response = await ContractAxiosInstance.post(CONTRACT_API_ROUTES.ADD_CONTRACT,form);
    return response;
};
//-------------------------------- get contract
export const getSelectedContract= async (id:string) =>{
    const response = await ContractAxiosInstance.get(`${CONTRACT_API_ROUTES.GET_CONTRACT}${id}`);
    return response;
};


export const getServiceTypesForcontract = async () =>{
    const response = await ContractAxiosInstance.get(CONTRACT_API_ROUTES.GET_SERVICE_TYPES);
    return response;
};

//--------------------------------- get customer contracts
export const getCustomerContracts = async (page:number,limit:number,search:string,filter:string) =>{
    const response = await ContractAxiosInstance.get(CONTRACT_API_ROUTES.CUSTOMER_CONTRACTS,{
        params:{
            page,
            limit,
            search,
            filter
        }
    });

    return response;
};

//--------------------------------- get vendor works
export const editContractData=async (contractId:string ,data:IUpdateContractValues) =>{

    const response = await ContractAxiosInstance.put(`${CONTRACT_API_ROUTES.EDIT_CONTRACT}${contractId}`,data);
    return response;
};


//------------------------ Remove vendor from the contract chat page
export const removeVendorFromContractandChatRoom = async (contractId:string , vendorId:string) =>{
  const response = await ContractAxiosInstance.delete(`${CONTRACT_API_ROUTES.REMOVE_VENDOR_CHAT}${contractId}/${vendorId}`);
  return response;
}; 

//--------------------------------- get vendor works
export const getVendorWorks = async (page?:number,limit?:number,search?:string,filter?:string,lat?:number|null,lng?:number|null) =>{

    const response = await  ContractAxiosInstance.get(CONTRACT_API_ROUTES.VENDOR_WORKS,{
        params:{
            page,
            limit,
            search,
            filter,
            lat,
            lng
        }
    });

    return response;

};   

//--------------------------------- appply for a contract
export const applyContract = async (contractId:string) =>{
    const response = await ContractAxiosInstance.patch(`${CONTRACT_API_ROUTES.APPLY_CONTRACT}${contractId}`);
    return response;
};

//--------------------------------- contract request handle -- customer can reject or accept vendor for the contract
export const updateContractRequest = async (contractId:string,vendorId:string,decision:"accept"|"reject")=>{
    const response =  await ContractAxiosInstance.patch(CONTRACT_API_ROUTES.UPDATE_REQUEST,{contractId,vendorId,decision});
    return response;
};

//---------------------------------  get vendor contracts - vendors that accepted the customer for the contract
export const vendorContracts = async (page?:number,limit?:number,search?:string) =>{
    const response = await ContractAxiosInstance.get(CONTRACT_API_ROUTES.VENDOR_CONTRACTS,{
        params:{
            page,
            limit,
            search
        }
    });
    return response;
};

export const getVendorAppliedContracts = async (page?:number,limit?:number,search?:string) =>{
    const response = await ContractAxiosInstance.get(CONTRACT_API_ROUTES.VENDOR_APPLIED_CONTRACTS,{
        params:{
            page,
            limit,
            search
        }
    });
    return response;
};