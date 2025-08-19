import Form from "../models/Form.js";
import Submission from "../models/Submission.js";

export const getAnalytics = async (req, res) => {
  try {
    const formId = req.params.id;

    const submissionCount = await Submission.countDocuments({ formId });
    const submissions = await Submission.find({ formId });

    res.status(200).json({
      submissionCount,
      submissions,
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving analytics", error });
  }
};
