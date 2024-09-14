const mongoose=require('mongoose');
const connectdb=async()=>{
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/admin');
        console.log('Connected to Mongo Db');
    }
    catch(error){
        console.log(error);
    }

}

module.exports=connectdb;