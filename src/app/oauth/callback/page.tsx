import type { Metadata } from "next";

import { OAuthCallbackClient } from "./OAuthCallbackClient";

export const metadata: Metadata = {
  title: "Connecting to Ayati",
  description: "Return Quran Foundation sign-in to Ayati Quran Desktop Companion.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function OAuthCallbackPage() {
  return (
    <main id="main-content">
      <OAuthCallbackClient />
    </main>
  );
}
