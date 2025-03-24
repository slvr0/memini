import { meminiUserActions } from "../redux-memini-store";
import GeneralForm from "./general-components/components/general-form"
import { useDispatch, useSelector } from 'react-redux';


function LoginPage() {
    const dispatch = useDispatch();
    //const authToken = useSelector(state => state.auth.token);    

    function processLoginRequest(formData) {
        const API_URL = "http://localhost:5000/";
        const endpointURL = API_URL + "api/User/LoginUser";
        
        const loginRequestData = {
            email: formData.email,
            password: formData.password
        };

        //console.log(loginRequestData);
        fetch(endpointURL, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json", 
            },
            body: JSON.stringify(loginRequestData),
        })
        .then(response => response.json())
        .then(data => {
            if(data.Success)
                onLoginSuccess(data)
            else
                onLoginFail(data)
 
        })
        .catch(error => {
            console.error("Error:", error); 
        });
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