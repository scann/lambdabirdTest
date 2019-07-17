//Globals

let dictObject = makeDictionaryObject(authorsList);

//Calls

authorsNamesRenderer(authorsList);
window.addEventListener('shout', shoutEventRenderer, false);


//Functions

function makeDictionaryObject(authorsList) {

    authorsList.forEach((element) => {
        Object.assign(element, { count:0 })
    });

    return authorsList;
}


function authorsNamesRenderer(authors) {

    const page = document.getElementById('main-wrapper');
    const btnControl = document.getElementById('btn-control');
    const authorsNamesBlock = document.createElement('div');

    authorsNamesBlock.className = 'authors-names-block';

    const authorsNamesList = document.createElement('ul');

    authorsNamesList.className = 'authors-names-list';

    page.insertBefore(authorsNamesBlock, btnControl);
    authorsNamesBlock.appendChild(authorsNamesList);

    authors.forEach((element) => {

        const li = document.createElement('li');
        const span = document.createElement('span');

        span.id = element._id.toString();

        const liText = document.createTextNode(`Name: ${element.name}`);
        const spanText = document.createTextNode(`Count: 0`);

        span.appendChild(spanText);
        li.appendChild(liText);
        li.appendChild(span);
        authorsNamesList.appendChild(li);
    });
}

function highlightItem(item) {

    item.classList.add('highlight');
    setTimeout(() => {
        item.classList.remove('highlight');
    }, 1000);
}

function shoutEventRenderer(e) {

    const { id, name, text }  = e.detail.eventDetail;
    const eventContainer = document.getElementById('shout-events');
    const counterField = document.getElementById(`${id}`);
    const newItem = document.createElement('div');

    const selectedItem = dictObject.find(obj => obj._id === parseInt(counterField.id));

    const newCounterValue = selectedItem.count += 1;

    counterField.innerText= `Count: ${newCounterValue.toString()}`;

    const newEventDetails = document.createTextNode(`Name: ${name}, Text: ${text}`);

    newItem.appendChild(newEventDetails);
    eventContainer.insertBefore(newItem, eventContainer.children[0]);

    highlightItem(newItem);
}

