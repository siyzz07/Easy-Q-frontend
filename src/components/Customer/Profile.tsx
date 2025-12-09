import { useEffect, useState } from "react";
import EditProfileModal from "./EditProfileModal";
import { getCustomerData } from "../../Services/ApiService/CustomerApiService";
import type { ICustomer } from "../../Shared/types/Types";

function Profile() {
  const [editPopup, setEditPopup] = useState<boolean>(false);
  const [customerData, setCustomerData] = useState<ICustomer | null>(null);
  const [loading, setLoading] = useState<boolean>(false);


  useEffect(() => {
    getData();
  }, [editPopup]);


  // useEffect(() => {
  //   if (!editPopup) {
  //     getData();
  //   }
  // }, [editPopup]);

  const getData = async () => {
    setLoading(true);
    try {
      const response = await getCustomerData();
      if (response?.data?.data) {
        setCustomerData(response.data.data);
      }
    } catch (error: unknown) {
      console.error("Error fetching customer data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Edit Modal */}
      {editPopup && customerData && (
        <EditProfileModal
          name={customerData.name}
          email={customerData.email}
          phone={customerData.phone}
          onClose={() => setEditPopup(false)}
        />
      )}

      {/* Profile Card */}
      <div className="rounded-lg border border-gray-400 bg-card p-4 shadow-sm md:p-6">
        <h2 className="mb-4 font-bold text-xl">Customer Details</h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium text-foreground">
                User Name
              </label>
              <input
                id="username"
                value={customerData?.name || ""}
                readOnly
                disabled
                className="h-10 w-full rounded-md border border-gray-400 bg-muted px-3 text-sm text-foreground/80 disabled:cursor-not-allowed"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Email
              </label>
              <input
                id="email"
                value={customerData?.email || ""}
                readOnly
                disabled
                className="h-10 w-full rounded-md border border-gray-400 bg-muted px-3 text-sm text-foreground/80 disabled:cursor-not-allowed"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium text-foreground">
                Phone
              </label>
              <input
                id="phone"
                value={customerData?.phone || ""}
                readOnly
                disabled
                className="h-10 w-full rounded-md border border-gray-400 bg-muted px-3 text-sm text-foreground/80 disabled:cursor-not-allowed"
              />
            </div>

            {/* <div className="space-y-2">
              <label htmlFor="altPhone" className="text-sm font-medium text-foreground">
                Alternate Phone
              </label>
              <input
                id="altPhone"
                value="9072284410"
                readOnly
                disabled
                className="h-10 w-full rounded-md border border-gray-400 bg-muted px-3 text-sm text-foreground/80 disabled:cursor-not-allowed"
              />
            </div> */}
          </div>
        )}

        <div className="mt-5">
          <button
            onClick={() => setEditPopup(true)}
            className="inline-flex items-center rounded-md px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 shadow-sm text-white transition hover:opacity-90"
          >
            Update Profile
          </button>
        </div>
      </div>
    </>
  );
}

export default Profile;
