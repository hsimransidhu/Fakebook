import Subscriber from './subscriber.js';

'use strict';
const subscriberData = {
    id: 2004,
    name: 'Simran',
    userName: 'hsimransidhu',
    email: 'simran@mail.com',
    pages: ['TravelwithRia', 'Hackers'],
    groups: ['GiithubCommunity', 'Benders'],
    canMonetize: true,
};

const subscriber = new Subscriber(
    subscriberData.id,
    subscriberData.name,
    subscriberData.userName,
    subscriberData.email,
    subscriberData.pages,
    subscriberData.groups,
    subscriberData.canMonetize
);

document.addEventListener('DOMContentLoaded', () => {
    const postButton = document.querySelector('.button');
    const textArea = document.getElementById('text-section');
    const newPostsContainer = document.querySelector('.new-posts');
    const addMediaButton = document.querySelector('.add-media');
    const mediaCaption = document.querySelector('.add-media p');
    const profileImg = document.querySelector('.profile-img img');
    const userModal = document.getElementById('user-modal');
    let userModalContent = document.getElementById('user-modal-content');

    profileImg.addEventListener('click', () => {
        userModalContent = userModalContent || document.getElementById('user-modal-content');
        if (userModalContent) {
            userModalContent.innerHTML = getUserModalContent(subscriber.getInfo());
            userModal.style.visibility = 'visible';
            userModal.style.display = 'block';
        }
    });

    document.addEventListener('click', (event) => {
        if (event.target === userModal) {
            userModal.style.visibility = 'hidden';
            userModal.style.display = 'none';
        }
    });

    addMediaButton.addEventListener('click', () => {
        document.getElementById('imageInput').click();
    });

    document.getElementById('imageInput').addEventListener('change', (event) => {
        const selectedFile = event.target.files[0];
    
        if (selectedFile) {
            mediaCaption.innerHTML = selectedFile.name;
            addMediaButton.style.backgroundImage = '';
        }
    });

    addMediaButton.addEventListener('click', () => {
        document.getElementById('imageInput').click();
    });

    postButton.addEventListener('click', () => {
        const postContent = textArea.value;
        const selectedFile = document.getElementById('imageInput').files[0];

        if (postContent.trim() !== '' || selectedFile) {
            const postElement = createPostElement(subscriber.getInfo(), postContent, selectedFile);

            newPostsContainer.insertBefore(postElement, newPostsContainer.firstChild);

            textArea.value = '';
            document.getElementById('imageInput').value = '';
            mediaCaption.innerHTML = '';
        } else {
            return ''
        }
    });
});

function createPostElement(userInfo, content, selectedFile) {
    const postElement = document.createElement('div');
    postElement.classList.add('post');
    postElement.innerHTML = `
        <div class="post-header">
            <img src="./assets/img/user.jpeg" alt="Profile Img">
            <span class="user-name">${userInfo.name}</span>
            <span class="current-date">${new Date().toLocaleDateString()}</span>
        </div>
        <div class="post-content">
            <p>${content}</p>
            ${selectedFile ? `<img class="post-image" src="${URL.createObjectURL(selectedFile)}" alt="Selected Image">` : ''}
        </div>
    `;

    return postElement;
}

function getUserModalContent(userInfo) {
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