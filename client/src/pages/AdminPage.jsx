import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance"; // use token automatically
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
  const [form, setForm] = useState({ name: "", description: "" });

  useEffect(() => {
    // Redirect to login if no token
    const token = localStorage.getItem("adminToken");
    if (!token) {
      window.location.href = "/login"; // or your login page
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
    }
  };

  const handleOpen = (service = null) => {
    if (service) {
      setEditing(service);
      setForm({ name: service.name, description: service.description });
    } else {
      setEditing(null);
      setForm({ name: "", description: "" });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditing(null);
    setForm({ name: "", description: "" });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      if (editing) {
        await axiosInstance.put(`/services/${editing._id}`, form);
      } else {
        await axiosInstance.post("/services", form);
      }
      fetchServices();
      handleClose();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/services/${id}`);
      fetchServices();
    } catch (err) {
      console.error(err);
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
