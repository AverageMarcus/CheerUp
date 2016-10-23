# CheerUp

Checks your emotion periodically and tries to cheer you up.

## How it works

Every 5 minutes the app will take a photo using the webcam and use the
[Microsoft Cognitive Services](https://www.microsoft.com/cognitive-services/en-us/emotion-api)
to work out the dominating emotion. If anger or sadness is detected then a
random [/r/aww](https://www.reddit.com/r/aww/) page is opened to cheer up the user.
