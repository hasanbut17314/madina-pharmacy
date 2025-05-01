import React, { useState } from "react";
import {
  useGetAllJobsQuery,
  useSubmitApplicationMutation,
} from "../../api/jobApi";
import { Dialog } from "@headlessui/react";
import { useNavigate } from "react-router-dom"; // Import useHistory for redirect

function Career() {
  const [page, setPage] = useState(1);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading } = useGetAllJobsQuery({ page, limit: 5 });
  const [submitApplication, { isLoading: submitting }] = useSubmitApplicationMutation();

  const jobs = data?.data?.jobs || [];
  const pagination = data?.data?.pagination || {};
  const totalPages = pagination.totalPages || 1;

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    coverLetter: "",
    resume: null,
  });

  const navigate = useNavigate(); // Use useNavigate for redirecting
  const handleApply = (job) => {
    if (!localStorage.getItem("auth")) {
      // Check if the user is logged in, based on auth token in local storage
      alert("Please login to apply.");
      navigate("/login"); // Redirect to login page
      return;
    }
    setSelectedJob(job);
    setIsOpen(true);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedJob || !form.resume) return;

    const formData = new FormData();
    formData.append("jobId", selectedJob._id);
    formData.append("fullName", form.fullName);
    formData.append("email", form.email);
    formData.append("phone", form.phone);
    formData.append("coverLetter", form.coverLetter);
    formData.append("resume", form.resume);  // Send the file as it is

    try {
      const res = await submitApplication(formData).unwrap();
      console.log("Application submitted successfully:", res);
      
      // Show success message
      alert("Application submitted successfully!");
      
      setIsOpen(false);
      setForm({
        fullName: "",
        email: "",
        phone: "",
        coverLetter: "",
        resume: null,
      });
    } catch (err) {
      console.error("❌ Application submission failed:", err?.data || err?.message || err);

      // Show error message
      alert("Application submission failed. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">Join Our Team</h1>
        <p className="text-gray-600 mt-2">Explore exciting career opportunities with us.</p>
      </div>

      {isLoading ? (
        <p className="text-center text-gray-500">Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <p className="text-center text-gray-500">No jobs available.</p>
      ) : (
        <div className="grid gap-6">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
            >
              <h2 className="text-2xl font-semibold text-center text-gray-800">{job.title}</h2>
              <p className="text-gray-600 mt-2">{job.description}</p>

              {/* ✅ Render Requirements Safely */}
              <div className="mt-4">
                <h3 className="font-semibold text-gray-700">Requirements:</h3>
                <ul className="list-disc list-inside text-gray-600">
                  {Array.isArray(job.requirements)
                    ? job.requirements.map((req, i) => <li key={i}>{req}</li>)
                    : <li>{job.requirements}</li>}
                </ul>
              </div>

              <p className="text-gray-500 text-sm mt-2">
                <strong>Salary:</strong> {job.salary}
              </p>
              <button
                onClick={() => handleApply(job)}
                className="mt-4 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 space-x-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-gray-700 font-semibold">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Modal */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed z-50 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen p-4">
          <Dialog.Panel className="bg-white w-full max-w-lg p-6 rounded-xl shadow-lg relative">
            <Dialog.Title className="text-xl font-bold mb-4">Apply for {selectedJob?.title}</Dialog.Title>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                className="w-full px-4 py-2 border rounded"
                value={form.fullName}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full px-4 py-2 border rounded"
                value={form.email}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                className="w-full px-4 py-2 border rounded"
                value={form.phone}
                onChange={handleChange}
                required
              />
              <textarea
                name="coverLetter"
                placeholder="Cover Letter"
                className="w-full px-4 py-2 border rounded h-24"
                value={form.coverLetter}
                onChange={handleChange}
              />
              <input
                type="file"
                name="resume"
                accept="application/pdf"
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
                required
              />
              {form.resume && (
                <p className="text-sm text-green-600">
                  Selected file: {form.resume.name}
                </p>
              )}
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {submitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}

export default Career;
