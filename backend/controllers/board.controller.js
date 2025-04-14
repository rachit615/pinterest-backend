import Board from "../models/board.model.js";
import Pin from "../models/pin.model.js";

export const getUserBoards = async (req, res) => {
  const userId = req.params.userId;
  const boards = await Board.find({ user: userId });

  const boardWithPinDetails = await Promise.all(
    boards.map(async (board) => {
      const pinCount = await Pin.countDocuments({ board: board._id });
      const firstPin = await Pin.findOne({ board: board._id });
      return {
        ...board.toObject(),
        pinCount,
        firstPin,
      };
    })
  );

  return res.status(200).json(boardWithPinDetails);
};
