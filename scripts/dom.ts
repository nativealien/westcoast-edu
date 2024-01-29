const container = document.getElementById('main-container') as HTMLElement;

const addLogin = (logged: any, path: string) => {
  const container = document.getElementById('nav-container') as HTMLElement;

  const aTag: any = div('a');
  const liTag = div('li');

  if (logged.user === null) {
    aTag.textContent = 'Logga In';
    aTag.href = path === 'index.html' ? './pages/login.html' : './login.html';
    liTag.appendChild(aTag);
  } else {
    aTag.textContent = logged.user.email;
    aTag.href =
      path === 'index.html' ? './pages/profile.html' : './profile.html';
    liTag.appendChild(aTag);
  }
  container.appendChild(liTag);
};

const addCourseCard = (course: any) => {
  const locArr = location.pathname.split('/');
  const loc = locArr[locArr.length - 1];

  const cardHome = div('div');
  cardHome.id = 'home-card';

  const cardImg: any = div('img');
  const cardA: any = div('a');
  if (loc === 'index.html') {
    cardA.href = './pages/course-info.html?id=' + course.id;
    cardImg.src = './content/images/' + course.image;
  } else {
    cardA.href = './course-info.html?id=' + course.id;
    cardImg.src = '../content/images/' + course.image;
  }

  // Left Div of course card
  const cardLeft = div('div');
  cardLeft.id = 'left-card';

  const cardH2 = div('h2');
  cardH2.textContent = course.course;

  const cardRate = div('h3');
  cardRate.textContent = `Rating: ${course.rating}`;

  const cardDesc = div('p');
  cardDesc.textContent = course.description;

  cardLeft.appendChild(cardH2);
  cardLeft.appendChild(cardRate);
  cardLeft.appendChild(cardDesc);

  // Right Div of course card
  const cardRight = div('div');
  cardRight.id = 'right-card';

  const cardDays = div('p');
  cardDays.textContent = `Antal dagar: ${course.days}`;

  const cardStart = div('p');
  cardStart.textContent = `Start datum: ${course.start}`;

  const cardCost = div('p');
  cardCost.textContent = `Pris: ${course.cost}`;

  cardRight.appendChild(cardDays);
  cardRight.appendChild(cardStart);
  cardRight.appendChild(cardCost);

  cardA.appendChild(cardImg);
  cardA.appendChild(cardLeft);
  cardA.appendChild(cardRight);

  cardHome.appendChild(cardA);

  container.appendChild(cardHome);
};

const addAdminBtn = (logged: any) => {
  if (logged.user.type === 'admin') {
    const adminBtn = document.createElement('button');
    adminBtn.type = 'submit';
    adminBtn.id = 'add-btn';
    adminBtn.textContent = 'Lägg Till Kurs';
    adminBtn.style.backgroundColor = 'lightgreen';
    adminBtn.style.marginTop = '20px';
    adminBtn.style.fontSize = '2rem';

    adminBtn.addEventListener('click', () => {
      location.href = './course-add.html';
    });

    container.appendChild(adminBtn);
  }
};

const addTextElem = (text: string, elem: string) => {
  const textDiv = document.createElement(elem);
  textDiv.textContent = text;
  return textDiv;
};

const div = (elem: string) => {
  const div = document.createElement(elem);
  return div;
};

export { addLogin, addCourseCard, addAdminBtn, addTextElem, div };
