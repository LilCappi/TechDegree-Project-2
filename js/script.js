/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/*
   The 'showPage()' function takes in two parameters:

   list: data.js file for this project.

   page: The number of the page that is being viewed (set within the addPagination() function based on the value
                                                      of the button that was triggered by the event listener)

   Using these two parameters, it will dynamically display on the page a set number of objects information
   within specified criteria
*/

function showPage(list, page) {
   const listData = list;
   const itemsPerPage = 9;
   let startIndex = (page - 1) * itemsPerPage;
   let endIndex = startIndex + itemsPerPage;
   const studentList = document.querySelector('.student-list');
   studentList.innerHTML = '';
   for ( let i = startIndex; i < endIndex; i++ ) {
      if (i === listData.length) {                                              /// check on 'i' and breaks out of the loop in the event that the last page has less than
         return;                                                                /// the amount of 'itemsPerPage' (in this case, there are 42 items in 'listData' thus the
      } else {                                                                  /// last page only displays six items)
         if ( i >= startIndex && i < endIndex ) {                               /// ***Use of template literal to create each item and insert html into the DOM***
            const studentListHTML =  `<li class="student-item cf">                                                               
                                          <div class="student-details">
                                             <img class="avatar" src="${listData[i].picture.large}" alt="Profile Picture">
                                             <h3>${listData[i].name.first} ${listData[i].name.last}</h3>
                                             <span class="email">${listData[i].email}</span>
                                          </div>
                                          <div class="joined-details">
                                             <span class="date">Joined ${listData[i].registered.date}</span>
                                          </div>
                                       </li>`;
            studentList.insertAdjacentHTML('beforeend', studentListHTML);
         }
      }
   }
};

/*
   The 'addPagination()' function takes in the data.js and creates a set number of buttons based on the number of items displayed per page.
*/

function addPagination(list) {
   const numberOfPages = Math.ceil(list.length / 9);                   /// sets the number of page buttons needed by dividing the list length by 9 and rounding up
   const linkList = document.querySelector('.link-list');
   linkList.innerHTML = '';
   for ( let i = 1; i <= numberOfPages; i++ ) {                        /// Template literal could also be used here but I decided to manually create the elements
      const li = document.createElement('li');                         /// purely to reiterate some methodology taught within this unit (createElement() and appendChild())
      const button = document.createElement('button');                 /// line 33-36 could be replaced with:
      button.type = 'button';                                          ///                     let createBtnHTML = <li><button type="button">${i}</button></li>;
      button.textContent = i;                                          /// and line 38 with:
      if (i === 1) {                                                   ///                     createButtonHTML = <li><button type="button" class="active">${i}</button></li>;
         button.className = 'active';                                  /// and line 46-47 with: 
      }                                                                ///                     linkList.insertAdjacentHTML('beforeend', createButtonHTML);
      li.appendChild(button);
      linkList.appendChild(li);
   }
   linkList.addEventListener('click', (e) => {                         /// Event listener for button clicks
      if (e.target.tagName === 'BUTTON') {                             
         const button = e.target;
         const lis = document.querySelectorAll('button');
         for (i = 0; i < lis.length; i += 1) {                         /// For loop that itterates through all buttons and removes 'active' from the class
            let btnList = lis[i];
            if (btnList.className === 'active') {
               btnList.classList.remove('active');
            }
         }
         button.className = 'active';                                  /// Sets 'clicked' buttons class to 'active'
         showPage(list, button.textContent);                           /// Calls 'showPage()' function with parameters
      }
   });
};

function createSearchBar() {
   const header = document.querySelector('header');
   const searchBarHTML = `<label for="search" class="student-search">
                        <span>Search by name</span>
                        <input id="search" placeholder="Search by name...">
                        <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
                     </label>`;
   header.insertAdjacentHTML('beforeend', searchBarHTML);
   const searchInput = document.getElementById('search');
   searchInput.addEventListener('keyup', (e) => {
      let currentValue = e.target.value.toLowerCase();
      let studentName = document.querySelectorAll('h3');
      let matchingStudents = [];
      studentName.forEach(studentName => {
         if (studentName.textContent.toLowerCase().includes(currentValue)) {
            studentName.parentNode.parentNode.style.display = 'block';
            matchingStudents.push(studentName);
         } else {
            studentName.parentNode.parentNode.style.display = 'none';
         }
      });
      addPagination(matchingStudents);
   });
}

showPage(data, 1);                                                     /// Call 'showPage()' function using 'data' and '1' as the parameters
addPagination(data);                                                   /// Call 'addPagination()' function using 'data' as the parameter
createSearchBar();

