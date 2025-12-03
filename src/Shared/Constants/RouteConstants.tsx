



export const ADMIN_ROUTES = {

    MAIN:"/admin/*",
    LOGIN:"/login",
    BASE:"/",
    FORGOT_PASSWORD:"/forogt-password",
    RESEST_PASSWORD:"/reset-password",
    VEDORS_DATA:"/vendors",
    CUSTOMERS_DATA:"/customers",
    VERIFICATION:"verification-requests" ,
    SERVICES:"/services"

};



export const CUSTOMER_ROUTES ={

    MAIN:"/customer/*",
    LOGIN:"/login",
    SIGNUP:"/signup",
    EMAIL_VERIFY:"/verify-email",
    BASE:"/",
    FORGOT_PASSWORD:"/forgot-password",
    RESEST_PASSWORD:"/reset-password",
    PROFILE:"profile",
    CHANGE_PASSWORD_IN_PROFILE:"/profile/security",
    ADDRESS:"/profile/customer-address",
    SHOP_SERVICES:"/services/:id",  
    BOOKINGS:'/profile/bookings'
    


};


export const VENDOR_ROUTES ={

    MAIN:"/vendor/*",
    LOGIN:"/login",
    SIGNUP:"/signup",
    EMAIL_VERIFY:"/verify-email",
    SHOP_DATA:"/shop-data",
    BASE:"/",
    SERVICES:"services",
    FORGOT_PASSWORD:"/forgot-password",
    RESEST_PASSWORD:"/reset-password",
    PROFILE:"profile",
    STAFFS:"staffs"

};