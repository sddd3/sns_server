import { Uuid } from "../domainObjects/user/Uuid";

import { Email } from "../domainObjects/user/Email";
import { Registrations } from "../table/Registrations";

export interface IRegistrationRepository {
    create(params: string[]): Promise<boolean>;
    findOne(params: { uuid?: Uuid, email?: Email }): Promise<Registrations>;
};