const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true // Corrected typo
        },
        desc: {
            type: String,
            max: 200
        },
        img: {
            type: String
        },
        likes: {
            type: Array,
            default: []
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
