import React, { useEffect, useState } from "react";
import axios from "axios";

function CustomerPage() {
  const [services, setServices] = useState([]);
  const [enquiry, setEnquiry] = useState({});
  const [messages, setMessages] = useState({});

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await axios.get(import.meta.env.VITE_API_URL + "/services");
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
      await axios.post(import.meta.env.VITE_API_URL + "/services/enquire", {
        serviceName,
        email,
        phone,
      });

      setMessages({
        ...messages,
        [serviceId]: `✅ Enquiry sent successfully for ${serviceName}`,
      });

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
      {/* Header with firm name, tagline, and external link */}
      <div style={{ textAlign: "center", marginBottom: 30 }}>
        <h1 style={{ color: "#007bff", marginBottom: 10 }}>
          FinSolve
        </h1>
        <p style={{ color: "#555", fontSize: 16 }}>
          One-stop solution for everything finance.
        </p>
        <p style={{ color: "#555", fontSize: 16 }}>
          Precision in Accounting, Excellence in Advisory.
        </p>
        <p style={{ marginTop: 10, fontSize: 14 }}>
          Visit our official website:{" "}
          <a
            href="https://animeshkurbetti.wixsite.com/animesh-kurbetti/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "underline", color: "#007bff" }}
          >
            animeshkurbetti.wixsite.com
          </a>
        </p>
      </div>

      {/* Services */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 20,
        }}
      >
        {services.map((service) => (
          <div
            key={service._id}
            style={{
              border: "1px solid #ccc",
              padding: 20,
              borderRadius: 8,
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h3 style={{ marginBottom: 10, color: "#007bff" }}>{service.name}</h3>
            <p style={{ fontSize: 14, color: "#555" }}>{service.description}</p>
            <span
              style={{
                display: "inline-block",
                marginTop: 10,
                padding: "4px 10px",
                backgroundColor: "#f0f0f0",
                borderRadius: 4,
                fontWeight: "bold",
              }}
            >
              {service.price}
            </span>

            <div style={{ marginTop: 15 }}>
              <input
                type="email"
                placeholder="Your Email"
                value={enquiry[service._id]?.email || ""}
                onChange={(e) => handleChange(service._id, "email", e.target.value)}
                style={{ marginRight: 10, padding: 6, width: "45%" }} // increased spacing
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={enquiry[service._id]?.phone || ""}
                onChange={(e) => handleChange(service._id, "phone", e.target.value)}
                style={{ padding: 6, width: "45%" }}
              />
              <button
                onClick={() => handleEnquire(service._id, service.name)}
                style={{ marginTop: 10, width: "100%", padding: 8 }}
              >
                Enquire Service
              </button>
            </div>

            {messages[service._id] && (
              <p style={{ marginTop: 10, fontSize: 14 }}>{messages[service._id]}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomerPage;
