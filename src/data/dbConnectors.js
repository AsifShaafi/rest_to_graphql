import mongoose from "mongoose";

// Mongo connection
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/contacts_rest_to_graphql", {
  useMongoClient: true,
});

const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  company: {
    type: String,
  },
});

export const Contacts = mongoose.model("contacts", contactSchema);
