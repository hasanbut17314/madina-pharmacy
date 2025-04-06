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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { PlusCircle, Edit, Trash2 } from "lucide-react";

const Products = () => {
  // Sample product data - replace with your actual data source
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Ergonomic Chair",
      image: "/api/placeholder/100/100",
      category: "Furniture",
      feature: true,
      quantity: 15,
    },
    {
      id: 2,
      name: "Wireless Mouse",
      image: "/api/placeholder/100/100",
      category: "Electronics",
      feature: true,
      quantity: 42,
    },
    {
      id: 3,
      name: "Desk Lamp",
      image: "/api/placeholder/100/100",
      category: "Lighting",
      feature: false,
      quantity: 8,
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [mode, setMode] = useState("add"); // "add" or "edit"

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    feature: true,
    image: "",
    quantity: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setFormData({
      ...formData,
      quantity: value,
    });
  };

  const handlefeatureChange = (checked) => {
    setFormData({
      ...formData,
      feature: checked,
    });
  };

  const handleCategoryChange = (value) => {
    setFormData({
      ...formData,
      category: value,
    });
  };

  const openAddModal = () => {
    setMode("add");
    setFormData({
      name: "",
      category: "",
      feature: true,
      image: "",
      quantity: 0,
    });
    setIsOpen(true);
  };

  const openEditModal = (product) => {
    setMode("edit");
    setCurrentProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      feature: product.feature,
      image: product.image,
      quantity: product.quantity,
    });
    setIsOpen(true);
  };

  const confirmDelete = (product) => {
    setCurrentProduct(product);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (currentProduct) {
      setProducts(products.filter((p) => p.id !== currentProduct.id));
      setIsDeleteDialogOpen(false);
      setCurrentProduct(null);
    }
  };

  const handleSubmit = () => {
    if (mode === "add") {
      // Add new product
      const newProduct = {
        id: products.length + 1, // Simple ID generation
        ...formData,
      };
      setProducts([...products, newProduct]);
    } else {
      // Edit existing product
      setProducts(
        products.map((p) =>
          p.id === currentProduct.id ? { ...p, ...formData } : p
        )
      );
    }
    setIsOpen(false);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Product Management</h1>
        <Button onClick={openAddModal} className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" /> Add New Product
        </Button>
      </div>

      {/* Products Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">Sr No</TableHead>
              <TableHead className="w-24">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>feature</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={product.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-10 w-10 rounded object-cover"
                  />
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.feature
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.feature ? "Active" : "Inactive"}
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
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Add/Edit Product Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {mode === "add" ? "Add New Product" : "Edit Product"}
            </DialogTitle>
            <DialogDescription>
              Fill in the details to{" "}
              {mode === "add" ? "create a new" : "update the"} product.
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
              />
            </div>
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
                  <SelectGroup>
                    <SelectItem value="Electronics">Electronics</SelectItem>
                    <SelectItem value="Furniture">Furniture</SelectItem>
                    <SelectItem value="Lighting">Lighting</SelectItem>
                    <SelectItem value="Apparel">Apparel</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
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
                onChange={handleQuantityChange}
                className="col-span-3"
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
                placeholder="/api/placeholder/100/100"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="feature" className="text-right">
                feature
              </Label>
              <div className="flex items-center space-x-2 col-span-3">
                <Switch
                  id="feature"
                  checked={formData.feature}
                  onCheckedChange={handlefeatureChange}
                />
                <Label htmlFor="feature">
                  {formData.feature ? "Active" : "Inactive"}
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
              Are you sure you want to delete "{currentProduct?.name}"? This
              action cannot be undone.
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
  );
};

export default Products;
