import bcrypt from "bcrypt";
import { Salt } from "../domainObjects/User/Salt";
import { HashPassword } from "../domainObjects/User/HashPassword";

export class HashPasswordGenerator {

    readonly hashPassword: HashPassword;
    readonly salt: Salt;

    constructor(password: string) {
        // ペッパーを取得
        const pepper = process.env.PASSWORD_PEPPER;
        this.salt = new Salt(bcrypt.genSaltSync());
        this.hashPassword = new HashPassword(bcrypt.hashSync(password + pepper + this.salt.value, 10));
    }

    get gethashPassword(): HashPassword {
        return this.hashPassword;
    }

    get getSalt(): Salt {
        return this.salt;
    }
}
