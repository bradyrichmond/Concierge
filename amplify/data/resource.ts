import { type ClientSchema, a, defineData } from '@aws-amplify/backend'

const schema = a.schema({
  // ENUMS
  DropOffType: a.enum(['APPOINTMENT', 'SIX_ITEM']),

  // MODELS
  Consignor: a
    .model({
      allowAccessTo: a.id().required().array(),
      dropoffs: a.hasMany('DropOff', 'consignorId'),
      firstName: a.string().required(),
      lastName: a.string().required(),
      organization: a.belongsTo('Organization', 'orgId'),
      orgId: a.id().required(),
      phoneNumber: a.phone().required()
    })
    .authorization((allow) => [
      allow.guest().to(['create']),
      allow.ownersDefinedIn('allowAccessTo').to(['read', 'update'])
    ]),
  DropOff: a
    .model({
      allowAccessTo: a.id().array().required(),
      consignor: a.belongsTo('Consignor', 'consignorId'),
      consignorId: a.id().required(),
      type: a.ref('DropOffType')
    })
    .authorization((allow) => [
      allow.guest().to(['create']),
      allow.ownersDefinedIn('allowAccessTo').to(['read', 'update'])
    ]),
  Organization: a
    .model({
      admin: a.id().required(),
      allowConsignorReadAccess: a.id().array(),
      consignors: a.hasMany('Consignor', 'orgId')
        .authorization((allow) => [allow.ownersDefinedIn('allowConsignorReadAccess').to(['read'])]),
      stores: a.hasMany('Store', 'orgId'),
      users: a.hasMany('User', 'orgId')
    })
    .authorization((allow) => [
      allow.ownerDefinedIn('admin')
    ]),
  Store: a
    .model({
      allowAccessTo: a.id().array().required(),
      organization: a.belongsTo('Organization', 'orgId'),
      orgId: a.id().required()
    })
    .authorization((allow) => [
      allow.ownersDefinedIn('allowAccessTo').to(['read', 'update'])
    ]),
  User: a
    .model({
      allowAccessTo: a.id().array().required(),
      organization: a.belongsTo('Organization', 'orgId'),
      orgId: a.id().required(),
      orgOwner: a.id().required()
    })
    .authorization((allow) => [
      allow.ownersDefinedIn('allowAccessTo').to(['read', 'update']),
      allow.ownerDefinedIn('orgOwner')
    ])
})

export type Schema = ClientSchema<typeof schema>

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
})

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
