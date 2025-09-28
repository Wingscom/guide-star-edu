"use client";

import { useIsMobile } from "@/hooks";
import Modal from "../../_components/Modal";
import { useEffect, useState } from "react";
import { testEmailRegex } from "@/helpers";
import { isNumberLike } from "@mantine/core";
import Loading from "../../_components/Loading";

const formSubmitEndpoint = "https://script.google.com/macros/s/AKfycbyv2ye-sQojpZ3e8btBzWJhiuoTiqe5GkFtupISb6XbF3nxYIIc1ivoSMq3q6g-FUx3/exec";

interface VisaSignUpFormProps {
    isOpen?: boolean;
    onClose?: () => void;
}

export function VisaSignUpForm({
    isOpen = false,
    onClose,
}: Readonly<VisaSignUpFormProps>) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [emailValue, setEmailValue] = useState<string | undefined>(undefined);
    const [nameValue, setNameValue] = useState<string | undefined>(undefined);
    const [passengerCount, setPassengerCount] = useState<string | undefined>("1");
    const [phoneValue, setPhoneValue] = useState<string | undefined>(undefined);
    const [submissionStatus, setSubmissionStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    const isMobile = useIsMobile();

    useEffect(() => {
        setIsModalOpen(isOpen);
    }, [isOpen]);

    function handleModalClose() {
        setIsModalOpen(false);
        onClose?.();
    }

    function canSubmit() {
        return (
            nameValue !== undefined && nameValue.length > 0 &&
            emailValue !== undefined && emailValue.length > 0 &&
            phoneValue !== undefined && phoneValue.length > 0 &&
            passengerCount !== undefined && parseInt(passengerCount) > 0 &&
            submissionStatus === "idle"
        );
    }

    const handleSubmit = async () => {
        setSubmissionStatus("submitting");
        try {
            const params = new URLSearchParams({
                name: nameValue || "",
                email: emailValue || "",
                phone: phoneValue || "",
                passengers: passengerCount || "1",
            });
            const res = await fetch(`${formSubmitEndpoint}?${params.toString()}`, { method: "GET" });
            if (!res.ok) {
                const text = await res.text().catch(() => "");
                throw new Error(`Submission failed: ${res.status} ${text}`);
            }
            setSubmissionStatus("success");
        } catch (error) {
            setSubmissionStatus("error");
        }
    };

    function renderFormBody() {
        return (
            <>
                <div style={{ display: "flex", gap: "15px", flexWrap: "wrap", justifyContent: "space-between", marginTop: "30px", width: "100%" }}>
                    <div style={{ flex: isMobile ? "1 1 100%" : "1 1 45%" }}>
                        <label style={{ display: "block", marginBottom: "6px", fontSize: 14 }}>
                            Full Name:
                            <span style={{ color: "red", marginLeft: "4px" }}>*</span>
                        </label>
                        <input
                            value={nameValue ?? ""}
                            onChange={(e) => setNameValue(e.target.value)}
                            type="text"
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "6px",
                                border: "1px solid #444",
                                background: "#2c2c2c",
                                color: "#fff",
                            }}
                        />
                        <div style={{ marginTop: "4px" }}>
                            {nameValue !== undefined && nameValue.length === 0 && <div style={{ color: "red", fontSize: "12px" }}>Name must not be empty.</div>}
                        </div>
                    </div>

                    <div style={{ flex: isMobile ? "1 1 100%" : "1 1 45%" }}>
                        <label style={{ display: "block", marginBottom: "6px", fontSize: 14 }}>
                            Email:
                            <span style={{ color: "red", marginLeft: "4px" }}>*</span>
                        </label>
                        <input
                            value={emailValue}
                            onChange={(e) => setEmailValue(e.target.value)}
                            type="email"
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "6px",
                                border: "1px solid #444",
                                background: "#2c2c2c",
                                color: "#fff",
                            }}
                        />
                        <div style={{ marginTop: "4px" }}>
                            {
                                emailValue !== undefined &&
                                !(emailValue.length > 0 && testEmailRegex(emailValue)) && (
                                    <div style={{ color: "red", fontSize: "12px" }}>Email must be valid.</div>
                                )
                            }
                        </div>
                    </div>

                    <div style={{ flex: isMobile ? "1 1 100%" : "1 1 45%" }}>
                        <label style={{ display: "block", marginBottom: "6px", fontSize: 14 }}>
                            Phone number:
                            <span style={{ color: "red", marginLeft: "4px" }}>*</span>
                        </label>
                        <input
                            value={phoneValue}
                            onChange={(e) => setPhoneValue(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "6px",
                                border: "1px solid #444",
                                background: "#2c2c2c",
                                color: "#fff",
                            }}
                        />
                        <div style={{ marginTop: "4px" }}>
                            {
                                phoneValue !== undefined &&
                                !(phoneValue.length > 0 && isNumberLike(phoneValue)) && (
                                    <div style={{ color: "red", fontSize: "12px" }}>Phone number must be valid.</div>
                                )
                            }
                        </div>
                    </div>

                    <div style={{ flex: isMobile ? "1 1 100%" : "1 1 45%" }}>
                        <label style={{ display: "block", marginBottom: "6px", fontSize: 14 }}>
                            Number of passengers:
                            <span style={{ color: "red", marginLeft: "4px" }}>*</span>
                        </label>
                        <input
                            type="number"
                            value={passengerCount}
                            onChange={(e) => setPassengerCount(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "6px",
                                border: "1px solid #444",
                                background: "#2c2c2c",
                                color: "#fff",
                            }}
                        />
                        <div style={{ marginTop: "4px" }}>
                            {
                                passengerCount !== undefined &&
                                !(passengerCount.length > 0 && parseInt(passengerCount) > 0) && (
                                    <div style={{ color: "red", fontSize: "12px" }}>Passenger count must be greater than zero.</div>
                                )
                            }
                        </div>
                    </div>
                </div>

                <button
                    disabled={!canSubmit()}
                    onClick={() => handleSubmit()}
                    style={{
                        marginTop: "50px",
                        width: "100%",
                        padding: "12px",
                        borderRadius: "6px",
                        background: "#0070f3",
                        border: "none",
                        color: "#fff",
                        fontWeight: "bold",
                        opacity: canSubmit() ? 1 : 0.4,
                        cursor: canSubmit() ? "pointer" : "not-allowed",
                    }}
                >
                    Submit
                </button>
            </>
        )
    }

    function renderForm() {
        switch (submissionStatus) {
            case "idle":
                return renderFormBody();
            case "submitting":
                return <Loading />;
            case "success":
                return (<div style={{ marginTop: "40px" }}>Thank you for your submission! We will get back to you soon.</div>);
            case "error":
                return (<div style={{ marginTop: "40px" }}>There was an error submitting the form. Please try again later.</div>);
            default:
                return (<div>placeholder</div>);
        }
    }

    return (
        <Modal title="Travel Registration" isOpen={isModalOpen} onClose={() => {setIsModalOpen(false); onClose?.();}}>
            {renderForm()}
        </Modal>
    )
}