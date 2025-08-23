
import { Card, Grid, Container, Header } from "semantic-ui-react";
import "../css/home-page.css"; 
import planningImage from "../../../../src/assets/images/planning_image_2.jpg";
import eventsImage from "../../../../src/assets/images/events_image.jpg";
import notificationImage from "../../../../src/assets/images/notification_image_2.jpg";
import MeminiButton from "../../general/components/memini-button";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootState } from "../../../store/index";

const HomePage = () => {
        
    const navigate = useNavigate();
    const userSession = useSelector((state : RootState) => state.meminiUser.userSession);

    const navigateToSignup = () => {
        navigate('/signup')
    }

    function capitalizeFirstLetter(str : string) {
        if (!str) return "";
        return str.charAt(0).toUpperCase() + str.slice(1);
    }


    return (
        <>
        <Container className="home-header">
            {!userSession && 
             <>
                <Header as="h1" className="home-title">
                Welcome to Memini!
                </Header>
                <p className="home-description">
                Memini is your ultimate calendar and event management app. Plan your week, add activities, track events, and stay organized effortlessly. Whether it's personal tasks or city events, Memini helps you keep everything in one place.
                </p>
                
                <div className="flex gap-4 mx-4 justify-center mb-6">
                    <MeminiButton  onClick={() => {navigateToSignup()}}>
                        Sign Up
                    </MeminiButton>   
                </div>

                <div className="flex gap-4 mx-4 justify-center">
                        <p>Already a member?  <a href="/login" className="text-blue-500 hover:underline">Login</a>
                        </p>
                </div>
             </>
             }

             {userSession && 
                <>
                    <Header as="h1" className="home-title">
                    Welcome,  {capitalizeFirstLetter(userSession.firstName)} {capitalizeFirstLetter(userSession.lastName)} !
                    </Header>
                    <p className="home-description">
                    Memini is your ultimate calendar and event management app. Plan your week, add activities, track events, and stay organized effortlessly. Whether it's personal tasks or city events, Memini helps you keep everything in one place.
                    </p>
                </> 
             }
        </Container>

        <Container className="home-features">
            <Header as="h2" textAlign="center" className="features-title">
            Features
            </Header>
            <Grid stackable columns={3}>
            <Grid.Column>
    <Card>
        <div className="signup-card-image"> {/* Ensures uniform height */}
        <img src={planningImage} alt="Plan your week" className="h-full w-full object-cover" />
        </div>
        <Card.Content>
        <Card.Header>Plan Your Week</Card.Header>
        <Card.Description>
            Organize your week by adding tasks and activities. Stay ahead with our intuitive weekly planner.
        </Card.Description>
        </Card.Content>
    </Card>
    </Grid.Column>

    <Grid.Column>
    <Card>
        <div className="signup-card-image">
        <img src={eventsImage} alt="Track City Events" className="h-full w-full object-cover" />
        </div>
        <Card.Content>
        <Card.Header>Track City Events</Card.Header>
        <Card.Description>
            Discover exciting events happening in your city and add them to your calendar with ease.
        </Card.Description>
        </Card.Content>
    </Card>
    </Grid.Column>

    <Grid.Column>
    <Card>
        <div className="signup-card-image">
        <img src={notificationImage} alt="Stay Organized" className="h-full w-full object-cover" />
        </div>
        <Card.Content>
        <Card.Header>Stay Organized</Card.Header>
        <Card.Description>
            Never miss an important activity. Use Memini to set reminders and keep your schedule on track.
        </Card.Description>
        </Card.Content>
    </Card>
    </Grid.Column>

            </Grid>
        </Container>

        
        </>
    );
    };

export default HomePage;
