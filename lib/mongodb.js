const mongoose = require('mongoose');
const config = require('../config');
const EnvVar = require('./mongodbenv');

const defaultEnvVariables = [
    { key: 'ALIVE_IMG', value: 'https://raw.githubusercontent.com/rasindus/My-md/refs/heads/main/Gemini_Generated_Image_hxiqmihxiqmihxiq.jpg' },
    { key: 'ALIVE_MSG', value: 'හායි I am alive❤️😇 කරුනාකර විදානයක් ලබාදෙන්න🤍😊  \n\n (This bot was created by Rasindu, and I am ready to recieve your commands!)" \n\n > 𝐌𝐚𝐝𝐞 𝐛𝐲 Rasindu❤️' },
    { key: 'PREFIX', value: '.' },
];

// MongoDB connection function
const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGODB);
        console.log('🛜 MongoDB Connected ✅');

        // Check and create default environment variables
        for (const envVar of defaultEnvVariables) {
            const existingVar = await EnvVar.findOne({ key: envVar.key });

            if (!existingVar) {
                // Create new environment variable with default value
                await EnvVar.create(envVar);
                console.log(`➕ Created default env var: ${envVar.key}`);
            }
        }

    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
