const supabase = require("../config/supabaseClient");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const { createTransport } = require("nodemailer");
const crypto = require("crypto");

const transporter = createTransport({
  service: "gmail", // or any email provider you use
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.createEmployee = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      employeeid,
      jobfunction,
      role,
      company_id,
    } = req.body;

    // Generate random password
    const rawPassword = crypto.randomBytes(8).toString("hex");
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    // Save employee to Supabase
    const { data, error } = await supabase
      .from("employees")
      .insert([
        {
          firstname,
          lastname,
          email,
          employeeid,
          jobfunction,
          company_id,
          password: hashedPassword,
          role_id: role,
        },
      ])
      .select();

    if (error) {
      console.error("Supabase insert error:", error);
      return res.status(400).json({ error: "Error creating employee" });
    }

    // Fetch company name using company_id
    const { data: companyData, error: companyError } = await supabase
      .from("companies")
      .select("name")
      .eq("id", company_id)
      .single();

    const companyName = companyData?.name || "Your Company";

    // Send email with password and login link
    const loginLink = "http://localhost:5173/login";
    try {
      const info = await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: `Welcome to ${companyName} - Your Account Info`,
        html: `
          <p>Hello ${firstname},</p>
          <p>You’ve been registered on the Nimbus platform as an employee of <strong>${companyName}</strong>.</p>
          <p><strong>Login Email:</strong> ${email}</p>
          <p><strong>Temporary Password:</strong> ${rawPassword}</p>
          <p>You can log in using this link: <a href="${loginLink}">${loginLink}</a></p>
          <p>We recommend you change your password after logging in.</p>
          <br/>
          <p>Best,</p>
          <p>The Nimbus Team</p>
        `,
      });
      console.log("✅ Email sent successfully:", info.response);
    } catch (emailError) {
      console.error("❌ Failed to send email:", emailError);
    }

    return res
      .status(201)
      .json({ message: "Employee registered and email attempted" });
  } catch (err) {
    console.error("Registration error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};


// GET all users
exports.getAllEmployees = async (req, res) => {
  try {
    const { data, error } = await supabase.from("employees").select("*");

    if (error) return res.status(400).json({ error: error.message });
    res.json({ data });
  } catch (err) {
    console.log("Error fetching employees:", err);
    res.status(500).json({ error: err });
  }
};



exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from("employees")
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
      .from("employees")
      .update(updatedFields)
      .eq("id", id)
      .single();

    if (error) return res.status(400).json({ error: error.message });
    res.json({ message: "User updated", data });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { currentPassword, newPassword,role } = req.body;
    // console.log(req.body);

    const tableName = role === "admin" ? "companies" : "employees";

    // Fetch the existing user
    const { data: user, error: fetchError } = await supabase
    .from(tableName)
    .select("password")
    .eq("id", id)
    .maybeSingle(); // ✅ handles zero, one, or multiple rows gracefully
  
  if (fetchError) {
    return res.status(400).json({ error: fetchError.message });
  }
  
  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }
  

    // Compare current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Current password is incorrect." });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    const { data, error: updateError } = await supabase
      .from(tableName)
      .update({ password: hashedPassword })
      .eq("id", id)
      .single();

    if (updateError) return res.status(400).json({ error: updateError.message });

    res.json({ message: "Password updated successfully.", data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error." });
  }
};



// DELETE user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from("employees")
      .delete()
      .eq("id", id)
      .single();

    if (error) return res.status(400).json({ error: error.message });
    res.json({ message: "User deleted", data });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
