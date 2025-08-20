import { meminiUserActions } from "../../../store/user-calendar-store";
import GeneralForm from "../../general/components/general-form.jsx"
import { useDispatch, useSelector } from 'react-redux';
import { registerNewUser } from "../../../services/login-service.js";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userSession = useSelector((state) => state.meminiUser.userSession);

    const onLoginSuccess = (userCredentials) => {   
        const userSession = {
            firstName: userCredentials.FirstName,
            lastName: userCredentials.LastName,
            email: userCredentials.Email,
            token: userCredentials.SessionToken
        };           
        dispatch(meminiUserActions.login({userSession:userSession}));   
    }

    const onClickSubmitRegisterNewUser = (formData) => {
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

    const rows = [
        {id:'firstName', type: 'input', label:'First name', placeholder:'Enter first name...'},
        {id:'lastName', type: 'input', label:'Last name', placeholder:'Enter last name...'},
        {id:'email', type: 'input', label:'Email', placeholder:'Enter email...'},
        {id:'password', type: 'input', label:'Password', placeholder:'Enter password...'},
        {id:'age', type: 'input', label:'Age', placeholder:'Enter Age...'},
    ]
    
    return <>    
        <div className="grid grid-cols-4">                
            <div className="col-span-1">
            </div>

            <div className="col-span-2">                    
                <GeneralForm 
                    onSubmit={(formData) => {onClickSubmitRegisterNewUser(formData)}} 
                    rows={rows}
                    headerText={'Signup to Memini'}
                    headerSubText={'Please fill in your personal information. Choose a safe password.'}
                    submitButtonName="Register"
                />
            </div>

            <div className="col-span-1">
            </div>
        </div>
    </>
}
