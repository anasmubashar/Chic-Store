import Product from "../Models/product";

export const getAllProducts = async (req, res) => {
  try {
    const {
      category,
      collection,
      fabric,
      size,
      color,
      minPrice,
      maxPrice,
      sort = "createdAt",
    } = req.query;

    let query = {};

    if (category) query.category = category;
    if (collection) query.collection = collection;
    if (fabric) query.fabric = fabric;
    if (size) query["sizeVariants.size"] = size;
    if (color) query["colorVariants.color"] = color;

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const products = await Product.find(query)
      .sort(sort)
      .limit(parseInt(req.query.limit) || 10)
      .skip(parseInt(req.query.skip) || 0);

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const checkStock = async (req, res) => {
  try {
    const { size, color } = req.query;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const sizeVariant = product.sizeVariants.find((v) => v.size === size);
    const colorVariant = product.colorVariants.find((v) => v.color === color);

    const inStock = sizeVariant?.inStock && colorVariant?.inStock;

    res.json({ inStock });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
