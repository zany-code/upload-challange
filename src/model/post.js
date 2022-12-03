import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Posting = new Schema({
    body : {
        type : String,
        require : true
    },
    image : {
        type : String,
        require : true
    },
    creator : {
        type : String,
        require : true
    },
    createdAt : {
        type : Date,
        default : new Date()
    },
    comment : {
        type: String
    },
    likes : {
        type: [String],
        default : String
    },
},
    {
        timestamps : true
    }
)

const PostingModel = mongoose.model('PostingModel', Posting);

export default PostingModel;