import mongoose, { Schema, SchemaTypes, Types } from 'mongoose';

const userSchema = new Schema({
	firstName: {
		type: Schema.Types.String,
		required: true
	},
	lastName: {
		type: Schema.Types.String,
		required: true
	},
	disabled: {
		type: Schema.Types.Boolean,
		required: false,
		default: false 
	},
	email: {
		type: Schema.Types.String,
		required: true
	},
	phone: {
		type: Schema.Types.Number,
		required: true 
	}
})


const user = mongoose.model('User', userSchema);
module.exports = user;