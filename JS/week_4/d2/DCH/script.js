class Video {
    constructor(title, uploader, time) {
        this.title = title
        this.uploader = uploader
        this.time = time
    }
    watch() {
       console.log(`${this.uploader} watched all ${this.time} seconds of ${this.title}!`)
    }
}
const new_param = new Video("Magazine", "Margo", 1249)
const new_param2 = new Video("New York movie", "Boris", 3489)

new_param.watch()
new_param2.watch()

const videosData = [
  { title: "The Great Adventure", uploader: "Alice", time: 300 },
  { title: "Cooking with Love", uploader: "Ben", time: 840 },
  { title: "JavaScript Basics", uploader: "Clara", time: 420 },
  { title: "Morning Yoga", uploader: "Dan", time: 600 },
  { title: "Travel Vlog: Tokyo", uploader: "Ella", time: 950 }
];

const videoList = videosData.map(video => new Video(video.title, video.uploader, video.time));
videoList.forEach(video => video.watch());
