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

const itemsPerPage = 9;

function showPage(list, page) {
   let startIndex = (page * itemsPerPage) - itemsPerPage;
   let endIndex = page * itemsPerPage;
   const studentList = document.querySelector('.student-list');
   studentList.innerHTML = '';
   for ( let i = startIndex; i < endIndex; i++ ) {
      const listData = list;
      if (i === listData.length) {                                              /// check on 'i' and breaks out of the loop in the event that the last page has less than
         return;                                                                /// the amount of 'itemsPerPage' (in this case, there are 42 items in 'listData' thus the
      } else {                                                                  /// last page only displays six items)
         if ( i >= startIndex && i < endIndex ) {                               /// ***Use of template literal to create each item and insert html into the DOM***
            const studentListHTML = `<li class="student-item cf">                                                               
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
   const numberOfPages = Math.ceil(list.length / itemsPerPage);                   /// sets the number of page buttons needed by dividing the list length by 9 and rounding up
   const linkList = document.querySelector('.link-list');
   linkList.innerHTML = '';
   if (list.length === 0) {
      return;
   } else {
      for (let i = 1; i <= numberOfPages; i++) {                        /// Template literal could also be used here but I decided to manually create the elements
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
   }
   linkList.addEventListener('click', (e) => {                         /// Event listener for button clicks
      if (e.target.tagName === 'BUTTON') {                             
         const button = e.target;
         const isActive = document.querySelector('.active');
         if (isActive) {
            isActive.classList.remove('active');
         }
         button.className = 'active';                                  /// Sets 'clicked' buttons class to 'active'
         showPage(list, button.textContent);                           /// Calls 'showPage()' function with parameters
      }
   });
};



showPage(data, 1);                                                     /// Call 'showPage()' function using 'data' and '1' as the parameters
addPagination(data);                                                   /// Call 'addPagination()' function using 'data' as the parameter


///***EXTRA CREDIT***

const searchBarHTML =  `<label for="search" class="student-search">
                           <span>Search by name</span>
                           <input id="search" placeholder="Search by name...">
                           <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
                        </label>`;                                                                                /// Search bar HTML

document.querySelector('header').insertAdjacentHTML('beforeend', searchBarHTML);                /// Insert search bar into header

function searchForStudents(input, list) {                                                       /// Function to filter through data when search bar events are triggered
   const matchingStudents = list.filter(student => {
      const studentName = `${student.name.first}${student.name.last}`.toLowerCase();
      return studentName.includes(input.toLowerCase());
   });
   const studentNames = document.querySelector('.student-list');
   if (matchingStudents.length === 0) {                                                         /// If statement to check if 'matchingStudents' is empty. 
      studentNames.innerHTML = '';                                                              /// If so, then clear '.student-list'
      document.querySelector('.link-list').innerHTML = '';                                      /// Clear '.link-list' 
      const noStudentsHTML = `<li>                                                              
                                    <span>No students found</span>
                              </li>`;                                                           /// Create a new li with only text content
      studentNames.insertAdjacentHTML('beforeend', noStudentsHTML);                             /// Insert the 'noStudentHTML' into '.student-list'
   } else {                                                                                     
      showPage(matchingStudents, 1);                                                            /// If there are matches in 'matchingStudents' then run the results
      addPagination(matchingStudents);                                                          /// through 'showPage' and addPagination'
   }
}

document.querySelector('input').addEventListener('keyup', () => {                               /// Event listener for 'keyup' on search bar
   const inputValue = document.querySelector('input').value.toLowerCase();
      searchForStudents(inputValue, data);
});

document.querySelector('.student-search button').addEventListener('click', () => {              /// Event listener for 'click' on search bar button
   const inputValue = document.querySelector('input').value.toLocaleLowerCase();
   searchForStudents(inputValue, data);
});
