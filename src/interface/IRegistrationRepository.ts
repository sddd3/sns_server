import { Uuid } from "../domainObjects/User/Uuid";

import { Email } from "../domainObjects/User/Email";
import { Registrations } from "../table/Registrations";

export interface IRegistrationRepository {
    create(params: string[]): Promise<boolean>;
    findOne(params: { uuid?: Uuid, email?: Email }): Promise<Registrations>;
};