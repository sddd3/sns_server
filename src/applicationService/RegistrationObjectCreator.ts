import { Email } from "../domainObjects/User/Email";
import { HashPassword } from "../domainObjects/User/HashPassword";
import { Registration } from "../domainObjects/User/Registration";
import { Salt } from "../domainObjects/User/Salt";
import { Uuid } from "../domainObjects/User/Uuid";
import { RegistrationRepository } from "../repository/RegistrationRepository";


export class RegistrationObjectCreator {

    readonly uuid: Uuid;
    readonly email: Email;

    constructor(uuid: Uuid = null, email: Email = null) {
        if (!uuid && !email) { throw { status: 400, message: 'uuid or email are invalid value.' } }

        this.uuid = uuid;
        this.email = email;
    }

    public async create(): Promise<Registration> {
        const registrationRepository = new RegistrationRepository();
        await registrationRepository.createDbConnection();
        const registration = await registrationRepository.findOne({ uuid: this.uuid, email: this.email });

        const uuid = new Uuid(registration.uuid);
        const email = new Email(registration.email);
        const hashPassword = new HashPassword(registration.password);
        const salt = new Salt(registration.salt);
        const createdAt = registration.created_at;
        const updatedAt = registration.updated_at;
        const delete_flg = registration.delete_flg;

        const registrationObj = new Registration(uuid, email, hashPassword, salt, createdAt, updatedAt, delete_flg);

        return registrationObj;
    }
}
