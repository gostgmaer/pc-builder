const mongoose = require('mongoose');


const componentSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: [
            'CPU', 'GPU', 'RAM', 'SSD', 'HDD', 'Motherboard', 'PSU',
            'Cooler', 'Fan', 'Case', 'WiFi Card', 'LAN Card', 'Sound Card',
            'Optical Drive', 'PCIe Card', 'Monitor', 'Keyboard', 'Mouse',
            'Headset', 'Cable', 'Adapter', 'Mount'
        ]

    },
    brand: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    specs: {
        type: Object,
        default: {}
    },
    imageUrl: {
        type: String,
        default: ''
    },
    compatibilityTags: {
        type: [String],
        default: []
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Component', componentSchema);