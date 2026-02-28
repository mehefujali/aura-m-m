export default function sitemap() {
    const baseUrl = "https://www.nexorzen.com";

    const staticRoutes = [
        "",
        "/about",
        "/services",
        "/portfolio",
        "/blogs",
        "/contact",
        "/book-a-meeting",
        "/privacy-policy",
        "/terms-of-service",
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1.0 : 0.8,
    }));

    return [...staticRoutes];
}