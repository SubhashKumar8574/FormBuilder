import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
    formId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Form'
    },
    responses: {
        type: Object,
        required: true
    },
    submittedAt: {
        type: Date,
        default: Date.now
    }
});

const Submission = mongoose.model('Submission', submissionSchema);

export default Submission;