import { Schema } from "../amplify/data/resource"

export interface LocalConfig {
    orgId: string
    storeId: string
}

export type OrganizationType = Schema['Organization']['type']
export type CreateOrganizationType = Schema['Organization']['createType']
export type UpdateOrganizationType = Schema['Organization']['updateType']
export type DeleteOrganizationType = Schema['Organization']['deleteType']

export type UserType = Schema['User']['type']
export type CreateUserType = Schema['User']['createType']
export type UpdateUserType = Schema['User']['updateType']
export type DeleteUserType = Schema['User']['deleteType']
