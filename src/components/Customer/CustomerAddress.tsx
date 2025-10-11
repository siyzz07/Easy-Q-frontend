import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Edit,Trash  } from "lucide-react";
import ConfirmationModal from "../Shared/ConfirmationModal";

const dummyAddresses = [
  {
    name: "John Doe",
    street: "123 Main Street",
    city: "Springfield",
    state: "Illinois",
    postalCode: "62704",
    country: "USA",
    phone: "+1 (217) 555-1234",
    coordinates: { latitude: 39.7817, longitude: -89.6501 },
  },
  {
    name: "Jane Smith",
    street: "456 Oak Avenue",
    city: "Denver",
    state: "Colorado",
    postalCode: "80203",
    country: "USA",
    phone: "+1 (303) 555-5678",
    coordinates: { latitude: 39.7392, longitude: -104.9903 },
  },
  {
    name: "Michael Johnson",
    street: "789 Pine Lane",
    city: "Austin",
    state: "Texas",
    postalCode: "78701",
    country: "USA",
    phone: "+1 (512) 555-9012",
    coordinates: { latitude: 30.2672, longitude: -97.7431 },
  },
  {
    name: "Emily Davis",
    street: "321 Cedar Street",
    city: "Seattle",
    state: "Washington",
    postalCode: "98101",
    country: "USA",
    phone: "+1 (206) 555-3456",
    coordinates: { latitude: 47.6062, longitude: -122.3321 },
  },
  {
    name: "William Brown",
    street: "654 Maple Drive",
    city: "Miami",
    state: "Florida",
    postalCode: "33101",
    country: "USA",
    phone: "+1 (305) 555-7890",
    coordinates: { latitude: 25.7617, longitude: -80.1918 },
  },
];

const CustomerAddress = () => {
  
  const [delConfirm,setDelComfirm] = useState<Boolean>(false)

  

  return (
    <>
      {/* <ConfirmationModal  */}
    <div className="rounded-lg border border-gray-400  p-4 bg-gray-50 shadow-sm md:p-6">
      <h2 className="mb-4 font-bold text-xl">
        Customer Address
      </h2>

 <div className="grid gap-4 md:grid-cols-3">
      {dummyAddresses.map((data: any, index: number) => (
        <Card key={index} className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex justify-between items-center">
            <CardTitle className="text-sm md:text-base">{data.street}</CardTitle>
            <div className="flex gap-2">
              <Edit
                className="h-5 w-5 text-gray-500 hover:text-blue-600 cursor-pointer"
                // onClick={() => handleEdit(data)}
              />
              <Trash
                className="h-5 w-5 text-gray-500 hover:text-red-600 cursor-pointer"
                // onClick={() => handleDelete(data)}
              />
            </div>
          </CardHeader>
          <CardContent className="text-sm text-gray-700">
            <p>{data.city}</p>
            <p>{data.state}</p>
            <p>Phone: {data.phone}</p>
          </CardContent>
        </Card>
      ))}
    </div>

      <div className="mt-5">
        <button className="inline-flex items-center rounded-md px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 shadow-sm text-white transition hover:opacity-90">
          Add Address
        </button>
      </div>
    </div>
      </>
  );
};

export default CustomerAddress;
