export interface IimageProp{
   image :string;
   alt ?: string
   style : string
}

export interface ICustomer{
   name :string;
   email:string;
   phone:string;
   password:string|undefined;
   confirmPassword ?: string
}


export interface IVendor{
   ownerName?:string,
   email?:string,
   phone?:string,
   city?:string,
   state?:string,
   country?:string,

}




export interface Imap {
  onSelect: (coords: { lat: number; lng: number }) => void;
  defaultCenter?: { lat: number; lng: number };
  zoom?: number;
  height?: string;
}