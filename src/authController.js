const User = require('./models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {secret} = require("./config")

const generateAccessToken = (id) => {
	const payload = {
		id
	}
	return jwt.sign(payload, secret, {expiresIn: "1h"})
}

class authController {
	async registration(req, res){
		try {
			const {nickname, password, information} = req.body
			const person = await User.findOne({nickname})
			if (person){
				return res.status(400).json({message: "Already taken"})
			}
			const hashPassword = bcrypt.hashSync(password, 5)
			const user = new User({nickname, password: hashPassword, information})
			await user.save()
			return res.json({message: "Сompleted successfully"})
		} catch (error) {
			console.log(error)
			res.status(400).json({message: 'Registration error'})
		}
	}

	async login(req, res){
		try {
			const {nickname, password} = req.body
			const user = await User.findOne({nickname})
			if (!user) {
				return res.status(400).json({message: "%d not found", nickname})
			}
			const validPassword = bcrypt.compareSync(password, user.password)
			if (!validPassword) {
				return res.status(400).json({message: "Incorrect password"})
			}
			const token = generateAccessToken(user._id)
			return res.json({token})
		} catch (error) {
			console.log(error)
			res.status(400).json({message: 'Login error'})
		}
	}

	async getInf(req, res){
		try {
			const {nickname} = req.body
			const user = await User.findOne({nickname}, {_id: 0, nickname: 1, information: 1})
			res.json(user)
		} catch (error) {
			console.log(error)
			res.status(400).json({message: 'Get inf error'})
		}
	}
}

module.exports = new authController();