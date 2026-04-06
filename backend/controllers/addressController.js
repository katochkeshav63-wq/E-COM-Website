import Address from "../models/Address.js";

export const saveAddress = async(req,res) => {
    try {
        const address = await Address.create(req.body);
        res.json({message: "Address saved successfully", address});
    } catch (error) {
        res.status(500).json({message: "Error saving address", error})
    }
}

export const getAddresses = async (req,res) => {
    try {
        const addresses = await Address.find({
            userId: req.params.userId
        })
        res.json(addresses)
    } catch (error) {
        res.status(500).json({message: "Error fetching address", error})
    }
}
export const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;

   const address=  await Address.findByIdAndDelete(id);

    res.json({
      message: "Address deleted successfully",
    });

  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({
      message: "Server error while deleting address",
    });
  }
};