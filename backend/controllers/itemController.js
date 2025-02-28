const supabase = require("../config/supabaseClient");

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

        if (error) return res.status(400).json({ error: error.message });
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
