import React, { useState } from "react";
import DeleteButton from "./DeleteButton";

const PRIORITIES = ["Low", "Medium", "High"];
const COMPLETED = ["Completed", "In Progress"];

const priorityColor = {
  Low: "green",
  Medium: "orange",
  High: "red",
};

const statusColor = {
  Completed: "green",
  "In Progress": "blue",
};

const TodoCard = ({ todo, onDelete, onUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Local copy of fields while the modal is open
  const [draft, setDraft] = useState({});

  const openModal = (e) => {
    e.stopPropagation(); // Don't toggle the card while opening modal
    setDraft({
      completed: todo.completed,
      text: todo.text,
      notes: todo.notes,
      priority: todo.priority,
      dueDate: todo.dueDate,
    });
    setIsEditing(true);
  };

  const saveModal = () => {
    onUpdate(todo.id, draft);
    setIsEditing(false);
  };

  const cancelModal = () => {
    setIsEditing(false);
  };

  return (
    <>
      <li
        style={{
          border: "1px solid #ddd",
          borderRadius: 8,
          marginBottom: 8,
          overflow: "hidden",
        }}
      >
        {/* Card header — clicking this toggles collapse */}
        <div
          onClick={() => setIsOpen((prev) => !prev)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 16px",
            cursor: "pointer",
            userSelect: "none",
            background: "#fafafa",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: priorityColor[todo.priority],
                textTransform: "uppercase",
              }}
            >
              {todo.priority}
            </span>
            <span>{todo.text}</span>
            {todo.dueDate && (
              <span style={{ fontSize: 12, color: "#888" }}>
                · Due {todo.dueDate}
              </span>
            )}
            <span>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: statusColor[todo.completed ? "Completed" : "In Progress"],
                }}
              >
                {todo.completed ? "Completed" : "In Progress"}
              </span>
           </span>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={openModal}>Edit</button>
            <DeleteButton
              onClick={(e) => {
                e.stopPropagation();
                onDelete(todo.id);
              }}
            />
            <span>{isOpen ? "▲" : "▼"}</span>
          </div>
        </div>

        {/* Collapsible body */}
        {isOpen && (
          <div style={{ padding: "12px 16px", borderTop: "1px solid #eee" }}>
            <p style={{ margin: 0, color: "#555" }}>
              <strong>Notes:</strong> {todo.notes || "No notes yet."}
            </p>
          </div>
        )}
      </li>

      {/* Edit modal */}
      {isEditing && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: 24,
              width: 400,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <h2 style={{ margin: 0 }}>Edit Todo</h2>

            <label>
              Title
              <input
                style={{ display: "block", width: "100%", marginTop: 4 }}
                value={draft.text}
                onChange={(e) =>
                  setDraft((prev) => ({ ...prev, text: e.target.value }))
                }
              />
            </label>

            <label>
              Status
              <select
                style={{ display: "block", width: "100%", marginTop: 4 }}
                value={draft.completed ? "Completed" : "In Progress"}
                onChange={(e) =>
                  setDraft((prev) => ({ ...prev, completed: e.target.value === "Completed" }))
                }
              >
                {COMPLETED.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Notes
              <textarea
                style={{
                  display: "block",
                  width: "100%",
                  marginTop: 4,
                  minHeight: 80,
                }}
                value={draft.notes}
                onChange={(e) =>
                  setDraft((prev) => ({ ...prev, notes: e.target.value }))
                }
              />
            </label>

            <label>
              Priority
              <select
                style={{ display: "block", width: "100%", marginTop: 4 }}
                value={draft.priority}
                onChange={(e) =>
                  setDraft((prev) => ({ ...prev, priority: e.target.value }))
                }
              >
                {PRIORITIES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Due Date
              <input
                type="date"
                style={{ display: "block", width: "100%", marginTop: 4 }}
                value={draft.dueDate}
                onChange={(e) =>
                  setDraft((prev) => ({ ...prev, dueDate: e.target.value }))
                }
              />
            </label>

            <div
              style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}
            >
              <button onClick={cancelModal}>Cancel</button>
              <button onClick={saveModal}>Save</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TodoCard;
