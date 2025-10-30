import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
name: { type: String, required: true },
email: { type: String, required: true, unique: true },
password: { type: String, required: true },
role: { type: String, enum: ["voter", "admin"], default: "voter" },
age:{
    type:Number,
    required:true,
},
mobile:{
    type:String,
    required:true
},
aadharNo:{
    type:Number,
    required:true,
    unique:true
},
hasVoted: {
    type: Boolean,
    default: false
}
});

const User = mongoose.model("User", userSchema);

export default User;
