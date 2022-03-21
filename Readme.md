# Inference Client Website for ASR(Automatic Speech Recognition) & TTS(Text To Speech) models

## Summary

This website supports realtime speech to text processing which can be connected to the speech recognition open api provided [here](https://open-speech-ekstep.github.io/asr_streaming_service/).

A feedback component is added where for every streaming session(Interval between switching on the mic to switching it off), feedback can be collected through star ratings.

This website also supports SRT(SubRip Subtitle) file generation.

It also supports text to speech processing in the url(`/tts`).

## Getting Started Guide

1. Download and Install `nodejs` and `npm` latest stable version.
2. Install the node dependencies for this project using the following command:`npm i`.
3. Update the list of languages you need to support in the `language_details.json` file in project root folder.
    eg:

    ```js
    [
        {"id": "indian-english", "code": "en", "name": "English (IN)"},
        {"id":"hindi", "code": "hi", "name":"Hindi"}
    ]
    ```

4. Set the following environment variables for the realtime speech recognition and SRT generation.

    - OPEN_API_PROXY_URL
    - PUNCTUATION_BASE_URL
    - ASR_BASE_URL
    - TTS_BASE_URL

    eg:

    ```sh
    OPEN_API_PROXY_URL=https://open-api-proxy-example.com
    PUNCTUATION_BASE_URL=https://punctuation-example.com
    ASR_BASE_URL=https://asr-base-url-example.com
    TTS_BASE_URL=https://tts-base-url-example.com
    ```

    **Note:** The environment variables can be set by creating a `.env` file in the project root folder and the above environment variables can be added in that file.

5. If feedback feature is needed, follow these steps:
    - Create a database table with the following columns:

    - Create a gcp bucket where the audio processed can be stored in for the given feedback.
    - Set Google application credentials in the development/deployment environment to get access to gcp buckets Or you can get credentials.json file for the gcp account and provide the path of the file to the environment variable:`GOOGLE_APPLICATION_CREDENTIALS`.
    - Add the following environment variables:

        ```sh
        DB_USER=username
        DB_PASS=password
        DB_NAME=dbname
        DB_HOST=dbhost
        BUCKET_NAME=bucketname_to_store_audios
        GOOGLE_APPLICATION_CREDENTIALS=<credentials.json file path>
        ```

6. Run the following command to get the website up and running: `npm start`.
7. The website will be running in port 9008.

## Supported environment variables

| **Variable Name**             | **Description**                                                                                                    |
|-------------------------------|--------------------------------------------------------------------------------------------------------------------|
| OPEN_API_PROXY_URL            | This url points to the proxy server which makes the streaming possible.                                            |
| PUNCTUATION_BASE_URL          | This url points to the punctuation api.                                                                            |
| ASR_BASE_URL                  | URL where ASR models are hosted through REST APIs                                                                  |
| TTS_BASE_URL                  | URL where TTS models are hosted through REST APIs                                                                  |
| DB_USER                       | Database username                                                                                                  |
| DB_PASS                       | Database password                                                                                                  |
| DB_NAME                       | Database name                                                                                                      |
| DB_HOST                       | Database host/ip                                                                                                   |
| BUCKET_NAME                   | Bucket name in google cloud to store audios                                                                        |
| GOOGLE_APPLICATION_CREDENTIALS| Google application credentials file path to access the gcp bucket.                                                 |
