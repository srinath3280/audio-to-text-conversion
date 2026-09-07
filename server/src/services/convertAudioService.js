require("dotenv").config();
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const AudioService = () => {
    const convertAudio = async (file) => {
        try {
            const formData = new FormData();

            formData.append(
                'file',
                fs.createReadStream(file.path),
                {
                    filename: file.originalname,
                    contentType: file.mimetype
                }
            );

            const response = await axios.post(
                `${process.env.PYTHON_SERVER_URL}/transcribe`,
                formData,
                {
                    headers: {
                        ...formData.getHeaders()
                    },

                    maxContentLength: Infinity,
                    maxBodyLength: Infinity
                }
            );

            console.log("Conversion Result:", response);
            console.log("Conversion Result:", response.data);

            return response.data;
        } catch (error) {
            throw new Error('Audio conversion failed');
        }
    };

    const testAudio = async () => {
        try {
            const response = "Audio conversion service is working!";
            return response;
        } catch (error) {
            throw new Error('Audio service test failed');
        }
    }

    return {
        convertAudio,
        testAudio
    };
};

module.exports = AudioService;
