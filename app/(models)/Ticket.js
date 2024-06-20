import mongoose, { Schema } from "mongoose";

const connectionString = process.env.MONGODB_URI;

if (!connectionString) {
    throw new Error("Please add your Mongo URI to .env.local");
}

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;

const ticketSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        category: { type: String, required: true },
        priority: { type: Number, required: true },
        progress: { type: Number, required: true },
        status: { type: String, required: true },
        active: { type: Boolean, default: true },
    },
    {
        timestamps: true,
    }
);

const Ticket = mongoose.models.Ticket || mongoose.model("Ticket", ticketSchema);
export default Ticket;
