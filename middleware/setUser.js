module.exports = (req, res, next) => {
  // Example: Extract user ID from the Authorization header or similar
  const token = req.headers.authorization;

  // Dummy authentication logic: Replace with real token validation
  if (token === "valid-token") {
    req.user = { _id: "user-id-from-token" }; // Replace with actual user ID extraction
  } else {
    req.user = null;
  }

  next();
};
