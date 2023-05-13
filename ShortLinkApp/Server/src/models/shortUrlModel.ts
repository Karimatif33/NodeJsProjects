import mongoose, { Document } from "mongoose";
const { customAlphabet } = require('nanoid');

const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const idLength = 5;
const generateId = customAlphabet(alphabet, idLength);

export interface ShortURL extends Document {
  shortId: string;
  destination: string;
}

const schema = new mongoose.Schema({
  shortId: {
    type: String,
    unique: true,
    required: true,
    default: () => generateId(),
  },
  destination: { type: String, required: true },
});

const shortUrl = mongoose.model<ShortURL>("shortUrl", schema);

export default shortUrl;