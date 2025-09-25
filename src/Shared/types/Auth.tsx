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