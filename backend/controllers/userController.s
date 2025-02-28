const supabase = require("../config/supabaseClient");
const bcrypt = require("bcryptjs");

// GET all users
exports.getAllUsers = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("users")
            .select("*");

        if (error) return res.status(400).json({ error: error.message });
        res.json({ data });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

// GET single user by ID
exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase
            .from("users")
            .select("*")
            .eq("id", id)
            .single();

        if (error) return res.status(404).json({ error: error.message });
        res.json({ data });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

// UPDATE user
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, password, role } = req.body;

        // Build update object
        const updatedFields = { username, email, role };
        if (password) {
            updatedFields.password = await bcrypt.hash(password, 10);
        }

        const { data, error } = await supabase
            .from("users")
            .update(updatedFields)
            .eq("id", id)
            .single();

        if (error) return res.status(400).json({ error: error.message });
        res.json({ message: "User updated", data });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

// DELETE user
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase
            .from("users")
            .delete()
            .eq("id", id)
            .single();

        if (error) return res.status(400).json({ error: error.message });
        res.json({ message: "User deleted", data });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};
