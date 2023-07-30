# GOGO

## Iteration 02

 * Start date: 28/06/2023
 * End date: 06/07/2023

## Process

Quick Introduction to the process

#### Changes from previous iteration

 - We agree to post best practices on the "Industry-standard" channel so that the team has a common coding/practices standard to refer back to. In previous sprints, there were several last-minute changes because team members discovered potential improvements in coding standards, API naming conventions, etc. With this change, we hope that we can improve our code quality while ensuring consistency with the rest of the team. We will measure success with the amount of time we spend on the final review.

 - We agree that everyone will do the work only relevant to the Jira linked to the git branch in that branch. All other changes should be made in separate branches. This will reduce the risk of unnecessary merge conflicts as well as ensure a clean commit history. We will measure success with the number of merge conflicts we encounter.


#### Roles & responsibilities

Describe the different roles on the team and the responsibilities associated with each role.

We expect everyone on the team to be full-stack developers.


#### Events

We will meet every two days starting from Thursday, June 29, 2023, on Zoom. The purpose of the meeting is to discuss progress, what to do next, identify blockers, and keep the team informed.

We are not planning on having any other meeting, but if a team member is blocked on an issue and needs help, at least some members of the team will schedule a coding session to help the blocked team member.

#### Artifacts

We will use Jira for project management.
We will discuss priorities and assign tasks to team members in the planning meeting on Jira. Then team members can move the user stories/tasks to the appropriate stage so that everyone can track progress.

#### Git / GitHub workflow

We will use git flow. We have a main branch that contains the project completed in the last sprint. The main branch branches off to the develop branch, which contains the approved changes to the project for the current sprint. Finally, we have feature branches that are off the format "DEV-CGP-X", where X is the Jira number.

We will prepend each commit message with "DEV-CGP-X:", where X is the Jira number.

We will use pull requests (PR) for changes from the feature branch to develop branch. The PR will be reviewed by an assigned reviewer. Once the reviewer and author are satisfied with the changes, the author will merge the changes into the develop branch.

Once all the feature branches have been approved, merged to the develop branch, and demo-ed, we will create another pull request to merge the develop branch to the main branch. This will be reviewed by the whole team in a meeting and merged by random selection.

This workflow lets us separate the working code from the previous iteration from the changes linked to the current sprint. In the event that our changes break project functionality, we can fall back to the code from the previous iteration. Having separate branches for each feature ensures that each contributor can work on their feature independently. The develop branch is our staging area for changes to be deployed to the main branch.

## Product

#### Goals and tasks

 We will aim to implement the "request" functionality so that users can request event creators to attend events with them. We will also aim to give event creators the ability to manage requests and track attendance. We will also add more functionality to customize user profiles. We will do our best to complete the following user stories ordered from most to less important:

 - As a logged-in user, I want to send invites to other people to accompany me to an event listed on the app so that I have a buddy to attend the event with.

 - As a logged-in user interested in attending an event, I want to see all the events I requested to attend so that I can track my requests better.

 - As a logged-in user, I want to see the events I created so that I can better manage my events.

 - As a logged-in user, I want to be able to accept or reject an invitation so that I can notify the requesting user of my choice.

 - As a logged-in user, I want to edit my profile picture so that other users get to see my latest pictures. 

 - As a logged-in user, I want to chat with the user I accepted to go to the event with so that I can communicate with them.

#### Artifacts

We will produce a demo video of the functionality we listed above and post it on our GitHub repo in the sprint2 folder.
