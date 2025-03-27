import express from "express";
import { 
  getAllSalaries, 
  getSalaryById, 
  createSalary, 
  updateSalary, 
  deleteSalary,
  getEmployeeSalaries
} from "../controllers/salaryController.js";
import { verifyToken, verifyRole } from "../middleware/auth.js";

const router = express.Router();

// All routes are protected with authentication middleware
router.use(verifyToken);

// Get all salaries (admin only)
router.get("/", verifyRole(["admin"]), getAllSalaries);

// Get salary by ID (admin and concerned employee)
router.get("/:id", getSalaryById);

// Get employee's salary history (admin and concerned employee)
router.get("/employee/:employeeId", getEmployeeSalaries);

// Create new salary (admin only)
router.post("/", verifyRole(["admin"]), createSalary);

// Update salary (admin only)
router.put("/:id", verifyRole(["admin"]), updateSalary);

// Delete salary (admin only)
router.delete("/:id", verifyRole(["admin"]), deleteSalary);

export default router;