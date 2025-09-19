"use client";

import { FacebookProvider, Login } from "react-facebook";

export default function FaceBookChat() {
  return (
    <FacebookProvider appId="1046238687424570">
      <Login
        onSuccess={(response) => console.log("Login success:", response)}
        onError={(error) => console.error("Login failed:", error)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Chat For GuideEduStar
      </Login>
    </FacebookProvider>
  );
}
