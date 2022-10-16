import React from "react";
import "./App.css";
import { HashRouter, NavLink } from "react-router-dom";
import Router, { PATH } from "../common/Routing/Route/Route";
import Header from "../common/Routing/Header/Header";
import { AppBar, Button, Toolbar } from "@mui/material";
import { useAppSelector } from "../layers/bll/store";

function App() {
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

    return (
        <div className="App">
            <HashRouter>
                {/*<Header />*/}
                {isLoggedIn ? (
                    <AppBar position="static">
                        <Toolbar>
                            <Button color="inherit">Ivan</Button>
                        </Toolbar>
                    </AppBar>
                ) : (
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
                            >
                                <NavLink
                                    to={PATH.LOGIN}
                                    style={{
                                        textDecoration: "none",
                                        color: "white",
                                    }}
                                >
                                    Sign In
                                </NavLink>
                            </Button>
                        </Toolbar>
                    </AppBar>
                )}
                {/*{status === "loading" && <LinearProgress />}*/}
                <Router />
            </HashRouter>
        </div>
    );
}

export default App;
