const { User } = require("../models/usersModels");
const { registerVAlidator, loginVAlidator } = require("./validator");
const bcript = require("bcrypt");
const jsonwebtoken = require('jsonwebtoken')
const getUsers = async (req, res) => {
  const users = await User.find({});
  await res.json({
    success: true,
    count: users.length,
    data: users,
  });
};

const getUser = async (req, res) => {
  const authorization_token = req.header('authorization-token')
  if(!authorization_token) return res.send('Token Not Present')
  const verify = jsonwebtoken.verify(authorization_token, 'hht677ft')
  await res.json({
    success: true,
    data: verify,
  });
};

const registerUsers = async (req, res) => {
  try {
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist)
      return await res.status(400).json({success: false, message:"User with this email already exist"});
    const { error } = registerVAlidator(req.body);
    if (error) return await res.status(400).json({success: false, message: error.details[0].message});
    const salt = await bcript.genSalt(5);
    const hashedPassword = await bcript.hash(req.body.password, salt)
    const user = await User.create({...req.body, password: hashedPassword});
    const token = jsonwebtoken.sign({_id: user._id}, 'ftyr55dftrsfr54dgft6')
    return await res.json({
      success: true,
      data: token,
    });
  } catch (error) {
    return res.json(error);
  }
};

const loginUser = async (req, res) => {
  try {
    console.log(req)
    const { error } = loginVAlidator(req.body)
    if(error) return await res.send({ error : error.details[0].message})
    const user = await User.findOne({ email: req.body.email })
    if(!user) return await res.send({ error : 'Invalid credentials'})
    const valid = await bcript.compare(req.body.password, user.password)
    if(!valid) return await res.send({ error : 'Invalid credentials'})
    const token = jsonwebtoken.sign({_id: user._id }, 'hht677ft',{ expiresIn : '86400' })
    req.headers.authorization = token
  
    res.header('x-access-token', token)
    res.json({token})

  } catch (error) {
    return res.status(500).json(error)
  }
};
const LogOutUser = async (req, res) => {
  req.headers.authorization = null
  res.render('pages/user-login-view')
}

module.exports = {
  getUsers,
  registerUsers,
  loginUser,
  getUser,
  LogOutUser
};
