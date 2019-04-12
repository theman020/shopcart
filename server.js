const express = require('express')
const {
  db,
  vendors,
  products,users,carts
} = require('./db')

const app = express()

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

app.use(express.static(__dirname + '/public'))


//-------------------------------> VENDOR BLOCK
// console.log(__dirname + '/public/vendor.html');
app.get('/vendors', async (req, res) => {
  const vendorList = await vendors.findAll()
  res.send(vendorList)
})

app.post('/vendors', async (req, res) => {

  console.log('Vendor Name is ', req.body.name)
  try {
    const result = await vendors.create({
      name: req.body.name
    })
    res.send({
      success: true
    })
  } catch (e) {
    res.send({
      success: false,
      err: e.message
    })
  }
})

app.delete('/deleteVendor',async(req,res)=>{
  try{
    console.log(req.body)
    const result=await vendors.destroy({
      where:{
        id:req.body.id
      }
    })
    res.send({success:true})
  }
  catch(e){
    res.send({success:false,err:e.message})
  }
})


//------------------------------>Product Block
app.get('/products', async (req, res) => {
  const vendorList = await products.findAll()
  res.send(vendorList)
})

app.post('/products', async (req, res) => {
  console.log("product body is ", req.body)

  // console.log('Product name is ',req.body.name)
  try {
    const result = await products.create({
      name: req.body.name,
      price: req.body.price,
      vendorId: req.body.vendorId
    })
    res.send({
      success: true
    })
  } catch (e) {
    res.send({
      success: false,
      err: e.message
    })
  }
})

app.delete('/deleteProduct',async(req,res)=>{
  try{
    console.log(req.body)
    const result=await products.destroy({
      where:{
        id:req.body.id
      }
    })
    res.send({success:true})
  }
  catch(e){
    res.send({success:false,err:e.message})
  }
})

//--------------------------->User Block
app.post('/user',async (req,res)=>{
  console.log("user body is ", req.body)
  const userExist=await users.findOne({
    where:{
      name: req.body.name
    }
  })
  let result;
  if(!userExist){
    try{
       result = await users.create({
      name: req.body.name  
      })
      //console.log("result is ",result.id);
    }
    catch(e){
      res.send({success: false,err: e.message})
    }
  }
  // console.log(userExist.id);
  res.send({success:true, id : userExist ? userExist.id : result.id})

})


//------------------------------------>add cart Item
app.post('/addItem',async(req,res)=>{
 try{
  //check if there is record corresponding to userid and productid
  const userExist=await carts.findOne({
    where:{
      userId:req.body.uid,
      productId: req.body.pid
    }
  })
  if(!userExist){
    try{
      const result = await carts.create({
        userId   :req.body.uid,
        productId:req.body.pid,
        quantity :1 
        })
    }
    catch(e){
      res.send({success: false,err: e.message})
    }
  }
  else{
    console.log("found user and corresponding user id ");
    let newQuantity=userExist.quantity+1;
    console.log(userExist.quantity);
    const updateResult= await carts.update(
       
        {quantity:newQuantity},
        { 
        where:{
        userId:req.body.uid,
        productId: req.body.pid
      }
    })
    console.log(userExist)
  }
 }
 catch(e){

 }
})

//----------------------------->Fetch card corresponding to user
app.post('/getUserCart',async(req,res)=>{

  try{
     const userExist=await users.findOne({
      where:{
        name:req.body.name
      }
  })
  if(userExist){
    console.log('user found')
    //fetch user id from and get all cart item  for corresponding user id.
    useridFetched=userExist.id;
    console.log("Fetched id ",useridFetched)

    try{
      const cartItemsOfUser=await carts.findAll({
        include:[
          {
            model:products,
            include: [ {model:vendors} ]
          }
        ],
        where:{
          userId:useridFetched
        }
    })
    console.log(cartItemsOfUser)
    res.send({success:true,data:cartItemsOfUser})
  }
    catch(e){
      console.log(e.message)
    }

  }
  else{
    //user doesnot exists
    console.log('user doesnot exists')
  }

}   
  catch(e){

  }
})

const PORT=process.env.PORT || 9001
db.sync()
  .then(() => {
    app.listen(PORT)
  })