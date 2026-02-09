
export const ADMIN_API_ROUTES = {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    GET_CUSTOMERS: "/admin/data/customers",
    BLOCK_CUSTOMER: "/admin/data/block-customer",
    GET_VENDORS: "/admin/data/vendors",
    BLOCK_VENDOR: "/admin/data/block-vendor",
    GET_VENDORS_REQUEST: "/admin/data/vendors-request",
    VERIFY_VENDOR: "/admin/data/verified-vendor",
    REJECT_VENDOR: "/admin/data/reject-vendor",
    GET_SERVICE_TYPES: "/admin/service/get-services",
    ADD_SERVICE_TYPE: "admin/service/add-service",
    EDIT_SERVICE_TYPE: "/admin/service/edit-service",
    DASHBOARD: "/admin/admin-dashboard",
};

export const CUSTOMER_API_ROUTES = {
    SIGNUP_VERIFY_EMAIL: "/auth/verify-email",
    ADD_CUSTOMER: "/auth/add-customer",
    LOGIN: "/auth/login",
    GOOGLE_AUTH: "/auth/google-auth",
    LOGOUT: "/auth/logout",
    VERIFY_RESET_PASSWORD: "/auth/reset-password/verify",
    RESET_PASSWORD: "/auth/reset-password",
    GET_SHOPS_DATA: "/customer/shops-data",
    GET_SHOPS_DATA_PAGINATION: "/customer/shops/data",
    GET_CUSTOMER_DATA: "/customer/profile/customer-data",
    EDIT_PROFILE: "/customer/profile/edit-profile",
    CHANGE_PASSWORD: "/customer/profile/change-password",
    ADD_ADDRESS: "/customer/profile/add-address",
    DELETE_ADDRESS: "/customer/profile/delete-address",
    GET_ADDRESS: "/customer/profile/get-address",
    EDIT_ADDRESS: "/customer/profile/edit-address",
    GET_EACH_ADDRESS: "/customer/profile/get-each-address",
    GET_EACH_SHOP_DATA: "/customer/shop-data/",
    GET_EACH_SHOP_SERVICES: "/customer/shop-data/services/",
    GET_SELECTED_SERVICE_POPULATED: "/customer/service/get-service-populated",
    GET_SELECTED_SERVICE: "/customer/service/get-service",
    ADD_VENDOR_REVIEW: "/customer/vendor/add-review",
    FAVORITE: "/customer/favorite",
    FAVORITE_SHOPS: "/customer/favorite/shopes",
};

export const VENDOR_API_ROUTES = {
    VERIFY_EMAIL: "/auth/verify-email",
    ADD_VENDOR: "/auth/add-vendor",
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    VERIFY_RESET_PASSWORD: "/auth/reset-password/verify",
    RESET_PASSWORD: "/auth/reset-password",
    ADD_SHOP_DATA: "/vendor/shop-data",
    GET_SHOP_TYPE: "/vendor/shop-type",
    GET_SHOP_DATA: "/vendor/shop-data",
    EDIT_SHOP_DATA: "/vendor/shop/edit-shop",
    ADD_IMAGES: "/vendor/shop/image",
    REMOVE_IMAGE: "/vendor/shop/delete-image",
    DASHBOARD: "/vendor/dashboard/data",
    ADD_STAFF: "/vendor/staff/add-staff",
    GET_STAFF: "/vendor/staff/",
    EDIT_STAFF: "/vendor/staff/edit-staff",
    BLOCK_STAFF_DATES: "/vendor/staff/block-dates",
    ADD_SERVICE: "/vendor/service/add-service",
    GET_SERVICES: "/vendor/service/get-service",
    EDIT_SERVICE: "/vendor/service/edit-service",
    GET_SELECTED_SERVICE: "/service/selected",
};

export const BOOKING_API_ROUTES = {
    CREATE_BOOKING: "/booking/add-booking",
    CHECK_TIME: "/booking/check-time",
    CUSTOMER_BOOKINGS: "/booking/customer",
    SELECTED_BOOKING: "/booking/", 
    CANCEL_BOOKING: "/booking/cancel/",
    VENDOR_BOOKINGS: "/booking/vendor",
    UPDATE_STATUS: "/booking/status/",
    REFUND: "/booking/refund/",
    RESCHEDULE: "/booking/reschedule",
    REVIEW_ELIGIBILITY: "/booking/review-eligibility/",
};

export const CHAT_API_ROUTES = {
    CHAT_ROOM: "/chat/chat-contract/",
    MESSAGES: "/chat/messages/",
    START_VIDEO_CALL: "/chat/vedio-call/start",
    ZEGO_TOKEN: "/chat/zego/token",
    LEAVE_ZEGO: "/chat/leave-vedio",
};

export const CONTRACT_API_ROUTES = {
    ADD_CONTRACT: "/contract/add-contract",
    GET_CONTRACT: "/contract/get-contract/",
    GET_SERVICE_TYPES: "/service/get-services",
    CUSTOMER_CONTRACTS: "/contract/customer/contracts",
    EDIT_CONTRACT: "/contract/edit/",
    REMOVE_VENDOR_CHAT: "/contract/room/vendor-remove/",
    VENDOR_WORKS: "/contract/vendor/works",
    APPLY_CONTRACT: "/contract/apply/",
    UPDATE_REQUEST: "/contract/applied-request",
    VENDOR_CONTRACTS: "/contract/vendor/contracts",
};

export const NOTIFICATION_API_ROUTES = {
    FETCH: "/notification/notifications",
    UPDATE: "/notification/update",
};

export const TRANSACTION_API_ROUTES = {
    CREATE_PAY: "/transaction/create-pay",
    VERIFY: "/transaction/verify",
    GET_TRANSACTIONS: "/transaction/transactions",
};

export const WALLET_API_ROUTES = {
    CUSTOMER_WALLET: "/wallet/customer-wallet",
    WALLET_TRANSACTIONS: "/transaction/wallet/transactions",
    ADD_MONEY: "/transaction/wallet/add-money",
    VENDOR_WALLET: "/wallet/vendor-wallet",
};

export const REVIEW_API_ROUTES = {
    ADD_REVIEW: "/review/new-review",
    VENDOR_REVIEWS: "/review/vendor-reviews/",
    UPDATE_REVIEW: "/review/update-review/",
    DELETE_REVIEW: "/review/delete-review/",
};
