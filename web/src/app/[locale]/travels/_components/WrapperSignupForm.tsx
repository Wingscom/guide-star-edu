"use client";

import { useState } from "react";
import { useScopedI18n } from "@/locales/client";
import { VisaSignUpForm } from "./VisaSignUpForm";

export default function WrapperSignUpForm() {
    const [recordModal, setRecordModal] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    const t = useScopedI18n("travels.popup");

    const brand = (
        <span style={{ color: "#f08c00", fontWeight: 700 }}>
            {t("brand")}
        </span>
    );

    const highlightBrand = (text: string) =>
        text.replaceAll(t("brand"), `<span style="color:#f08c00;font-weight:700">${t("brand")}</span>`);

    return (
        <main
            style={{ position: "fixed", bottom: 80, right: "8%" }}
            onMouseEnter={() => setShowPopup(true)}
            onMouseLeave={() => setShowPopup(false)}
        >
            <div style={{ position: "relative" }}>
                <div className="popup-trigger">{t("trigger")}</div>
                <div style={{ width: "100%", height: 20, position: "absolute", bottom: 45, right: 0 }} />

                <div className={`popup-box ${showPopup ? "show" : ""}`}>
                    <div dangerouslySetInnerHTML={{ __html: highlightBrand(t("content.intro")) }} />
                    <div style={{ marginTop: 20 }} dangerouslySetInnerHTML={{ __html: highlightBrand(t("content.commitmentTitle")) }} />
                    <ul>
                        <li>{t("content.commitments.0")}</li>
                        <li>{t("content.commitments.1")}</li>
                        <li>{t("content.commitments.2")}</li>
                        <li>{t("content.commitments.3")}</li>
                    </ul>
                    <div dangerouslySetInnerHTML={{ __html: highlightBrand(t("content.contact")) }} />
                    <ul>
                        <li>{t("content.hotlines.0")}</li>
                        <li>{t("content.hotlines.1")}</li>
                    </ul>
                    <div dangerouslySetInnerHTML={{ __html: highlightBrand(t("content.leaveInfo")) }} />
                    <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: 10 }}>
                        <div
                            style={{
                                backgroundColor: "#f08c00",
                                width: "fit-content",
                                padding: 8,
                                borderRadius: 100,
                                fontWeight: 600,
                                cursor: "pointer",
                            }}
                            onClick={() => setRecordModal(true)}
                        >
                            {t("signup")}
                        </div>
                    </div>
                    <div
                        style={{
                            position: "absolute",
                            bottom: -5,
                            borderRight: "1px solid #3f3f3fff",
                            borderBottom: "1px solid #3f3f3fff",
                            right: 100,
                            cursor: "pointer",
                            height: 10,
                            width: 10,
                            backgroundColor: "#2c2c2cff",
                            transform: "rotate(45deg)",
                        }}
                    />
                </div>
            </div>

            <VisaSignUpForm isOpen={recordModal} onClose={() => setRecordModal(false)} />

            <style>
                {`
                    .popup-trigger {
                        cursor: pointer;
                        background-color: #f08c00;
                        color: white;
                        font-weight: 700;
                        padding: 10px 20px;
                        border-radius: 30px;
                        width: fit-content;
                    }

                    .popup-box {
                        position: absolute;
                        bottom: 55px;
                        right: 0;
                        width: 800px;
                        background-color: #2c2c2cff;
                        white-space: pre-line;
                        font-size: 14px;
                        padding: 12px;
                        border-radius: 10px;
                        color: white;
                        display: flex;
                        flex-direction: column;
                        gap: 10px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                        z-index: 1000;
                        border: 1px solid #3f3f3fff;
                        transform: scale(0.8);
                        opacity: 0;
                        pointer-events: none;
                        transition: all 0.3s ease;
                        transform-origin: bottom right;
                    }

                    .popup-box.show {
                        transform: scale(1);
                        opacity: 1;
                        pointer-events: auto;
                    }
                `}
            </style>
        </main>
    );
}
