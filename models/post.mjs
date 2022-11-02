import mongoose, { Schema } from 'mongoose';

const blogPostSchema = new Schema({
  title: {
    type: Schema.Types.String,
    required: true,
  }, // shorthand - title: String
  body: {
    type: Schema.Types.String,
    required: true,
  },
	author: {
		type: Schema.Types.ObjectId,
		ref: 'Author'
	},
	isActive: {
		type: Schema.Types.Boolean,
		default: true
	}
}, {timestamps: true});

const blogPost = mongoose.model('Post', blogPostSchema);
module.exports = blogPost;
