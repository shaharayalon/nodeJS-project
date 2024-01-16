import { Schema } from "mongoose";
import { ICard } from "../../@types/user";
import { imageSchema } from "./image-schema";
import { addressSchema } from "./adress-schema";

const cardSchema = new Schema<ICard>({
  title: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 256,
  },
  subtitle: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 256,
  },
  description: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 1024,
  },
  phone: {
    required: true,
    type: String,
    minlength: 9,
    maxlength: 15,
  },
  email: {
    required: true,
    type: String,
    minlength: 5,
    maxlength: 100,
  },
  web: {
    required: false,
    type: String,
    minlength: 14,
    default:
      "https://www.youtube.com/watch?v=3vUx1E7VEhg&ab_channel=Cohen%40Mushon-Topic",
  },
  image: {
    type: imageSchema,
    required: false,
    default: {
      alt: "user-profile",
      url: "https://picsum.photos/200/300",
    },
  },
  address: addressSchema,
  createdAt: {
    type: Date,
    required: false,
    default: new Date(),
  },
  userId: {
    required: true,
    type: String,
  },
  bizNumber: {
    required: false,
    type: Number,
    default: () => Math.round(Math.random() * 1_000_000),
    unique: true,
  },
  likes: [
    {
      type: String,
    },
  ],
});

export { cardSchema };
