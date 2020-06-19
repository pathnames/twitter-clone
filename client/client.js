console.log('Hello World!');
const form = document.querySelector('form');
const loadingElement = document.querySelector('.loading');
const API_URL = 'http://localhost:5000/mews';
const mewsElement = document.querySelector('.mews');

loadingElement.style.display = '';
listAllMews();

form.addEventListener('submit', (event) => {
   event.preventDefault();
   console.log('form submitted');
   const formData = new FormData(form);
   const name = formData.get('name');
   const content = formData.get('content');

   const mew = {
       name, 
       content
   }
   
   form.style.display = 'none';
   loadingElement.style.display = '';
   fetch(API_URL, {
    method:'POST',
    body: JSON.stringify(mew),
    headers:{
        'content-type':'application/json',
    }
   }).then(response => response.json())
     .then(createdMew => {
        console.log(createdMew);
        form.reset();
        loadingElement.style.display = 'none';
        form.style.display = '';
     });
});

function listAllMews(){
   fetch(API_URL)
        .then(response => response.json())
        .then(mews => {
            console.log(mews);
            mews.forEach(mew => {
                const div = document.createElement('div');

                const header = document.createElement('h3');
                header.textContent = mew.name;

                const contents = document.createElement('p');
                contents.textContent = mew.content;

                div.appendChild(header);
                div.appendChild(contents);

                mewsElement.appendChild(div);
                loadingElement.style.display = 'none';
            });
        });
 }