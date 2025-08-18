import React, { useState, useEffect } from "react";
import { TextField, Button, Box } from "@mui/material";

function ServiceForm({ service, onSave, onCancel }) {
  const [form, setForm] = useState({ name: "", description: "", price: "" });

  useEffect(() => {
    if (service) {
      setForm({
        name: service.name || "",
        description: service.description || "",
        price: service.price || "",
      });
    }
  }, [service]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Minimal validation
    if (!form.name.trim() || !form.description.trim() || form.price === "") {
      alert("Please enter name, description, and price");
      return;
    }

    onSave({ ...form, price: Number(form.price) }); // ensure price is a number
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
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
      <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
        <Button type="submit" variant="contained">
          Save
        </Button>
        <Button variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
}

export default ServiceForm;
