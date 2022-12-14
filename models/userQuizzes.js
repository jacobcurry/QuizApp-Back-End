const mongoose = require("mongoose");

const userQuizSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    quizData: Array,
    correctAnswers: Array,
    userAnswers: Array,
    score: String,
  },
  { timestamps: true }
);

userQuizSchema.statics.postQuiz = async function (
  email,
  quizData,
  correctAnswers,
  userAnswers,
  score
) {
  if (!email || !quizData || !correctAnswers || !userAnswers || !score) {
    throw Error("all fields must be present");
  }

  const returnedQuizData = await this.create({
    email,
    quizData,
    correctAnswers,
    userAnswers,
    score,
  });

  return returnedQuizData;
};

userQuizSchema.statics.getQuizData = async function (email) {
  const quizData = await this.find({ email });

  return quizData;
};

userQuizSchema.statics.deleteQuizData = async function (id) {
  const deletedQuiz = await this.findOneAndDelete({ _id: id });

  return deletedQuiz;
};

userQuizSchema.statics.updateEmail = async function (emailParam, email) {
  const updatedQuizzes = await this.updateMany(
    { email: emailParam },
    { $set: { email: email } }
  );

  return updatedQuizzes;
};

module.exports = mongoose.model("Quiz", userQuizSchema);
