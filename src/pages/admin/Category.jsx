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
import {
  PlusCircle,
  Edit,
  Trash2,
  Image as ImageIcon,
  Loader,
  Upload,
} from "lucide-react";
import { SideBar } from "../../components/basics";
import {
  useGetAllCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "@/api/CatApi";

const Categories = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  const {
    data: categoriesData,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetAllCategoriesQuery({ page, limit, search });

  const [addCategory, { isLoading: isAdding }] = useAddCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateCategoryMutation();
  const [deleteCategory, { isLoading: isDeleting }] =
    useDeleteCategoryMutation();

  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [mode, setMode] = useState("add");

  const [formData, setFormData] = useState({
    name: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
      });

      // Create URL for preview
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const openAddModal = () => {
    setMode("add");
    setFormData({
      name: "",
      image: null,
    });
    setImagePreview(null);
    setIsOpen(true);
  };

  const openEditModal = (category) => {
    setMode("edit");
    setCurrentCategory(category);
    setFormData({
      name: category.name,
      image: null, // We can't populate the file input with existing image
    });
    setImagePreview(category.image); // But we can show the current image as preview
    setIsOpen(true);
  };

  const confirmDelete = (category) => {
    setCurrentCategory(category);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (currentCategory) {
      try {
        const idToUse = currentCategory._id || currentCategory.id;
        await deleteCategory(idToUse).unwrap();
        refetch();
        setIsDeleteDialogOpen(false);
        setCurrentCategory(null);
      } catch (err) {
        console.error("Failed to delete category:", err);
      }
    }
  };

  const handleSubmit = async () => {
    try {
      // Create FormData object for file upload
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);

      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      if (mode === "add") {
        await addCategory(formDataToSend).unwrap();
      } else {
        const idToUse = currentCategory._id || currentCategory.id;
        await updateCategory({
          id: idToUse,
          formData: formDataToSend,
        }).unwrap();
      }
      refetch();
      setIsOpen(false);
    } catch (err) {
      console.error("Failed to save category:", err);
    }
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
            Error loading categories: {error.message || "Unknown error"}
          </div>
        </div>
      </div>
    );
  }

  const categories = categoriesData?.data?.categories || [];
  return (
    <div className="flex min-h-screen">
      <SideBar />
      <div className="p-6 w-full mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Category Management</h1>
          <Button
            onClick={openAddModal}
            className="flex items-center gap-2"
            disabled={isAdding}
          >
            <PlusCircle className="h-4 w-4" /> Add New Category
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.isArray(categories) ? (
            categories.map((category) => (
              <Card key={category.id} className="overflow-hidden">
                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                  {category.image ? (
                    <img
                      src={category.image}
                      alt={category.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <ImageIcon className="h-12 w-12 text-gray-300" />
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold">{category.name}</h3>
                    </div>
                    <div className="text-sm text-gray-500">
                      ID: {category.id}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-50 px-4 py-3 flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditModal(category)}
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
                    onClick={() => confirmDelete(category)}
                    disabled={isDeleting}
                  >
                    <Trash2 className="h-3.5 w-3.5 mr-1" />
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="text-center text-gray-500 text-sm">
              No categories found.
            </div>
          )}
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {mode === "add" ? "Add New Category" : "Edit Category"}
              </DialogTitle>
              <DialogDescription>
                Fill in the details to{" "}
                {mode === "add" ? "create a new" : "update the"} category.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="col-span-3"
                  placeholder="Category name"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image" className="text-right">
                  Image
                </Label>
                <div className="col-span-3">
                  <div className="flex items-center gap-4">
                    <Input
                      id="image"
                      name="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="flex-1"
                    />
                  </div>
                  {imagePreview && (
                    <div className="mt-2">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="h-32 object-cover rounded-md"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={isAdding || isUpdating}>
                {isAdding || isUpdating ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Confirm Delete</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete "{currentCategory?.name}"
                category? This action cannot be undone.
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

export default Categories;
