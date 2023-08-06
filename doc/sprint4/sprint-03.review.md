# GOGO/Perfect-Strangers

## Iteration 3 - Review & Retrospect

 * When: 24/07/2023
 * Where: Online via Zoom

## Process - Reflection

We believe we achieved all of our goals for sprint 3, and we are happy with the work we completed. We reduced our user story dependencies, which allowed us to finish with a higher velocity for this sprint.

#### Decisions that turned out well

- We believe our decision to thoroughly discuss the scopes of the user stories before we assigned team members to them and start working on them was successful because it prevented overlapping scope of user stories.
- We believe our decision to map out dependencies and estimate story points allowed us to pace our work so that it was completed on time.
- We believe our decision to minimize dependencies wherever possible was successful as we were able to achieve a higher velocity during this sprint.

#### Decisions that did not turn out as well as we hoped

 - Our decision to resolve blockers as quickly as possible needs to be revisited, as these solutions are usually not optimal. For example, we opted to use local storage to place the profile picture to overcome MongoDB lags, but we quickly discovered this solution led to other problems in subsequent user stories.
 - Our decision to resolve blockers during standups made certain meetings unnecessarily long and inefficient for team members.

#### Planned changes

 - We will encourage team members to implement all error handling for any new features so that we do not have to go back to these stories later on.
 - We will ensure any new API endpoints return proper status codes so that it remains consistent with our API documentation and helps with debugging.
 - We will ask team members with blockers to describe their problems in advance of standups in the Slack channel so we can come to the meeting with multiple possible well-thought-out solutions.


## Product - Review

#### Goals and/or tasks that were met/completed:

We completed the following user stories:

 - As a logged-in user, I want to be able to accept or reject an invitation so that I can notify the requesting user of my choice.

 - As a logged-in business, I want to post events on the app, so that I can get attendees for my events.

 - As a logged-in user, I want the ability to add pictures when creating an event so that it becomes more eye-catching.

 - As a logged-in user, I want to find events that match my interests by applying filters based on event types so that I can discover events that I would be interested in going to.

 - ​As a logged-in user, I want to see all the events I am scheduled to go to so that I can better track these events.

 - As a business, I want to request certain users to act as promoters for an event I posted, so that I can increase my event outreach.

#### Goals and/or tasks that were planned but not met/completed:

The requests page does not show the event creator a list of users from whom they have accepted requests. This should have been part of the requests user story and is something we will need to implement in the next sprint. Otherwise, we accomplished all our goals for the sprint.

## Meeting Highlights

Going into the next iteration, our main insights are:

- We understand the importance of minimizing dependencies and discussing the scope of user stories with the team to ensure a smooth sprint experience.
- We understand the importance of error handling for new features, as it ensures a smooth UI experience for users. 
- We recognize the benefit of dockerizing our project and taking a CI/CD approach, since doing so enables us to test any new features during integration.


