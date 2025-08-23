import { meminiUserActions } from "../../../store/user-calendar-store";
import GeneralForm from "../../general/components/general-form"
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from "../../../services/login-service.js";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../store";
import type { UserBasic, UserSession } from "../interfaces/user-types"

function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userSession = useSelector((state: RootState) => state.meminiUser.userSession);

    function processLoginRequest(formData: UserBasic) {
        const loginRequestData = {
            email: formData.Email,
            password: formData.Password
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
        dispatch(meminiUserActions.login({userSession:userSession}));   
    }

    const rows = [
        {id:'Email', type: 'input', label:'Email', placeholder:'Enter email...'},
        {id:'Password', type: 'input', label:'Password', placeholder:'Enter password...'}
    ]

    const onSubmitForm = (formData : UserBasic) => {
        processLoginRequest(formData);
    }    
    
    return <>    
        <div className="grid grid-cols-4">                
            <div className="col-span-1">
            </div>

            <div className="col-span-2">                    
                <GeneralForm 
                    onSubmit={onSubmitForm} 
                    rows={rows}
                    headerText={'Login to Memini'}
                    headerSubText={'Login using your email and password'}
                    submitButtonName="Login"
                />
            </div>

            <div className="col-span-1">
            </div>
        </div>
    </>
}


export default LoginPage;