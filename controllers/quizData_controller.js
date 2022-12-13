const express = require("express");
const Quizzes = require("../models/userQuizzes");
const router = express.router();

router.get("/:email", async (req, res) => {
  const email = req.params.email;
  try {
    const quizData = await Quizzes.getQuizData(email);

    res.status(200).json(quizData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  const { email, quizData, correctAnswers, userAnswers, score } = req.body;
  try {
    const quiz = await Quizzes.postQuiz(
      email,
      quizData,
      correctAnswers,
      userAnswers,
      score
    );
    res.status(200).json(quiz);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deletedQuizData = await Quizzes.deleteQuizData(id);

    res.status(200).json(deletedQuizData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
