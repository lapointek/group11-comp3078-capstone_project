import Salary from "../models/Salary.js";
import User from "../models/User.js";

// Get all salaries
export const getAllSalaries = async (req, res) => {
  try {
    const salaries = await Salary.find()
      .populate("employee", "name email employeeId")
      .sort({ createdAt: -1 });
    
    res.status(200).json(salaries);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch salaries", error: error.message });
  }
};

// Get salary by ID
export const getSalaryById = async (req, res) => {
  try {
    const salary = await Salary.findById(req.params.id)
      .populate("employee", "name email employeeId");
    
    if (!salary) {
      return res.status(404).json({ message: "Salary record not found" });
    }
    
    res.status(200).json(salary);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch salary", error: error.message });
  }
};

// Create new salary record
export const createSalary = async (req, res) => {
  const { employeeId, amount, bonusAmount, month, year, paymentDate, status, notes } = req.body;
  
  try {
    // Find the employee by ID
    const employee = await User.findOne({ employeeId });
    
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    
    const newSalary = new Salary({
      employee: employee._id,
      amount,
      bonusAmount,
      month,
      year,
      paymentDate,
      status,
      notes
    });
    
    const savedSalary = await newSalary.save();
    
    res.status(201).json(savedSalary);
  } catch (error) {
    res.status(500).json({ message: "Failed to create salary record", error: error.message });
  }
};

// Update salary
export const updateSalary = async (req, res) => {
  const { amount, bonusAmount, month, year, paymentDate, status, notes } = req.body;
  
  try {
    const updatedSalary = await Salary.findByIdAndUpdate(
      req.params.id,
      { amount, bonusAmount, month, year, paymentDate, status, notes },
      { new: true }
    ).populate("employee", "name email employeeId");
    
    if (!updatedSalary) {
      return res.status(404).json({ message: "Salary record not found" });
    }
    
    res.status(200).json(updatedSalary);
  } catch (error) {
    res.status(500).json({ message: "Failed to update salary record", error: error.message });
  }
};

// Delete salary
export const deleteSalary = async (req, res) => {
  try {
    const deletedSalary = await Salary.findByIdAndDelete(req.params.id);
    
    if (!deletedSalary) {
      return res.status(404).json({ message: "Salary record not found" });
    }
    
    res.status(200).json({ message: "Salary record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete salary record", error: error.message });
  }
};

// Get employee's salary history
export const getEmployeeSalaries = async (req, res) => {
  try {
    const employee = await User.findOne({ employeeId: req.params.employeeId });
    
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    
    const salaries = await Salary.find({ employee: employee._id })
      .sort({ year: -1, month: -1 });
    
    res.status(200).json(salaries);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch employee salary history", error: error.message });
  }
};