import { meminiUserActions } from "../../../store/user-calendar-store";
import GeneralForm from "../../general-components/components/general-form.jsx"
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from "../../../services/login-service.js";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userSession = useSelector((state) => state.meminiUser.userSession);

    function processLoginRequest(formData) {
        const loginRequestData = {
            email: formData.email,
            password: formData.password
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
    
    const onLoginFail = (userCredentials) => {
            //just show some error message.
    }

    const onLoginSuccess = (userCredentials) => {   
        const userSession = {
            firstName: userCredentials.FirstName,
            lastName: userCredentials.LastName,
            email: userCredentials.Email,
            token: userCredentials.SessionToken
        };           
        dispatch(meminiUserActions.login({userSession:userSession}));   
    }

    const rows = [
        {id:'email', type: 'input', label:'Email', placeholder:'Enter email...'},
        {id:'password', type: 'input', label:'Password', placeholder:'Enter password...'}
    ]

    const onSubmitForm = (formData) => {
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