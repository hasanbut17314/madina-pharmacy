import React, { useState } from "react";
import { User, Phone, Save, Edit2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function UserProfile() {
  const [userData, setUserData] = useState({
    name: "John Doe",
    phoneNumber: "123-456-7890",
    avatarUrl: "/avatar-placeholder.png",
  });

  const [editMode, setEditMode] = useState(false);

  const [formValues, setFormValues] = useState({
    name: userData.name,
    phoneNumber: userData.phoneNumber,
  });

  const fileInputRef = React.useRef(null);

  const handleEditToggle = () => {
    if (editMode) {
      setUserData({
        ...userData,
        name: formValues.name,
        phoneNumber: formValues.phoneNumber,
      });
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
                    {userData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
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
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700"
                >
                  Full Name
                </Label>
                {editMode ? (
                  <Input
                    id="name"
                    name="name"
                    value={formValues.name}
                    onChange={handleInputChange}
                    className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                  />
                ) : (
                  <div className="py-2 px-3 bg-gray-50 rounded-md border border-gray-200">
                    {userData.name}
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
                    {userData.phoneNumber}
                  </div>
                )}
              </div>

              <Button
                onClick={handleEditToggle}
                className={`w-full mt-6 ${
                  editMode
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-gray-800 hover:bg-gray-900"
                }`}
              >
                {editMode ? (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
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
