# Purpose

The purpose of this repo is to provide a portal for Agents and Brokerages to interact with the Breezebot database.

# Getting Started

```
> npm install
> npm run dev
```

# Features

## inviteAgent
`src/components/AgentsAdd/AgentsAddActions`

*As a broker I want to create an agent and invite them to login.*

A `User` with the role `agent` is created in the database. That agent is added to the brokerage's `agents` array as a `Pointer`.
The agent is given a generated password and sent an invitation email with log in instructions.

## removeAgent
`src/components/AgentsList/AgentsListActions`

*As a broker I want to delete an agent*

A `User` with the role `agent` is created in the database. That agent is added to the brokerage's `agents` array as a `Pointer`.
The agent is given a generated password and sent an invitation email with log in instructions.

## updateAgentProfile
`src/components/AgentProfile/AgentProfileActions`

*As an Agent I want to update my profile*

A `User` with the role `agent` is updated in the database. The Agent can update their name and email.
