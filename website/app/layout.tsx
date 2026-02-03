import type { Metadata } from "next";
import "./globals.css";
import { ConvexProviderWrapper } from "./components/ConvexProvider";

export const metadata: Metadata = {
  title: "Thomas Boom",
  description: "Developer - Building mobile apps & web tools",
  other: {
    "me": "https://mastodon.social/@thomasboom",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ConvexProviderWrapper>
          {children}
        </ConvexProviderWrapper>
      </body>
    </html>
  );
}
