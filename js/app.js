//variables
const courses = document.querySelector('#courses-list');



//listeners

loadEventListeners();

function loadEventListeners() {
    //when a new course is added
    courses.addEventListener('click', buyCourse);
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
    
    
    `;
}