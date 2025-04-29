import Order from "../models/order.js"

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

    const order = new Order({
        orderId : orderId,
        email: req.user.email,
        name: orderInfo.name,
        phone: orderInfo.phone,
        address: orderInfo.address,
        total:0,
        products:[]
    })


    try{
        const createdOrder= await order.save()

        res.json({
            message: "Oder created successfully",
            order: createdOrder
        })

    }catch(err){
        res.status(500).json({
            message: "Failed to crate order",
            error: err
        })
    }

       
    //add current users name if not provieded
    //orderId generate
    //create order object
}