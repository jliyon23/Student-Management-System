import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
    activityName:{
        type: String,
        required: true,
    },
    activityDate:{
        type: Date,
        required: true,
    },
});

const Activity = mongoose.model("activity", activitySchema);

export default Activity;