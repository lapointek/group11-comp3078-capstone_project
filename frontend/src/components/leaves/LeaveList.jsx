import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch, FaSort, FaSortUp, FaSortDown, FaPlus } from "react-icons/fa";

const LeaveList = () => {
    const [leaves, setLeaves] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: 'employee.name', direction: 'ascending' });
    
    // Fetch leaves from the backend
    useEffect(() => {
        const fetchLeaves = async () => {
          try {
            const token = localStorage.getItem("token");
            if (!token) {
              setError("Authentication token not found");
              setLoading(false);
              return;
            }
            
            const response = await axios.get("http://localhost:3000/api/leave", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            
            setLeaves(response.data);
            setLoading(false);
          } catch (error) {
            console.error("Error fetching leave data:", error);
            setError("Error fetching leave data. Please try again later.");
            setLoading(false);
          }
        };
        
        fetchLeaves();
    }, []);

    // Handle leave status update (approve/reject)
    const handleStatusUpdate = async (leaveId, newStatus) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("Authentication token not found");
                return;
            }
            
            // Admin's employee ID (would typically be from user context/state)
            const approverEmployeeId = "ADMIN001"; 
            
            const response = await axios.put(
                `http://localhost:3000/api/leave/status/${leaveId}`,
                {
                    status: newStatus,
                    comment: `Leave ${newStatus.toLowerCase()} by admin`,
                    approverEmployeeId
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            
            // Update the leaves state with the updated leave
            const updatedLeaves = leaves.map(leave => 
                leave._id === leaveId ? response.data : leave
            );
            
            setLeaves(updatedLeaves);
            
        } catch (error) {
            console.error(`Error ${newStatus.toLowerCase()} leave:`, error);
            alert(`Failed to ${newStatus.toLowerCase()} leave. Please try again.`);
        }
    };

    // Sort function
    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    // Function to get nested values
    const getNestedValue = (obj, path) => {
        const keys = path.split('.');
        return keys.reduce((o, key) => (o && o[key] !== undefined) ? o[key] : null, obj);
    };

    // Get sorted data
    const getSortedData = () => {
        const filteredData = leaves.filter(item => {
            const employeeName = item.employee ? item.employee.name : '';
            const employeeId = item.employee ? item.employee.employeeId : '';
            const leaveType = item.type || '';
            
            return (
                employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                leaveType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.status.toLowerCase().includes(searchTerm.toLowerCase())
            );
        });

        return [...filteredData].sort((a, b) => {
            const aValue = getNestedValue(a, sortConfig.key);
            const bValue = getNestedValue(b, sortConfig.key);
            
            if (aValue < bValue) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
    };

    // Function to render sort icon
    const getSortIcon = (columnName) => {
        if (sortConfig.key !== columnName) return <FaSort className="inline" />;
        return sortConfig.direction === 'ascending' ? <FaSortUp className="inline" /> : <FaSortDown className="inline" />;
    };

    // Format date
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString();
    };

    // Get status color
    const getStatusColor = (status) => {
        switch (status) {
            case 'Approved':
                return 'bg-green-100 text-green-800';
            case 'Rejected':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-yellow-100 text-yellow-800';
        }
    };

    if (loading) return <div className="text-center py-10">Loading...</div>;
    if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Employee Leave Management</h2>
                <button className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-md flex items-center">
                    <FaPlus className="mr-2" /> Apply for Leave
                </button>
            </div>

            <div className="mb-6">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaSearch className="text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="pl-10 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                        placeholder="Search by name, ID, type, or status..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                onClick={() => requestSort('employee.name')}
                            >
                                Employee Name {getSortIcon('employee.name')}
                            </th>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                onClick={() => requestSort('employee.employeeId')}
                            >
                                Employee ID {getSortIcon('employee.employeeId')}
                            </th>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                onClick={() => requestSort('type')}
                            >
                                Leave Type {getSortIcon('type')}
                            </th>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                onClick={() => requestSort('startDate')}
                            >
                                Start Date {getSortIcon('startDate')}
                            </th>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                onClick={() => requestSort('endDate')}
                            >
                                End Date {getSortIcon('endDate')}
                            </th>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                onClick={() => requestSort('status')}
                            >
                                Status {getSortIcon('status')}
                            </th>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {getSortedData().length > 0 ? (
                            getSortedData().map((leave) => (
                                <tr key={leave._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            {leave.employee ? leave.employee.name : 'N/A'}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">
                                            {leave.employee ? leave.employee.employeeId : 'N/A'}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">
                                            {leave.type}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">
                                            {formatDate(leave.startDate)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">
                                            {formatDate(leave.endDate)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(leave.status)}`}>
                                            {leave.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {leave.status === 'Pending' ? (
                                            <>
                                                <button 
                                                    className="text-green-600 hover:text-green-900 mr-3"
                                                    onClick={() => handleStatusUpdate(leave._id, 'Approved')}
                                                >
                                                    Approve
                                                </button>
                                                <button 
                                                    className="text-red-600 hover:text-red-900"
                                                    onClick={() => handleStatusUpdate(leave._id, 'Rejected')}
                                                >
                                                    Reject
                                                </button>
                                            </>
                                        ) : (
                                            <button className="text-indigo-600 hover:text-indigo-900">
                                                View Details
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                                    No leave records found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LeaveList;