export const endpoint = {
  auth: {
    register: "/auth/register",
    login: "/auth/login",
    logout: "/auth/logout",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
  },
  
  user: {
    get: (id: string) => `/user/${id}`,
    block: (id: string) => `/user/block/${id}`,
    profile: "/user/profile",
    add: "/user",
    getAll: "/user",
    update: (id: string) => `/user/${id}`,
    filter: (values: {}) => `/staff/?${new URLSearchParams(values)}`,
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