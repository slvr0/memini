import '../App.css';

function UiTest() {    
    return <>    
    <div className="dan-container">
        <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4 ">
            <div>
                <div className="text-xl font-medium text-primary"> ChitChat</div>
                <p className="text-gray-500">You have a new message!</p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-16 gap-4">
        <div className="md:col-span-8 bg-blue-200 p-4">8 Wide</div>
        <div className="md:col-span-8 bg-green-200 p-4">8 Wide</div>
        </div>


    </div>
       
    </>
}


export default UiTest;