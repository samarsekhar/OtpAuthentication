import React, { useState } from "react";
import axios from "axios";
import { Box, Button, Container, Grid, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [otpSent, setOtpSent] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [otp, setOtp] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleNumChange = (e) => {
        const { value } = e.target;
        //regex to validate weather its number or not
        const numRegex = /^[0-9]+$/;

        //check if mobile number is valid
        if (value === "" || numRegex.test(value)) {
            if (value.length > 10) {
                setError("Enter a valid mobile number");
            } else {
                setError("");
                setPhoneNumber(value);
            }
        } else {
            setError("Enter a valid mobile number")
        }
    };

    const handleOtpChange = (e) => {
        const { value } = e.target;
        // regex to validate weather its num or not
        const numRegex = /^[0-9]+$/;

        //check if mobile number is valid
        if (value === "" || numRegex.test(value)) {
            if (value.length > 6) {
                setError("Enter valid otp");
            } else {
                setError("");
                setOtp(value);
            }
        } else {
            setError("Enter valid otp");
        }
    };

    const sendOtp = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/api/v1/generateOtp`, { phoneNumber });
            setOtpSent(true);
            console.log(response)
        } catch (error) {
            setOtpSent(false);
        }
    };

    const verifyOtp = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/api/v1/verifyOtp`, { phoneNumber, otp });
            console.log(response);
            navigate("/dashboard");
        } catch (error) { }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!otpSent) {
            sendOtp();
        } else {
            verifyOtp();
        }
    };

    return (
        <div>
            <Container sx={{ margin: "3rem auto" }} maxWidth="sm">
                <Grid>
                    <Box component="form" sx={{ bgcolor: "#cfe8fc", padding: "5rem 3rem", borderRadius: "20px" }}>
                        <h1>Login/SingUp</h1>
                        {!otpSent ? (<Box>
                            <TextField id="outlined-basic" label="Phone Number" placeholder="Enter Number" variant="outlined" sx={{ marginBottom: "1rem" }} fullWidth value={phoneNumber} onChange={handleNumChange} error={error.error} helperText={error.error} />
                        </Box>) : (<Box>
                            <TextField id="outlined-basic" label="OTP" placeholder="Enter OTP" variant="outlined" sx={{ marginBottom: "1rem" }} fullWidth value={otp} onChange={handleOtpChange} error={error.error} helperText={error.error} />
                        </Box>
                        )}

                        <Button variant="contained" size="large" sx={{ marginBottom: "1rem" }} fullWidth onClick={handleSubmit}>
                            {!otpSent ? "Send OTP" : " Verify OTP"}
                        </Button>
                    </Box>
                </Grid>
            </Container>
        </div>
    )
}

export default Login;