import { meminiUserActions } from "../../../store/user-calendar-store";
import GeneralForm from "../../general/components/general-form"
import { useDispatch, useSelector } from 'react-redux';
import { registerNewUser } from "../../../services/login-service.js";
import { useNavigate } from "react-router-dom";
import { UserSession } from "../interfaces/user-types";
import { RootState } from "../../../store";

export default function SignupPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userSession = useSelector((state: RootState) => state.meminiUser.userSession);

    const onLoginSuccess = (userCredentials : UserSession) => {   
        const userSession = {
            firstName: userCredentials.FirstName,
            lastName: userCredentials.LastName,
            email: userCredentials.Email,
            token: userCredentials.SessionToken
        };           
        dispatch(meminiUserActions.login({userSession:userSession}));   
    }

    const onClickSubmitRegisterNewUser = (formData: any) => {
         const newUserRequest = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password
        };

        registerNewUser(newUserRequest).then(response => {     
            if(response.data.Success) {
                onLoginSuccess(response.data.ResponseObject);
                navigate('/planning');
            } else {
                console.log(response.data.Message);
            }
        }).catch(e => console.log(e));        
    }  
    
    return <>    
        <>
        </>
       
    </>
}
