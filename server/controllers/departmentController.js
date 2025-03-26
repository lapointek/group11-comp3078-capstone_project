import Department from "../models/Department.js";

const addDepartment = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const { dep_name, description } = req.body;

    // Validate that dep_name is provided
    if (!dep_name) {
      return res
        .status(400)
        .json({ success: false, error: "Department name is required" });
    }

    const newDepartment = new Department({
      dep_name,
      description,
    });

    // save department to database
    await newDepartment.save();
    console.log("Department added:", newDepartment);

    return res
      .status(201)
      .json({ success: true, message: "Department added successfully" });
  } catch (error) {
    console.error("Error adding department: ", error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to add department" });
  }
};

export { addDepartment };
