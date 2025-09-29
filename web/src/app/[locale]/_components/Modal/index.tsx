// app/components/Modal.tsx
"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
};

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    if (!isOpen || !mounted) return null;

    return createPortal(
        <div
            onClick={onClose}
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.7)",
                zIndex: 9999,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    position: "relative",
                    minWidth: "250px",
                    maxWidth: "90%",
                    maxHeight: "90%",
                    overflow: "auto",
                    backgroundColor: "red",
                    padding: "16px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                    background: "#1a1a1a",
                    color: "#fff",
                }}
            >
                <button
                    onClick={onClose}
                    style={{
                        position: "absolute",
                        top: "8px",
                        right: "8px",
                        fontSize: "20px",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#bbb",
                    }}
                >
                    ✕
                </button>
                <div
                    style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "12px", textAlign: "center", height: "24px", marginTop: "4px" }}
                >
                    {title}
                </div>
                <div style={{ minHeight: "200px", minWidth: "250px" }}>
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
}
