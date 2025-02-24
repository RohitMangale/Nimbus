const supabase = require('../config/supabaseClient');

// CREATE test record
exports.createTest = async (req, res) => {
    try {
        const { item_id, test_date, test_type, test_result, technician_id, remarks } = req.body;

        const { data, error } = await supabase
            .from("tests")
            .insert([{ item_id, test_date, test_type, test_result, technician_id, remarks }])
            .single();

        if (error) return res.status(400).json({ error: error.message });
        res.status(201).json({ message: "Test created", data });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

// READ all test records
exports.getAllTests = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("tests")
            .select("*");

        if (error) return res.status(400).json({ error: error.message });
        res.json({ data });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

// READ single test record
exports.getTestById = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase
            .from("tests")
            .select("*")
            .eq("test_id", id)
            .single();

        if (error) return res.status(404).json({ error: error.message });
        res.json({ data });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

// UPDATE test record
exports.updateTest = async (req, res) => {
    try {
        const { id } = req.params;
        const { item_id, test_date, test_type, test_result, technician_id, remarks } = req.body;

        const { data, error } = await supabase
            .from("tests")
            .update({ item_id, test_date, test_type, test_result, technician_id, remarks })
            .eq("test_id", id)
            .single();

        if (error) return res.status(400).json({ error: error.message });
        res.json({ message: "Test updated", data });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

// DELETE test record
exports.deleteTest = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase
            .from("tests")
            .delete()
            .eq("test_id", id)
            .single();

        if (error) return res.status(400).json({ error: error.message });
        res.json({ message: "Test deleted", data });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};
