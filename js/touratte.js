//Globals

const btnStart = document.getElementById('start');
const btnStop = document.getElementById('stop');
const btnClear = document.getElementById('clear');

let count = 0; //global event counter

const authorsList = [
    {
        _id: 1,
        name: 'Todd',
    },
    {
        _id: 2,
        name: 'Rob',
    },
    {
        _id: 3,
        name: 'Sevil',
    },
];

//Calls

btnStart.addEventListener('click', startEventGenerating, false);
btnStop.addEventListener('click', stopEventGenerating, false);
btnClear.addEventListener('click', clearAllData, false);

//Functions

function generateRandomText() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

function getRandomInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomAuthorData(authorsList) {

    const { _id: id, name } = authorsList[Math.floor(Math.random()*authorsList.length)];

    return { id, name } ;
}

function eventHandler(e) {

    e.preventDefault();

    const author = getRandomAuthorData(authorsList);

    const eventDetail = {
        id:   author.id,
        name: author.name,
        text: generateRandomText()
    };

    if(window.CustomEvent) {
        let event = new CustomEvent(
            'shout',
            {
                detail: {
                    eventDetail
                },
                cancelable: true
            }
        );
        window.dispatchEvent(event);
    }
}

function startEventGenerating(e) {

    count = setInterval(() => {
        eventHandler(e);
    }, getRandomInterval(1000,5000));
}

function stopEventGenerating() {

    clearInterval(count);
}

function clearAllData() {

    const eventContainer = document.getElementById('shout-events');
    const eventChildren = eventContainer.children;
    const spanCounts = document.getElementsByTagName('span');

    for(let item of spanCounts) {
        item.innerText = `Count: 0`;
    }

    dictObject.forEach(function (item) {
        item.count = 0;
    });

    while(eventChildren[0]) {
        eventContainer.removeChild(eventChildren[0])
    }
}



