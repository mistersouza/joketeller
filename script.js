const audioElement = document.querySelector('audio');
const button = document.querySelector('button');

// Disable/Enable Button
const disableButton = () => {
    button.disabled = !button.disabled;
}

// Get jokes from joke api
const getJokes = async () => {
    let jokeString = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        data.setup 
        ? jokeString = `${data.setup} ... ${data.delivery}` 
        : jokeString = data.joke;
        
        disableButton(); 

        return jokeString; 
    } catch (error) {
        // Catch Errors Here
        console.log('whoops', error);
    }
}

// Pass Joke to VoiceRSS API
const tellMe = async() => {
    let joke = await getJokes(); 

    VoiceRSS.speech({
        key: 'e7b07463947d43f98e7a0bf4866da8af', // setup secret key on the server
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Event Listeners
button.addEventListener('click', tellMe);
audioElement.addEventListener('ended', disableButton);

