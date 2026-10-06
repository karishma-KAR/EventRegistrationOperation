# EventFlow – TechConnect 2026

EventFlow is a responsive Event Registration and Operations Website developed for the TechConnect 2026 technology meetup.

The project provides a complete event experience including event information, schedule management, attendee registration, registration ID generation, attendee status tracking, and an admin dashboard for basic event content management.

## Project Objective

The objective of this project is to create a professional, responsive and user-friendly event website that improves the event registration process and provides better operational visibility for event organizers.

## Problem Statement

Traditional event registration can become difficult to manage when attendee information, event schedules and registration status are handled separately.

EventFlow provides a single web-based solution where users can:

- View event information
- View the event schedule
- Register for the event
- Receive a unique registration ID
- Check registration status
- View event availability

Event organizers can also manage basic event information and schedule content through the Admin Dashboard.

## Target Users

### Primary Stakeholder
Event Organizer / Event Operations Team

### End Users
- Students
- Technology enthusiasts
- Event attendees

## Key Features

- Responsive design for desktop, tablet and mobile devices
- Event overview section
- Event date, venue and capacity information
- Event statistics
- Event schedule and timeline
- Attendee registration form
- Client-side form validation
- Clear error messages
- Email and phone number validation
- Duplicate registration prevention
- Automatic Registration ID generation
- Attendee status lookup
- Registration confirmation
- Admin Dashboard
- Event information management
- Schedule management
- Registration and capacity tracking
- Remaining seat calculation
- Event availability status
- Local storage based prototype data management

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Browser Local Storage
- GitHub Pages for deployment

## Project Structure

```text
EventRegistrationOperations/
│
├── index.html
├── style.css
├── script.js
├── README.md
│
└── Evidence/
    ├── Registration screenshots
    ├── Validation screenshots
    ├── Status screenshots
    ├── Admin Dashboard screenshots
    └── Mobile view screenshots
   
    Validation and Error Handling
The project includes client-side validation for:
Empty form fields
Invalid names
Invalid email addresses
Invalid phone numbers
Missing registration category
Invalid Registration ID
Duplicate email or phone registration
Event capacity limits
Clear error messages are displayed to help users correct invalid input.
Admin Dashboard
The Admin Dashboard provides a prototype interface for event operations.
It allows the organizer to:
View total registrations
View event capacity
View remaining seats
Update event title
Update event tagline
Update event date
Update venue
Update capacity
Add schedule sessions
Delete schedule sessions
Data and Privacy
This project is developed as a prototype using browser Local Storage.
Registration information is stored locally in the user's browser for demonstration purposes.
No real production attendee database or authentication system is implemented.
Therefore, the current implementation should not be used for storing sensitive or real-world production data.
Testing
The following scenarios were tested:
Empty registration form
Invalid name
Invalid email
Invalid phone number
Successful registration
Registration ID generation
Attendee status lookup
Invalid Registration ID
Duplicate registration
Event settings update
Schedule management
Responsive layout
Testing evidence is available in the Evidence folder.
Responsive Design
The website is designed to work across:
Desktop
Laptop
Tablet
Mobile devices
The layout uses responsive CSS techniques including flexible grids, media queries and mobile-friendly navigation.
Limitations
The current project is a front-end prototype.
Current limitations include:
No real backend server
No production database
No real admin authentication
Local Storage is browser-specific
No real email/SMS notification system
No production-level security implementation
Future Improvements
Future versions could include:
Node.js and Express backend
PostgreSQL or MySQL database
Secure admin authentication
Role-based access control
Cloud deployment
Email confirmation
QR-code based event check-in
Real-time attendee dashboard
Registration analytics
Security and scalability improvements
Business Benefits
EventFlow can help event organizers by:
Reducing manual registration work
Improving attendee experience
Providing quick registration status lookup
Improving visibility of registration capacity
Making event schedule management easier
Supporting better operational decision-making
Conclusion
EventFlow demonstrates a complete front-end solution for event registration and basic event operations.
The project focuses on usability, responsive design, validation, error handling, operational visibility and responsible handling of prototype data.