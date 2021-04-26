//variables
const courses = document.querySelector('#courses-list'),
    shoppingCartContent = document.querySelector('#cart-content tbody'),
    clearCartBtn = document.querySelector('#clear-cart');



//listeners

loadEventListeners();

function loadEventListeners() {
    //when a new course is added
    courses.addEventListener('click', buyCourse);

    //when the remove button is clicked
    shoppingCartContent.addEventListener('click', removeCourse);

    //clear cart btn
    clearCartBtn.addEventListener('click', clearCart);

    //document ready
    document.addEventListener('DOMContentLoaded', getFromLocalStorage);
}





//functions
function buyCourse(e) {
    e.preventDefault();
    //use delegation to find the course that was added
    if(e.target.classList.contains('add-to-cart')) {
        //read the course values
        const course = e.target.parentElement.parentElement;

        //read the values
        getCourseInfo(course);
    }
}
//reads the HTML information of the selected course
function getCourseInfo(course) {
    //Create an Object with course data
    const courseInfo = {
        image: course.querySelector('img').src,
        title: course.querySelector('h4').textContent,
        price: course.querySelector('.price span').textContent,
        id: course.querySelector('a').getAttribute('data-id')
    }
    //Insert into the shopping cart
    addIntoCart(courseInfo);
}
//display the selected course into the shopping cart
function addIntoCart(course) {
    //create a <tr>
    const row = document.createElement('tr');

    //build the template
    row.innerHTML = `
        <tr>
            <td>
                <img src="${course.image}" width=100>
            </td>
            <td>${course.title}</td>
            <td>${course.price}</td>
            <td>
                <a href="#" class="remove" data-id="${course.id}">X</a>
            </td>
        </tr>
    `;
    //add into the shopping cart
    shoppingCartContent.appendChild(row);

    //add course into storage
    saveIntoStorage(course);
}
//add the courses into the local storage
function saveIntoStorage(course) {
    let courses = getCoursesFromStorage();

    //add the course into the array
    courses.push(course);

    //since the storage only saves strings we need to convert JSON into string
    localStorage.setItem('courses', JSON.stringify(courses));
}
//get the contents from storage
function getCoursesFromStorage() {
    let courses;

    //if something exists on storage then we get the value, otherwise create an empty array
    if(localStorage.getItem('courses') === null) {
        courses = [];
    } else {
        courses = JSON.parse(localStorage.getItem('courses'));
    }
    return courses;
}

//remove course from the DOM
function removeCourse(e) {

    if(e.target.classList.contains('remove')) {
        e.target.parentElement.parentElement.remove();
    }
}
//clear the shopping cart
function clearCart() {
    //shoppingCartContent.innerHTML = '';

    while(shoppingCartContent.firstChild) {
        shoppingCartContent.removeChild(shoppingCartContent.firstChild);
    }
}
//loads when document is ready and print courses into shooping cart
function getFromLocalStorage() {
    let coursesLS = getCoursesFromStorage();

    //Loop trough the courses and printo into shopping cart
    coursesLS.forEach(function(course) {
        //create the <tr>
        const row = document.createElement('tr');

        //print the content
        row.innerHTML = `
            <tr>
                <td>
                    <img src="${course.image}" width=100>
                </td>
                <td>${course.title}</td>
                <td>${course.price}</td>
                <td>
                    <a href="#" class="remove" data-id="${course.id}">X</a>
                </td>
            </tr>
        `;
        shoppingCartContent.appendChild(row);
    });
}