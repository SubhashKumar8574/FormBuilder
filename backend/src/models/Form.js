import mongoose from 'mongoose';

const formSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    fields: [
        {
            fieldType: {
                type: String,
                enum: ['text', 'email', 'select', 'checkbox', 'radio', 'textarea', 'file'],
                required: true,
            },
            label: {
                type: String,
                required: true,
            },
            required: {
                type: Boolean,
                default: false,
            },
            placeholder: {
                type: String,
            },
            options: {
                type: [String],
            },
            validation: {
                type: String,
            },
        },
    ],
    submissionLimit: {
        type: Number,
        default: 0,
    },
    thankYouMessage: {
        type: String,
    },
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Form = mongoose.model('Form', formSchema);

export default Form;