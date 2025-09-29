"use client";

import { useState } from "react";
import { VisaSignUpForm } from "./VisaSignUpForm";

export default function WrapperSignUpForm() {
    const [recordModal, setRecordModal] = useState(false);

    return (
        <main>
            <div
                onClick={() => setRecordModal(true)}
                style={{ cursor: "pointer", color: "#0070f3", fontWeight: "bold" }}
            >
                Sign up for more!
            </div>
            <VisaSignUpForm isOpen={recordModal} onClose={() => setRecordModal(false)} />
        </main>
    );
}
