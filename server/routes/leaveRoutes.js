import express from "express";
import { 
  getAllLeaves, 
  getLeaveById, 
  createLeave, 
  updateLeave, 
  deleteLeave,
  updateLeaveStatus,
  getEmployeeLeaves
} from "../controllers/leaveController.js";
import { verifyToken, verifyRole } from "../middleware/auth.js";

const router = express.Router();

// All routes are protected with authentication middleware
router.use(verifyToken);

// Get all leaves (admin only)
router.get("/", verifyRole(["admin"]), getAllLeaves);

// Get leave by ID
router.get("/:id", getLeaveById);

// Get employee's leave history
router.get("/employee/:employeeId", getEmployeeLeaves);

// Create new leave request
router.post("/", createLeave);

// Update leave details (if still pending)
router.put("/:id", updateLeave);

// Update leave status (admin only)
router.put("/status/:id", verifyRole(["admin"]), updateLeaveStatus);

// Delete leave (if still pending)
router.delete("/:id", deleteLeave);

export default router;