import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import ClientLayoutWrapper from "./components/ClientLayoutWrapper";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-primary",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-secondary",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://www.auramediamarketing.com"), // Change to your actual domain
  title: {
    default: "Aura Media Marketing | Enterprise Digital Agency",
    template: "%s | Aura Media",
  },
  description:
    "Aura Media Marketing is an elite digital architecture and marketing agency. We engineer highly scalable, secure enterprise web applications.",
  keywords: [
    "enterprise software",
    "web development agency",
    "Aura Media Marketing",
    "Next.js developers",
    "digital dominance",
  ],
  authors: [{ name: "Aura Media Team" }],
  creator: "Aura Media Marketing",
  publisher: "Aura Media Marketing",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Aura Media Marketing",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${spaceGrotesk.variable} scroll-smooth`} suppressHydrationWarning={true}>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      </head>
      <body suppressHydrationWarning={true} className="font-primary">
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}