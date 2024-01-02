console.log("Welcome to spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItem = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { SongName: "Let me love you", filePath: "songs/1.mp3", coverPath: "covers/cover1.jpg" },
    { SongName: "Besharam Rang", filePath: "songs/2.mp3", coverPath: "covers/cover1.jpg" },
    { SongName: "Mann Mari Jann", filePath: "songs/3.mp3", coverPath: "covers/cover1.jpg" },
    { SongName: "Kesariya", filePath: "songs/4.mp3", coverPath: "covers/cover1.jpg" },
    { SongName: "Apna Bana Lee", filePath: "songs/5.mp3", coverPath: "covers/cover1.jpg" },
    { SongName: "safar", filePath: "songs/6.mp3", coverPath: "covers/cover1.jpg" },

]

songItem.forEach((element, i) => {

    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("SongName")[0].innerText = songs[i].SongName;
})
// Handle Play pause click 
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})

//Listen to Events
audioElement.addEventListener('timeupdate', () => {
    // console.log("timeupdate")
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100)
    // console.log(progress);
    myProgressBar.value = progress;

})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
        element.classList.remove("fa-circle-pause")
        element.classList.add("fa-circle-play")
    })


}
Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
    element.addEventListener('click', (e) => {
        // console.log(e.target)
        makeAllPlays();
        masterSongName.innerText = songs[songIndex].SongName;
        songIndex = parseInt(e.target.id);
        e.target.classList.add("fa-circle-pause")
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        e.target.classList.remove("fa-circle-play")
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');

    })
})


document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 5) {
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].SongName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');

})


document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].SongName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');

})