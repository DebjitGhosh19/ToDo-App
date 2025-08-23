import mongoose from 'mongoose';
const connectDb=async () => {
  try {
    const connect=await mongoose.connect(process.env.MONGO_URI)
    console.log('Db connectted');
    
  } catch (error) {
    console.log(error);
    
  }
}
export default connectDb