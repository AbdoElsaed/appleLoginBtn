module.exports = {
    TEST_MODE: process.env.NODE_ENV != "production" ? true : false,
    NODE_ENV: process.env.NODE_ENV || "development",
    PORT: process.env.PORT || 3000,
  };
  