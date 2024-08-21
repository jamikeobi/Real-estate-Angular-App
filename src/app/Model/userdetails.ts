export class UserDetails {
    constructor(
        public id: number,
        public username: string,
        public email: string,
        public password: string,
        public role: string,
        public date: Date = new Date(),
        public name: string
    ) {}
}
