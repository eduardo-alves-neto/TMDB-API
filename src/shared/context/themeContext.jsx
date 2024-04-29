import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { Box, ThemeProvider } from "@mui/material";
import { DarkTheme } from "../themes/Dark";
import { LigthTheme } from "../themes/ligth";

export const ThemeContext = createContext({});

export const useAppThemeContext = () => {
    return useContext(ThemeContext);
};

export const AppThemeProvider = ({ children }) => {
    const [themeName, setThemeName] = useState("light");

    const toggleTheme = useCallback(() => {
        setThemeName((oldThemeName) =>
            oldThemeName === "light" ? "dark" : "light"
        );
    }, []);

    const theme = useMemo(() => {
        if (themeName === "light") return LigthTheme;

        return DarkTheme;
    }, [themeName]);

    return (
        <ThemeContext.Provider value={{ themeName, toggleTheme }}>
            <ThemeProvider theme={theme}>
                <Box
                    width="100vw"
                    height="100vh"
                    bgcolor={theme.palette.background.default}
                >
                    {children}
                </Box>
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};
