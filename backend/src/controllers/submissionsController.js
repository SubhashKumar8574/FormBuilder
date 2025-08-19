import Submission from "../models/Submission.js";
import Form from "../models/Form.js";

export const createSubmission = async (req, res) => {
  try {
    const formId = req.params.id;
    const form = await Form.findById(formId);

    if (!form) return res.status(404).json({ message: "Form not found" });

    const submission = new Submission({
      formId: formId,
      data: req.body,
    });

    await submission.save();
    res.status(201).json(submission);
  } catch (error) {
    res.status(500).json({ message: "Error creating submission", error });
  }
};

export const getSubmissions = async (req, res) => {
  try {
    const formId = req.params.id;
    const submissions = await Submission.find({ formId: formId });
    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving submissions", error });
  }
};
