const Store = require("../models/Store");

// Create store
exports.createStore = async (req, res) => {
  try {
    console.log("Req body:", req.body);
    console.log("Req user:", req.user);

    const { name, location, description } = req.body;
    if (!name || !location) {
      return res.status(400).json({ msg: "Name and location are required" });
    }

    const store = new Store({
      name,
      location,
      description,
      ratings: [],
      createdBy: req.user?.id || "anonymous" // optional
    });

    await store.save();
    res.json({ msg: "Store added successfully", store });
  } catch (err) {
    console.error("Error in createStore:", err);
    res.status(500).json({ msg: "Server Error" });
  }
};

// Get all stores
exports.getStores = async (req, res) => {
  try {
    const stores = await Store.find();
    res.json(stores);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

// Get store by ID
exports.getStoreById = async (req, res) => {
  try {
    const store = await Store.findById(req.params.id);
    if (!store) return res.status(404).json({ msg: "Store not found" });
    res.json(store);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

// Delete store
exports.deleteStore = async (req, res) => {
  try {
    const store = await Store.findById(req.params.id);
    if (!store) return res.status(404).json({ msg: "Store not found" });
    await store.remove();
    res.json({ msg: "Store deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
};
