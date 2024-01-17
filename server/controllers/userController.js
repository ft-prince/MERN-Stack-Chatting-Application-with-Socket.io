// Import necessary modules and models
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

// Controller method for user login
module.exports.login = async (req, res, next) => {
  try {
    // Extract username and password from the request body
    const { username, password } = req.body;

    // Find user with the provided username
    const user = await User.findOne({ username });

    // Check if the user exists
    if (!user)
      return res.json({ msg: "Incorrect Username or Password", status: false });

    // Compare the provided password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // Check if the password is valid
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect Username or Password", status: false });

    // Remove the password from the user object before sending the response
    delete user.password;

    // Send a successful login response with the user information
    return res.json({ status: true, user });
  } catch (ex) {
    // Handle any errors by passing them to the error-handling middleware
    next(ex);
  }
};

// Controller method for user registration
module.exports.register = async (req, res, next) => {
  try {
    // Extract username, email, and password from the request body
    const { username, email, password } = req.body;

    // Check if the username is already in use
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "Username already used", status: false });

    // Check if the email is already in use
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });

    // Hash the provided password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    // Remove the password from the user object before sending the response
    delete user.password;

    // Send a successful registration response with the user information
    return res.json({ status: true, user });
  } catch (ex) {
    // Handle any errors by passing them to the error-handling middleware
    next(ex);
  }
};

// Controller method to get all users (except the authenticated user)
module.exports.getAllUsers = async (req, res, next) => {
  try {
    // Find all users except the authenticated user and select specific fields
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);

    // Send the list of users as a JSON response
    return res.json(users);
  } catch (ex) {
    // Handle any errors by passing them to the error-handling middleware
    next(ex);
  }
};

// Controller method to set the avatar for a user
module.exports.setAvatar = async (req, res, next) => {
  try {
    // Extract user ID and avatar image from the request parameters and body
    const userId = req.params.id;
    const avatarImage = req.body.image;

    // Update user data with the new avatar information
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );

    // Send a response indicating the success of setting the avatar
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (ex) {
    // Handle any errors by passing them to the error-handling middleware
    next(ex);
  }
};

// Controller method to handle user logout
module.exports.logOut = (req, res, next) => {
  try {
    // Check if user ID is provided in the request parameters
    if (!req.params.id)
      return res.json({ msg: "User id is required ", status: false });

    // Remove the user from the online users (if applicable)
    onlineUsers.delete(req.params.id);

    // Send a successful logout response
    return res.status(200).send();
  } catch (ex) {
    // Handle any errors by passing them to the error-handling middleware
    next(ex);
  }
};
