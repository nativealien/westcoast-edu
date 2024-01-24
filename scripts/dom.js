
const addLogin = (logged, path) => {
    const container = document.getElementById('nav-right')

    const aTag = div('a')
    const liTag = div('li')

    if(logged.email === null){
        aTag.textContent = 'Logga In'
        aTag.href = path === 'index.html' ? './pages/login.html' : './login.html'
        liTag.appendChild(aTag)
    }else{
        aTag.textContent = logged.email
        aTag.href = path === 'index.html' ? './pages/profile.html' : './profile.html'
        liTag.appendChild(aTag)
    }
    container.appendChild(liTag)
}

const addHomeCard = (course) => {
    const container = document.getElementById('main-container')

    const locArr = location.pathname.split('/')
    const loc = locArr[locArr.length - 1]

    console.log(loc);
    
    const cardA = div('a')
    if(loc === 'index.html'){
        console.log(true);
        
        cardA.href = './pages/course-info.html?id=' + course.id
    } else {
        console.log(false);
        
        cardA.href = './course-info.html?id=' + course.id
    }

    const cardDiv = div('div')
    cardDiv.id = 'home-card'

    const cardH2 = div('h2')
    cardH2.textContent = course.course

    const cardP1 = div('p')
    cardP1.textContent = course.description
    console.log(course.description);
    

    const cardP2 = div('p')
    cardP2.textContent = course.type

    cardDiv.appendChild(cardH2)
    cardDiv.appendChild(cardP1)
    cardDiv.appendChild(cardP2)

    cardA.appendChild(cardDiv)

    container.appendChild(cardA)
}

const addCourseCard = (course) => {
    const container = document.getElementById('main-container')
}

const div = (elem) => { 
    const div = document.createElement(elem)
    return div}


export { addLogin, addHomeCard }
