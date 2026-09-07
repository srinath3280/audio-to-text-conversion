import React from "react";
import { Box, Container, Typography, Paper } from "@mui/material";

const HomePage = () => {
    return (
        <Box
            sx={{
                minHeight: "calc(100vh - 64px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f5f7fa",
                padding: 3,
            }}
        >
            <Container maxWidth="md">
                <Paper
                    elevation={3}
                    sx={{
                        padding: { xs: 4, md: 7 },
                        textAlign: "center",
                        borderRadius: 3,
                    }}
                >
                    <Typography
                        variant="h3"
                        component="h1"
                        fontWeight="bold"
                        gutterBottom
                    >
                        Welcome to the Home Page
                    </Typography>

                    <Typography
                        variant="h6"
                        color="text.secondary"
                        sx={{ mb: 4 }}
                    >
                        Convert your audio files quickly and easily.
                    </Typography>
                </Paper>
            </Container>
        </Box>
    );
};

export default HomePage;