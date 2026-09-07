import React, { useState } from "react";
import {
    Box,
    Button,
    Container,
    Paper,
    Typography,
    Stack,
    Divider,
} from "@mui/material";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AudioFileIcon from "@mui/icons-material/AudioFile";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

const AudioConvert = () => {
    const [file, setFile] = useState(null);
    const [fileError, setFileError] = useState("");

    const [conversionData, setConversionData] = useState(null);
    const [isResponseFetching, setIsResponseFetching] = useState(false);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];

        if (!selectedFile) {
            return;
        }

        const allowedExtensions = ["mp3", "wav", "webm"];

        const fileExtension = selectedFile.name
            .split(".")
            .pop()
            .toLowerCase();

        if (!allowedExtensions.includes(fileExtension)) {
            setFile(null);
            setFileError(
                "Only MP3, WAV, and WEBM audio files are supported."
            );

            event.target.value = "";

            return;
        }

        setFileError("");
        setFile(selectedFile);
        setConversionData(null);
    };

    const handleConvert = () => {
        if (!file) {
            alert("Please select an audio file to convert.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("audio", file);

            for (const pair of formData.entries()) {
                console.log("Key:", pair[0]);
                console.log("File:", pair[1]);
            }

            setIsResponseFetching(true);

            axios.post(
                "http://localhost:5000/api/audio/convert-audio",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            ).then((res) => {
                console.log("Conversion Result:", res);
                console.log("Conversion Result:", res?.data);
                console.log("Conversion Result:", res?.data?.data);
                setConversionData(res?.data?.data);
            })
                .catch((error) => {
                    console.error("Error:", error);
                })
                .finally(() => {
                    setIsResponseFetching(false);
                });
        } catch (error) {
            console.error("Error during conversion:", error);
            alert("An error occurred during conversion. Please try again.");
            return;
        }
    };

    return (
        <Box
            sx={{
                minHeight: "calc(100vh - 64px)",
                backgroundColor: "#f5f7fa",
                py: 5,
            }}
        >
            <Container maxWidth="lg">
                <Paper
                    elevation={3}
                    sx={{
                        borderRadius: 3,
                        overflow: "hidden",
                    }}
                >
                    <Box
                        sx={{
                            textAlign: "center",
                            p: 4,
                            backgroundColor: "white",
                        }}
                    >
                        <Typography
                            variant="h4"
                            fontWeight="bold"
                            gutterBottom
                        >
                            Audio Converter
                        </Typography>

                        <Typography
                            variant="body1"
                            color="text.secondary"
                        >
                            Upload or record your audio and convert it easily.
                        </Typography>
                    </Box>

                    <Divider />

                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "1fr",
                                md: "1fr 1fr",
                            },
                        }}
                    >
                        {/* ================= LEFT SIDE ================= */}
                        <Box
                            sx={{
                                p: { xs: 3, md: 5 },
                                borderRight: {
                                    xs: "none",
                                    md: "1px solid #e0e0e0",
                                },
                            }}
                        >
                            <Typography
                                variant="h5"
                                fontWeight="bold"
                                gutterBottom
                            >
                                Input Audio
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mb: 3 }}
                            >
                                Upload an audio file or record your voice.
                            </Typography>

                            <Box
                                sx={{
                                    border: "2px dashed",
                                    borderColor: "primary.main",
                                    borderRadius: 3,
                                    p: 4,
                                    textAlign: "center",
                                    backgroundColor: "#fafafa",
                                }}
                            >
                                <CloudUploadIcon
                                    sx={{
                                        fontSize: 50,
                                        color: "primary.main",
                                        mb: 1,
                                    }}
                                />

                                <Typography
                                    variant="h6"
                                    gutterBottom
                                >
                                    Upload Audio
                                </Typography>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ mb: 2 }}
                                >
                                    Select an MP3, WAV, or WEBM audio file
                                </Typography>

                                <input
                                    type="file"
                                    accept=".mp3,.wav,.webm,audio/mpeg,audio/wav,audio/webm"
                                    id="audio-upload"
                                    hidden
                                    onChange={handleFileChange}
                                />

                                <label htmlFor="audio-upload">
                                    <Button
                                        variant="contained"
                                        component="span"
                                        startIcon={<CloudUploadIcon />}
                                        sx={{
                                            textTransform: "none",
                                            borderRadius: 2,
                                        }}
                                    >
                                        Choose Audio
                                    </Button>
                                </label>
                            </Box>

                            {fileError && (
                                <Typography
                                    color="error"
                                    variant="body2"
                                    sx={{
                                        mt: 2,
                                        textAlign: "center",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {fileError}
                                </Typography>
                            )}

                            {file && (
                                <Paper
                                    variant="outlined"
                                    sx={{
                                        mt: 3,
                                        p: 2,
                                        borderRadius: 2,
                                    }}
                                >
                                    <Stack
                                        direction="row"
                                        spacing={2}
                                        alignItems="center"
                                    >
                                        <AudioFileIcon color="primary" />

                                        <Box sx={{ flexGrow: 1 }}>
                                            <Typography fontWeight="bold">
                                                {file.name}
                                            </Typography>

                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                {(
                                                    file.size /
                                                    1024 /
                                                    1024
                                                ).toFixed(2)}{" "}
                                                MB
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </Paper>
                            )}

                            <Button
                                fullWidth
                                variant="contained"
                                color="success"
                                size="large"
                                disabled={!file || isResponseFetching}
                                startIcon={<AutorenewIcon />}
                                onClick={handleConvert}
                                sx={{
                                    mt: 4,
                                    py: 1.5,
                                    borderRadius: 2,
                                    textTransform: "none",
                                    fontSize: "1rem",
                                }}
                            >
                                {isResponseFetching ? (
                                    <Stack
                                        direction="row"
                                        spacing={1}
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <CircularProgress size={24} color="inherit" />
                                        <span>Processing...</span>
                                    </Stack>
                                ) : (
                                    "Convert Audio"
                                )}
                            </Button>
                        </Box>

                        {/* ================= RIGHT SIDE ================= */}
                        <Box
                            sx={{
                                p: { xs: 3, md: 5 },
                                backgroundColor: "#fcfcfc",
                            }}
                        >
                            <Typography
                                variant="h5"
                                fontWeight="bold"
                                gutterBottom
                            >
                                Conversion Result
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mb: 3 }}
                            >
                                Your conversion response will appear here.
                            </Typography>

                            {!conversionData ? (
                                /* Empty State */
                                <Box
                                    sx={{
                                        minHeight: 350,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        textAlign: "center",
                                        border: "1px dashed #ccc",
                                        borderRadius: 3,
                                        p: 3,
                                    }}
                                >
                                    <Box>
                                        <AudioFileIcon
                                            sx={{
                                                fontSize: 60,
                                                color: "text.disabled",
                                                mb: 2,
                                            }}
                                        />

                                        <Typography
                                            variant="h6"
                                            color="text.secondary"
                                        >
                                            No conversion data
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color="text.disabled"
                                        >
                                            Upload or record an audio file
                                            and click Convert Audio.
                                        </Typography>
                                    </Box>
                                </Box>
                            ) : (
                                <Paper
                                    elevation={2}
                                    sx={{
                                        p: 3,
                                        borderRadius: 3,
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        color="success.main"
                                        fontWeight="bold"
                                        gutterBottom
                                    >
                                        Conversion Successful
                                    </Typography>

                                    <Divider sx={{ my: 2 }} />

                                    <Stack spacing={2}>
                                        <Box>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                Status
                                            </Typography>

                                            <Typography fontWeight="bold">
                                                {conversionData.success}
                                            </Typography>
                                        </Box>

                                        <Box>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                Message
                                            </Typography>

                                            <Typography fontWeight="bold">
                                                {conversionData.message}
                                            </Typography>
                                        </Box>

                                        <Box>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                File Name
                                            </Typography>

                                            <Typography fontWeight="bold">
                                                {conversionData.file_name}
                                            </Typography>
                                        </Box>

                                        <Box>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                Conversion Text
                                            </Typography>

                                            <Typography fontWeight="bold">
                                                {conversionData.text}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </Paper>
                            )}
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default AudioConvert;