import { Cart } from "./cart";
import { Order } from "./order";

export interface Product {
    id:Number,
    categoryId:Number,
    sellerId:Number,
    reviewPoint:number,
    name:string,
    description:string,
    stockQuantity:number,
    price:number,
    createTime:Date,
    updateTime:Date,
    orders:Order[],
    carts:Cart[]
}
