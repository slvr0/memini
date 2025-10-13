import { fetchEventApiData, cleanupOldApiData } from "../../../services/event-services"
import MuiStyledButton from "../../../mui-wrappers/mui-button-wrapper";

function EventsPage() { 
    
        const onFetchEventApiData = async () => {        
            try {
                const result = await fetchEventApiData();
                console.log(result);
            } catch (error) {
                console.log(error);
            }
        }

        const onCleanupOldApiData = async () => { 
            try {
                const result = await cleanupOldApiData();
                console.log(result);
            } catch (error) {
                console.log(error);
            }
        }

    return (
    <>   

        <MuiStyledButton themeColor = 'light' buttonSize = 'xs' buttonVariant = 'main' borderType = 'rounded' opacity={.85} onClick={() => {onFetchEventApiData()}}> 
            Fetch event api data
        </MuiStyledButton>

        <MuiStyledButton themeColor = 'light' buttonSize = 'xs' buttonVariant = 'main' borderType = 'rounded' opacity={.85} onClick={() => {onCleanupOldApiData()}}> 
            Clean up old data
        </MuiStyledButton>
    
    </>
    )
}


export default EventsPage;                                                                      