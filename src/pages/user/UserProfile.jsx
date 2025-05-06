import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Phone, Save, Edit2, Mail } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateUserMutation } from "@/api/AuthApi";

function UserProfile() {
  const navigate = useNavigate();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  // Default user state
  const [userData, setUserData] = useState({
    name: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    avatarUrl: "/avatar-placeholder.png",
  });

  const [editMode, setEditMode] = useState(false);
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  const [updateError, setUpdateError] = useState(null);
  const fileInputRef = React.useRef(null);

  // Load user data from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    // If no user data exists in localStorage, redirect to login
    if (!storedUser) {
      navigate("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);

      // Initialize userData with values from localStorage
      setUserData({
        firstName: parsedUser.firstName || "",
        lastName: parsedUser.lastName || "",
        name: `${parsedUser.firstName || ""} ${
          parsedUser.lastName || ""
        }`.trim(),
        email: parsedUser.email || "",
        phoneNumber: parsedUser.phoneNumber || "",
        avatarUrl: parsedUser.avatarUrl || "/avatar-placeholder.png",
      });

      // Initialize form values as well
      setFormValues({
        firstName: parsedUser.firstName || "",
        lastName: parsedUser.lastName || "",
        email: parsedUser.email || "",
        phoneNumber: parsedUser.phoneNumber || "",
      });
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
      // If there's an error parsing the user data, redirect to login
      navigate("/login");
    }
  }, [navigate]);

  const handleEditToggle = async () => {
    if (editMode) {
      try {
        setUpdateError(null);

        // Call the updateUser mutation with the form values
        const response = await updateUser({
          firstName: formValues.firstName,
          lastName: formValues.lastName,
          email: formValues.email,
          // Only include phoneNumber if your backend expects it
          phoneNumber: formValues.phoneNumber,
        }).unwrap();

        // Update local user data with the response or form values
        const updatedUserData = {
          firstName: formValues.firstName,
          lastName: formValues.lastName,
          name: `${formValues.firstName} ${formValues.lastName}`.trim(),
          email: formValues.email,
          phoneNumber: formValues.phoneNumber,
          avatarUrl: userData.avatarUrl,
        };

        setUserData(updatedUserData);

        // Update localStorage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser);
            const updatedStoredUser = {
              ...parsedUser,
              firstName: formValues.firstName,
              lastName: formValues.lastName,
              email: formValues.email,
              phoneNumber: formValues.phoneNumber,
            };
            localStorage.setItem("user", JSON.stringify(updatedStoredUser));
          } catch (error) {
            console.error("Error updating user data in localStorage:", error);
          }
        }
      } catch (error) {
        console.error("Failed to update user profile:", error);
      }
    }
    setEditMode(!editMode);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleAvatarClick = () => {
    if (editMode) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a temporary URL for the selected image
      const imageUrl = URL.createObjectURL(file);
      setUserData({
        ...userData,
        avatarUrl: imageUrl,
      });

      // In a real app, you would upload the file to a server here
      // and then update the avatarUrl with the URL returned from the server
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 font-serif">
      <div className="max-w-md mx-auto">
        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="border-b border-gray-100 bg-white">
            <CardTitle className="text-xl text-gray-800 flex items-center justify-center">
              <User className="mr-2 h-5 w-5" />
              User Profile
            </CardTitle>
          </CardHeader>

          <CardContent className="pt-6">
            {/* Avatar Section */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Avatar
                  className="h-24 w-24 cursor-pointer border-2 border-gray-200"
                  onClick={handleAvatarClick}
                >
                  <AvatarImage src={userData.avatarUrl} alt="Profile" />
                  <AvatarFallback className="bg-red-100 text-red-600 text-xl">
                    {userData.firstName && userData.lastName
                      ? `${userData.firstName[0]}${userData.lastName[0]}`
                      : "U"}
                  </AvatarFallback>
                </Avatar>

                {editMode && (
                  <div className="absolute bottom-0 right-0 bg-red-600 rounded-full p-1 text-white cursor-pointer">
                    <Edit2 className="h-4 w-4" />
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Error message if update fails */}
            {updateError && (
              <div className="mb-4 p-2 bg-red-100 text-red-600 rounded text-sm">
                {updateError}
              </div>
            )}

            {/* Form Fields */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="firstName"
                  className="text-sm font-medium text-gray-700"
                >
                  First Name
                </Label>
                {editMode ? (
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formValues.firstName}
                    onChange={handleInputChange}
                    className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                  />
                ) : (
                  <div className="py-2 px-3 bg-gray-50 rounded-md border border-gray-200">
                    {userData.firstName}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="lastName"
                  className="text-sm font-medium text-gray-700"
                >
                  Last Name
                </Label>
                {editMode ? (
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formValues.lastName}
                    onChange={handleInputChange}
                    className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                  />
                ) : (
                  <div className="py-2 px-3 bg-gray-50 rounded-md border border-gray-200">
                    {userData.lastName}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email
                </Label>
                {editMode ? (
                  <div className="flex">
                    <div className="flex items-center px-3 bg-gray-50 border border-r-0 border-gray-300 rounded-l-md">
                      <Mail className="h-4 w-4 text-gray-500" />
                    </div>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formValues.email}
                      onChange={handleInputChange}
                      className="rounded-l-none border-gray-300 focus:border-red-500 focus:ring-red-500"
                    />
                  </div>
                ) : (
                  <div className="py-2 px-3 bg-gray-50 rounded-md border border-gray-200 flex items-center">
                    <Mail className="h-4 w-4 text-gray-500 mr-2" />
                    {userData.email}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="phoneNumber"
                  className="text-sm font-medium text-gray-700"
                >
                  Phone Number
                </Label>
                {editMode ? (
                  <div className="flex">
                    <div className="flex items-center px-3 bg-gray-50 border border-r-0 border-gray-300 rounded-l-md">
                      <Phone className="h-4 w-4 text-gray-500" />
                    </div>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formValues.phoneNumber}
                      onChange={handleInputChange}
                      className="rounded-l-none border-gray-300 focus:border-red-500 focus:ring-red-500"
                    />
                  </div>
                ) : (
                  <div className="py-2 px-3 bg-gray-50 rounded-md border border-gray-200 flex items-center">
                    <Phone className="h-4 w-4 text-gray-500 mr-2" />
                    {userData.phoneNumber || "Not provided"}
                  </div>
                )}
              </div>

              <Button
                onClick={handleEditToggle}
                disabled={isUpdating}
                className={`w-full mt-6 ${
                  editMode
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-gray-800 hover:bg-gray-900"
                }`}
              >
                {editMode ? (
                  isUpdating ? (
                    "Saving..."
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )
                ) : (
                  <>
                    <Edit2 className="mr-2 h-4 w-4" />
                    Edit Profile
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default UserProfile;
