import React, { useEffect } from "react";
import "./App.css";
import { HashRouter, NavLink } from "react-router-dom";
import Router, { PATH } from "../common/Routing/Route/Route";
import { AppBar, Button, CircularProgress, Toolbar } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../layers/bll/store";
import { logoutTC } from "../layers/bll/auth-reducer";
import { initializeAppTC } from "../layers/bll/app-reducer";
import ErrorSnackbars from "../components/ErrorSnackbars/ErrorSnackbars";

function App() {
    const isLoggedIn = useAppSelector<boolean>(
        (state) => state.auth.isLoggedIn
    );
    const isInitialized = useAppSelector<boolean>(
        (state) => state.app.isInitialized
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(initializeAppTC());
    }, []);

    if (!isInitialized) {
        return (
            <div
                style={{
                    position: "fixed",
                    top: "30%",
                    textAlign: "center",
                    width: "100%",
                }}
            >
                <CircularProgress />
            </div>
        );
    }

    return (
        <div className="App">
            <ErrorSnackbars />
            <HashRouter>
                {/*<Header />*/}
                <AppBar
                    position="static"
                    style={{
                        alignItems: "flex-end",
                        backgroundColor: "white",
                    }}
                >
                    <Toolbar>
                        <Button
                            style={{
                                color: "white",
                                backgroundColor: "#366EFF",
                                boxShadow:
                                    "0px 4px 18px rgba(54, 110, 255, 0.35), inset 0px 1px 0px rgba(255, 255, 255, 0.3)",
                                borderRadius: "30px",
                                padding: "5px 25px 5px 25px",
                                fontFamily: "Montserrat",
                                textTransform: "capitalize",
                            }}
                            onClick={
                                isLoggedIn
                                    ? () => dispatch(logoutTC())
                                    : undefined
                            }
                        >
                            {isLoggedIn ? (
                                <>Log Out</>
                            ) : (
                                <NavLink
                                    to={PATH.LOGIN}
                                    style={{
                                        textDecoration: "none",
                                        color: "white",
                                    }}
                                >
                                    Sign In
                                </NavLink>
                            )}
                        </Button>
                    </Toolbar>
                </AppBar>
                {/*{status === "loading" && <LinearProgress />}*/}
                <Router />
            </HashRouter>
        </div>
    );
}

export default App;
