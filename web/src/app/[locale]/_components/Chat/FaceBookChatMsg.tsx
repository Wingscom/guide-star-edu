"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import "./Chat.css";
import Link from "next/link";
import { LINK_PAGE_FACEBOOK } from "@/links";

export default function FaceBookChat() {
  const [clicked, setClicked] = useState(false);

  const handleClick = useCallback(() => {
    setClicked(false);
    requestAnimationFrame(() => setClicked(true));
  }, []);

  return (
    <Link
      href={LINK_PAGE_FACEBOOK}
      target="_blank"
      className={`wrapper-fb-icon pulse ${clicked ? "clicked" : ""}`}
      onClick={handleClick}
      onAnimationEnd={() => setClicked(false)}
    >
      <Image
        className="img-facebook-wrapper"
        src="/images/Facebook_Messenger_logo_2020.svg"
        alt="Facebook Messenger"
        height={56}
        width={56}
        priority
      />
    </Link>
  );
}
