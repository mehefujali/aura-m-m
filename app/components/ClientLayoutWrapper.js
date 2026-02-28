"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import FloatingButtons from "./FloatingButtons";

export default function ClientLayoutWrapper({ children }) {
    const pathname = usePathname();
    const isAdminPage = pathname?.startsWith("/admin");

    return (
        <>
            {!isAdminPage && <Header />}
            <main className={isAdminPage ? "" : "min-h-[55vh]"}>{children}</main>
            {!isAdminPage && <Footer />}
            {!isAdminPage && <FloatingButtons />}
        </>
    );
}