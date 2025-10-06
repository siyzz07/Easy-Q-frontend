




// ---------------------------------------------------------------vendor
export const vendorSetAceessToken = (token:string) =>{
    
    sessionStorage.setItem('vendorToken',token)
}

export const vendorGetAccessToken = () => sessionStorage.getItem("vendorToken");
export const vendorRemoveAccessToken = () => sessionStorage.removeItem("vendorToken");



// ---------------------------------------------------------------cusotmer


export const customerSetAceesToken = (token:string) =>{
    
    sessionStorage.setItem('customerToken',token)
}

export const customerGetAccessToken = () => sessionStorage.getItem("customerToken");
export const customerRemoveAccessToken = () => sessionStorage.removeItem("customerToken")


// ---------------------------------------------------------------admin

export const adminSetAceesToken = (token:string) =>{
    
    sessionStorage.setItem('adminToken',token)
}

export const adminGetAccessToken = () => sessionStorage.getItem("adminToken");
export const adminRemoveAccessToken = () => sessionStorage.removeItem("adminToken")
