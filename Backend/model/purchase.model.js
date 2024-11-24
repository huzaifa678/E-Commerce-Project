import mongoose from "mongoose";

const purchaseSchema = mongoose.Schema({
    Address: String,
    Payment_Method: String,
    Phone_Number: String
})

const purchase = mongoose.model("Purchase", purchaseSchema)

export default purchase;