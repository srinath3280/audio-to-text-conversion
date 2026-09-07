import React from "react";
import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <AppBar position="static">
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>

                <Typography variant="h6">
                    Audio Converter
                </Typography>

                <Box sx={{ display: "flex", gap: 2 }}>
                    <Button
                        component={Link}
                        to="/"
                        color="inherit"
                    >
                        Home
                    </Button>

                    <Button
                        component={Link}
                        to="/audio-convert"
                        color="inherit"
                    >
                        Convert Audio
                    </Button>
                </Box>

            </Toolbar>
        </AppBar>
    );
};

export default Navbar;