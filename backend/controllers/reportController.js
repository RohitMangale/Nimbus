const supabase = require("../config/supabaseClient");

function getReportTable(reportType) {
  if (reportType === "test") return "test_reports";
  if (reportType === "maintenance") return "maintenance_reports";
  return null;
}

// CREATE report (with or without file)
exports.createReport = async (req, res) => {
  try {
    const { report_type, reference_id, report_file_url, report_summary, reviewed_by } = req.body;
    const tableName = getReportTable(report_type);
    if (!tableName) return res.status(400).json({ error: "Invalid report type" });

    // The foreign key depends on test_id vs maintenance_id
    const foreignKey = report_type === "test" ? "test_id" : "maintenance_id";

    const { data, error } = await supabase
      .from(tableName)
      .insert([{
        [foreignKey]: reference_id,
        report_file_url,
        report_summary,
        reviewed_by
      }])
      .single();

    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json({ message: "Report created", data });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// READ all reports (use ?report_type=test or ?report_type=maintenance)
exports.getAllReports = async (req, res) => {
  try {
    const { report_type } = req.query;
    const tableName = getReportTable(report_type);
    if (!tableName) return res.status(400).json({ error: "Invalid report_type query param" });

    const { data, error } = await supabase
      .from(tableName)
      .select("*");

    if (error) return res.status(400).json({ error: error.message });
    res.json({ data });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// READ single report by ID and report_type
exports.getReportById = async (req, res) => {
  try {
    const { report_type, id } = req.params;
    const tableName = getReportTable(report_type);
    if (!tableName) return res.status(400).json({ error: "Invalid report type" });

    const pkColumn = report_type === "test" ? "test_report_id" : "maintenance_report_id";

    const { data, error } = await supabase
      .from(tableName)
      .select("*")
      .eq(pkColumn, id)
      .single();

    if (error) return res.status(404).json({ error: error.message });
    res.json({ data });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// UPDATE report
exports.updateReport = async (req, res) => {
  try {
    const { report_type, id } = req.params;
    const { report_file_url, report_summary, reviewed_by } = req.body;
    const tableName = getReportTable(report_type);
    if (!tableName) return res.status(400).json({ error: "Invalid report type" });

    const pkColumn = report_type === "test" ? "test_report_id" : "maintenance_report_id";

    const { data, error } = await supabase
      .from(tableName)
      .update({ report_file_url, report_summary, reviewed_by })
      .eq(pkColumn, id)
      .single();

    if (error) return res.status(400).json({ error: error.message });
    res.json({ message: "Report updated", data });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// DELETE report
exports.deleteReport = async (req, res) => {
  try {
    const { report_type, id } = req.params;
    const tableName = getReportTable(report_type);
    if (!tableName) return res.status(400).json({ error: "Invalid report type" });

    const pkColumn = report_type === "test" ? "test_report_id" : "maintenance_report_id";

    const { data, error } = await supabase
      .from(tableName)
      .delete()
      .eq(pkColumn, id)
      .single();

    if (error) return res.status(400).json({ error: error.message });
    res.json({ message: "Report deleted", data });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
