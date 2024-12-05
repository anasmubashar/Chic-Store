import Modiweek from "../models/modiweek.js";

export const getCurrentModiweek = async (req, res) => {
  try {
    const currentDate = new Date();
    const modiweek = await Modiweek.findOne({
      startDate: { $lte: currentDate },
      endDate: { $gte: currentDate },
      isActive: true,
    }).populate("items.product");

    if (!modiweek) {
      return res.status(404).json({ error: "No active Modiweek found" });
    }

    res.json(modiweek);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createModiweek = async (req, res) => {
  try {
    const { startDate, endDate, items } = req.body;

    // Deactivate current active Modiweek
    await Modiweek.updateMany(
      { isActive: true },
      { $set: { isActive: false } }
    );

    const modiweek = new Modiweek({
      startDate,
      endDate,
      items,
    });

    await modiweek.save();
    await modiweek.populate("items.product");

    res.status(201).json(modiweek);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateModiweek = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const modiweek = await Modiweek.findById(id);
    if (!modiweek) {
      return res.status(404).json({ error: "Modiweek not found" });
    }

    Object.keys(updates).forEach((key) => {
      modiweek[key] = updates[key];
    });

    await modiweek.save();
    await modiweek.populate("items.product");

    res.json(modiweek);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
