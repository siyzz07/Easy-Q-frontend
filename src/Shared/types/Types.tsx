import type { IAdminState } from "../../Redux/AdminAuthSlice";
import type { ICustomerState } from "../../Redux/CustomeSlice";
import type { IVendorState } from "../../Redux/VendorSlice";

export interface IimageProp {
  image: string;
  alt?: string;
  style: string;
}

export interface ICustomer {
  name: string;
  email: string;
  phone: string;
  password: string | undefined;
  confirmPassword?: string;
}

export interface IVendor {
  shopName: string;
  email: string;
  phone: string;
  password: string;
  proof?:any
  confirmPassword?: string;
  proofImage?:string
  
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
}

export interface ICustomerLogin {
  email: string;
  password: string;
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

export interface IStaff {
  _id?: string;
  shopName?:string
  staffName: string;
  openingTime: string;
  closingTime: string;
  breakStartTime: string;
  breakEndTime: string;
  isActive?: boolean;
  bookingBlocks?: string[];
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