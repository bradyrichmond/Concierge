import { Schema } from '../amplify/data/resource'

export interface LocalConfig {
    orgId?: string
    locationId?: string
}

export interface ClientDataInput {
    firstName: string
    lastName: string
    phone: string
    oversizedItems?: boolean
    oversizedItemsDescription?: string
}

export type ClientType = Schema['Client']['type']
export type CreateClientType = Schema['Client']['createType']
export type UpdateClientType = Schema['Client']['updateType']
export type DeleteClientType = Schema['Client']['deleteType']

export type ContactType = Schema['Contact']['type']
export type CreateContactType = Schema['Contact']['createType']
export type UpdateContactType = Schema['Contact']['updateType']
export type DeleteContactType = Schema['Contact']['deleteType']

export type ContactTypeType = Schema['ContactType']['type']
export type CreateContactTypeType = Schema['ContactType']['createType']
export type UpdateContactTypeType = Schema['ContactType']['updateType']
export type DeleteContactTypeType = Schema['ContactType']['deleteType']

export type LocationType = Schema['Location']['type']
export type CreateLocationType = Schema['Location']['createType']
export type UpdateLocationType = Schema['Location']['updateType']
export type DeleteLocationType = Schema['Location']['deleteType']

export type OrganizationType = Schema['Organization']['type']
export type CreateOrganizationType = Schema['Organization']['createType']
export type UpdateOrganizationType = Schema['Organization']['updateType']
export type DeleteOrganizationType = Schema['Organization']['deleteType']

export type UserType = Schema['User']['type']
export type CreateUserType = Schema['User']['createType']
export type UpdateUserType = Schema['User']['updateType']
export type DeleteUserType = Schema['User']['deleteType']

