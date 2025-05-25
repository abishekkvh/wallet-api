import rateLimiter from "../config/upstash.js"; // this is the limiter object

const rateLimiterMiddleware = async (req, res, next) => {
  try {
    const { success } = await rateLimiter.limit("my-rate-limit");
    if (!success) {
      return res.status(429).json({ message: "Too Many Requests, Please Try Later" });
    }
    next();
  } catch (error) {
    console.error("Rate Limiter Error:", error);
    next(error);
  }
};

export default rateLimiterMiddleware;
