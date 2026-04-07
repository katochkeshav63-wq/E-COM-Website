import Product from "../models/Product.js";

// add product

export const createProduct = async (req, res) => {
  try {
    // get uploaded files
    const imageUrls = req.files.map(
      (file) => `https://e-com-website-3.onrender.com/uploads/${file.filename}`
    );

    // merge body + images
    const productData = {
      ...req.body,
      images: imageUrls,
    };

    const product = await Product.create(productData);

    res.json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};


// get all products

export const getProducts = async (req, res) => {
  try {
    const { search, category, minPrice, maxPrice, sort } = req.query;

    let filter = {};

    // 🔍 SEARCH FILTER
    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    // 📂 CATEGORY FILTER
    if (category) {
      filter.category = category;
    }

    // 💰 PRICE FILTER
    if (minPrice || maxPrice) {
      filter.price = {};

      if (minPrice) {
        filter.price.$gte = Number(minPrice);
      }

      if (maxPrice) {
        filter.price.$lte = Number(maxPrice);
      }
    }

    // 🔃 SORTING
    let sortOption = { createdAt: -1 }; // default latest

    if (sort === "low") sortOption = { price: 1 };
    if (sort === "high") sortOption = { price: -1 };

    // ✅ APPLY FILTER HERE
    const products = await Product.find(filter)
      .populate("category", "name")
      .sort(sortOption);

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// update a product

export const updateProduct = async (req, res) => {
  try {
    let updateData = { ...req.body };

    // if new images uploaded
    if (req.files && req.files.length > 0) {
      const imageUrls = req.files.map(
        (file) => `https://e-com-website-3.onrender.com/uploads/${file.filename}`
      );
      updateData.images = imageUrls;
    }

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json({
      message: "Product updated successfully",
      updated,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// delete 

export const deleteProduct = async (req,res) => {
    try {
     await Product.findByIdAndDelete(req.params.id)  
      res.json({
            message: "Product deleted successfully",
            
        }) 
    } catch (error) {
        res.status(500).json({ message: "Server error", error });  
    }
}

// export const uploadImages = async(req,res, next) => {
//      const imageUrls = req.files.map(
//       (file) => `http://localhost:5000/uploads/${file.filename}`
//     );

    
// }
export const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id).populate("category");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};