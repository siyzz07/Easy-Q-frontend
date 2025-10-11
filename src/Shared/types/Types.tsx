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
  confirmPassword?: string;
}

interface Coordinates {
  lat: number;
  lng: number;
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
