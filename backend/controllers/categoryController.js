const supabase = require("../config/supabaseClient");

// CREATE category
exports.createCategory = async (req, res) => {
    try {
        const { category_name, description, parent_category_id } = req.body;

        const { data, error } = await supabase
            .from("master_category")
            .insert([{ category_name, description, parent_category_id }])
            .single();

        if (error) return res.status(400).json({ error: error.message });
        res.status(201).json({ message: "Category created", data });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

// READ all categories
exports.getAllCategories = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("master_category")
            .select("*");

        if (error) return res.status(400).json({ error: error.message });
        res.json({ data });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

// READ category by ID
exports.getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase
            .from("master_category")
            .select("*")
            .eq("category_id", id)
            .single();

        if (error) return res.status(404).json({ error: error.message });
        res.json({ data });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

// UPDATE category
exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { category_name, description, parent_category_id } = req.body;

        const { data, error } = await supabase
            .from("master_category")
            .update({ category_name, description, parent_category_id })
            .eq("category_id", id)
            .single();

        if (error) return res.status(400).json({ error: error.message });
        res.json({ message: "Category updated", data });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

// DELETE category
exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase
            .from("master_category")
            .delete()
            .eq("category_id", id)
            .single();

        if (error) return res.status(400).json({ error: error.message });
        res.json({ message: "Category deleted", data });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};
