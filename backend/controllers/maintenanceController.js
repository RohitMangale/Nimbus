const supabase = require('../config/supabaseClient');

// CREATE maintenance record
exports.createMaintenance = async (req, res) => {
    try {
        const {
            item_id,
            maintenance_date,
            maintenance_type,
            description,
            next_maintenance_date,
            performed_by,
            remarks
        } = req.body;

        const { data, error } = await supabase
            .from("maintenance")
            .insert([{
                item_id,
                maintenance_date,
                maintenance_type,
                description,
                next_maintenance_date,
                performed_by,
                remarks
            }])
            .single();

        if (error) return res.status(400).json({ error: error.message });
        res.status(201).json({ message: "Maintenance record created", data });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

// READ all maintenance records
exports.getAllMaintenance = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("maintenance")
            .select("*");

        if (error) return res.status(400).json({ error: error.message });
        res.json({ data });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

// READ single maintenance record
exports.getMaintenanceById = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase
            .from("maintenance")
            .select("*")
            .eq("maintenance_id", id)
            .single();

        if (error) return res.status(404).json({ error: error.message });
        res.json({ data });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

// UPDATE maintenance record
exports.updateMaintenance = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            item_id,
            maintenance_date,
            maintenance_type,
            description,
            next_maintenance_date,
            performed_by,
            remarks
        } = req.body;

        const { data, error } = await supabase
            .from("maintenance")
            .update({
                item_id,
                maintenance_date,
                maintenance_type,
                description,
                next_maintenance_date,
                performed_by,
                remarks
            })
            .eq("maintenance_id", id)
            .single();

        if (error) return res.status(400).json({ error: error.message });
        res.json({ message: "Maintenance record updated", data });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

// DELETE maintenance record
exports.deleteMaintenance = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase
            .from("maintenance")
            .delete()
            .eq("maintenance_id", id)
            .single();

        if (error) return res.status(400).json({ error: error.message });
        res.json({ message: "Maintenance record deleted", data });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};
