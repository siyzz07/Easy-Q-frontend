import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Edit, Trash, Plus } from "lucide-react";
import AddAddressModal from "./AddAddressModal";
import {
  deleteCustomerAddress,
  getAddress,
} from "../../Services/CustomerApiService";
import ConfirmationModal from "../Shared/ConfirmationModal";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

import EditAddressModal from "./EditAddressModal";
import type { data } from "react-router-dom";


// 🧠 Address type (matches AddAddressModal form)
interface AddressData {
  _id?: string;
  address: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}


const CustomerAddress: React.FC = () => {
  const [addresses, setAddresses] = useState<AddressData[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [addressId, setAddresId] = useState<any | null>(null);
  const [deletePopup, setDeletePopup] = useState<Boolean>(false);
  const [editAddress,setEditAddress] = useState<Boolean>(false);
  const [eachAddres,setEachAddress] =useState<any|null>(null);

  useEffect(() => {
    getAllAddress();
  }, [showModal,addressId,editAddress]);

  const getAllAddress = async () => {
    try {
      let response = await getAddress();
      if (response?.data?.data) {
        setAddresses(response.data.data);
      }
      
    } catch (error: unknown) {
      console.log(error);
    }
  };

  const onClose = () => setShowModal(false);

  const deleteAddress = async (id?: string) => {
    try {
      if (id) {
        let response = await deleteCustomerAddress(id);
        if(response?.data?.message){
          toast.success(response.data.message);
        }
        setAddresId(null);
      }
    } catch (error: unknown) {
      if(error instanceof AxiosError){
        console.log("delete address error",error);
        
      }
    }
  };

  let deleteAddressDescription =
    "This action will permanently remove this address from your saved list. You won’t be able to recover it";



  return (
    <>
      {/* add address modal */}
      {showModal && <AddAddressModal onClose={onClose} />}

      {/* delete address modal */}
      {deletePopup && (
        <ConfirmationModal
          payload={addressId}
          submit={deleteAddress}
          description={deleteAddressDescription}
          text="Delete Address?"
          close={() => setDeletePopup(false)}
        />
      )}

      {/* edit customer addres */}
      {editAddress && <EditAddressModal onClose={()=>setEditAddress(false)}  data={eachAddres} />}

      {/* Address List */}
      <div className="rounded-lg border border-gray-300 p-4 bg-gray-50 shadow-sm md:p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-xl">Customer Addresses</h2>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-1 rounded-md px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 shadow-sm text-white"
          >
            <Plus size={16} /> Add Address
          </button>
        </div>

        {/* Address Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          {addresses.length === 0 ? (
            <p className="text-gray-600 italic">No address added yet</p>
          ) : (
            addresses.map((data, index) => (
              <Card
                key={index}
                className="shadow-md hover:shadow-lg transition"
              >
                <CardHeader className="flex justify-between items-center">
                  <CardTitle className="text-sm md:text-base">
                    {data.address}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Edit
                    onClick={()=>{
                      setEditAddress(true),
                      setEachAddress(data);
                    }}
                    className="h-5 w-5 text-gray-500 hover:text-blue-600 cursor-pointer" />
                    <Trash
                      onClick={() => {
                        setAddresId(data._id), setDeletePopup(true);
                      }}
                      className="h-5 w-5 text-gray-500 hover:text-red-600 cursor-pointer"
                    />
                  </div>
                </CardHeader>
                <CardContent className="text-sm text-gray-700">
                  <p>{data.city}</p>
                  <p>{data.state}</p>
                  <p>{data.country}</p>
                  <p>Phone: {data.phone}</p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default CustomerAddress;
