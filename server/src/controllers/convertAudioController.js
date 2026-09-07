const AudioService = require('../services/convertAudioService');

const convertAudio = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Audio file is required'
            });
        }

        const service = AudioService();
        const result = await service.convertAudio(req.file);

        return res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        console.error('Error converting audio:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

const testAudio = async (req, res) => {
    try {
        const service = AudioService();
        const response = await service.testAudio();

        return res.status(200).json({
            success: true,
            message: response || "Audio conversion service is working!"
        });
    } catch (error) {
        console.error('Error testing audio service:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

module.exports = {
    convertAudio,
    testAudio
};
