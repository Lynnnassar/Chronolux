const asyncHandler = require("../middlewares/asyncHandler");
const pageService = require("../services/pageService");

const getHomePage = asyncHandler(async (req, res) => {
  const data = await pageService.getHomePageData();
  res.status(200).json(data);
});

module.exports = {
  getHomePage,
};
