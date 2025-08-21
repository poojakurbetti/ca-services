import React, { useEffect, useState } from "react";
import axios from "axios";

function CustomerPage() {
  const [services, setServices] = useState([]);
  const [enquiry, setEnquiry] = useState({}); // per-service enquiry
  const [messages, setMessages] = useState({}); // per-service messages

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await axios.get(import.meta.env.VITE_API_URL+"/services");
      const formattedServices = res.data.map((service) => ({
        ...service,
        price: service.price ? `₹${service.price}` : "Price not available",
      }));
      setServices(formattedServices);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (serviceId, field, value) => {
    setEnquiry({
      ...enquiry,
      [serviceId]: {
        ...enquiry[serviceId],
        [field]: value,
      },
    });
  };

  const handleEnquire = async (serviceId, serviceName) => {
    const { email, phone } = enquiry[serviceId] || {};
    if (!email || !phone) {
      setMessages({
        ...messages,
        [serviceId]: "❌ Please enter email and phone for this service",
      });
      return;
    }

    try {
      await axios.post(import.meta.env.VITE_API_URL+"/services/enquire", {
        serviceName,
        email,
        phone,
      });

      setMessages({
        ...messages,
        [serviceId]: `✅ Enquiry sent successfully for ${serviceName}`,
      });

      // Clear only this service's inputs
      setEnquiry({ ...enquiry, [serviceId]: { email: "", phone: "" } });
    } catch (err) {
      console.error(err);
      setMessages({
        ...messages,
        [serviceId]: "❌ Failed to send enquiry",
      });
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Our Services</h2>
      {services.map((service) => (
        <div
          key={service._id}
          style={{
            border: "1px solid #ccc",
            padding: 15,
            margin: 10,
            borderRadius: 5,
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          <h4>{service.name}</h4>
          <p>{service.description}</p>
          <p style={{ fontWeight: "bold" }}>Price: {service.price}</p>

          <div style={{ marginTop: 10 }}>
            <input
              type="email"
              placeholder="Your Email"
              value={enquiry[service._id]?.email || ""}
              onChange={(e) => handleChange(service._id, "email", e.target.value)}
              style={{ marginRight: 5, padding: 5 }}
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={enquiry[service._id]?.phone || ""}
              onChange={(e) => handleChange(service._id, "phone", e.target.value)}
              style={{ marginRight: 5, padding: 5 }}
            />
            <button onClick={() => handleEnquire(service._id, service.name)}>
              Enquire Service
            </button>
          </div>

          {/* Success/Error message for this service */}
          {messages[service._id] && (
            <p style={{ marginTop: 10 }}>{messages[service._id]}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default CustomerPage;
