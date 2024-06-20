"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const TicketForm = ({ ticket }) => {
  const EDITMODE = ticket._id !== "new";
  const router = useRouter();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create new ticket
      const createRes = await fetch("/api/Tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!createRes.ok) {
        const errorData = await createRes.json();
        throw new Error(errorData.message || "Failed to create ticket");
      }

      // If in edit mode, delete the old ticket
      if (EDITMODE) {
        const deleteRes = await fetch(`/api/Tickets/${ticket._id}`, {
          method: "DELETE",
        });

        if (!deleteRes.ok) {
          const errorData = await deleteRes.json();
          throw new Error(errorData.message || "Failed to delete old ticket");
        }
      }

      // Show success message
      setShowSuccessMessage(true);
      setTimeout(() => setFadeOut(true), 4000); // Trigger fade out after 4 seconds
      setTimeout(() => setShowSuccessMessage(false), 5000); // Hide message after 5 seconds
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    }

    router.refresh();
    router.push("/");
  };

  const startingTicketData = {
    title: "",
    description: "",
    priority: 1,
    progress: 0,
    status: "Not started",
    category: "Hardware problem",
  };

  if (EDITMODE) {
    startingTicketData.title = ticket.title;
    startingTicketData.description = ticket.description;
    startingTicketData.priority = ticket.priority;
    startingTicketData.progress = ticket.progress;
    startingTicketData.status = ticket.status;
    startingTicketData.category = ticket.category;
  }

  const [formData, setFormData] = useState(startingTicketData);

  return (
    <div className="flex justify-center">
      {showSuccessMessage && (
        <div
          className={`fixed top-4 right-4 bg-green-500 text-white py-2 px-4 rounded transition-opacity duration-1000 ${
            fadeOut ? "opacity-0" : "opacity-100"
          }`}
        >
          Ticket updated successfully!
        </div>
      )}
      <form className="flex flex-col gap-3 w-1/2" onSubmit={handleSubmit}>
        <h3>{EDITMODE ? "Update your ticket" : "Create Your Ticket"}</h3>
        <label>Title</label>
        <input
          id="title"
          name="title"
          type="text"
          onChange={handleChange}
          required
          value={formData.title}
        />
        <label>Description</label>
        <textarea
          id="description"
          name="description"
          onChange={handleChange}
          required
          value={formData.description}
          rows="5"
        />
        <label>Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="Hardware problem">Hardware problem</option>
          <option value="Software problem">Software problem</option>
          <option value="Project">Project</option>
        </select>
        <label>Priority</label>
        <div>
          <input
            id="priority-1"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={1}
            checked={formData.priority == 1}
          />
          <label>1</label>
          <input
            id="priority-2"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={2}
            checked={formData.priority == 2}
          />
          <label>2</label>
          <input
            id="priority-3"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={3}
            checked={formData.priority == 3}
          />
          <label>3</label>
          <input
            id="priority-4"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={4}
            checked={formData.priority == 4}
          />
          <label>4</label>
          <input
            id="priority-5"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={5}
            checked={formData.priority == 5}
          />
          <label>5</label>
        </div>
        <label>Progress</label>
        <input
          type="range"
          id="progress"
          name="progress"
          value={formData.progress}
          min="0"
          max="100"
          onChange={handleChange}
        />
        <label>Status</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="Not started">Not Started</option>
          <option value="Started">Started</option>
          <option value="Done">Done</option>
        </select>
        <input
          type="submit"
          className="btn"
          value={EDITMODE ? "Update ticket" : "Create Ticket"}
        />
      </form>
    </div>
  );
};

export default TicketForm;
