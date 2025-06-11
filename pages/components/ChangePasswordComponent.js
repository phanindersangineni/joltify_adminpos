import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
export const DEV = process.env.NEXT_PUBLIC_API_URL;
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";

const ChangePasswordComponent = ({ closeCustomerAction }) => {
    const { user, accessToken,logout } = useAuth();
    const [errors, setErrors] = useState({});
    const router = useRouter();
    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const closeModal = () => {
        closeCustomerAction("changepassword");
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.oldPassword.trim()) {
            newErrors.oldPassword = "Old password is required";
        }
        if (!formData.newPassword.trim()) {
            newErrors.newPassword = "New password is required";
        } else if (formData.newPassword.length < 6) {
            newErrors.newPassword = "Password must be at least 6 characters";
        }
        if (formData.confirmPassword !== formData.newPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const logoutUser =() =>{
        logout();
        router.push('/');
      }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const headers = {
                "Content-Type": "application/json",
                token: accessToken,
            };

            const payload = {
                userId: user.user_id,
                oldPassword: formData.oldPassword,
                newPassword: formData.newPassword,
            };

            const response = await axios.post(`${DEV}/joltify/user/changepassword`, payload, { headers });
            console.log(response.data);
            if (response.data.data =='SUCCESS') {
                Swal.fire({
                    text: "Password changed successfully!",
                    icon: "success",
                    timer: 3000,
                    showConfirmButton: false,
                });
                setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
                logoutUser();
            }else if (response.data.data =='INVALIDPASSWORD') {
                Swal.fire({
                    text: "You have entered an invalid old password",
                    icon: "success",
                    timer: 3000,
                    showConfirmButton: true,
                });
                setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
              
            }
            
            else {
                Swal.fire({
                    text:  "Failed to change password",
                    icon: "error",
                    timer: 2000,
                    showConfirmButton: false,
                });
            }
        } catch (error) {
            console.error("Error:", error);
            Swal.fire({
                text: "An error occurred. Please try again.",
                icon: "error",
                timer: 2000,
                showConfirmButton: false,
            });
        }
    };

    return (
        <div className="popup-overlay">
        <div className="popup-changepassword">
            <div className="header">
                <h5>Change Password</h5>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Old Password *</label>
                    <input
                        type="password"
                        name="oldPassword"
                        value={formData.oldPassword}
                        onChange={handleChange}
                        className={`form-control ${errors.oldPassword ? "is-invalid" : ""}`}
                    />
                    {errors.oldPassword && <div className="invalid-feedback">{errors.oldPassword}</div>}
                </div>

                <div className="form-group">
                    <label>New Password *</label>
                    <input
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        className={`form-control ${errors.newPassword ? "is-invalid" : ""}`}
                    />
                    {errors.newPassword && <div className="invalid-feedback">{errors.newPassword}</div>}
                </div>

                <div className="form-group">
                    <label>Confirm Password *</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                    />
                    {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                </div>

                <div className="col-md-12 mt-3 d-flex align-items-center buttons">
                    <button type="submit" className="btn btn-primary me-2">
                        <i className="bi bi-check-circle-fill"></i> Save
                    </button>
                    <button
                        type="button"
                        className="btn btn-outline-secondary closePopup"
                        onClick={closeModal}
                    >
                        <i className="bi bi-x-circle-fill"></i> Close
                    </button>
                </div>
            </form>
        </div>
        </div>
    );
};

export default ChangePasswordComponent;
