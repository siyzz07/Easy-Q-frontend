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
  shopType?: string;
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
  customerId: string;
  shopId: string;
  serviceId: string;
  customerAddressId: string;
  staffId: string;
  bookingDate: string;
  totalAmount: string;
  paymentMethod: string;
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
  _id?:string;
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