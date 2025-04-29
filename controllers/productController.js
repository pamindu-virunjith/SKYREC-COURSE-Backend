import Product from "../models/products.js";
import { isAdmin } from "./userController.js";

export async function getProducts(req, res) {
  try{
    if(isAdmin(req)){
      const products = await Product.find()
      res.json(products)
    }else{
      const products = await Product.find({isAvailable: true})
      res.json(products)
    }
    
  }catch(err){
    res.json({
      message :"Failed to get products",
      error: err
    })
  }
}

export function saveProduct(req,res) {

  if(!isAdmin(req)){
    res.status(403).json({
      message: "you are not authorized to add a product"
    })
    return
  }

  const product = new Product(
    req.body
  );

  product
    .save()
    .then(() => {
      res.json({
        message: "Product added successfully",
      });
    })
    .catch(() => {
      res.status(400).json({
        message: "Failed product adding...",
      });
    });
}


export async function deleteProduct(req,res){
  if(!isAdmin(req)){
    res.status(403).json({
      mesage:"You are not authorized to detete product"
    })
    return
  }
  try{
    await Product.deleteOne({productId: req.params.productId})
    res.json({
      message:"Product deleted successfully"
    })

  }catch(err){
    res.status(500).json({
      message: "Failes to delete Product",
      error: err
    })
  }
 
}

export async function updateProduct(req,res){
  if(!isAdmin(req)){
    res.status(403).json({
      mesage:"You are not authorized to detete product"
    })
    return
  }

  const productId = req.params.productId
  const updateData = req.body

  try{
    await Product.updateOne(
      {productId: productId},
      updateData
    )

    res.json({
      message : "Product updated Successfully"
    })

  }catch(err){
    req.status(500).json({
      message: "Internal Server Error!!",
      error: err
    })
  }
}


export async function getProductById(req,res){
  const productId = req.params.productId
  try{
    const product = await Product.findOne(
      {productId: productId}
    )

    if(product == null){
      res.status(404).json({
        message: "Product not found"
      })
      return
    }
    
    if(product.isAvailable){
      res.json(product)
    }else{
      if(!isAdmin(req)){
        res.status(404).json({
          message: "Product not found"
        })
        return
      }else{
        res.json(product)
      }
    }

  }
  catch(err){
    res.status(500).json({
      message:"Cannot find the product",
      error: err
    })
  }

}