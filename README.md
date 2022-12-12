# Group Expense Tracker

## A fully functional CRUD app built with React and Firebase that helps you manage your expenses

This project involves the following concepts:
- State management using Reducers and Context API in React
- Fast and easy creation of forms using react-hook-form and integration with MUI to create beautiful layouts consistent with material design guidelines
- Integration of authentication using firebase into a react app
- CRUD operations using firebase
- Realtime data updates with firebase allowing for fetching of new data without user having to refresh
- Routing and navigation using react-router-dom

### Instructions
- Sign up or login. You will be navigated to the groups page.
- The groups page displays all the groups you are a part of. If you are a new user, you most likely won't be a part of any group yet. You can create a group or request a friend to add you to theirs. The top of the page contains links to your personal dashboard as well as an option to logout.
- Click on a group in the list to go to the group dashboard. The owner (creator) of the group has the ability to add other users to the group. Any user can make transactions to any other user. A history of transactions will be maintained at the bottom. The payer of a transaction has the ability to delete records of their transactions in the group. Transactions made in the group will also be reflected in the personal dashboard of both the payer and payee.
- You can leave a group by clicking on the leave group option in the group dashboard. If the owner leaves the group, the next person to have joined the group will be made the new owner.
- Click on the dashboard link at the top to navigate to your personal dashboard. The dashboard displays data pertaining to your personal transactions, as well as all the group transactions you were a part of.

### Demo


https://user-images.githubusercontent.com/88877609/206999991-72154a72-7b97-4758-96ff-4e360fd436f1.mp4



### Improvements to be made
- Optimize the backend to reduce the number of requests made
- Revamp the delete transaction UI (perhaps use swipe to delete)

