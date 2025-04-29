const supabase = require('../config/supabaseClient');


exports.createTemplate = async (req, res) => {
    try {
      const { name, fields, company_id } = req.body;
  
      if (!name || !fields || !company_id ) {
        return res.status(400).json({ error: "Missing required fields." });
      }
  
      const { data, error } = await supabase
        .from("form_templates")
        .insert([
          {
            title: name,
            fields: fields,
            company_id: company_id,
          },
        ])
        .select()
        .single();
  
      if (error) {
        console.error("Supabase insert error:", error);
        return res.status(500).json({ error: error.message });
      }
  
      return res.status(201).json({
        message: "Template created successfully.",
        template: data,
      });
    } catch (err) {
      console.error("Controller error:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
  

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
        res.status(500).json({ error: err});
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

// READ all maintenance records
exports.getAllTemplates = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("form_templates")
            .select("*");
        // console.log("Templates data:", data); // Debugging line

        if (error) return res.status(400).json({ error: error.message });
        res.json({ data });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

// READ single maintenance record
exports.getTemplatesById = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase
            .from("form_templates")
            .select("*")
            .eq("id", id)
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
