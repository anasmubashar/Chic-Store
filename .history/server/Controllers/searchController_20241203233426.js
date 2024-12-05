import Product from "../models/product.js";

export const searchProducts = async (req, res) => {
  try {
    const {
      query,
      category,
      collection,
      fabric,
      size,
      color,
      minPrice,
      maxPrice,
      inStock,
      sort = "createdAt",
      page = 1,
      limit = 10,
    } = req.query;

    let searchQuery = {};

    // Text search
    if (query) {
      searchQuery.$or = [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { style: { $regex: query, $options: "i" } },
      ];
    }

    // Filters
    if (category) searchQuery.category = category;
    if (collection) searchQuery.collection = collection;
    if (fabric) searchQuery.fabric = fabric;
    if (size) searchQuery["sizeVariants.size"] = size;
    if (color) searchQuery["colorVariants.color"] = color;

    if (minPrice || maxPrice) {
      searchQuery.price = {};
      if (minPrice) searchQuery.price.$gte = Number(minPrice);
      if (maxPrice) searchQuery.price.$lte = Number(maxPrice);
    }

    if (inStock === "true") {
      searchQuery.$and = [
        { "sizeVariants.inStock": true },
        { "colorVariants.inStock": true },
      ];
    }

    // Sorting options
    let sortOption = {};
    switch (sort) {
      case "price_asc":
        sortOption = { price: 1 };
        break;
      case "price_desc":
        sortOption = { price: -1 };
        break;
      case "newest":
        sortOption = { createdAt: -1 };
        break;
      default:
        sortOption = { createdAt: -1 };
    }

    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      Product.find(searchQuery)
        .sort(sortOption)
        .skip(skip)
        .limit(Number(limit)),
      Product.countDocuments(searchQuery),
    ]);

    res.json({
      products,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getFilters = async (req, res) => {
  try {
    const [categories, collections, fabrics, sizes, colors] = await Promise.all(
      [
        Product.distinct("category"),
        Product.distinct("collection"),
        Product.distinct("fabric"),
        Product.distinct("sizeVariants.size"),
        Product.distinct("colorVariants.color"),
      ]
    );

    res.json({
      categories,
      collections,
      fabrics,
      sizes,
      colors,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
