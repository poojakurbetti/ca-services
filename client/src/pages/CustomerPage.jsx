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
    <div style={{ padding: 20, fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", backgroundColor: "#f7f8fa" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <h1 style={{ color: "#1f3b57", marginBottom: 10, fontSize: 32, fontWeight: 600 }}>
          FinSolve
        </h1>
        <p style={{ color: "#4a5a6a", fontSize: 16, marginBottom: 5 }}>
          One-stop solution for everything finance.
        </p>
        <p style={{ color: "#4a5a6a", fontSize: 16, marginBottom: 10 }}>
          Precision in Accounting, Excellence in Advisory.
        </p>
        <p style={{ fontSize: 14, color: "#4a5a6a" }}>
          Visit our official website:{" "}
          <a
            href="https://animeshkurbetti.wixsite.com/animesh-kurbetti/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "underline", color: "#1f3b57" }}
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
          gap: 25,
        }}
      >
        {services.map((service) => (
          <div
            key={service._id}
            style={{
              border: "1px solid #d9dce0",
              padding: 25,
              borderRadius: 15,
              boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
              backgroundColor: "#fff",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <h3 style={{ marginBottom: 12, color: "#1f3b57", fontSize: 20 }}>{service.name}</h3>
            <p style={{ fontSize: 14, color: "#4a5a6a", lineHeight: 1.5 }}>{service.description}</p>
            <span
              style={{
                display: "inline-block",
                marginTop: 12,
                padding: "6px 12px",
                backgroundColor: "#e6eef7",
                borderRadius: 10,
                fontWeight: 600,
                color: "#1f3b57",
              }}
            >
              {service.price}
            </span>

            {/* Inputs */}
            <div style={{ marginTop: 18, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <input
                type="email"
                placeholder="Your Email"
                value={enquiry[service._id]?.email || ""}
                onChange={(e) => handleChange(service._id, "email", e.target.value)}
                style={{
                  flex: "1 1 45%",
                  minWidth: 120,
                  padding: 8,
                  borderRadius: 8,
                  border: "1px solid #c4c9ce",
                  backgroundColor: "#f9f9f9",
                }}
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={enquiry[service._id]?.phone || ""}
                onChange={(e) => handleChange(service._id, "phone", e.target.value)}
                style={{
                  flex: "1 1 45%",
                  minWidth: 120,
                  padding: 8,
                  borderRadius: 8,
                  border: "1px solid #c4c9ce",
                  backgroundColor: "#f9f9f9",
                }}
              />
            </div>

            <button
              onClick={() => handleEnquire(service._id, service.name)}
              style={{
                marginTop: 12,
                width: "100%",
                padding: 10,
                borderRadius: 8,
                backgroundColor: "#1f3b57",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                fontWeight: 600,
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0f2333")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1f3b57")}
            >
              Enquire Service
            </button>

            {messages[service._id] && (
              <p style={{ marginTop: 10, fontSize: 14, color: "#d9534f" }}>{messages[service._id]}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomerPage;
