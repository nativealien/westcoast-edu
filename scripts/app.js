import { addLogin } from "./dom.js"
import { initHome } from "./home.js";
import { initInfo } from "./info.js";
import { initCourse } from "./courses.js";
import { initLogin } from "./login.js";
import { initProfile } from "./profile.js";
import { initAddCourse } from "./courseAdd.js";
import { initSignup } from "./signup.js";
import { get } from "./client.js";

const loc = location.pathname.split('/')
const path = loc[loc.length-1].split('?')[0]

// const path = loc[loc.length-1]
console.log(path);


const initApp = async () => {
    const logged = await get('logged/1');
    addLogin(logged, path)

    switch(path){
        case('index.html'):
            initHome()
            break
        case('courses.html'):
            initCourse(logged)
            break
        case('course-info.html'):
            initInfo(logged)
            break
        case('course-add.html'):
            initAddCourse()
            break
        case('login.html'):
            initLogin()
            break
        case('profile.html'):
            initProfile(logged)
            break
        case('signup.html'):
            initSignup()
            break
    }
}

// document.addEventListener('DOMContentLoaded', initApp())
initApp()