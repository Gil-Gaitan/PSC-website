const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxlength: [200, 'Title cannot be more than 200 characters']
    },
    url: {
        type: String,
        required: [true, 'URL is required'],
        trim: true,
        validate: {
            validator: function (v) {
                return /^https?:\/\/.+/.test(v);
            },
            message: 'URL must be a valid HTTP or HTTPS URL'
        }
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        maxlength: [500, 'Description cannot be more than 500 characters']
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        trim: true,
        enum: ['Learning', 'Development', 'Tools', 'Inspiration', 'News', 'Other']
    },
    tags: [{
        type: String,
        trim: true
    }],
    author: {
        type: String,
        trim: true,
        default: 'Gil Gaitan'
    },
    featured: {
        type: Boolean,
        default: false
    },
    clicks: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    }
}, {
    timestamps: true
});

// Index for better query performance
linkSchema.index({ category: 1 });
linkSchema.index({ featured: 1 });
linkSchema.index({ status: 1 });
linkSchema.index({ tags: 1 });

// Method to increment click count
linkSchema.methods.incrementClicks = function () {
    this.clicks += 1;
    return this.save();
};

// Static method to get links by category
linkSchema.statics.getByCategory = function (category) {
    return this.find({ category, status: 'active' }).sort({ createdAt: -1 });
};

// Static method to get featured links
linkSchema.statics.getFeatured = function () {
    return this.find({ featured: true, status: 'active' }).sort({ createdAt: -1 });
};

module.exports = mongoose.model('Link', linkSchema);
