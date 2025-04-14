import Pin from "../models/pin.model.js";

export const getPins = async (req, res) => {
  const pageNumber = Number(req.query.cursor) || 0;
  const LIMIT = 21;
  const pins = await Pin.find({})
    .limit(LIMIT)
    .skip(pageNumber * LIMIT);

  const hasNextPage = pins.length === LIMIT;
  await new Promise((resolve, reject) =>
    setTimeout(() => {
      resolve();
    }, 2000)
  );
  return res
    .status(200)
    .json({ pins, nextCursor: hasNextPage ? pageNumber + 1 : null });
};

export const getPin = async (req, res) => {
  const pinId = req.params.id;
  const pin = await Pin.findById(pinId);
  return res.status(200).json(pin);
};
