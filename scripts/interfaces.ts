
interface Course {
    id: string,
    course: string,
    type: string,
    days: string,
    start: string,
    description: string,
    cost: string,
    rating: string,
    image: string,
    book: string[]
}

interface User {
    id: string,
    name: string,
    lastname: string,
    street: string,
    city: string,
    zip: string,
    phone: string,
    email: string,
    password: string,
    type: string,
    courses: string[]
}

interface Logged {
    id: string,
    user: User | null
}
