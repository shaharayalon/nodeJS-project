import { ObjectId } from "mongoose";

type IName = {
  first: string;
  middle?: string;
  last: string;
};

type IAddress = {
  street: string;
  city: string;
  state?: string;
  country: string;
  houseNumber: number;
  zip?: string;
};

type IImage = {
  alt: string;
  url: string;
};

type IUser = {
  name: IName;
  address: IAddress;
  image?: IImage;
  email: string;
  phone: string;
  password: string;
  isBusiness: boolean;
  isAdmin?: boolean;
  createdAt?: Date;
  _id?: string;
};

type ILogin = {
  email: string;
  password: string;
};

type IJWTPayload = {
  email: string;
};

type ICardInput = {
  title: string;
  subtitle: string;
  description: string;
  phone: string;
  email: string;
  web: string;
  address: IAddress;
  image: Image;
};
type ICard = ICardInput & {
  bizNumber?: number;
  userId?: string;
  _id?: string;
  likes: string[];
  createdAt: Date;
};

type IBusiness = {
  isBusiness: boolean;
};
type ILike = {
  likes: string[];
};

export {
  IUser,
  IName,
  IAddress,
  IImage,
  ILogin,
  IJWTPayload,
  ICard,
  ICardInput,
  IBusiness,
  ILike,
};
