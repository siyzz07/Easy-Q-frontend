import  { useEffect, useState } from "react";
import ChatPage, { type IContractDataResponse } from "../../components/Shared/ChatPage";
import { decodeToken } from "../../utils/tokenUtils";
import { getSelectedContract } from "../../Services/ApiService/ContractApiService";
import {  useNavigate, useParams } from "react-router-dom";


const VendorChatPage = () => {
  const { id } = useParams();
  const [contract, setContract] = useState<IContractDataResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true); 
  const navigate = useNavigate();

  const getContractData = async () => {
    try {
      setIsLoading(true); 
      if (!id) return;

      const decoded = await decodeToken();
      const response = await getSelectedContract(id);

      if (response?.data?.data && decoded) {
        const contractData = response.data.data;
        const userId = decoded.userId;
        
        const isAcceptedVendor = contractData.acceptedVendors?.some(
          (vendor: any) => vendor._id === userId
        );
        if (isAcceptedVendor) {
          setContract(contractData);
        } else {
          navigate("/vendor/contracts");
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); 
    }
  };

  useEffect(() => {
    getContractData();
  }, [id]);

 
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#efeae2]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!contract) {
    return null;
  }

  return <ChatPage userType="vendor" contract={contract} />;
};
export default VendorChatPage;
