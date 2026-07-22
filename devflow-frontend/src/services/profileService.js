import api from "./api";


// Get Logged-in User Profile
export const getProfile = async () => {
  const { data } = await api.get("/profile");
  return data;
};


// Update Profile
export const updateProfile = async (profileData) => {
  const { data } = await api.put(
    "/profile",
    profileData
  );
  return data;
};


// Upload Profile Picture
export const uploadProfile = async (formData) => {
  const { data } = await api.post(
    "/profile/upload-profile",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};


// Change Password
export const changePassword = async (passwordData) => {
  const { data } = await api.put(
    "/profile/change-password",
    passwordData
  );

  return data;
};