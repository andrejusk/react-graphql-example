# react-graphql-example

Explore building re-usable components
and composable front-ends in 
[React](https://reactjs.org/docs/getting-started.html)

This demo repository shows a simple React app
which hits the public GitHub GraphQL API using 
[Relay](https://relay.dev/docs/)


## Setup

Make sure you have `watchman` in your `$PATH`:
https://facebook.github.io/watchman/docs/install.html

Packages and scripts are managed using `npm`:

```bash
npm install
npm start
npm build
```


## Architecture

For simplicity, we focus on re-using a 
[`<UserProfile />`](https://github.com/andrejusk/react-graphql-example/blob/main/src/components/userProfile.js#L1)
component from two contexts:

- Render the logged in user's own profile
- Render the logged in user's list of followers

We solve this by structuring the `<UserProfile />` component
as a fragment using Relay's `useFragment()` hook.
This has the effect of decoupling our fragment render logic
from data fetch.

We are now able to write and run
[two queries](https://github.dev/andrejusk/react-graphql-example/blob/main/src/pages/main.page.js#L44)
and pass the results to the same component.

You'll notice that we have multiple levels of hierachy in our demo page example, going top to bottom:
- Application ([`src/app/index.js`](https://github.com/andrejusk/react-graphql-example/blob/main/src/app/index.js))
  - Render global components, e.g. header
  - Handle global events, e.g. login
  - Determine page to render
- Page itself ([`src/pages/*.page.js`](https://github.com/andrejusk/react-graphql-example/blob/main/src/pages/main.page.js))
  - Maintain page state, react to user selection
  - Set up and run Relay queries
  - Set up and pass callbacks
  - Once Relay references are available, render container components
- Query container
  - ⚠️ No knowledge of query loading
  - Access data from Relay query reference
  - Map data to our fragment render logic
- Fragment container
  - ⚠️ No knowledge of queries
  - Access data from fragment
  - Return JSX to display
- Component (optional)
  - Return JSX from simple JS props


