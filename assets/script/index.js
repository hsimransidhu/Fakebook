import Subscriber from './subscriber.js';

const postButton = document.querySelector('.button');
const textBox = document.getElementById('text-Box');
const postSection = document.querySelector('.posts-section');
const addPostButton = document.querySelector('.add-post');
const postText = document.querySelector('.add-post p');
const profileImg = document.querySelector('.profile img');
const modal = document.getElementById('user-modal');
let modalContent = document.getElementById('user-modal-content');

const subscriberInfo = {
    id: 2004,
    name: 'Simran',
    userName: 'hsimransidhu',
    email: 'simran@mail.com',
    pages: ['TravelwithRia', 'Hackers'],
    groups: ['GithubCommunity', 'Benders'],
    canMonetize: true,
};

const subscriber = new Subscriber(
    subscriberInfo.id,
    subscriberInfo.name,
    subscriberInfo.userName,
    subscriberInfo.email,
    subscriberInfo.pages,
    subscriberInfo.groups,
    subscriberInfo.canMonetize
);

addPostButton.addEventListener('click', () => {
    document.getElementById('add-file').click();
});

document.getElementById('add-file').addEventListener('change', handleFileChange);

profileImg.addEventListener('click', handleProfileImgClick);

document.addEventListener('click', (event) => {
    if (event.target === modal) {
        hideModal();
    }
});

postButton.addEventListener('click', handlePostButtonClick);

function handleFileChange(event) {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
        updatePostText(selectedFile.name);
    }
}

function handleProfileImgClick() {
    showModal(subscriber.getInfo());
}

function handlePostButtonClick() {
    const postArea = textBox.value;
    const selectedFile = document.getElementById('add-file').files[0];

    if (postArea.trim() !== '' || selectedFile) {
        const posting = createPost(subscriber.getInfo(), postArea, selectedFile);

        insertPost(posting);
        clearInputFields();
    }
}

function updatePostText(text) {
    postText.innerHTML = text;
    addPostButton.style.backgroundImage = '';
}

function showModal(userInfo) {
    modalContent = modalContent || document.getElementById('user-modal-content');
    if (modalContent) {
        modalContent.innerHTML = getModal(userInfo);
        showModalElement();
    }
}

function hideModal() {
    modal.style.visibility = 'hidden';
    modal.style.display = 'none';
}

function showModalElement() {
    modal.style.visibility = 'visible';
    modal.style.display = 'block';
}

function getModal(userInfo) {
    return `
        <div>
            <img class="model-img" src="./assets/img/user.jpeg" alt="Profile Img">
            <p>ID: ${userInfo.id}</p>
            <p>Name: ${userInfo.name}</p>
            <p>User Name: ${userInfo.userName}</p>
            <p>Email: ${userInfo.email}</p>
            <p>Pages: ${userInfo.pages.join(', ')}</p>
            <p>Groups: ${userInfo.groups.join(', ')}</p>
            <p>Monetize: ${userInfo.canMonetize ? 'Yes' : 'No'}</p>
        </div>
    `;
}

function createPost(userInfo, content, selectedFile) {
    const posting = document.createElement('div');
    posting.classList.add('post');
    posting.innerHTML = `
        <div class="post-top">
            <img src="./assets/img/user.jpeg" alt="Profile Img">
            <span class="user-name">${userInfo.name}</span>
            <span class="current-date">${new Date().toLocaleDateString()}</span>
        </div>
        <div class="post-content">
            <p>${content}</p>
            ${selectedFile ? `<img class="post-pic" src="${URL.createObjectURL(selectedFile)}" alt="Selected Image">` : ''}
        </div>
    `;

    return posting;
}

function insertPost(posting) {
    postSection.insertBefore(posting, postSection.firstChild);
}

function clearInputFields() {
    textBox.value = '';
    document.getElementById('add-file').value = '';
    postText.innerHTML = '';
}
