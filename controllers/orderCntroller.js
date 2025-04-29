import Order from "../models/order.js"
import Product from "../models/products.js"

export async function crateOrder(req,res){
    //get user information
    if(req.user == null){
        res.status(403).json({
            Message:"Pease login and try again"
        })
        return
    }

    const orderInfo = req.body

    if(orderInfo.name == null){
        orderInfo.name = req.user.firstName + " " + req.user.lastName
    }

    let orderId = "CBC00001"

    const lastOrder = await Order.find().sort({date : -1}).limit(1)

    if(lastOrder.length > 0){
        const lastOrderId = lastOrder[0].orderId
        //CBC00551
        const latOrderNumberString = lastOrderId.replace("CBC","")//"00551"
        const lastOderNumber = parseInt(latOrderNumberString)//00551
        const newOrderNmber = lastOderNumber+1
        const newNumberString = String(newOrderNmber).padStart(5,'0')
        orderId = "CBC" + newNumberString//"CBC00551"
    }
    try{
        let total = 0;
        let labeledTotal = 0;
        const products=[]

        for(let i=0; i < orderInfo.products.length; i++){

            const item = await Product.findOne({productId : orderInfo.products[i].productId})

            if(item == null){
                res.status(404).json({
                    message : "your Product" + "(" + orderInfo.products[i].productId + ")" + "is not found",
                })
                return
            }

            if(item.isAvailable == false){
                res.status(404).json({
                    message : "your Product" + "(" + orderInfo.products[i].productId + ")" + "is not Available right now",
                })
                return
            }

            products[i]={
                productInfo:{
                    productId : item.productId,
                    name: item.name,
                    altName: item.altName,
                    description: item.description,
                    images : item.images,
                    labledPrice: item.labledPrice,
                    price: item.price
                },
                quantity : orderInfo.products[i].quantity   
            }
            total += (item.price * orderInfo.products[i].quantity)
            labeledTotal += (item.labledPrice * orderInfo.products[i].quantity)
        }

        const order = new Order({
            orderId : orderId,
            email: req.user.email,
            name: orderInfo.name,
            phone: orderInfo.phone,
            address: orderInfo.address,
            total:0,
            products: products,
            total : total,
            labeledTotal : labeledTotal
        })
        const createdOrder = await order.save()

        res.json({
            message: "Oder created successfully",
            order: createdOrder
        })

    }catch(err){
        res.status(500).json({
            message: "Failed to cerate order",
            error: err
        })

        console.log(err)
    }

       
    //add current users name if not provieded
    //orderId generate
    //create order object
}