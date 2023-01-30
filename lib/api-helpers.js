export function extractUser(req) {
    if (!req.user) return null
    const {
        _id, name, email, phone, bio, profilePicture
    } = req.user
    return {
        _id, name, email, phone, bio, profilePicture
    }
}