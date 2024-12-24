<div align="center">
<h1> Audio Transcription </h1>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#built-with">Built With</a></li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#starting">Starting</a></li>
  </ol>
</details>

## About The Project

This repository contains the implementation of audio transcribing using hugging face's openai/whisper-tiny model.



### Built With
 [![Python][Python.org]][Python-url] [![FastAPI][FastAPI]][FastAPI-url] [![Next][Next.js]][Next-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Installation

- To run the application, you will need to first create a virtual environment and install the dependencies and all
  required libraries.

``` bash
pip install virtualenv
python3 -m venv backend/venv
source backend/venv/bin/activate
pip install -r backend/requirements.txt
```



### Starting

- To start the application, you can begin by running the following Bash Script
- Be sure to export all the necessary environment variables in the .env file.

```
./run.sh
```

- Navigate to ```http://localhost:3000``` on your Web Browser.
- Click on the cloud upload button to perform audio transcribing using hugging face's openai/whisper-tiny


### Performing Unit Test (Backend)

- To perform backend unit test, you can begin by running the following Bash Script

```
./unit_test.sh
```



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[Python.org]: https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54
[Python-url]: https://python.org/
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[FastAPI]: https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi&logoColor=white
[FastAPI-url]: https://fastapi.tiangolo.com/]
