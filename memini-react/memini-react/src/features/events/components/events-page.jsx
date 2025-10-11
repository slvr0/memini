import { fetchEventApiData } from "../../../services/event-services"
import MuiStyledButton from "../../../mui-wrappers/mui-button-wrapper";

function EventsPage() { 
    
    const onFetchEventApiData = () => {        
        fetchEventApiData().then(v => {
                console.log(v);
        }          
        );
    }


    return <>    

      

        <MuiStyledButton themeColor = 'light' buttonSize = 'xs' buttonVariant = 'main' borderType = 'rounded' opacity={.85} onClick={() => {onFetchEventApiData()}}> 
            fetch event api data
        </MuiStyledButton>
    
    </>
}


export default EventsPage;                                                                      