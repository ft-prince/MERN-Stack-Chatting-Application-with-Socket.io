// Import the Messages model to interact with the MongoDB collection
const Messages = require("../models/messageModel");

// Controller method to get messages between two users
module.exports.getMessages = async (req, res, next) => {
  try {
    // Extract 'from' and 'to' values from the request body
    const { from, to } = req.body;

    // Find messages between the specified users and sort them by updatedAt timestamp
    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    // Map messages to a simplified structure for response
    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from, // Indicate if the message is from the requesting user
        message: msg.message.text, // Extract the text of the message
      };
    });

    // Send the simplified messages as a JSON response
    res.json(projectedMessages);
  } catch (ex) {
    // Handle any errors by passing them to the error-handling middleware
    next(ex);
  }
};

// Controller method to add a new message
module.exports.addMessage = async (req, res, next) => {
  try {
    // Extract 'from', 'to', and 'message' values from the request body
    const { from, to, message } = req.body;

    // Create a new message entry in the Messages collection
    const data = await Messages.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    // Check if the message was successfully added and respond accordingly
    if (data) {
      return res.json({ msg: "Message added successfully." });
    } else {
      return res.json({ msg: "Failed to add message to the database." });
    }
  } catch (ex) {
    // Handle any errors by passing them to the error-handling middleware
    next(ex);
  }
};
