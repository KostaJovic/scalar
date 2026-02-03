import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    age: number;
}

const UserSchema: Schema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
