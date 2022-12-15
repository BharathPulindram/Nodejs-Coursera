import mongoose from 'mongoose';

const schema = mongoose.Schema({
    userId:Number,
    id:Number,
    title:String,
    data:String,
})

//collection inside db
export default mongoose.model('userData',schema);