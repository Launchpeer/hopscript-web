# Purpose

The purpose of this repo is to provide a portal for Agents and Brokerages to interact with the Hopscript database.

# Getting Started

```
> npm install
> npm run dev
```

# Features

## inviteAgent
`src/components/AgentsAdd/AgentsAddActions`

*As a Broker, I want to create an agent and invite them to login.*

A `User` with the role `agent` is created in the database. That agent is added to the brokerage's `agents` array as a `Pointer`.
The agent is given a generated password and sent an invitation email with log in instructions.

## removeAgent
`src/components/AgentsList/AgentsListActions`

*As a Broker, I want to delete an agent*

A `User` with the role `agent` is created in the database. That agent is added to the brokerage's `agents` array as a `Pointer`.
The agent is given a generated password and sent an invitation email with log in instructions.

## updateAgentProfile
`src/components/AgentProfile/AgentProfileActions`

*As an Agent, I want to update my profile*

A `User` with the role `agent` is updated in the database. The Agent can update their name and email.

## parseCSV
`src/components/LeadsAdd/LeadsAddActions`

*As an Agent, I want to batch import Leads from a CSV file*

A `CSV` file is parsed into javascript objects. Those javascript objects are used to create `Lead` Parse objects in the database. Those `Lead` objects have the properties `name`, `phone`, and `agent`. For a `Lead`, `agent` is a `Pointer` object to the current user. Once a `Lead` is created, that `Lead` is added to the `Agent`'s `leads` array as a `Pointer`. Once that is all complete, the user is refreshed in the redux store

## createLead

`src/components/LeadsAdd/LeadsAddActions`

*As an Agent, I want to manually create a Lead*

A `Lead` is created in the database. The current `Agent` is added to the `Lead` as a `Pointer`. Then, the `Lead` is added to the current `Agent`'s `leads` array as a `Pointer`
