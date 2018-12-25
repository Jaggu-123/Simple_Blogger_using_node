const mongoose = require("mongoose");
const { Schema } = mongoose;

const BlogSchema = new Schema({
    name: String,
    image: String,
    description: String,
    message: String,
    _user: { type: Schema.Types.ObjectId, ref: "User" },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    dateMade: Date
});

mongoose.model("blogs", BlogSchema);
