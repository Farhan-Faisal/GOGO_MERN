# GOGO/Perfect-Strangers

## Iteration 04

 * Start date: 24/07/2023
 * End date: 04/08/2023

## Process

#### Changes from previous iteration

 - We will make error handling a part of our development and review process to ensure that proper error handling is implemented by team members and that users get appropriate messages.
 - We will describe our blockers in the team chat before we meet for the standup so that team members can come prepared with well-thought-out solutions.

#### Roles & responsibilities

We expect everyone on the team to be full-stack developers.


#### Events

Describe meetings (and other events) you are planning to have:

We will meet on July 26, July 28, July 31, Aug 2, and Aug 4 on Zoom. The purpose of the meeting is to discuss progress, what to do next, identify blockers, and keep the team informed.

We are not planning on having any other meeting, but if a team member is blocked on an issue and needs help, at least some members of the team will schedule a coding session to help the blocked team member.

#### Artifacts

We will use Jira for project management.
We will discuss priorities and assign tasks to team members in the planning meeting on Jira. Then team members can move the user stories/tasks to the appropriate stage so that everyone can track progress.

#### Git / GitHub workflow

We will use git flow. We have a main branch that contains the project completed in the last sprint. The main branch branches off to the "develop" branch, which contains the approved changes to the project for the current sprint. Finally, we have feature branches that are off the format "DEV-CGP-X," where X is the Jira number.

We will prepend each commit message with "DEV-CGP-X:"where X is the Jira number.

We will use pull requests (PR) for changes from the feature branch to develop branch. The PR will be reviewed by an assigned reviewer. Once the reviewer and author are satisfied with the changes, the author will merge the changes into the "develop" branch.

Once all the feature branches have been approved, merged to the develop branch, and demo-ed, we will create another pull request to merge the develop branch to the main branch. This will be reviewed by the whole team in a meeting and merged by random selection.

This workflow lets us separate the working code from the previous iteration from the changes linked to the current sprint. In the event that our changes break project functionality, we can fall back to the code from the previous iteration. Having separate branches for each feature ensures that each contributor can work on their feature independently. The "develop" branch is our staging area for changes to be deployed to the main branch.

## Product


#### Goals and tasks

We will expand on the work completed in the previous sprints including but not limited to business-related features, promoter feature, login/signup feature, and event display feature. We will complete the following tasks:

- As a registering user, I want to indicate my interests during the registration phase so that other users can get to know me better.
- As an unregistered user, I want to register on the GOGO website using my google account so that I can create, attend and/or view events without having to remember an extra password.
- As an unregistered user, I want to register on the GOGO website using my facebook account so that I can create, attend and/or view events without having to remember an extra password.
- As a logged-in user, I want to edit event descriptions and pictures so that I can correct mistakes or improve the event listing.
- As a business, I want to be able to see how many people accepted my promoters’ invitations to my event, so that I know how many additional attendees to expect.
- As a logged-in user, I want to be able to accept or reject a “promoter” status invitation from a business for an event, so I can invite people on the businesses behalf.
- As a logged-in user, I want to see invites sent to me by promoters of events and have the ability to accept or reject them so that I can attend events promoted by others.
- As a logged-in user, I would like to have an onMe checkbox in my invitation so that I can indicate to the invitee that I am willing to pay for their ticket.


#### Artifacts

We will produce a [demo video](https://youtu.be/OFLQa7Mwb4o) of the functionality we listed above and post it on our GitHub repo in the sprint4 folder.

https://github.com/CSCC012023/final-project-s23-perfect-strangers/assets/77621905/2b9b7a73-6e35-4462-b390-fc1bec2053f8

