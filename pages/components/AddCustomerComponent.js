import axios from "axios";
import { useState } from "react";

const AddCustomerComponent = (user, accessToken ,customerAction) => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let newErrors = {};
        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }
        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!/^\d{10}$/.test(formData.phone)) {
            newErrors.phone = "Enter a valid 10-digit phone number";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const headers = {
                "content-type": "application/json",
                "X-Content-Type-Options": "nosniff",
                "X-Frame-Options": "SAMEORIGIN",
                token: accessToken,
              };

              const addcutomerdata ={
                createdby:user.user_id,
                name:formData.name,
                phone:formData.phone
              }
              response = await axios.post(`${DEV}/joltify/customers`, addcutomerdata, { headers });
     

              if (response.data.data.id) {
                alert("Customer added successfully!");
                customerAction(formData);
                setFormData({ name: "", phone: "" }); // Reset form

                
            } else {
                alert("Failed to add customer.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="popup-add-customer">
            <div className="header">
                <h5>Customers</h5>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name *</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`form-control ${errors.name ? "is-invalid" : ""}`}
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>

                <div className="form-group">
                    <label>Phone *</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                    />
                    {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                </div>

                <div className="col-md-12 mt-3 d-flex align-items-center buttons">
                    <button type="submit" className="btn btn-primary me-2">
                        <i className="bi bi-check-circle-fill"></i> Save
                    </button>
                    <button type="reset" className="btn btn-outline-secondary closePopup" onClick={() => closemodal("addcustomer")}>
                        <i className="bi bi-x-circle-fill"></i> Close
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddCustomerComponent;
