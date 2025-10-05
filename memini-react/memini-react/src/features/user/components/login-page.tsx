import { meminiUserActions } from "../../../store/user-calendar-store";
import GeneralForm from "../../general/components/general-form"
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from "../../../services/login-service.js";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../store";
import type { UserBasic, UserSession } from "../interfaces/user-types"
import { createRef, useState } from "react";
import { Typography, Box, TextField } from "@mui/material";
import logo from "../../../assets/images/memini-png.png";


import { Plug, ChevronUp, ChevronDown, Slash, ChevronsUpDown, Globe, Globe2, Boxes, Combine } from 'lucide-react';
import { Home, Settings, User, Bell, HelpCircle, MessageCircle, MessageSquareText } from "lucide-react";
import LucidIconButton from "../../../lucid/lucid-button-icon"
import MuiStyledTextField from "../../../mui-wrappers/mui-textfield-wrapper";
import MuiStyledButton from "../../../mui-wrappers/mui-button-wrapper";

function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userSession = useSelector((state: RootState) => state.meminiUser.userSession);

    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");


    function processLoginRequest() {
        const loginRequestData = {
            email: userEmail,
            password: userPassword
        };       

        loginUser(loginRequestData).then(response => {
            if(response.data.Success) {         
                onLoginSuccess(response.data.ResponseObject);
                navigate('/planning');
            }
            else {
                onLoginFail(response.data.ResponseObject);
            }
        }).catch(e => console.log(e));
    }
    
    const onLoginFail = (userCredentials: UserSession) => {
            //just show some error message.
    }

    const onLoginSuccess = (userCredentials: UserSession) => {   
        const userSession = {
            firstName: userCredentials.FirstName,
            lastName: userCredentials.LastName,
            email: userCredentials.Email,
            token: userCredentials.SessionToken
        };           

        console.log('Login success', userSession);
        dispatch(meminiUserActions.login({userSession:userSession}));   
    }  
    
    return <>  
        <div className="h-screen flex items-center justify-center">
            <div className="w-3/12 h-4/5 border border-bg-gray-100 rounded-3xl">
               <div className="grid grid-cols-6">
                    <div className="col-span-6 flex items-center justify-center mb-32 mt-8">
                        <Box
                            component="img"
                            src={logo}
                            alt="App Icon"
                            sx={{
                                width: 64,
                                height: 64,                                    
                                zIndex: 9999          
                            }}
                        />
                        <Typography variant="h4" className="font-semibold opacity-80">
                            Memini
                        </Typography>
                    </div>

                    <div className="col-span-6 flex items-center justify-center mb-8">                         
                         <MuiStyledTextField
                            required
                            size='medium'                     
                            id="outlined-basic"
                            label="Email"
                            placeholder="Enter email..."
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.currentTarget.value)}
                            variant="outlined"
                            className="w-3/4"
                            themeProps={{
                                paletteProfile: 'main',
                                borderProfile: 'semiStraight',
                                spacingProfile: 'roomy',
                                mode: 'light',
                                fontSize: '12px',
                                labelFontSize: '12px',
                                labelOpacity: 0.7,
                                helperTextFontSize:'11px',
                                helperTextOpacity:0.6                                 
                            }}
                            />
                    </div>

                    <div className="col-span-6 flex items-center justify-center mb-16">                         
                         <MuiStyledTextField
                            required
                            size='medium'
                            id="outlined-basic"
                            label="Password"
                            placeholder="Enter your password..."
                            value={userPassword}
                            onChange={(e) => setUserPassword(e.currentTarget.value)}
                            variant="outlined"
                            className="w-3/4"
                            themeProps={{
                                paletteProfile: 'main',
                                borderProfile: 'semiStraight',
                                spacingProfile: 'roomy',
                                mode: 'light',
                                fontSize: '12px',
                                labelFontSize: '12px',
                                labelOpacity: 0.7,
                                helperTextFontSize:'11px',
                                helperTextOpacity:0.6                                 
                            }}
                            />
                    </div>

                    <div className="col-span-6 flex justify-center mb-16">    

                        <div className="flex gap-4">
                            <MuiStyledButton themeColor = 'light' buttonSize = 'lg' buttonVariant = 'main' borderType = 'rounded' opacity={.85}> 
                                <Typography variant="subtitle2"> Register account</Typography>
                            </MuiStyledButton>

                            <MuiStyledButton themeColor = 'light' buttonSize = 'lg' buttonVariant = 'meminiThemeOutline' borderType = 'rounded' opacity={.85} onClick={() => {processLoginRequest()}}> 
                                <Typography variant="subtitle2"> Login </Typography>
                            </MuiStyledButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
       
    </>
}


export default LoginPage;