class AudioZuzu extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });

        // Create container
        const container = document.createElement('div');
        container.setAttribute('class', 'audio-player');

        // Track info
        const trackInfo = document.createElement('div');
        trackInfo.setAttribute('class', 'track-info');
        this._trackTitle = document.createElement('span');
        trackInfo.appendChild(this._trackTitle);

        // Audio element
        this._audioElement = document.createElement('audio');
        trackInfo.appendChild(this._audioElement);

        // Progress bar
        const progressBar = document.createElement('progress');
        progressBar.setAttribute('value', '0');
        progressBar.setAttribute('max', '100');
        progressBar.id = 'progressBar';

        // Time display
        const timeDisplay = document.createElement('div');
        timeDisplay.id = 'timeDisplay';
        timeDisplay.textContent = '00:00 / 00:00';

        // Controls
        const controls = document.createElement('div');
        controls.setAttribute('class', 'controls');
        const playButton = document.createElement('button');
        playButton.textContent = 'Play';
        const pauseButton = document.createElement('button');
        pauseButton.textContent = 'Pause';

        // Event listeners
        playButton.addEventListener('click', () => this._audioElement.play());
        pauseButton.addEventListener('click', () => this._audioElement.pause());

        // Append elements
        controls.appendChild(playButton);
        controls.appendChild(pauseButton);
        container.appendChild(trackInfo);
        container.appendChild(progressBar);
        container.appendChild(timeDisplay);
        container.appendChild(controls);

        // Check for 'track' attribute
        const trackSrc = this.getAttribute('track');
        if (trackSrc) {
            this._audioElement.src = trackSrc;
            this._trackTitle.textContent = trackSrc.split('/').pop();
        } else {
            // Adds file input only if no track attribute is provided
            const fileInput = document.createElement('input');
            fileInput.setAttribute('type', 'file');
            fileInput.setAttribute('accept', 'audio/*');
            fileInput.addEventListener('change', (event) => this.loadFile(event));
            controls.appendChild(fileInput);
        }

        // Create watermark
        const watermark = document.createElement('div');
        watermark.textContent = '© AudioZuzu';
        watermark.id = 'watermark';

        // Append watermark
        container.appendChild(watermark);

        // Style
        const audioPlayerStyle = document.createElement('style');
        audioPlayerStyle.textContent = `
            .audio-player {
                width: 300px;
                background-color: #fff;
                padding: 15px;
                border-radius: 10px;
                box-shadow: 0 4px 8px rgba(76, 125, 136, 0.5);
                text-align: center;
                font-family: 'Arial', sans-serif;
                margin: 20px;
            }
            .track-info {
                margin-bottom: 15px;
                color: #71becf;
                font-size: 14px;
            }
            .controls button {
                background-color: #71becf;
                color: white;
                border: none;
                padding: 10px 20px;
                margin: 5px;
                border-radius: 5px;
                cursor: pointer;
                transition: background-color 0.3s;
            }
            .controls button:hover {
                background-color: #4c7d88;
            }
            input[type="file"] {
                margin-top: 10px;
                border: 1px solid #ddd;
                padding: 5px;
                border-radius: 5px;
                cursor: pointer;
            }
            input[type="file"]:hover {
                background-color: #f9f9f9;
            }
            progress {
                width: 100%;
                height: 5px;
                border-radius: 5px;
                margin-top: 10px;
            }
            progress::-webkit-progress-value {
                background-color: #4c7d88; /* Color of the progress bar */
            }
            #timeDisplay {
                font-size: 12px;
                color: #666;
                margin-top: 5px;
            }
            #watermark {
                font-size: 10px;
                color: #71becf;
                text-align: right;
                margin-top: 15px;
                opacity: 0.7;
            }
        `;

        this._shadowRoot.appendChild(audioPlayerStyle);
        this._shadowRoot.appendChild(container);
    }

    connectedCallback() {
        this._audioElement.addEventListener('timeupdate', () => this.updateProgress());
        this._audioElement.addEventListener('loadedmetadata', () => this.updateTimeDisplay());
    }

    static get observedAttributes() {
        return ['track'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'track') {
            this._audioElement.src = newValue;
            this._trackTitle.textContent = newValue.split('/').pop();
        }
    }

    loadFile(event) {
        const files = event.target.files;
        if (files.length > 0) {
            const file = files[0];
            this._audioElement.src = URL.createObjectURL(file);
            this._trackTitle.textContent = file.name;
            this._audioElement.play();
        }
    }

    updateProgress() {
        const progressBar = this._shadowRoot.getElementById('progressBar');
        const currentTime = this._audioElement.currentTime;
        const duration = this._audioElement.duration;
        const progressPercent = (currentTime / duration) * 100;
        progressBar.value = progressPercent;
        this.updateTimeDisplay();
    }

    updateTimeDisplay() {
        const timeDisplay = this._shadowRoot.getElementById('timeDisplay');
        const currentTime = this._audioElement.currentTime;
        const duration = this._audioElement.duration || 0;
        timeDisplay.textContent = `${this.formatTime(currentTime)} / ${this.formatTime(duration)}`;
    }

    formatTime(timeInSeconds) {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}

customElements.define('audio-zuzu', AudioZuzu);
