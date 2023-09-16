/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

function showPage(list, page) {
   let startIndex = (page * 9) - 9;
   let endIndex = page * 9;
   const studentList = document.querySelector('.student-list');
   studentList.innerHTML = '';
   for ( let i = startIndex; i < list.length; i++ ) {
      if ( i >= startIndex && i < endIndex ) {
         const studentListHTML =  `<li class="student-item cf">
                                       <div class="student-details">
                                          <img class="avatar" src="${list[i].picture.thumbnail}" alt="Profile Picture">
                                          <h3>${list[i].name.first} ${list[i].name.last}</h3>
                                          <span class="email">${list[i].email}</span>
                                       </div>
                                       <div class="joined-details">
                                          <span class="date">Joined ${list[i].registered.date}</span>
                                       </div>
                                    </li>`;
         studentList.insertAdjacentHTML('beforeend', studentListHTML);
      }
   }
};

function addPagination(list) {
   const numberOfPages = Math.ceil(list.length / 9);
   const linkList = document.querySelector('.link-list');
   linkList.innerHTML = '';
   for ( let i = 1; i <= numberOfPages; i++ ) {
      let pagesHTML = `<li><button type="button">${i}</button></li>`;
      if (i === 1) {
         pagesHTML = `<li><button type="button" class="active">${i}</button></li>`;
      }
      linkList.insertAdjacentHTML('beforeend', pagesHTML);
   }
   linkList.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
         const button = e.target;
         const lis = document.querySelectorAll('button');
         for (i = 0; i < lis.length; i += 1) {
            let btnList = lis[i];
            if (btnList.className === 'active') {
               btnList.classList.remove('active');
            }
         }
         button.className = 'active';
         showPage(list, button.textContent);
      }
   });
};

showPage(data, 1);
addPagination(data);


