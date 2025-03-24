import GeneralForm from "./general-components/components/general-form"

function SignupPage() {

    function registerNewUser(formData) {
        const API_URL = "http://localhost:5000/";
        const endpointURL = API_URL + "api/User/RegisterNewUser";
        
        const newUserRequest = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password
        };
        
        fetch(endpointURL, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json", 
            },
            body: JSON.stringify(newUserRequest),
        })
        .then(response => response.json())     
        .catch(error => {
            console.error("Error:", error); 
        });
    }

    const rows = [
        {id:'firstName', type: 'input', label:'First name', placeholder:'Enter first name...'},
        {id:'lastName', type: 'input', label:'Last name', placeholder:'Enter last name...'},
        {id:'email', type: 'input', label:'Email', placeholder:'Enter email...'},
        {id:'password', type: 'input', label:'Password', placeholder:'Enter password...'},
        {id:'age', type: 'input', label:'Age', placeholder:'Enter Age...'},
    ]

    const onSubmitForm = (formData) => {
        registerNewUser(formData);
    }    
    
    return <>    
        <div className="grid grid-cols-4">                
            <div className="col-span-1">
            </div>

            <div className="col-span-2">                    
                <GeneralForm 
                    onSubmit={onSubmitForm} 
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


export default SignupPage;