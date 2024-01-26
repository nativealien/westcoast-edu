
const container = document.getElementById('main-container');

const addLogin = (logged, path) => {
    const container = document.getElementById('nav-right')

    const aTag = div('a')
    const liTag = div('li')

    if(logged.user === null){
        aTag.textContent = 'Logga In'
        aTag.href = path === 'index.html' ? './pages/login.html' : './login.html'
        liTag.appendChild(aTag)
    }else{
        aTag.textContent = logged.user.email
        aTag.href = path === 'index.html' ? './pages/profile.html' : './profile.html'
        liTag.appendChild(aTag)
    }
    container.appendChild(liTag)
}

const addCourseCard = (course) => {
    // const container = document.getElementById('main-container')

    const locArr = location.pathname.split('/')
    const loc = locArr[locArr.length - 1]

    const image = div('img')
    const cardA = div('a')
    if(loc === 'index.html'){
        cardA.href = './pages/course-info.html?id=' + course.id
        image.src = './content/images/' + course.image
    } else {
        cardA.href = './course-info.html?id=' + course.id
        image.src = '../content/images/' + course.image
    }

    const cardDiv = div('div')
    cardDiv.id = 'home-card'

    const cardH2 = div('h2')
    cardH2.textContent = course.course

    const cardP1 = div('p')
    cardP1.textContent = course.description

    const cardP2 = div('p')
    cardP2.textContent = course.type

    cardDiv.appendChild(image)
    cardDiv.appendChild(cardH2)
    cardDiv.appendChild(cardP1)
    cardDiv.appendChild(cardP2)

    cardA.appendChild(cardDiv)

    container.appendChild(cardA)
}

const addAdminBtn = (logged) => {
    
    if(logged.user.type === 'admin'){
        // const container = document.getElementById('main-container');

        const adminBtn = document.createElement('button');
        adminBtn.type = 'submit'
        adminBtn.id = 'add-btn'
        adminBtn.textContent = 'Lägg Till Kurs'
        adminBtn.style.backgroundColor = 'lightgreen'
        adminBtn.style.marginTop = "20px";
        adminBtn.style.fontSize = '2rem'

        adminBtn.addEventListener('click', () => {
            location.href = './course-add.html'
        })

        container.appendChild(adminBtn)
    }
}

const addTextElem = (text, elem) => {
    const textDiv = document.createElement(elem)
    textDiv.textContent = text
    container.appendChild(textDiv)
}


const div = (elem) => { 
    const div = document.createElement(elem)
    return div}


export { addLogin, addCourseCard, addAdminBtn, addTextElem, div }
