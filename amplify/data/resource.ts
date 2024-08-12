import { type ClientSchema, a, defineData } from '@aws-amplify/backend'

const schema = a.schema({
  // MODELS
  Client: a
    .model({
      allowAccessTo: a.id().required().array(),
      contacts: a.hasMany('Contact', 'clientId'),
      firstName: a.string().required(),
      lastName: a.string().required(),
      organization: a.belongsTo('Organization', 'orgId'),
      orgId: a.id().required(),
      phone: a.phone().required()
    })
    .authorization((allow) => [
      allow.guest().to(['create']),
      allow.ownersDefinedIn('allowAccessTo').to(['read', 'update']),
      allow.authenticated().to(['create', 'read'])
    ])
    .secondaryIndexes((index) => [index('phone'), index('orgId')]),
  Contact: a
    .model({
      allowAccessTo: a.id().array().required(),
      client: a.belongsTo('Client', 'clientId'),
      clientId: a.id().required(),
      isWaiting: a.boolean(),
      location: a.belongsTo('Location', 'locationId'),
      locationId: a.id().required(),
      organization: a.belongsTo('Organization', 'orgId'),
      orgId: a.id().required(),
      typeId: a.id().required(),
      oversizedItems: a.boolean(),
      oversizedItemsDescription: a.string()
    })
    .authorization((allow) => [
      allow.guest().to(['create']),
      allow.authenticated().to(['create', 'read']),
      allow.ownersDefinedIn('allowAccessTo').to(['read', 'update'])
    ]),
  ContactType: a
    .model({
      allowAccessTo: a.id().array().required(),
      label: a.string().required(),
      organization: a.belongsTo('Organization', 'orgId'),
      orgId: a.id().required()
    })
    .authorization((allow) => [allow.authenticated()]),
  Organization: a
    .model({
      admin: a.id().required(),
      allowClientReadAccess: a.id().array(),
      contacts: a.hasMany('Contact', 'orgId'),
      contactType: a.hasMany('ContactType', 'orgId'),
      clients: a.hasMany('Client', 'orgId'),
      name: a.string().required(),
      stores: a.hasMany('Location', 'orgId'),
      users: a.hasMany('User', 'orgId')
    })
    .authorization((allow) => [
      allow.ownerDefinedIn('admin'),
      allow.authenticated().to(['read'])
    ]),
  Location: a
    .model({
      allowAccessTo: a.id().array().required(),
      contacts: a.hasMany('Contact', 'locationId'),
      name: a.string().required(),
      organization: a.belongsTo('Organization', 'orgId'),
      orgId: a.id().required()
    })
    .authorization((allow) => [
      allow.authenticated().to(['create']),
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
      allow.ownerDefinedIn('orgOwner'),
      allow.owner()
    ])
})

export type Schema = ClientSchema<typeof schema>

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
})
