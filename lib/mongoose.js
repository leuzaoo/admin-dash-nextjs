import mongoose from "mongoose";

export function mongooseConnect() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  } else {
    const uri = process.env.MONGODB_URI;
    console.log(uri);
    return mongoose.connect(uri, {
      useNewUrlParser: true,
    });
  }
}
