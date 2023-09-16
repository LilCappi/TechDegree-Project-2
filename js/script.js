/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

function showPage(list, page) {
   let startIndex = (page * 9) - 9;
   let endIndex = page * 9;
   const studentList = document.querySelector('.student-list');
   studentList.innerHTML = '';
   for ( i = 0; i < list.length; i++ ) {
      if ( i >= startIndex && i < endIndex ) {
         const html =  `<li class="student-item cf">
                           <div class="student-details">
                              <img class="avatar" src="${list[i].picture.thumbnail}" alt="Profile Picture">
                              <h3>${list[i].name.title} ${list[i].name.first} ${list[i].name.last}</h3>
                              <span class="email">${list[i].email}</span>
                           </div>
                           <div class="joined-details">
                              <span class="date">'Joined ${list[i].registered.date}</span>
                           </div>
                        </li>`;
         studentList.insertAdjacentHTML('beforeend', html);
      }
   }
}

showPage(data, 1);

