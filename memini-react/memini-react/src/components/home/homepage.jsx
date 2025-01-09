import React from "react";
import { Button, Card, Image, Grid, Container, Header } from "semantic-ui-react";
import "./css/home-page.css"; 

const HomePage = () => {
  return (
    <>
      <Container className="home-header">
        <Header as="h1" className="home-title">
          Welcome to Memini!
        </Header>
        <p className="home-description">
          Memini is your ultimate calendar and event management app. Plan your week, add activities, track events, and stay organized effortlessly. Whether it's personal tasks or city events, Memini helps you keep everything in one place.
        </p>
        <Button primary size="large" className="home-signup-button">
          Sign Up Now
        </Button>
      </Container>

      <Container className="home-features">
        <Header as="h2" textAlign="center" className="features-title">
          Features
        </Header>
        <Grid stackable columns={3}>
          <Grid.Column>
            <Card>
              <Image src="https://via.placeholder.com/300" alt="Plan your week" />
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
              <Image src="https://via.placeholder.com/300" alt="Track City Events" />
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
              <Image src="https://via.placeholder.com/300" alt="Stay Organized" />
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

      <Container className="home-cta">
        <Header as="h2" className="cta-title">
          Ready to Get Started?
        </Header>
        <p className="cta-description">
          Create an account today and take control of your schedule.
        </p>
        <Button primary size="huge" className="cta-signup-button">
          Sign Up
        </Button>
      </Container>
    </>
  );
};

export default HomePage;
