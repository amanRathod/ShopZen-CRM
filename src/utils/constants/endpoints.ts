export const endpoint = {
  auth: {
    register: "/auth/register",
    login: "/auth/login",
    logout: "/auth/logout",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
  },
  
  user: {
    get: (id: string) => `api/v1/customer/${id}`,
    block: (id: string) => `api/v1/customer/block/${id}`,
    profile: "api/v1/customer/profile",
    add: "api/v1/customer",
    getAll: "api/v1/customer",
    update: (id: string) => `api/v1/customer${id}`,
    filter: (values: {}) => `api/v1/customer/?${new URLSearchParams(values)}`,
  },

  product: {
    get: (id: string) => `/product/${id}`,
    add: "/product",
    getAll: "/product",
    update: (id: string) => `/product/${id}`,
    filter: (values: {}) => `/product/?${new URLSearchParams(values)}`,
    productByCategory: (category: string) => `/product/category/${category}`,
  },

  order: {
    get: (id: string) => `/order/${id}`,
    add: "/order",
    getAll: "/order",
    update: (id: string) => `/order/${id}`,
    filter: (values: {}) => `/order/?${new URLSearchParams(values)}`,
    orderById: (id: string) => `/order/user/${id}`,
  },
}