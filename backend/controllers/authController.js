const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const supabase = require("../config/supabaseClient");

const JWT_SECRET = process.env.JWT_SECRET;

exports.signup = async (req, res) => {
    try {
        const { emp_id, first_name, last_name, email, password, confirmPassword, job_post, role } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const assignedRole = role || "user"; // Default role is "user"

        const { data, error } = await supabase
            .from("users")
            .insert([{ emp_id, first_name, last_name, email, password: hashedPassword, job_post, role: assignedRole }]);

        if (error) return res.status(400).json({ error: error.message });

        res.json({ message: "User registered successfully!" });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const { data: user, error } = await supabase
            .from("users")
            .select("*")
            .eq("email", email)
            .single();

        if (error || !user) return res.status(400).json({ error: "Invalid email or password" });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ error: "Invalid email or password" });

        // Include new fields in JWT token
        const token = jwt.sign(
            { id: user.id, emp_id: user.emp_id, email: user.email, role: user.role, job_post: user.job_post },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ message: "Login successful", token });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};
