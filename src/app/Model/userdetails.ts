export class UserDetails {
    constructor(
        public id: string,
        public username: string,
        public email: string,
        public password: string,
        public role: string,
        public date: Date = new Date(),
        public name: string,
        public token?: string
    ) {}
}
