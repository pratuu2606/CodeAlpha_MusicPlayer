// ================= SONG DATA =================

const songs = [

    {
        title: "Dream Melody",
        artist: "SoundHelix",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=700&q=80"
    },

    {
        title: "Ocean Waves",
        artist: "SoundHelix",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        cover: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=700&q=80"
    },

    {
        title: "Night Drive",
        artist: "SoundHelix",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        cover: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=700&q=80"
    },

    {
        title: "Peaceful Soul",
        artist: "SoundHelix",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        cover: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=700&q=80"
    },

    {
        title: "Summer Vibes",
        artist: "SoundHelix",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
        cover: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=700&q=80"
    }

];


// ================= ELEMENTS =================

const audio = document.getElementById("audio");

const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");

const autoplay = document.getElementById("autoplay");

const player = document.querySelector(".player");

const songElements =
    document.querySelectorAll(".song");

let currentSong = 0;


// ================= LOAD SONG =================

function loadSong(index) {

    const song = songs[index];

    title.textContent = song.title;
    artist.textContent = song.artist;

    cover.src = song.cover;

    // Load online audio
    audio.src = song.src;

    audio.load();

    // Reset progress
    progress.value = 0;

    currentTime.textContent = "0:00";
    duration.textContent = "0:00";

    // Active playlist
    songElements.forEach(songElement => {
        songElement.classList.remove("active");
    });

    if (songElements[index]) {
        songElements[index].classList.add("active");
    }
}


// ================= PLAY =================

function playSong() {

    audio.play()
        .then(() => {

            playBtn.textContent = "⏸";

            player.classList.add("playing");

            console.log("Music playing");

        })
        .catch(error => {

            console.error("Audio Error:", error);

            alert(
                "Music could not be played. Please check your internet connection."
            );

        });
}


// ================= PAUSE =================

function pauseSong() {

    audio.pause();

    playBtn.textContent = "▶";

    player.classList.remove("playing");
}


// ================= PLAY / PAUSE =================

playBtn.addEventListener("click", function () {

    if (audio.paused) {

        playSong();

    } else {

        pauseSong();

    }

});


// ================= NEXT =================

function nextSong() {

    currentSong++;

    if (currentSong >= songs.length) {

        currentSong = 0;

    }

    loadSong(currentSong);

    playSong();

}

nextBtn.addEventListener(
    "click",
    nextSong
);


// ================= PREVIOUS =================

function previousSong() {

    currentSong--;

    if (currentSong < 0) {

        currentSong = songs.length - 1;

    }

    loadSong(currentSong);

    playSong();

}

prevBtn.addEventListener(
    "click",
    previousSong
);


// ================= TIME UPDATE =================

audio.addEventListener(
    "timeupdate",
    function () {

        if (!audio.duration) return;

        const percent =
            (audio.currentTime /
                audio.duration) * 100;

        progress.value = percent;

        currentTime.textContent =
            formatTime(audio.currentTime);

    }
);


// ================= DURATION =================

audio.addEventListener(
    "loadedmetadata",
    function () {

        duration.textContent =
            formatTime(audio.duration);

    }
);


// ================= PROGRESS =================

progress.addEventListener(
    "input",
    function () {

        if (!audio.duration) return;

        audio.currentTime =
            (progress.value / 100)
            * audio.duration;

    }
);


// ================= VOLUME =================

volume.addEventListener(
    "input",
    function () {

        audio.volume =
            Number(volume.value);

    }
);


// Default volume

audio.volume = 0.7;


// ================= AUTOPLAY =================

audio.addEventListener(
    "ended",
    function () {

        if (autoplay.checked) {

            nextSong();

        } else {

            pauseSong();

        }

    }
);


// ================= PLAYLIST =================

songElements.forEach(songElement => {

    songElement.addEventListener(
        "click",
        function () {

            currentSong =
                Number(
                    songElement.dataset.index
                );

            loadSong(currentSong);

            playSong();

        }
    );

});


// ================= FORMAT TIME =================

function formatTime(seconds) {

    if (isNaN(seconds)) {

        return "0:00";

    }

    const minutes =
        Math.floor(seconds / 60);

    const secondsPart =
        Math.floor(seconds % 60);

    return (
        minutes +
        ":" +
        (secondsPart < 10 ? "0" : "") +
        secondsPart
    );

}


// ================= KEYBOARD =================

document.addEventListener(
    "keydown",
    function (event) {

        if (event.code === "Space") {

            event.preventDefault();

            if (audio.paused) {

                playSong();

            } else {

                pauseSong();

            }

        }


        if (event.code === "ArrowRight") {

            nextSong();

        }


        if (event.code === "ArrowLeft") {

            previousSong();

        }

    }
);


// ================= AUDIO ERROR =================

audio.addEventListener(
    "error",
    function () {

        console.error(
            "Unable to load:",
            songs[currentSong].src
        );

        playBtn.textContent = "▶";

        player.classList.remove("playing");

    }
);


// ================= INITIAL LOAD =================

loadSong(currentSong);