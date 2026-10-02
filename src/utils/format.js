export const peso = n => '₱' + Number(n).toLocaleString()
export const nights = (a,b) => Math.max(0, Math.round((new Date(b)-new Date(a))/864e5))
export const stockStatus = a => a.stock===0?'Out of Stock':a.stock<=a.min?'Low Stock':'In Stock'
