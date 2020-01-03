const speakBtn = document.querySelector("#speak")
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = new SpeechRecognition()


recognition.onstart = ()=>{
    console.log("Voices activated!!")
}

recognition.onresult = (event)=>{
    console.log(event)
    const current = event.resultIndex

    const transcript = event.results[current][0].transcript
    messageFormInput.value = transcript
    //readOutLoud(transcript)
}

speakBtn.addEventListener("click",()=>{
    recognition.start()
})


const readOutLoud = (message)=>{
    const speech = new SpeechSynthesisUtterance()
    console.log(speech)

    speech.text = message
    speech.voulme = 1;
    speech.rate = 1;

    window.speechSynthesis.speak(speech)
}