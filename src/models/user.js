const {Schema, model} = require('mongoose');

const User = new Schema({
	nickname: {type: String, unique: true, required: true},
	password: {type: String, required: true},
	information: {type: String}
})

module.exports = model('User', User);