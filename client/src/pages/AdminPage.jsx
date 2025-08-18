import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance"; // token included automatically
import {
  Button,
  TextField,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

function AdminPage() {
  const [services, setServices] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", description: "", price: "" });

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      window.location.href = "/login";
    } else {
      fetchServices();
    }
  }, []);

  const fetchServices = async () => {
    try {
      const res = await axiosInstance.get("/services");
      setServices(res.data);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Failed to fetch services");
    }
  };

  const handleOpen = (service = null) => {
    if (service) {
      setEditing(service);
      setForm({
        name: service.name,
        description: service.description,
        price: service.price || "",
      });
    } else {
      setEditing(null);
      setForm({ name: "", description: "", price: "" });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditing(null);
    setForm({ name: "", description: "", price: "" });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.description.trim() || form.price === "") {
      alert("Please enter name, description, and price");
      return;
    }

    try {
      const payload = { ...form, price: Number(form.price) };
      if (editing) {
        await axiosInstance.put(`/services/${editing._id}`, payload);
      } else {
        await axiosInstance.post("/services", payload);
      }
      fetchServices();
      handleClose();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Something went wrong while saving service");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    try {
      await axiosInstance.delete(`/services/${id}`);
      fetchServices();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Something went wrong while deleting service");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        Admin Panel - Manage Services
      </Typography>
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>
        Add New Service
      </Button>

      <Grid container spacing={3} style={{ marginTop: 20 }}>
        {services.map((service) => (
          <Grid item xs={12} md={4} key={service._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{service.name}</Typography>
                <Typography variant="body2">{service.description}</Typography>
                <Typography variant="subtitle2">Price: ₹{service.price}</Typography>
              </CardContent>
              <CardActions>
                <Button onClick={() => handleOpen(service)}>Edit</Button>
                <Button color="error" onClick={() => handleDelete(service._id)}>
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog for Add/Edit */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editing ? "Edit Service" : "Add Service"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Service Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            multiline
            rows={3}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Price"
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AdminPage;
