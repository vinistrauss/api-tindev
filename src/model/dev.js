const { Schema, model } = require("mongoose");

const DevSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    user: {
      type: String,
      required: true
    },
    bio: String,
    avatar: {
      type: String,
      required: true
    },
    likes: [{ type: Schema.Types.ObjectId, ref: "Dev" }],
    dislikes: [{ type: Schema.Types.ObjectId, ref: "Dev" }],
    superlikes: [{ type: Schema.Types.ObjectId, ref: "Dev" }]
  },
  {
    stimestamps: true
  }
);

//timestamps cria para cada propriedade createdAt, updateAt

module.exports = model("Dev", DevSchema);
