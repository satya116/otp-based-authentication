class userDto {
    id;
    username;
    createdAt;
    courses;
    phone;
    email;

    constructor (user) {
        this.id = user._id
        this.username = user?.username
        this.phone = user?.phone
        this.email = user?.email
        this.courses = []   //user.coarses
        this.createdAt = user?.createdAt;
    }

}



module.exports = userDto