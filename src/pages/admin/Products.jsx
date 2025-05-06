import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Switch } from "@/components/ui/switch";
import { PlusCircle, Edit, Trash2, Loader2 } from "lucide-react";
import { SideBar } from "../../components/basics";
import {
  useGetAllProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "@/api/ProductApi";
import { useGetAllCategoriesQuery } from "@/api/CatApi";

const Products = () => {
  // Query parameters
  const [queryParams, setQueryParams] = useState({
    page: 1,
    limit: 10,
    search: "",
    category: "",
  });

  // Query products and categories from Redux
  const {
    data: productsData,
    isLoading,
    isError,
    refetch,
  } = useGetAllProductsQuery(queryParams);

  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useGetAllCategoriesQuery({
      page: 1,
      limit: 100,
      search: "",
    });

  // Mutations from Redux
  const [addProduct, { isLoading: isAdding }] = useAddProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  // Dialog state
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [mode, setMode] = useState("add");

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    isFeatured: false,
    isActive: true,
    image: null,
    quantity: 0,
    price: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNumericChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: parseInt(value) || 0,
    });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        image: e.target.files[0],
      });
    }
  };

  const handleSwitchChange = (name, checked) => {
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  const handleCategoryChange = (categoryId) => {
    setFormData({
      ...formData,
      category: categoryId,
    });
  };

  const openAddModal = () => {
    setMode("add");
    setFormData({
      name: "",
      category: "",
      isFeatured: false,
      isActive: true,
      image: null,
      quantity: 0,
      price: 0,
    });
    setIsOpen(true);
  };

  const openEditModal = (product) => {
    setMode("edit");
    setCurrentProduct(product);
    setFormData({
      name: product.name,
      category: product.category?._id || product.category,
      isFeatured: product.isFeature || false, // Map isFeature to isFeatured
      isActive: product.isActive !== false,
      image: null, // Reset image to null on edit
      quantity: product.quantity || 0,
      price: product.price || 0,
    });
    setIsOpen(true);
  };

  const confirmDelete = (product) => {
    setCurrentProduct(product);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (currentProduct) {
      try {
        await deleteProduct(currentProduct._id).unwrap();
        setIsDeleteDialogOpen(false);
        setCurrentProduct(null);
        refetch();
      } catch (error) {
        console.error("Delete Error:", error);
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();

      if (mode === "add") {
        // Fields for add operation
        formDataToSend.append("name", formData.name);
        formDataToSend.append("price", formData.price);
        formDataToSend.append("quantity", formData.quantity);
        formDataToSend.append("isFeatured", formData.isFeatured);
        formDataToSend.append("isActive", formData.isActive);
        formDataToSend.append("category", formData.category);

        if (formData.image) {
          formDataToSend.append("image", formData.image);
        }

        await addProduct(formDataToSend).unwrap();
      } else {
        // Fields for update operation - including category
        formDataToSend.append("name", formData.name);
        formDataToSend.append("price", formData.price);
        formDataToSend.append("quantity", formData.quantity);
        formDataToSend.append("isFeatured", formData.isFeatured);
        formDataToSend.append("isActive", formData.isActive);
        formDataToSend.append("category", formData.category); // Include category in update

        if (formData.image) {
          formDataToSend.append("image", formData.image);
        }

        console.log("Updating product with data:", {
          id: currentProduct._id,
          formData: Object.fromEntries(formDataToSend.entries()),
        });

        await updateProduct({
          id: currentProduct._id,
          formData: formDataToSend,
        }).unwrap();
      }

      setIsOpen(false);
      refetch();
    } catch (error) {
      console.error("Submit Error:", error);
    }
  };

  // Handle search and filter
  const handleSearch = (e) => {
    setQueryParams({
      ...queryParams,
      search: e.target.value,
      page: 1,
    });
  };

  const handleCategoryFilter = (category) => {
    setQueryParams({
      ...queryParams,
      category: category === "all" ? "" : category,
      page: 1,
    });
  };

  // Helper to get category name by ID
  const getCategoryName = (categoryId) => {
    if (!categoriesData?.data?.categories) return "Unknown";
    const category = categoriesData.data.categories.find(
      (cat) => cat._id === categoryId
    );
    return category ? category.name : "Unknown";
  };

  // Pagination handlers
  const handlePreviousPage = () => {
    if (queryParams.page > 1) {
      setQueryParams({ ...queryParams, page: queryParams.page - 1 });
    }
  };

  const handleNextPage = () => {
    if (productsData?.hasNextPage) {
      setQueryParams({ ...queryParams, page: queryParams.page + 1 });
    }
  };

  return (
    <div className="flex min-h-screen">
      <SideBar />

      <div className="p-6 w-full mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Product Management</h1>
          <Button onClick={openAddModal} className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" /> Add New Product
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Search products..."
              value={queryParams.search}
              onChange={handleSearch}
            />
          </div>
          <Select
            value={queryParams.category}
            onValueChange={handleCategoryFilter}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {!isCategoriesLoading &&
                categoriesData?.data?.categories?.map((category) => (
                  <SelectItem key={category._id} value={category._id}>
                    {category.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            <span className="ml-2 text-gray-500">Loading products...</span>
          </div>
        )}

        {/* Error state */}
        {isError && (
          <div className="flex justify-center items-center h-64">
            <p className="text-red-500">
              Error loading products. Please try again.
            </p>
          </div>
        )}

        {/* Products Table */}
        {!isLoading && !isError && productsData && (
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">Sr No</TableHead>
                  <TableHead className="w-24">Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {productsData.data.products &&
                productsData.data.products.length > 0 ? (
                  productsData.data.products.map((product, index) => (
                    <TableRow key={product._id}>
                      <TableCell>
                        {(queryParams.page - 1) * queryParams.limit + index + 1}
                      </TableCell>
                      <TableCell>
                        <img
                          src={product.image || "/api/placeholder/100/100"}
                          alt={product.name}
                          className="h-10 w-10 rounded object-cover"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {product.name}
                      </TableCell>
                      <TableCell>
                        {product.category?.name ||
                          getCategoryName(product.category)}
                      </TableCell>
                      <TableCell>{product.quantity}</TableCell>
                      <TableCell>${product.price}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            product.isFeature
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {product.isFeature ? "Featured" : "Regular"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            product.isActive !== false
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {product.isActive !== false ? "Active" : "Inactive"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openEditModal(product)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600"
                            onClick={() => confirmDelete(product)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8">
                      No products found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Pagination */}
        {!isLoading && !isError && productsData && (
          <div className="flex justify-between items-center mt-4">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePreviousPage}
                disabled={queryParams.page <= 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={!productsData.hasNextPage}
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {/* Add/Edit Product Modal */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {mode === "add" ? "Add New Product" : "Edit Product"}
              </DialogTitle>
              <DialogDescription>
                Fill in the product details.
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
                  required
                />
              </div>
              {mode === "add" && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Category
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={handleCategoryChange}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {!isCategoriesLoading &&
                        categoriesData?.data?.categories?.map((category) => (
                          <SelectItem key={category._id} value={category._id}>
                            {category.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Price
                </Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  value={formData.price}
                  onChange={handleNumericChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity" className="text-right">
                  Quantity
                </Label>
                <Input
                  id="quantity"
                  name="quantity"
                  type="number"
                  min="0"
                  value={formData.quantity}
                  onChange={handleNumericChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image" className="text-right">
                  Image
                </Label>
                <Input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="col-span-3"
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
                    onCheckedChange={(checked) =>
                      handleSwitchChange("isFeatured", checked)
                    }
                  />
                  <Label htmlFor="isFeatured">
                    {formData.isFeatured ? "Featured" : "Regular"}
                  </Label>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="isActive" className="text-right">
                  Status
                </Label>
                <div className="flex items-center space-x-2 col-span-3">
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) =>
                      handleSwitchChange("isActive", checked)
                    }
                  />
                  <Label htmlFor="isActive">
                    {formData.isActive ? "Active" : "Inactive"}
                  </Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsOpen(false)}
                disabled={isAdding || isUpdating}
              >
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={isAdding || isUpdating}>
                {(isAdding || isUpdating) && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {mode === "add" ? "Add Product" : "Update Product"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Modal */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Confirm Delete</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete "{currentProduct?.name}"?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="gap-2 sm:justify-end">
              <Button
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(false)}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Products;
