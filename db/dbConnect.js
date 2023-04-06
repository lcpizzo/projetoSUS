import mongoose from "mongoose";

const URI =
  "mongodb+srv://leonardopizzo:sistemasDistribuidos@cluster0.i1gvnkn.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db = mongoose.connection;

export default db;