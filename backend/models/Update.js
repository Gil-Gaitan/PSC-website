const mongoose = require('mongoose');

const updateSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxlength: [200, 'Title cannot be more than 200 characters']
    },
    content: {
        type: String,
        required: [true, 'Content is required'],
        trim: true,
        maxlength: [5000, 'Content cannot be more than 5000 characters']
    },
    author: {
        type: String,
        required: [true, 'Author is required'],
        trim: true,
        default: 'Gil Gaitan'
    },
    publishDate: {
        type: Date,
        default: Date.now
    },
    featured: {
        type: Boolean,
        default: false
    },
    tags: [{
        type: String,
        trim: true
    }],
    status: {
        type: String,
        enum: ['draft', 'published', 'archived'],
        default: 'published'
    },
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Index for better query performance
updateSchema.index({ publishDate: -1 });
updateSchema.index({ featured: 1 });
updateSchema.index({ status: 1 });
updateSchema.index({ tags: 1 });

// Virtual for formatted date
updateSchema.virtual('formattedDate').get(function () {
    return this.publishDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
});

// Ensure virtual fields are serialized
updateSchema.set('toJSON', { virtuals: true });
updateSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Update', updateSchema);
