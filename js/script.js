/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

function showPage(list, page) {
   let startIndex = (page * 9) - 9;
   let endIndex = page * 9;
   const studentList = document.querySelector('.student-list');
   studentList.innerHTML = '';
   for ( i = startIndex; i < list.length; i++ ) {
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
   for ( i = 1; i < numberOfPages; i++ ) {
      const pagesHTML = `<li><button type="button">${i}</button></li>`;
      linkList.insertAdjacentHTML('beforeend', pagesHTML);
   }
   const firstButton = linkList.firstElementChild;
   firstButton.className = 'active';
   linkList.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
         const button = e.target;
         const btnValue = button.textContent;
         const allButtons = document.querySelector('button');
         allButtons.className = '';
         button.className = 'active';
         showPage(list, btnValue);
      }
   });
};

showPage(data, 1);
addPagination(data);


