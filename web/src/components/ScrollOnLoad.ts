"use client";
import { useEffect } from "react";

interface ScrollOnLoadProps {
    amount?: number;
}

export default function ScrollOnLoad({ amount = 0 }: ScrollOnLoadProps) {
    console.log("123123")
    useEffect(() => {
        window.scrollTo({ top: amount, behavior: "smooth" });
    }, []);

    return null;
}
