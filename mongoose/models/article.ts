import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

export interface ArticleDoc extends mongoose.Document {
  title: string;
  description: string;
  rating: number;
}

const articleSchema = new Schema<ArticleDoc>(
  {
    title: {
      type: String,
      required: [true, "Please enter your Title"],
      trim: true,
      maxLength: [10000, "Title cannot exceed 500 characters"],
    },
    description: {
      type: String,
      required: [true, "Please input your Description"],
      trim: true,
      maxLength: [10000, "Description cannot exceed 10000 characters"],
    },
    rating: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

articleSchema.pre<ArticleDoc>("save", function (next) {
  this.title = this.title.charAt(0).toUpperCase() + this.title.slice(1);
  this.description =
    this.description.charAt(0).toUpperCase() + this.description.slice(1);
  next();
});

export default models.Article || model<ArticleDoc>("Article", articleSchema);
