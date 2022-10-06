/* Imports */
// this will check if we have a user and set signout link if it exists
import '../auth/user.js';
import { getPet } from '../fetch-utils.js';
import { createComment } from '../fetch-utils.js';
// > Part B: import pet fetch
// > Part C: import create comment
import { renderComment } from '../render-utils.js';

/* Get DOM Elements */
const errorDisplay = document.getElementById('error-display');
const petName = document.getElementById('pet-name');
const petImage = document.getElementById('pet-image');
const petBio = document.getElementById('pet-bio');
const commentList = document.getElementById('comment-list');
const addCommentForm = document.getElementById('add-comment-form');

/* State */
let error = null;
let pet = null;

/* Events */
window.addEventListener('load', async () => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    if (!id) {
        location.replace('/');
        return;
    }

    const response = await getPet(id);
    error = response.error;
    pet = response.data;

    if (error) {
        location.replace('/');
    } else {
        displayPet();
        displayComments();
    }

    // > Part B:
    //   - get the id from the search params
    //   - if no id, redirect to list (home) page
    //  - otherwise, get the pet by id and store the error and pet data
    //  - if error, display it
    //  - of no pet, redirect to list (home) page
    //  - otherwise, display pet
    // > Part C: also call display comments in addition to display pet
});

addCommentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(addCommentForm);
    const insertComment = {
        text: formData.get('text'),
        pet_id: pet.id,
    };
    const response = await createComment(insertComment);
    error = response.error;
    if (error) {
        displayError();
    } else {
        const comment = response.data;
        pet.comments.unshift(comment);
        displayComments();
        addCommentForm.reset();
    }

    // > Part C:
    //    - create an comment insert object from formdata and the id of the pet
    //    - create the comment
    //    - store and check for an error and display it, otherwise
    //    - add the new comment (data) to the front of the pet comments using unshift
    //    - reset the form
});

/* Display Functions */

function displayError() {
    if (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}

function displayPet() {
    petName.textContent = pet.name;
    petBio.textContent = pet.bio;
    petImage.src = pet.image_url;
}

function displayComments() {
    commentList.innerHTML = '';

    for (const comment of pet.comments) {
        const commentEl = renderComment(comment);
        commentList.append(commentEl);
        // > Part C: render the comments
    }
}
//asdasasdas//
