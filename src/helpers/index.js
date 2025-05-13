export function formatCurrency(amount) {
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'MXN' }).format(amount)
}

export function includesValue(search, value) {
    if (search === '' || value === '') return true
    value = value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    search = search.toLowerCase()
    return value.includes(search)
}