# Getting Started

```
> npm install
> npm run dev
```

# Features

## inviteAgent
`src/components/AgentsAdd`

As a broker I want to create an agent and invite them to login.

A `User` with the role `agent` is created in the database. That agent is added to the brokerage's `agents` array as a `Pointer`.
The agent is given a generated password and sent an invitation email with log in instructions.
