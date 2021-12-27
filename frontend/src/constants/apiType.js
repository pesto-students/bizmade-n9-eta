

export const productList = () => ({
    actionPrefix: 'products',
    apiType: 'api/products'
})

const productDetails = (id) => ({
    actionPrefix: 'products_details',
    apiType: `/api/products/${id}`
})

const topProducts = () => ({
    actionPrefix: 'top_products',
    apiType: '/api/products/top'
})