import { Product } from "./product"

export interface Cart {
    id:number
    createTime:Date 
    updateTime:Date
    userId:number,
    totalAmount:number
    products:Product[]
}
