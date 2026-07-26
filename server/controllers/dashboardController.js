const PDF = require("../models/PDF");
const User = require("../models/User");
const Quiz = require("../models/Quiz");
const Flashcard = require("../models/Flashcard");
const Note = require("../models/Note");

const getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;

    // Logged-in user
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Current user ke PDFs
    const userPDFs = await PDF.find({
      uploadedBy: userId,
    })
      .sort({ createdAt: -1 })
      .select("title filename uploadDate createdAt");

    const pdfIds = userPDFs.map((pdf) => pdf._id);

    // Current user ke PDFs se generate hua real data
    const totalPDFs = userPDFs.length;

    const totalQuizzes = await Quiz.countDocuments({
      pdfId: { $in: pdfIds },
    });

    const flashcardDocuments = await Flashcard.find({
      pdfId: { $in: pdfIds },
    });

    const noteDocuments = await Note.find({
      pdfId: { $in: pdfIds },
    });

    /*
      Agar ek Flashcard document ke andar cards array hai,
      to actual cards count hoga.

      Agar cards array nahi mila, to document count use hoga.
    */
    const totalFlashcards = flashcardDocuments.reduce(
      (total, flashcardDocument) => {
        if (Array.isArray(flashcardDocument.cards)) {
          return total + flashcardDocument.cards.length;
        }

        if (Array.isArray(flashcardDocument.flashcards)) {
          return total + flashcardDocument.flashcards.length;
        }

        return total + 1;
      },
      0
    );

    const totalNotes = noteDocuments.length;

    const recentPDFs = userPDFs.slice(0, 5);

    /*
      Abhi AI Chat model ki confirmed structure available nahi hai,
      isliye uska dummy count show nahi karenge.
    */

    const generatedContent =
      totalQuizzes + totalNotes + flashcardDocuments.length;

    const studyProgress =
      totalPDFs === 0
        ? 0
        : Math.min(
            100,
            Math.round((generatedContent / (totalPDFs * 3)) * 100)
          );

    // Real recent activity
    const activities = [];

    userPDFs.slice(0, 3).forEach((pdf) => {
      activities.push({
        type: "pdf",
        message: `Uploaded ${pdf.title || pdf.filename}`,
        date: pdf.createdAt || pdf.uploadDate,
      });
    });

    noteDocuments.slice(0, 3).forEach((note) => {
      activities.push({
        type: "note",
        message: `Generated notes for ${note.title || "a PDF"}`,
        date: note.updatedAt || note.createdAt,
      });
    });

    flashcardDocuments.slice(0, 3).forEach((flashcard) => {
      activities.push({
        type: "flashcard",
        message: "Generated flashcards",
        date: flashcard.updatedAt || flashcard.createdAt,
      });
    });

    const recentActivities = activities
      .filter((activity) => activity.date)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);

    return res.status(200).json({
      success: true,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        joinedDate: user.createdAt,
      },

      stats: {
        totalPDFs,
        totalQuizzes,
        totalFlashcards,
        totalNotes,
      },

      recentPDFs,
      recentActivities,
      studyProgress,
    });
  } catch (error) {
    console.error("Dashboard error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch dashboard data",
      error: error.message,
    });
  }
};

module.exports = {
  getDashboardData,
};