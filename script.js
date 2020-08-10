const button = document.getElementById('button');
const audioElement = document.getElementById('audio');


function toggleButton() {
    button.disabled = !button.disabled;
}

// Pass Joke to Voice
function tellMe(joke) {
    console.log('tell me: ', joke);
    VoiceRSS.speech({
        key: '155b143a38ac450689add34ee73270f6',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

async function getJokes() {
    let joke = '';
    const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Miscellaneous,Pun?blacklistFlags=nsfw,religious,political,racist,sexist';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        // txt to speech
        tellMe(joke);
        // disable button
        toggleButton();
    } catch (error) {
        console.log('error', error)
    }
}

button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton)