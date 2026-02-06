import type { IAppliedVendors } from "../../components/Customer/ContractDetailsModal";
import type { IAdminState } from "../../Redux/AdminAuthSlice";
import type { ICustomerState } from "../../Redux/CustomeSlice";
import type { IVendorState } from "../../Redux/VendorSlice";

export interface IimageProp {
  image: string;
  alt?: string;
  style: string;
}

export interface ICustomer {
  _id?:string
  name: string;
  email: string;
  phone: string;
  password: string | undefined;
  confirmPassword?: string;
  role?:string
}

export interface IVendor {
  shopName: string;
  email: string;
  phone: string;
  password: string;
  proof?:any
  confirmPassword?: string;
  proofImage?:string
  role?:string
  
}

interface Coordinates {
  lat: number;
  lng: number;
}

export interface IVendroShopData{
  _id?:string
  shopName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  state?: string;
  city?: string;
  shopType?: string | IServiceVendorTypes;
  openAt?: any;
  closeAt?: any;
  proofImage?:any;
  images?:IImage[]|[]
  ProfileImage?: any;
  workingDays?: any;
  coordinates?: Coordinates;
  isVerified?:"pending" | "verified" | "rejected"; 
}


export interface IShopData {
  state: string;
  city: string;
  shopType: string;
  openAt: any;
  closeAt: any;
  ProfileImage: any;
  workingDays: any;
  coordinates: Coordinates;
}

export interface Imap {
  onSelect: (coords: { lat: number; lng: number }) => void;
  defaultCenter?: { lat: number; lng: number };
  zoom?: number;
  height?: string;
}

export interface IVendorLogin {
  email: string;
  password: string;
  role?:string
}

export interface ICustomerLogin {
  email: string;
  password: string;
  role?:string
}

export interface IReduxStore {
  customerSlice: ICustomerState;
  vendorSlice: IVendorState;
  adminSlice: IAdminState;
}

export interface ITokenDdecode {
  userId: string;
  role: string;
  iat: number;
  exp: number;
}


export interface IForgotPassword{

  email:string

}


interface IAddressCoordinates {
  lat: any;
  lng: any;
}

export interface ICustomerAddress{
  _id?:string
  address:string;
  city:string;
  state:string;
  country:string;
  phone:string;
  coordinates?:IAddressCoordinates

}


export interface IServiceVendorTypes{
  _id?:string;
  serviceName:string;
  description:string;
  isActive:string
}

// export interface IStaff {
//   _id?: string;
//   shopName?:string
//   staffName: string;
//   openingTime: string;
//   closingTime: string;
//   breakStartTime: string;
//   breakEndTime: string;
//   isActive?: boolean;
//   bookingBlocks?: string[];
// }

export interface IBreakTime{
  breakStartTime:string;
  breakEndTime:string
}


export interface IImage {
  _id?:string
    url: string;
    publicId: string;
  }

export interface IBooking {
  _id?:  string
  customerId: string;
  bookingId?:string;
  userId?:string
  shopId: string;
  serviceId: string;
  customerAddressId: string;
  staffId?: string; 
  bookingTime: any; 
  bookingDate: string; 
  status:string;
  totalAmount: number;
  paymentMethod: string,
  paymentStatus: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IBookingPayload {
  // customerId: string;
  totalAmount: string;
  paymentMethod: string,
  bookingId:string;
  status:string
}


export interface IStaff {
  _id?: string;
  shopName?:string
  staffName: string;
  openingTime: string;
  closingTime: string;
  breaks:IBreakTime[]
  isActive?: boolean;
  blockedDates?: string[];
}

export interface IService {
  id?:string;
  shopName?:string;
  serviceName:string;
  description:string;
  duration:number|string;
  image:string|File|null
  availableStaff:string[]
  isActive?:boolean;
  price:number|string
}

export interface IServiceData {
  _id?:string;
  shopName?:string;
  serviceName:string;
  description:string;
  duration:number|string;
  image:string|File|null
  availableStaff:IStaff[]|[];
  isActive?:boolean;
  price:number|string
}

export interface IReview  {
  customerId?:string;
  vendorId:string;
  rating: string;
  createdAt?: Date;
  comment:string
}


export interface IContractAddress {
  _id?:string;
  address: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  coordinates: {
    lat: string;
    lng: string;
  };
}






export interface IContractData {
  _id?:string
  customerId:string;
  contractName:string;
  description :string;
  phone:string;
  address:IContractAddress,
  acceptedVendors:IAppliedVendors[];
  appliedVendors:IAppliedVendors[];
  serviceType: {
    _id: string;
    serviceName: string;
  };
  status: "inprogress"|"completed"|"cancelled"|"in_progress"|"open";
  workers:[string]|[];
  isHiring?:boolean;
  createdAt: string;
  updatedAt: Date;
}

export interface IvendroFullData {
  _id?: string;
  shopName?: string;
  email?: string;
  isActive?: boolean;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  state?: string;
  city?: string;
  shopType?: IServiceVendorTypes;
  openAt?: any;
  closeAt?: any;
  rating?:string
  proofImage?: any;
  ProfileImage?: any;
  images?: IImage[] | [];
  workingDays?: any;
  coordinates?: any;
  isVerified?: "pending" | "verified" | "rejected";
   location?: {
    type: string;
    coordinates: number[];
  };
}

export interface IWalletResponse {
  _id: string;
  user: string;
  userType: "Customer" | "Vendor";
  balance: number;
  createdAt: string;  
  updatedAt: string;   
}



//---------------------------contract
//  Address
export interface IAddress {
  _id: string;
  address: string;
  city: string;
  state: string;
  country: string;
  phone: string;
}

// Customer
export interface ICustomer {
  _id?: string;
  name: string;
  email: string;
  phone: string;
}

// Location (GeoJSON)
export interface ILocation {
  type: "Point";
  coordinates: [number, number]; // [longitude, latitude]
}

// Service Type
export interface IServiceType {
  _id: string;
  serviceName: string;
  description: string;
}

// Applied / Accepted Vendor
export interface IAppliedVendor {
  vendorId: string; 
  appliedAt?: string;
  status?: "pending" | "accepted" | "rejected";
}

// Main Contract DTO
export interface IContractDto {
  _id: string;

  contractId: string;
  contractName: string;
  description: string;

  budget: number;
  status: "open" | "in_progress" | "completed" | "cancelled" | "closed";

  address: IAddress;
  location: ILocation;

  customerId: ICustomer;
  serviceType: IServiceType;

  appliedVendors: IAppliedVendor[];
  acceptedVendors: IAppliedVendor[];

  createdAt: string;
}

// Pagination Wrapper
export interface IPaginationResponseMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IPaginatedContractResponse {
  data: IContractDto[];
  pagination: IPaginationResponseMeta;
}