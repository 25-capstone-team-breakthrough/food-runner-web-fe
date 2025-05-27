export const API_BASE_URL =
    process.env.NODE_ENV === "development"
        ? "http://ec2-13-209-199-97.ap-northeast-2.compute.amazonaws.com:8080"
        : "https://13.209.199.97:8443";
