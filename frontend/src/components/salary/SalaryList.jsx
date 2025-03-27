import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch, FaSort, FaSortUp, FaSortDown, FaPlus } from "react-icons/fa";

const SalaryList = () => {
    const [salaries, setSalaries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: 'employee.name', direction: 'ascending' });
    
    // Fetch salaries from the backend
    useEffect(() => {
        const fetchSalaries = async () => {
          try {
            const token = localStorage.getItem("token");
            if (!token) {
              setError("Authentication token not found");
              setLoading(false);
              return;
            }
            
            const response = await axios.get("http://localhost:3000/api/salary", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            
            setSalaries(response.data);
            setLoading(false);
          } catch (error) {
            console.error("Error fetching salary data:", error);
            setError("Error fetching salary data. Please try again later.");
            setLoading(false);
          }
        };
        
        fetchSalaries();
    }, []);

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
        const filteredData = salaries.filter(item => {
            const employeeName = item.employee ? item.employee.name : '';
            const employeeId = item.employee ? item.employee.employeeId : '';
            
            return (
                employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.month.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.year.toString().includes(searchTerm)
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

    // Format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    if (loading) return <div className="text-center py-10">Loading...</div>;
    if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Employee Salary Management</h2>
                <button className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-md flex items-center">
                    <FaPlus className="mr-2" /> Add New Salary Record
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
                        placeholder="Search by name, ID, month, or year..."
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
                                onClick={() => requestSort('month')}
                            >
                                Month {getSortIcon('month')}
                            </th>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                onClick={() => requestSort('year')}
                            >
                                Year {getSortIcon('year')}
                            </th>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                onClick={() => requestSort('amount')}
                            >
                                Salary {getSortIcon('amount')}
                            </th>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                onClick={() => requestSort('bonusAmount')}
                            >
                                Bonus {getSortIcon('bonusAmount')}
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
                            getSortedData().map((salary) => (
                                <tr key={salary._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            {salary.employee ? salary.employee.name : 'N/A'}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">
                                            {salary.employee ? salary.employee.employeeId : 'N/A'}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">
                                            {salary.month}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">
                                            {salary.year}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            {formatCurrency(salary.amount)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">
                                            {formatCurrency(salary.bonusAmount)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                        ${salary.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {salary.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                                            Edit
                                        </button>
                                        <button className="text-red-600 hover:text-red-900">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                                    No salary records found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SalaryList;