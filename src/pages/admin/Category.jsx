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
import { Switch } from "@/components/ui/switch";
import {
  PlusCircle,
  Edit,
  Trash2,
  Star,
  Image as ImageIcon,
} from "lucide-react";
import { SideBar } from "../../components/basics";

const Categories = () => {
  // Sample category data - replace with your actual data source
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Electronics",
      isFeatured: true,
      image: "/api/placeholder/400/200",
    },
    {
      id: 2,
      name: "Furniture",
      isFeatured: true,
      image: "/api/placeholder/400/200",
    },
    {
      id: 3,
      name: "Clothing",
      isFeatured: false,
      image: "/api/placeholder/400/200",
    },
    {
      id: 4,
      name: "Books",
      isFeatured: false,
      image: "/api/placeholder/400/200",
    },
    {
      id: 5,
      name: "Home Decor",
      isFeatured: true,
      image: "/api/placeholder/400/200",
    },
    {
      id: 6,
      name: "Sports",
      isFeatured: false,
      image: "/api/placeholder/400/200",
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [mode, setMode] = useState("add"); // "add" or "edit"

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    isFeatured: false,
    image: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFeaturedChange = (checked) => {
    setFormData({
      ...formData,
      isFeatured: checked,
    });
  };

  const openAddModal = () => {
    setMode("add");
    setFormData({
      name: "",
      isFeatured: false,
      image: "/api/placeholder/400/200",
    });
    setIsOpen(true);
  };

  const openEditModal = (category) => {
    setMode("edit");
    setCurrentCategory(category);
    setFormData({
      name: category.name,
      isFeatured: category.isFeatured,
      image: category.image,
    });
    setIsOpen(true);
  };

  const confirmDelete = (category) => {
    setCurrentCategory(category);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (currentCategory) {
      setCategories(categories.filter((c) => c.id !== currentCategory.id));
      setIsDeleteDialogOpen(false);
      setCurrentCategory(null);
    }
  };

  const handleSubmit = () => {
    if (mode === "add") {
      // Add new category
      const newCategory = {
        id: categories.length + 1, // Simple ID generation
        ...formData,
      };
      setCategories([...categories, newCategory]);
    } else {
      // Edit existing category
      setCategories(
        categories.map((c) =>
          c.id === currentCategory.id ? { ...c, ...formData } : c
        )
      );
    }
    setIsOpen(false);
  };

  return (
    <div className="flex min-h-screen">
      <SideBar />
      <div className="p-6 w-full mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Category Management</h1>
          <Button onClick={openAddModal} className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" /> Add New Category
          </Button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
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
                {category.isFeatured && (
                  <div className="absolute top-2 right-2 bg-amber-500 text-white rounded-full p-1">
                    <Star className="h-4 w-4 fill-white" />
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold">{category.name}</h3>
                    <div className="flex items-center mt-2">
                      {category.isFeatured ? (
                        <div className="flex items-center text-amber-500">
                          <Star className="h-4 w-4 mr-1 fill-amber-500" />
                          <span className="text-sm">Featured</span>
                        </div>
                      ) : (
                        <div className="text-sm text-gray-500">
                          Not Featured
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">ID: {category.id}</div>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 px-4 py-3 flex justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openEditModal(category)}
                  className="flex items-center gap-1"
                >
                  <Edit className="h-3.5 w-3.5" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600"
                  onClick={() => confirmDelete(category)}
                >
                  <Trash2 className="h-3.5 w-3.5 mr-1" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Add/Edit Category Modal */}
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
                  Image URL
                </Label>
                <Input
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="col-span-3"
                  placeholder="/api/placeholder/400/200"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="isFeatured" className="text-right">
                  Featured
                </Label>
                <div className="flex items-center space-x-2 col-span-3">
                  <Switch
                    id="isFeatured"
                    checked={formData.isFeatured}
                    onCheckedChange={handleFeaturedChange}
                  />
                  <Label htmlFor="isFeatured">
                    {formData.isFeatured ? "Featured" : "Not Featured"}
                  </Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Modal */}
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
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Categories;
