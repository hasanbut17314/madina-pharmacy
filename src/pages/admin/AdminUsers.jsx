import React, { useState } from "react";
import { SideBar } from "../../components/basics";
import {
  useGetAllUsersQuery,
  useAddUserMutation,
  useUpdateByAdminMutation,
} from "@/api/authApi"; // Adjust if necessary

function AdminUsers() {
  // Pagination state
  const [page, setPage] = useState(1);
  const limit = 10;

  // Fetch users with pagination
  const { data, error, isLoading, refetch } = useGetAllUsersQuery({ page, limit });
  const [addUser] = useAddUserMutation();
  const [updateByAdmin] = useUpdateByAdminMutation();

  // Modal state
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);

  // Selected user for update
  const [selectedUser, setSelectedUser] = useState(null);

  // Form state
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
    isActive: true,
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Open Add User modal and reset form
  const openAddModal = () => {
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      role: "",
      password: "",
      confirmPassword: "",
      isActive: true,
    });
    setAddModalOpen(true);
  };

  // Open Update User modal and fill form
  const openUpdateModal = (user) => {
    setSelectedUser(user);
    setForm({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      role: user.role || "",
      isActive: user.isActive ?? true,
    });
    setUpdateModalOpen(true);
  };

  // Add User handler
  const handleAddUser = async () => {
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      await addUser({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        role: form.role,
        password: form.password,
      }).unwrap();

      setAddModalOpen(false);
      refetch();
    } catch (err) {
      alert("Failed to add user: " + (err.data?.message || err.error || "Unknown error"));
    }
  };

  // Update User handler
  const handleUpdateUser = async () => {
    try {
      const updateData = {
        firstName: form.firstName,
        lastName: form.lastName,
        role: form.role,
        isActive: form.isActive,
      };

      await updateByAdmin({
        id: selectedUser._id,
        updatedUserData: updateData
      }).unwrap();

      setUpdateModalOpen(false);
      setSelectedUser(null);
      refetch();
    } catch (err) {
      alert("Failed to update user: " + (err.data?.message || err.error || "Unknown error"));
    }
  };

  // Use pagination data from response safely
  const pagination = data?.data?.pagination || {};
  const totalUsers = Number(pagination.total) || 0;
  const totalPages = Math.ceil(totalUsers / limit);

  const goPrev = () => {
    if (page > 1) setPage((p) => p - 1);
  };
  const goNext = () => {
    if (page < totalPages) setPage((p) => p + 1);
  };

  return (
    <div className="flex min-h-screen">
      <SideBar />

      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Users Management</h1>
          <button
            onClick={openAddModal}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add User
          </button>
        </div>

        {isLoading && <p>Loading users...</p>}
        {error && <p className="text-red-600">Error loading users</p>}

        {data && data.data && data.data.users && (
          <>
            <table className="min-w-full border border-gray-300 mb-4">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2">First Name</th>
                  <th className="border p-2">Last Name</th>
                  <th className="border p-2">Email</th>
                  <th className="border p-2">Role</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.data.users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="border p-2">{user.firstName}</td>
                    <td className="border p-2">{user.lastName}</td>
                    <td className="border p-2">{user.email}</td>
                    <td className="border p-2">{user.role}</td>
                    <td className="border p-2">
                      <button
                        onClick={() => openUpdateModal(user)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination buttons */}
            <div className="flex justify-center gap-4">
              <button
                onClick={goPrev}
                disabled={page === 1}
                className={`px-4 py-2 rounded border ${page === 1 ? "bg-gray-200 cursor-not-allowed" : "bg-white hover:bg-gray-100"
                  }`}
              >
                Prev
              </button>
              <span className="px-4 py-2">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={goNext}
                disabled={page === totalPages}
                className={`px-4 py-2 rounded border ${page === totalPages ? "bg-gray-200 cursor-not-allowed" : "bg-white hover:bg-gray-100"
                  }`}
              >
                Next
              </button>
            </div>
          </>
        )}

        {/* Add User Modal */}
        {isAddModalOpen && (
          <Modal onClose={() => setAddModalOpen(false)} title="Add New User" noOverlay>
            <UserForm
              form={form}
              onChange={handleChange}
              onSubmit={handleAddUser}
              submitText="Add User"
              isUpdate={false}
            />
          </Modal>
        )}

        {/* Update User Modal */}
        {isUpdateModalOpen && (
          <Modal onClose={() => setUpdateModalOpen(false)} title="Update User" noOverlay>
            <UserForm
              form={form}
              onChange={handleChange}
              onSubmit={handleUpdateUser}
              submitText="Update User"
              isUpdate={true}
            />
          </Modal>
        )}
      </main>
    </div>
  );
}

// Modal component without dark overlay when noOverlay prop is true
function Modal({ children, onClose, title, noOverlay }) {
  return (
    <div
      className={`fixed inset-0 flex justify-center items-center z-50 ${noOverlay ? "" : "bg-black bg-opacity-20"
        }`}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
          aria-label="Close modal"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}

// UserForm component
function UserForm({ form, onChange, onSubmit, submitText, isUpdate }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="space-y-4"
    >
      <div>
        <label className="block text-sm font-medium mb-1">First Name</label>
        <input
          name="firstName"
          value={form.firstName}
          onChange={onChange}
          type="text"
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Last Name</label>
        <input
          name="lastName"
          value={form.lastName}
          onChange={onChange}
          type="text"
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      {/* Email field only on Add User */}
      {!isUpdate && (
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            name="email"
            value={form.email}
            onChange={onChange}
            type="email"
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
      )}

      {/* Role field for both Add and Update */}
      <div>
        <label className="block text-sm font-medium mb-1">Role</label>
        <select
          name="role"
          value={form.role}
          onChange={onChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
          <option value="manager">Manager</option>
          <option value="rider">Rider</option>
        </select>
      </div>

      {/* isActive field only for Update */}
      {isUpdate && (
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            name="isActive"
            value={form.isActive}
            onChange={onChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value={true}>Active</option>
            <option value={false}>Inactive</option>
          </select>
        </div>
      )}

      {/* Password fields only on add */}
      {!isUpdate && (
        <>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              name="password"
              value={form.password}
              onChange={onChange}
              type="password"
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Confirm Password</label>
            <input
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={onChange}
              type="password"
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
        </>
      )}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {submitText}
      </button>
    </form>
  );
}

export default AdminUsers;
