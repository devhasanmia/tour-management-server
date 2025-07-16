import { IUser } from "./user.interface";
import User from "./user.model";

const createUser = async (payload: Partial<IUser>) => {
    const { name, email } = payload;
    const user = await User.create({
        name,
        email
    })
    return user
}

const getAllUser = async () => {
    const result = await User.find();
    const total: number = await User.countDocuments();
    return {
        meta: {
            total
        },
        result
    }
}

export const UserServices = {
    createUser,
    getAllUser
}