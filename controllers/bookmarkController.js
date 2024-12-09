const betaHouse = require("../models/betahouses");
const customError = require("../utils/customError");

// ======= CONTROLLER TO FIND ALL BOOKMARKED HOUSES ======
const allBookmarks = async (req, res) => {
  const { userId } = req.user;
  const bookmarks = await betaHouse.find({ bookmarkedBy: userId });
  res.status(200).json({ data: bookmarks });
};

// ======= CONTROLLER TO ADD A HOUSE TO BOOKMARK =========
const addBookmark = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;

    const bookMarkedHouses = await betaHouse.findOneAndUpdate(
      { _id: id },
      { $push: { bookmarkedBy: userId } }
    );

    if (!bookMarkedHouses) {
      return next(customError(`No House with ID: ${id}`, 400));
    }
    res.status(200).json({ message: "House BookMarked!" });
  } catch (error) {
    console.log("Error in addBookmark", error);
  }
};

// ====== CONTROLLER TO REM0VE A HOUSE FROM BOOKMARK ==========
const removeBookmark = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;

  const bookMarkedHouses = await betaHouse.findOneAndUpdate(
    { _id: id },
    { $pull: { bookmarkedBy: userId } }
  );
  if (!bookMarkedHouses) {
    return next(customError(`No House with ID: ${id}`, 400));
  }
  res.status(200).json({ message: "Bookmarked Removed" });
};

module.exports = { allBookmarks, addBookmark, removeBookmark };
