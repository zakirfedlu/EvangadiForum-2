const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");

// Fetch all answers for a specific question
async function getAnswersByQuestionId(req, res) {
  const { questionId } = req.params;
  try {
    const [answers] = await dbConnection.query(
      "SELECT * FROM answers WHERE question_id = ? ORDER BY created_at DESC",
      [questionId]
    );
    if (answers.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "No answers found for this question." });
    }
    res.status(StatusCodes.OK).json(answers);
  } catch (error) {
    console.error("Error fetching answers:", error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, try again later." });
  }
}

// Create a new answer
async function createAnswer(req, res) {
  const { questionId } = req.params;
  const { body, username } = req.body;
  if (!body || !username) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide all required fields (body and username)." });
  }
  try {
    const [result] = await dbConnection.query(
      "INSERT INTO answers (question_id, body, username) VALUES (?, ?, ?)",
      [questionId, body, username]
    );
    res.status(StatusCodes.CREATED).json({ answer_id: result.insertId });
  } catch (error) {
    console.error("Error creating answer:", error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, try again later." });
  }
}

// Update an existing answer
async function updateAnswer(req, res) {
  const { id } = req.params;
  const { body } = req.body;
  if (!body) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide the updated answer body." });
  }
  try {
    const [result] = await dbConnection.query(
      "UPDATE answers SET body = ? WHERE answer_id = ?",
      [body, id]
    );
    if (result.affectedRows === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Answer not found." });
    }
    res.status(StatusCodes.OK).json({ msg: "Answer updated successfully." });
  } catch (error) {
    console.error("Error updating answer:", error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, try again later." });
  }
}

// Delete an answer
async function deleteAnswer(req, res) {
  const { id } = req.params;
  try {
    const [result] = await dbConnection.query(
      "DELETE FROM answers WHERE answer_id = ?",
      [id]
    );
    if (result.affectedRows === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Answer not found." });
    }
    res.status(StatusCodes.OK).json({ msg: "Answer deleted successfully." });
  } catch (error) {
    console.error("Error deleting answer:", error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, try again later." });
  }
}

module.exports = {
  getAnswersByQuestionId,
  createAnswer,
  updateAnswer,
  deleteAnswer,
};
