const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");

// Fetch all questions (ordered by latest)
async function getAllQuestions(req, res) {
  try {
    const [questions] = await dbConnection.query(
      "SELECT * FROM questions ORDER BY created_at DESC"
    );
    res.status(StatusCodes.OK).json(questions);
  } catch (error) {
    console.error(error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, try again later." });
  }
}

// Fetch question details by ID
async function getQuestionById(req, res) {
  const { id } = req.params;
  try {
    const [question] = await dbConnection.query(
      "SELECT * FROM questions WHERE question_id = ?",
      [id]
    );
    if (question.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Question not found." });
    }
    res.status(StatusCodes.OK).json(question[0]);
  } catch (error) {
    console.error(error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, try again later." });
  }
}

// Create a new question
async function createQuestion(req, res) {
  const { title, description, username } = req.body;
  if (!title || !description || !username) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide all required fields." });
  }
  try {
    const [result] = await dbConnection.query(
      "INSERT INTO questions (title, description, username) VALUES (?, ?, ?)",
      [title, description, username]
    );
    res.status(StatusCodes.CREATED).json({ question_id: result.insertId });
  } catch (error) {
    console.error(error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, try again later." });
  }
}

// Update a question by ID
async function updateQuestion(req, res) {
  const { id } = req.params;
  const { title, description } = req.body;
  if (!title && !description) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide at least one field to update." });
  }
  try {
    const [result] = await dbConnection.query(
      "UPDATE questions SET title = COALESCE(?, title), description = COALESCE(?, description) WHERE question_id = ?",
      [title, description, id]
    );
    if (result.affectedRows === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Question not found." });
    }
    res.status(StatusCodes.OK).json({ msg: "Question updated successfully." });
  } catch (error) {
    console.error(error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, try again later." });
  }
}

// Delete a question by ID
async function deleteQuestion(req, res) {
  const { id } = req.params;
  try {
    const [result] = await dbConnection.query(
      "DELETE FROM questions WHERE question_id = ?",
      [id]
    );
    if (result.affectedRows === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Question not found." });
    }
    res.status(StatusCodes.OK).json({ msg: "Question deleted successfully." });
  } catch (error) {
    console.error(error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, try again later." });
  }
}

module.exports = {
  getAllQuestions,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
};
