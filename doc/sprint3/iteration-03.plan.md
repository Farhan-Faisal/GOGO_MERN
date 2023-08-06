# GOGO

## Iteration 02

 * Start date: 10/07/2023
 * End date: 21/07/2023

## Process

Quick Introduction to the process

#### Changes from previous iteration

- We will thoroughly discuss the scopes of the user stories before we assign team members to them and start working on them. This will minimize the chances of duplicate work being done by the team.
- We will map out dependencies and chart a timeline of completion so that all user stories can be completed within the deadline. 
- We will adopt the planning poker technique to estimate story points so that all team members are on the same page regarding the complexity of each user story.
- When possible, we will attempt to select user stories that minimize dependencies. This will ensure that team members can complete as much work as possible simultaneously.


#### Roles & responsibilities

We expect everyone on the team to be full-stack developers.


#### Events

We will meet on July 12, July 14, July 17, July 19, and July 21 on Zoom. The purpose of the meeting is to discuss progress, what to do next, identify blockers, and keep the team informed.

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

 We will aim to start implementing business accounts that let businesses post events, invite promoters and manage events better. In addition, we will improve and extend the features we implemented in the previous sprints, including profile pictures, event descriptions, requests, and dashboard. We will complete the following tasks:

 - As a logged-in user, I want to be able to accept or reject an invitation so that I can notify the requesting user of my choice.
 - As a logged-in business, I want to post events on the app, so that I can get attendees for my events.
 - As a logged-in user, I want the ability to add pictures when creating an event so that it becomes more eye-catching.
 - As a logged-in user, I want to find events that match my interests by applying filters based on event types so that I can discover events that I would be interested in going to.
 - ​As a logged-in user, I want to see all the events I am scheduled to go to so that I can better track these events.
 - As a business, I want to request certain users to act as promoters for an event I posted, so that I can increase my event outreach.

#### Artifacts

We will produce a [demo video](https://youtu.be/PzhNk4kgcHA) of the functionality we listed above and post it on our GitHub repo in the sprint2 folder.
