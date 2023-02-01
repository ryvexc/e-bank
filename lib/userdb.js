import { ObjectId } from 'mongodb';

export async function getUser(req, userId) {
    const user = await req.db.users.findOne({
        _id: ObjectId(userId),
    });
    if (!user) return null;
    const {
        _id, name, email, phone, bio, profilePicture,
    } = user;
    const isAuth = _id === req.user?._id;
    return JSON.parse(JSON.stringify({
        _id,
        name,
        email: email,
        phone,
        bio: bio || 'Hey there, im using eRyvzsn',
        profilePicture: profilePicture || "",
    }));
} 