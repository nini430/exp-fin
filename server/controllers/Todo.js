const ToDo=require("../models/Todo")



const getAllToDos=async(req,res)=>{
      
        const todos=await ToDo.find({});
        res.status(200).json({todos})
        
        

}


const getPaginatedToDos=async(req,res)=>{
        const page=req.query.page;
        console.log(page)
        const todoPerPage=5;
      
                const todos=await ToDo.find({}).skip((page-1)*todoPerPage).limit(todoPerPage);
                res.status(200).json({todos})

       
}

const getToDo=async(req,res)=>{
   
        const {id:todoId}=req.params;
        const todo=await ToDo.findOne({_id:todoId});
        
        res.status(200).json({todo})
    
    
}

const createToDo=async(req,res)=>{
        
            const todo=await ToDo.create(req.body);
            res.status(201).json({todo})
      
          
}

const updateToDo=async(req,res)=>{
    
        const {id:todoId}=req.params;
        const todo=await ToDo.findByIdAndUpdate({_id:todoId},req.body,{
            new:true,
            runValidators:true
        });
       
        res.status(200).json({todo})

}

const deleteToDo=async(req,res)=>{
   
        const {id:todoId}=req.params;
        const todo=await ToDo.findOneAndDelete({_id:todoId});
        
        
        res.status(200).json({todo})
    
}

module.exports={getAllToDos,getPaginatedToDos,getToDo,createToDo,updateToDo,deleteToDo};