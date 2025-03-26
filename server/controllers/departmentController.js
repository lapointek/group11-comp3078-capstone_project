import Department from "../models/Department.js";

const addDepartment = async (req, res) => {
  try {
    // extract data
    const { dep_name, description } = req.body;

    const newDep = new Department({
      dep_name,
      description,
    });
    // save data inside database
    await newDep.save();
    // return status code OK
    return res.status(200).json({ success: true, department: newDep });
  } catch (error) {
    console.error("Error adding department: ", error);
    return res
      .status(500)
      .json({ success: false, error: "add department server error" });
  }
};

export { addDepartment };
