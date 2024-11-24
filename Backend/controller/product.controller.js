import purchase from "../model/purchase.model.js";

export const createPurchase=async(req, res) => {
    const { Address, Payment_Method, Phone_Number } = req.body;
    const newPurchase = new purchase({ Address, Payment_Method, Phone_Number });

    try {
        const savedPurchase = await newPurchase.save();
        res.status(201).json(savedPurchase);
    } catch (error) {
        console.log("error occurred while creating purchase: ", error);
        res.status(500).json(error);
    }
};

