export interface IUser {
    email: string
    password: string
    user_id?: string
}

export class User {
    email: string
    password: string
    user_id?: string

    constructor(model: IUser) {
        this.email = model.email
        this.password = model.password
        this.user_id = model.user_id
    }
}


