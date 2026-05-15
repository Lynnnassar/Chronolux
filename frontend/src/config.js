const config = {
  API_BASE_URL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
  IMAGE_BASE_URL:
    import.meta.env.VITE_IMAGE_BASE_URL || "http://localhost:4000",
};

export default config;
