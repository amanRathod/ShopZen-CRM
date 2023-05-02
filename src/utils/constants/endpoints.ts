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
    get: (id: string) => `/api/v1/products/${id}`,
    getAll: "/api/products",
    add: "/api/v1/products",
    update: (id: string) => `/api/v1/products/${id}`,
    getAllByRepo: "api/v1/products",
    filter: (values: {}) => `/product/?${new URLSearchParams(values)}`,
    getByCategoryId: (id: number|string) => `/api/products/search/findByCategoryId?id=${id}`,
    getByProductName: (name: string) => `/api/products/search/findByNameContainingIgnoreCase?name=${name}`,
    getProductPagination: (page: number, size: number) => `/api/products?page=${page}&size=${size}`,
    getProductByCategoryPagination: (id: number|string, page: number, size: number) => `/api/products/search/findByCategoryId?id=${id}&page=${page}&size=${size}`,
    productByNamePagination: (name: string, page: number, size: number) => `/api/products/search/findByNameContainingIgnoreCase?name=${name}&page=${page}&size=${size}`,
    getByProductNameAndCategoryName: (name: string, categoryName: string) => `/api/products/search/findByNameContainingIgnoreCaseAndCategoryNameContainingIgnoreCase?name=${name}&categoryName=${categoryName}`,
  },

  order: {
    get: (id: string) => `/api/order/${id}`,
    add: "/api/order",
    getAll: "/api/order",
    update: (id: string) => `/api/order/${id}`,
    filter: (values: {}) => `/api/order/?${new URLSearchParams(values)}`,
    orderById: (id: string) => `/api/order/user/${id}`,
  },

  country: {
    getAll: "/api/countries",
    get: (id: string) => `/api/countries/${id}`,
    getInSortedOrder: "/api/countries/search/findAllByOrderByNameAsc",
  },

  state: {
    getAll: "/api/states",
    getByCountryCode: (code: string) => `/api/states/search/findByCountryCode?code=${code}`,
    getByCountryName: (name: string) => `/api/states/search/findByCountryName?name=${name}`,
    getByCountryCodeInSortedOrder: (code: string) => `/api/states/search/findByCountryCodeOrderByNameAsc?code=${code}`,
    getInSortedOrder: "/api/states/search/findAllByOrderByNameAsc",
  }
}