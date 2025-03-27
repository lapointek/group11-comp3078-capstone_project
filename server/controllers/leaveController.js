import Leave from "../models/Leave.js";
import User from "../models/User.js";

// Get all leaves
export const getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find()
      .populate("employee", "name email employeeId")
      .populate("approvedBy", "name email")
      .sort({ createdAt: -1 });
    
    res.status(200).json(leaves);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch leaves", error: error.message });
  }
};

// Get leave by ID
export const getLeaveById = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id)
      .populate("employee", "name email employeeId")
      .populate("approvedBy", "name email");
    
    if (!leave) {
      return res.status(404).json({ message: "Leave record not found" });
    }
    
    res.status(200).json(leave);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch leave", error: error.message });
  }
};

// Create new leave request
export const createLeave = async (req, res) => {
  const { employeeId, startDate, endDate, reason, type } = req.body;
  
  try {
    // Find the employee by ID
    const employee = await User.findOne({ employeeId });
    
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    
    const newLeave = new Leave({
      employee: employee._id,
      startDate,
      endDate,
      reason,
      type,
      status: "Pending"
    });
    
    const savedLeave = await newLeave.save();
    
    res.status(201).json(savedLeave);
  } catch (error) {
    res.status(500).json({ message: "Failed to create leave request", error: error.message });
  }
};

// Update leave status (approve/reject)
export const updateLeaveStatus = async (req, res) => {
  const { status, comment, approverEmployeeId } = req.body;
  
  try {
    const approver = await User.findOne({ employeeId: approverEmployeeId });
    
    if (!approver) {
      return res.status(404).json({ message: "Approver not found" });
    }
    
    const updatedLeave = await Leave.findByIdAndUpdate(
      req.params.id,
      { 
        status,
        comment,
        approvedBy: approver._id
      },
      { new: true }
    )
    .populate("employee", "name email employeeId")
    .populate("approvedBy", "name email");
    
    if (!updatedLeave) {
      return res.status(404).json({ message: "Leave record not found" });
    }
    
    res.status(200).json(updatedLeave);
  } catch (error) {
    res.status(500).json({ message: "Failed to update leave status", error: error.message });
  }
};

// Update leave details
export const updateLeave = async (req, res) => {
  const { startDate, endDate, reason, type } = req.body;
  
  try {
    const leave = await Leave.findById(req.params.id);
    
    if (!leave) {
      return res.status(404).json({ message: "Leave record not found" });
    }
    
    // Only allow updates if leave is still pending
    if (leave.status !== "Pending") {
      return res.status(400).json({ 
        message: "Cannot update leave that has already been approved or rejected" 
      });
    }
    
    leave.startDate = startDate || leave.startDate;
    leave.endDate = endDate || leave.endDate;
    leave.reason = reason || leave.reason;
    leave.type = type || leave.type;
    
    const updatedLeave = await leave.save();
    
    res.status(200).json(updatedLeave);
  } catch (error) {
    res.status(500).json({ message: "Failed to update leave", error: error.message });
  }
};

// Delete leave
export const deleteLeave = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id);
    
    if (!leave) {
      return res.status(404).json({ message: "Leave record not found" });
    }
    
    // Only allow deletion if leave is still pending
    if (leave.status !== "Pending") {
      return res.status(400).json({ 
        message: "Cannot delete leave that has already been approved or rejected" 
      });
    }
    
    await Leave.findByIdAndDelete(req.params.id);
    
    res.status(200).json({ message: "Leave request deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete leave request", error: error.message });
  }
};

// Get employee's leave history
export const getEmployeeLeaves = async (req, res) => {
  try {
    const employee = await User.findOne({ employeeId: req.params.employeeId });
    
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    
    const leaves = await Leave.find({ employee: employee._id })
      .sort({ createdAt: -1 });
    
    res.status(200).json(leaves);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch employee leave history", error: error.message });
  }
};