import React, { useEffect, useState } from "react";
import axios from "axios";

function CustomerPage() {
  const [services, setServices] = useState([]);
  const [enquiry, setEnquiry] = useState({ serviceName: "", email: "", phone: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await axios.get("http://localhost:7001/api/services");
      setServices(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setEnquiry({ ...enquiry, [e.target.name]: e.target.value });
  };

  const handleEnquire = async (serviceName) => {
    try {
      await axios.post("http://localhost:7001/api/services/enquire", {
        serviceName,
        email: enquiry.email,
        phone: enquiry.phone,
      });
      setMessage(`✅ Enquiry sent for ${serviceName}`);
      setEnquiry({ serviceName: "", email: "", phone: "" });
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to send enquiry");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Our Services</h2>
      {services.map((service) => (
        <div key={service._id} style={{ border: "1px solid #ccc", padding: 10, margin: 10 }}>
          <h4>{service.name}</h4>
          <p>{service.description}</p>
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={enquiry.email}
            onChange={handleChange}
            style={{ marginRight: 5 }}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={enquiry.phone}
            onChange={handleChange}
            style={{ marginRight: 5 }}
          />
          <button onClick={() => handleEnquire(service.name)}>Enquire Service</button>
        </div>
      ))}
      {message && <p>{message}</p>}
    </div>
  );
}

export default CustomerPage;
