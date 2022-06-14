const errorHandler=(err,req,res,next)=>{
   res.json({msg:"Soemthing wrong"})
}


module.exports=errorHandler;