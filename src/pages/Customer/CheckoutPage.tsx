import { AxiosError } from "axios";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CreditCard,
  Lock,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  createBooking,
  getCustomerData,
  getEachAddress,
  getEachShopData,
  getSelectedSerivce,
} from "../../Services/CustomerApiService";
import type {
  IBookingPayload,
  ICustomer,
  ICustomerAddress,
  IService,
  IVendroShopData,
} from "../../Shared/types/Types";
import { toast } from "react-toastify";

const CheckoutPage = () => {
  const [serarchParams] = useSearchParams();
  const [serviceData, setServiceData] = useState<IService | null>(null);
  const [customerData, setCustomerData] = useState<ICustomer | null>(null);
  const [addressData, setAddressData] = useState<ICustomerAddress | null>(null);
  const [shopData, setShopData] = useState<IVendroShopData | null>(null);
  const [staffId, setStaffId] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedPayment, setSelectedPayment] = useState<string>("");

  const navigate = useNavigate();
  let bookingData = serarchParams.get("bookingId");

  useEffect(() => {
    if (!bookingData) {
      navigate("/customer");
      return;
    }
    decodeData();
  }, [bookingData]);

  const decodeData = async () => {
    try {
      const decode = JSON.parse(atob(bookingData as string));
      if (
        !decode ||
        !decode.addressId ||
        !decode.selectedDate ||
        !decode.serviceId ||
        !decode.staffId ||
        !decode.shopId||
        !decode.preferredTime
      ) {
        navigate("/customer");
        return;
      }

      setStaffId(decode.staffId);
      setSelectedDate(decode.selectedDate);

      const [serviceResponse, customerResponse, addressResponse, shopResponse] =
        await Promise.all([
          getSelectedSerivce(decode.serviceId),
          getCustomerData(),
          getEachAddress(decode.addressId),
          getEachShopData(decode.shopId),
        ]);

        
    serviceResponse?.data?.data && setServiceData(serviceResponse.data.data);
    customerResponse?.data?.data && setCustomerData(customerResponse.data.data);
    addressResponse?.data?.data && setAddressData(addressResponse.data.data);
    shopResponse?.data?.data && setShopData(shopResponse.data.data);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log("Error fetching checkout info");
      }
    }
  };

  const handleProceedToPayment = async () => {
    try {
      if (!serviceData || !customerData || !addressData || !shopData) {
        alert("Some booking data is missing. Please reload the page.");
        return;
      }

      if (!selectedPayment) {
        toast.error("Please select a payment method.");
        return;
      }

      const bookingPayload: IBookingPayload = {
        customerId: customerData._id as string,
        shopId: shopData._id as string,
        serviceId: serviceData._id as string,
        customerAddressId: addressData._id as string,
        staffId,
        bookingDate: selectedDate,
        totalAmount: serviceData.price as string,
        paymentMethod: selectedPayment,
      };

      const response = await createBooking(bookingPayload);

      if (response.data.data) {
        console.log(response.data.data);

        let data = {
          bookingDate: response.data.data.bookingDate,
          bookingTime: response.data.data.bookingTime,
          paymentMethod: response.data.data.paymentMethod,
          totalAmount: response.data.data.totalAmount,
        };
        let encode = btoa(JSON.stringify(data));
        navigate(`/customer/service/payment-confirm?id=${encode}`);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log("Error creating booking:", error.message);
      } else {
        console.error("Unknown error while proceeding to payment:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 w-full">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-t-2xl p-6 sm:p-8 text-white relative overflow-hidden">
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
            <Lock className="w-6 h-6 sm:w-8 sm:h-8 opacity-20" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">
            Complete Your Booking
          </h2>
          <p className="text-blue-100 text-sm sm:text-base">
            Almost there! Choose your payment method to confirm.
          </p>
        </div>

        {/* Main Body */}
        <div className="bg-white rounded-b-2xl shadow-lg p-4 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
            {/* Left Section */}
            <div className="space-y-8">
              {/* Booking Summary */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Booking Summary
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shop Name</span>
                    <span className="text-gray-900 font-medium text-right">
                      {shopData?.shopName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service</span>
                    <span className="text-gray-900 font-medium text-right">
                      {serviceData?.serviceName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration</span>
                    <span className="text-gray-900 font-medium text-right">
                      {serviceData?.duration} mins
                    </span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-gray-200">
                    <span className="text-gray-600">Price</span>
                    <span className="text-gray-900 font-bold text-lg text-right">
                      ₹{serviceData?.price}
                    </span>
                  </div>
                </div>
              </div>

              {/* User Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  User Details
                </h3>
                <div className="space-y-1 text-sm sm:text-base">
                  <p className="text-gray-700">{customerData?.name}</p>
                  <p className="text-gray-700">ph: {customerData?.phone}</p>
                  <p className="text-gray-700">email: {customerData?.email}</p>
                  <p className="text-gray-700">
                    {addressData
                      ? `${addressData.address}, ${addressData.city}`
                      : ""}
                  </p>
                </div>
                <p className="text-xs text-gray-500 mt-4">
                  Please review your booking details before proceeding to
                  payment.
                </p>
              </div>
            </div>

            {/* Right Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Choose Payment Method
              </h3>

              <div className="space-y-3">
                {[
                  {
                    id: "razorpay",
                    name: "Razorpay",
                    color: "blue",
                    desc: "Pay securely with UPI, cards or net banking",
                  },
                  {
                    id: "COD",
                    name: "Pay at location",
                    color: "yellow",
                    desc: "Pay directly at the shop after service",
                  },
                  {
                    id: "wallet",
                    name: "Wallet",
                    color: "green",
                    desc: (
                      <>
                        Use your wallet balance •{" "}
                        <span className="text-green-600 font-medium">
                          ₹245.90 available
                        </span>
                      </>
                    ),
                  },
                ].map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setSelectedPayment(method.id)}
                    className={`w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 p-4 border-2 rounded-xl transition-all 
                      ${
                        selectedPayment === method.id
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-200 hover:border-blue-300"
                      }`}
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div
                        className={`w-10 h-10 bg-${method.color}-100 rounded-lg flex items-center justify-center`}
                      >
                        <CreditCard
                          className={`w-5 h-5 text-${method.color}-600`}
                        />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-gray-900">
                          {method.name}
                        </p>
                        <p className="text-xs text-gray-500">{method.desc}</p>
                      </div>
                    </div>
                    {selectedPayment === method.id && (
                      <div className="text-blue-600 text-sm font-medium">
                        Selected
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Notice */}
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-orange-900 text-sm mb-1">
                      Important Notice
                    </p>
                    <p className="text-xs text-orange-800">
                      Booking will only be confirmed after successful payment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0 mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center gap-2 px-6 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors w-full sm:w-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-medium">Back</span>
            </button>

            <button
              onClick={handleProceedToPayment}
              className="flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-lg shadow-blue-500/30 w-full sm:w-auto"
            >
              <span className="font-medium">Proceed to Payment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;
