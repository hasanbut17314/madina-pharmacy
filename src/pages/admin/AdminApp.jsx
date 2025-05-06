import React, { useState, useEffect } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Trash2,
  Loader,
  Search,
  Phone,
  Mail,
  FileText,
  Calendar,
  CheckCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SideBar } from "../../components/basics";
import {
  useGetAllApplicationsQuery,
  useUpdateApplicationStatusMutation,
  useDeleteApplicationMutation,
} from "@/api/JobApi";

const AdminApp = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [selectedJob, setSelectedJob] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [currentApplication, setCurrentApplication] = useState(null);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isResumeDialogOpen, setIsResumeDialogOpen] = useState(false);
  const [statusToUpdate, setStatusToUpdate] = useState("");

  const statusOptions = [
    "pending",
    "reviewing",
    "interviewed",
    "selected",
    "rejected",
  ];
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    reviewing: "bg-blue-100 text-blue-800",
    interviewed: "bg-purple-100 text-purple-800",
    selected: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
    all: "bg-gray-100 text-gray-800",
  };

  const {
    data: applicationsData,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetAllApplicationsQuery({
    page,
    limit,
    jobId: selectedJob,
    status: selectedStatus !== "all" ? selectedStatus : "",
    search,
  });

  const [updateApplicationStatus, { isLoading: isUpdating }] =
    useUpdateApplicationStatusMutation();

  const [deleteApplication, { isLoading: isDeleting }] =
    useDeleteApplicationMutation();

  // Format date to a readable string
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";

    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page on new search
  };

  const openStatusDialog = (application) => {
    setCurrentApplication(application);
    setStatusToUpdate(application.status || "pending");
    setIsStatusDialogOpen(true);
  };

  const confirmDelete = (application) => {
    setCurrentApplication(application);
    setIsDeleteDialogOpen(true);
  };

  const openResumePreview = (application) => {
    setCurrentApplication(application);
    setIsResumeDialogOpen(true);
  };

  const handleStatusUpdate = async () => {
    if (currentApplication && statusToUpdate) {
      try {
        const idToUse = currentApplication._id || currentApplication.id;
        await updateApplicationStatus({
          id: idToUse,
          status: statusToUpdate,
        }).unwrap();
        refetch();
        setIsStatusDialogOpen(false);
      } catch (err) {
        console.error("Failed to update application status:", err);
      }
    }
  };

  const handleDelete = async () => {
    if (currentApplication) {
      try {
        const idToUse = currentApplication._id || currentApplication.id;
        await deleteApplication(idToUse).unwrap();
        refetch();
        setIsDeleteDialogOpen(false);
        setCurrentApplication(null);
      } catch (err) {
        console.error("Failed to delete application:", err);
      }
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
            Error loading applications: {error?.message || "Unknown error"}
          </div>
        </div>
      </div>
    );
  }

  const applications = applicationsData?.data?.applications || [];
  const totalPages = applicationsData?.data?.totalPages || 1;

  return (
    <div className="flex min-h-screen">
      <SideBar />
      <div className="p-6 w-full mx-auto">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">Job Applications</h1>

          <div className="flex flex-col lg:flex-row gap-4 mb-6 items-start lg:items-center">
            <div className="flex flex-1 flex-col sm:flex-row gap-4">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search applicants..."
                  value={search}
                  onChange={handleSearchChange}
                  className="pl-8"
                />
              </div>

              <Select
                value={selectedStatus}
                onValueChange={(value) => {
                  setSelectedStatus(value);
                  setPage(1);
                }}
              >
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {statusOptions.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Applications grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {Array.isArray(applications) && applications.length > 0 ? (
              applications.map((application) => (
                <Card
                  key={application.id || application._id}
                  className="overflow-hidden"
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex flex-col">
                        <h3 className="text-lg font-semibold">
                          {application.fullName}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {application.jobTitle || "Job title unavailable"}
                        </p>
                      </div>
                      <Badge
                        className={`${
                          statusColors[application.status || "pending"]
                        }`}
                      >
                        {application.status
                          ? application.status.charAt(0).toUpperCase() +
                            application.status.slice(1)
                          : "Pending"}
                      </Badge>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <a
                          href={`mailto:${application.email}`}
                          className="text-blue-600 hover:underline"
                        >
                          {application.email}
                        </a>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <a
                          href={`tel:${application.phone}`}
                          className="text-blue-600 hover:underline"
                        >
                          {application.phone}
                        </a>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>
                          Applied on {formatDate(application.createdAt)}
                        </span>
                      </div>
                    </div>

                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="cover-letter">
                        <AccordionTrigger className="text-sm">
                          Cover Letter
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="text-sm text-gray-700 whitespace-pre-line">
                            {application.coverLetter ||
                              "No cover letter provided."}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>

                    {application.resume && (
                      <div className="mt-3 flex items-center gap-2">
                        <FileText className="h-4 w-4 text-gray-500" />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-0 h-auto text-blue-600 hover:text-blue-800 hover:bg-transparent"
                          onClick={() => openResumePreview(application)}
                        >
                          View Resume
                        </Button>
                      </div>
                    )}
                  </CardContent>

                  <CardFooter className="bg-gray-50 px-4 py-3 flex justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openStatusDialog(application)}
                      className="flex items-center gap-1"
                      disabled={isUpdating}
                    >
                      <CheckCircle className="h-3.5 w-3.5" />
                      Update Status
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600"
                      onClick={() => confirmDelete(application)}
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
                {search || selectedStatus !== "all"
                  ? "No matching applications found."
                  : "No applications available."}
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

          {/* Status Update Dialog */}
          <Dialog
            open={isStatusDialogOpen}
            onOpenChange={setIsStatusDialogOpen}
          >
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Update Application Status</DialogTitle>
                <DialogDescription>
                  Change the status for {currentApplication?.fullName}'s
                  application.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">
                    Status
                  </Label>
                  <Select
                    value={statusToUpdate}
                    onValueChange={setStatusToUpdate}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsStatusDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleStatusUpdate} disabled={isUpdating}>
                  {isUpdating ? "Updating..." : "Update"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Delete Confirmation Dialog */}
          <Dialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete {currentApplication?.fullName}
                  's application? This action cannot be undone.
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

          {/* Resume Preview Dialog */}
          <Dialog
            open={isResumeDialogOpen}
            onOpenChange={setIsResumeDialogOpen}
          >
            <DialogContent className="sm:max-w-3xl h-auto max-h-screen">
              <DialogHeader>
                <DialogTitle>
                  {currentApplication?.fullName}'s Resume
                </DialogTitle>
              </DialogHeader>
              <div className="w-full h-96 overflow-y-auto border rounded-md">
                {currentApplication?.resume ? (
                  // Display the PDF in an iframe
                  <iframe
                    src={currentApplication.resume}
                    className="w-full h-full"
                    title={`${currentApplication.fullName}'s Resume`}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p>No resume available</p>
                  </div>
                )}
              </div>
              <DialogFooter>
                {currentApplication?.resume && (
                  <Button
                    variant="outline"
                    onClick={() =>
                      window.open(currentApplication.resume, "_blank")
                    }
                  >
                    Open in New Tab
                  </Button>
                )}
                <Button onClick={() => setIsResumeDialogOpen(false)}>
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default AdminApp;
