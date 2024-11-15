import { Product } from "./product"

export interface Order {
    id:number
    createTime:Date 
    updateTime:Date
    userId:number
    totalAmount:number
    orderDate:Date
    address:string
    //products:Product[]
}
