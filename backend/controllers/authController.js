// src/controllers/authController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const supabase = require("../config/supabaseClient");

const JWT_SECRET = process.env.JWT_SECRET;

exports.signup = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      cin,
      registration_date,
      roc_location
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    // Password hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from("companies")
      .insert([{
        name,
        roc_location,
        cin,
        registration_date,
        email,
        password: hashedPassword
      }]);

    if (error) {400
      return res.status().json({ error: error});
    }

    res.status(201).json({ message: "Company registered successfully!", data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};





exports.login = async (req, res) => {
  try {
    const { email, password, userType } = req.body;

    // Determine table based on userType
    const tableName = userType === "company" ? "companies" : "employees";

    const { data: user, error } = await supabase
      .from(tableName)
      .select("*")
      .eq("email", email)
      .single();

    if (error || !user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Token payload setup based on role
    const tokenPayload = {
      id: user.id,
      email: user.email,
      role: user.role_id, // "company" or "employee"
    };
    // console.log(tokenPayload)

    if (userType === "employee") {
      tokenPayload.emp_id = user.emp_id;
      tokenPayload.job_post = user.job_post;
    } else if (userType === "company") {
      tokenPayload.company_id = user.company_id;
    }

    const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: "10d" });

    // Remove password from user before sending back
    const { password: pwd, ...userWithoutPassword } = user;

    res.json({ message: "Login successful", token, user: userWithoutPassword });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
