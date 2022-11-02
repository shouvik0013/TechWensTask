const mongoose = require('mongoose');
const {Schema, SchemaType, Types} = mongoose;

const roles = {
	ADMIN: 'admin',
	USER: 'user'
}

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
	},
	password: {
		type: Schema.Types.String,
		required: true
	},
	role: {
		type: Schema.Types.String,
		enum: Object.keys(roles).map(key => roles[key]),
		default: roles.USER,
		required: false
	}
}, {timestamps: true});


const user = mongoose.model('User', userSchema);
module.exports.user = user;
module.exports.roles = roles;