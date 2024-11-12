export interface Payment {
    id:number
    createTime:Date 
    updateTime:Date
    orderId:number,
    userId:number,
    creditCardId:number,
    amount:number
    paymentDate:Date
}
