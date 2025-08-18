import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";

function ServiceCard({ service, onEnquire, onDelete, onEdit, isAdmin }) {
  return (
    <Card sx={{ minHeight: 200 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {service.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {service.description}
        </Typography>
      </CardContent>

      <CardActions>
        {isAdmin ? (
          <>
            <Button
              size="small"
              color="primary"
              onClick={() => onEdit(service)}
            >
              Edit
            </Button>
            <Button
              size="small"
              color="error"
              onClick={() => onDelete(service._id)}
            >
              Delete
            </Button>
          </>
        ) : (
          <Button
            size="small"
            variant="contained"
            onClick={() => onEnquire(service)}
          >
            Enquire
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

export default ServiceCard;
