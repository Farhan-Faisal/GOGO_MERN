# GOGO

## Iteration 01 - Review & Retrospect

- When: 15/06/2023
- Where: Online

## Process - Reflection

We believe we achieved our goals for sprint 1. We are proud of the work we did.

#### Decisions that turned out well

- We believe our decision to conduct standup meetings once every two days was successful since it gave team members the time to report substantial work to the team. It allowed team members to seek help to clear blockers at the appropriate time.
- We believe our decision to decouple schemas(as opposed to using one large schema with sub-documents) helped team members develop features rapidly and independently.
- We believe our decision to note down action items after the end of each meeting helped team members keep track of the work they needed to do before the next meeting.
- Our "Industry-standard" channel in Slack allowed team members to post widely accepted standards so that our code quality would meet industry standards and made it easier for us to be consistent.

#### Decisions that did not turn out as well as we hoped

- We did not agree on coding standards, or conventions before we started working on our user stories. This led to many last-minute changes and confusion.
- We did not have a fixed meeting agenda before the meeting started. This caused our meetings to be unfocused and we wasted some time.
- We did not ensure that our branches had only the work for which it was created. This lead to more conflicts and confusing commit history.

#### Planned changes

- We agree that everyone will do the work only relevant to the Jira linked to the git branch in that branch. All other changes should be made in separate branches. This will reduce the risk of unnecessary merge conflicts as well as ensure a clean commit history.
- We agree to follow the practices posted in the "Industry-standard" channel and to post our findings there as well. This will make our code easier to read and help us maintain consistency.

## Product - Review

#### Goals and/or tasks that were met/completed:

We completed the following user stories:

- ​As a registered user, I want a login page so that I can access my account using my login credentials.

- As a registered GOGO user, I want a dashboard that will show me events based on my interests so that I can find events I am interested in easily and in an expedient manner.

- As an unregistered user, I want to register on the GOGO website using my email address so that I can create, attend and/or view events.

- As a logged-in user, I want to edit my interests so that other users are aware of my latest interests.

- As a logged-in user, I want to add simple events on the website so that I can go to events with like-minded individuals.

- As a logged-in user, I want to edit my user biography so that other users get to read my latest details.

_Please watch the video [here](https://youtu.be/MBSdqsC4KxA) or the one given below for a product demo._

https://github.com/CSCC012023/final-project-s23-perfect-strangers/assets/77621905/5cf11af7-4784-4759-991b-36d9314e7b71

#### Goals and/or tasks that were planned but not met/completed:

Our code currently does not use the session token generated during login. We currently use hardcoded usernames to retrieve data from the DB. We did not get the time to complete it before the product demo. We met all the other goals we set for ourselves.

## Meeting Highlights

Going into the next iteration, our main insights are:

- We should coordinate our code changes before we merge them so that we can reduce the time we spend merging code.
- We should modularise our CSS files so that we do not override other people's styles.
- We will organize our changes into folders so that the project structure is neat and consistent.
- We will create API documentation before we submit our code so that other developers are aware of the purpose of the endpoints.
