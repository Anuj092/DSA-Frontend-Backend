import React, { useState, useEffect } from 'react';
import './App.css';

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface ApiResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<'first_name' | 'email'>('first_name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [domainFilter, setDomainFilter] = useState('');

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  useEffect(() => {
    applyFilters();
  }, [users, searchTerm, sortField, sortOrder, domainFilter]);

  const fetchUsers = async (page: number) => {
    setLoading(true);
    try {
      const response = await fetch(`https://reqres.in/api/users?page=${page}`);
      const data: ApiResponse = await response.json();
      setUsers(data.data);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...users];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Domain filter
    if (domainFilter) {
      filtered = filtered.filter(user =>
        user.email.toLowerCase().includes(domainFilter.toLowerCase())
      );
    }

    // Sort
    filtered.sort((a, b) => {
      const aValue = sortField === 'first_name' ? a.first_name : a.email;
      const bValue = sortField === 'first_name' ? b.first_name : b.email;
      const comparison = aValue.localeCompare(bValue);
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    setFilteredUsers(filtered);
  };

  const handleSort = (field: 'first_name' | 'email') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1>User Directory</h1>
        
        <div className="controls">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          
          <input
            type="text"
            placeholder="Filter by email domain..."
            value={domainFilter}
            onChange={(e) => setDomainFilter(e.target.value)}
            className="filter-input"
          />
        </div>

        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading users...</p>
          </div>
        ) : (
          <>
            <div className="table-container">
              <table className="user-table">
                <thead>
                  <tr>
                    <th>Avatar</th>
                    <th onClick={() => handleSort('first_name')} className="sortable">
                      Name {sortField === 'first_name' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </th>
                    <th onClick={() => handleSort('email')} className="sortable">
                      Email {sortField === 'email' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(user => (
                    <tr key={user.id}>
                      <td>
                        <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} className="avatar" />
                      </td>
                      <td>{user.first_name} {user.last_name}</td>
                      <td>{user.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pagination">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="page-btn"
              >
                Previous
              </button>
              <span className="page-info">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="page-btn"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
