# AudioZuzu

AudioZuzu Web Component is a lightweight, customizable HTML5 audio player encapsulated in a web component, making it reusable across various web projects. This modern audio player offers basic functionalities such as play, pause, and track selection, with additional features like a progress bar and custom file input design. It's designed to offer a sleek and user-friendly experience, perfect for integrating audio playback into your web pages.

## Features
> Play/Pause: Simple controls to play and pause the audio.
> File Selection: Users can load audio tracks either through a file input (if no track is provided) or via a specified track attribute.
> Progress Bar: Visual progress bar indicating playback progress.
> Time Display: Shows the elapsed time and total duration of the audio track.
> Customizable: Easy to style and customize to fit the look and feel of your website.
> Shadow DOM: Uses Shadow DOM for style encapsulation.

## Usage
### Basic Usage
To use the Audio Player in your HTML document, simply include the component's script and use the <audio-player> tag. Here's a basic example:
```
<!DOCTYPE html>
<html>
<head>
    <title>Audio Player Demo</title>
    <script src="path_to_audio_player_component.js"></script>
</head>
<body>
    <audio-player></audio-player>
</body>
</html>
```

### Specifying a Track
You can specify a track for the audio player to load by default using the track attribute. The component will then preload this track and play it upon user interaction:
```
<audio-player track="path_to_your_audio_file.mp3"></audio-player>
```

## Browser Compatibility
The Audio Player Web Component is compatible with most modern web browsers including Chrome, Firefox, Safari, and Edge. Internet Explorer does not support web components and Shadow DOM.