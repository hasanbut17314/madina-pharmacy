import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PlusCircle,
  Edit,
  Trash2,
  Briefcase,
  Loader,
  Search,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SideBar } from "../../components/basics";
import {
  useGetAllJobsQuery,
  useCreateJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
} from "@/api/JobApi";

const AdminJobs = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  const {
    data: jobsData,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetAllJobsQuery({ page, limit, search });

  const [createJob, { isLoading: isCreating }] = useCreateJobMutation();
  const [updateJob, { isLoading: isUpdating }] = useUpdateJobMutation();
  const [deleteJob, { isLoading: isDeleting }] = useDeleteJobMutation();

  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentJob, setCurrentJob] = useState(null);
  const [mode, setMode] = useState("add");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const formatSalary = (salary) => {
    if (!salary) return "Not specified";

    // Convert to number if it's a string
    const amount = typeof salary === "string" ? parseFloat(salary) : salary;

    // Format with commas and dollar sign
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page on new search
  };

  const openAddModal = () => {
    setMode("add");
    setFormData({
      title: "",
      description: "",
      requirements: "",
      salary: "",
    });
    setIsOpen(true);
  };

  const openEditModal = (job) => {
    setMode("edit");
    setCurrentJob(job);
    setFormData({
      title: job.title || "",
      description: job.description || "",
      requirements: job.requirements || "",
      salary: job.salary?.toString() || "",
    });
    setIsOpen(true);
  };

  const confirmDelete = (job) => {
    setCurrentJob(job);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (currentJob) {
      try {
        const idToUse = currentJob._id || currentJob.id;
        await deleteJob(idToUse).unwrap();
        refetch();
        setIsDeleteDialogOpen(false);
        setCurrentJob(null);
      } catch (err) {
        console.error("Failed to delete job:", err);
      }
    }
  };

  const handleSubmit = async () => {
    try {
      if (mode === "add") {
        await createJob(formData).unwrap();
      } else {
        const idToUse = currentJob._id || currentJob.id;
        await updateJob({
          id: idToUse,
          ...formData,
        }).unwrap();
      }
      refetch();
      setIsOpen(false);
    } catch (err) {
      console.error("Failed to save job:", err);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen">
        <SideBar />
        <div className="flex items-center justify-center w-full">
          <Loader className="h-8 w-8 animate-spin" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen">
        <SideBar />
        <div className="p-6 w-full mx-auto">
          <div className="text-red-500">
            Error loading jobs: {error?.message || "Unknown error"}
          </div>
        </div>
      </div>
    );
  }

  const jobs = jobsData?.data?.jobs || [];
  const totalPages = jobsData?.data?.totalPages || 1;

  return (
    <div className="flex min-h-screen">
      <SideBar />
      <div className="p-6 w-full mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold">Job Management</h1>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search jobs..."
                value={search}
                onChange={handleSearchChange}
                className="pl-8"
              />
            </div>
            <Button
              onClick={openAddModal}
              className="flex items-center gap-2"
              disabled={isCreating}
            >
              <PlusCircle className="h-4 w-4" /> Add New Job
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.isArray(jobs) && jobs.length > 0 ? (
            jobs.map((job) => (
              <Card key={job.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2 mb-2">
                      <Briefcase className="h-5 w-5 text-primary" />
                      <h3 className="text-xl font-semibold line-clamp-2">
                        {job.title}
                      </h3>
                    </div>
                  </div>
                  <Badge className="mb-2">{formatSalary(job.salary)}</Badge>
                  <div className="mt-2">
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {job.description}
                    </p>
                  </div>
                  <div className="mt-2">
                    <p className="text-xs text-gray-500">
                      ID: {job.id || job._id}
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-50 px-4 py-3 flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditModal(job)}
                    className="flex items-center gap-1"
                    disabled={isUpdating}
                  >
                    <Edit className="h-3.5 w-3.5" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600"
                    onClick={() => confirmDelete(job)}
                    disabled={isDeleting}
                  >
                    <Trash2 className="h-3.5 w-3.5 mr-1" />
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-10">
              {search
                ? "No matching jobs found."
                : "No jobs available. Add a new job to get started."}
            </div>
          )}
        </div>

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              Previous
            </Button>
            <span className="flex items-center px-3">
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
            >
              Next
            </Button>
          </div>
        )}

        {/* Add/Edit Job Dialog */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {mode === "add" ? "Add New Job" : "Edit Job"}
              </DialogTitle>
              <DialogDescription>
                Fill in the details to{" "}
                {mode === "add" ? "create a new" : "update the"} job posting.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="col-span-3"
                  placeholder="Job title"
                />
              </div>

              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="description" className="text-right mt-2">
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="col-span-3 min-h-24"
                  placeholder="Job description"
                />
              </div>

              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="requirements" className="text-right mt-2">
                  Requirements
                </Label>
                <Textarea
                  id="requirements"
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  className="col-span-3 min-h-24"
                  placeholder="Job requirements"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="salary" className="text-right">
                  Salary
                </Label>
                <Input
                  id="salary"
                  name="salary"
                  type="number"
                  value={formData.salary}
                  onChange={handleInputChange}
                  className="col-span-3"
                  placeholder="Annual salary (USD)"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isCreating || isUpdating}
              >
                {isCreating || isUpdating ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Confirm Delete</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete "{currentJob?.title}" job
                posting? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="gap-2 sm:justify-end">
              <Button
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminJobs;
