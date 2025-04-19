const supabase = require("../config/supabaseClient");
const XLSX = require("xlsx");

// Bulk Import Endpoint
// Bulk Import Endpoint with header mapping

// Utility function to normalize keys
const normalizeKeys = (obj) => {
  const newObj = {};
  for (const key in obj) {
    newObj[key.toLowerCase().replace(/\s/g, "_")] = obj[key];
  }
  return newObj;
};

// Bulk Import Endpoint with header normalization
exports.bulkImportInventoryItems = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Read the Excel file from the file buffer
    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    console.log(jsonData);
    // Normalize each row's keys so that "Part Name" becomes "part_name", etc.
    const normalizedData = jsonData.map((row) => normalizeKeys(row));

    // Now, transform the data to include only the fields expected by your schema
    const transformedData = normalizedData.map((row) => ({
      category_id: row["category_id"] || row["category_id"],
      part_number: row["part_number"] || row["part_number"],
      part_name: row["part_name"] || row["part_name"],
      manufacturer: row["manufacturer"] || row["manufacturer"],
      model_number: row["model_number"] || row["model_number"],
      date_acquired: row["date_acquired"] || row["date_acquired"],
      inventory_status: row["inventory_status"] || row["inventory_status"],
      location: row["location"] || row["location"],
      last_test_date: row["last_test_date"] || row["last_test_date"],
      next_test_date: row["next_test_date"] || row["next_test_date"],
      current_condition: row["current_condition"] || row["current_condition"],
      additional_notes: row["additional_notes"] || row["additional_notes"],
    }));

    const { data, error } = await supabase
      .from("items")
      .insert(transformedData);

    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json({ message: "Bulk import successful", data });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};


// CREATE item
exports.createInventoryItem = async (req, res) => {
    try {
        const {
            category_id,
            part_number,
            part_name,
            manufacturer,
            model_number,
            date_acquired,
            inventory_status,
            location,
            last_test_date,
            next_test_date,
            current_condition,
            additional_notes
        } = req.body;

        const { data, error } = await supabase
            .from("items")
            .insert([{
                category_id,
                part_number,
                part_name,
                manufacturer,
                model_number,
                date_acquired,
                inventory_status,
                location,
                last_test_date,
                next_test_date,
                current_condition,
                additional_notes
            }])
            .single();

        if (error) return res.status(400).json({ error: error });
        res.status(201).json({ message: "Item created", data });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

// READ all items
exports.getAllInventoryItems = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("items")
            .select("*");

        if (error) return res.status(400).json({ error: error.message });
        res.json({ data });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

// READ single item by ID
exports.getInventoryItemById = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase
            .from("items")
            .select("*")
            .eq("item_id", id)
            .single();

        if (error) return res.status(404).json({ error: error.message });
        res.json({ data });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

// UPDATE item
exports.updateInventoryItem = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            category_id,
            part_number,
            part_name,
            manufacturer,
            model_number,
            date_acquired,
            inventory_status,
            location,
            last_test_date,
            next_test_date,
            current_condition,
            additional_notes
        } = req.body;

        const { data, error } = await supabase
            .from("items")
            .update({
                category_id,
                part_number,
                part_name,
                manufacturer,
                model_number,
                date_acquired,
                inventory_status,
                location,
                last_test_date,
                next_test_date,
                current_condition,
                additional_notes
            })
            .eq("item_id", id)
            .single();

        if (error) return res.status(400).json({ error: error.message });
        res.json({ message: "Item updated", data });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

// DELETE item
exports.deleteInventoryItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase
            .from("items")
            .delete()
            .eq("item_id", id)
            .single();

        if (error) return res.status(400).json({ error: error.message });
        res.json({ message: "Item deleted", data });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};
