export class Salt {

    readonly value: string;

    constructor(value: string) {
        // 値の存在チェック
        if (value === null || value === undefined) { throw { status: 400, message: 'salt is invalid.' } }

        this.value = value;
    }
}