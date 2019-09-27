const submit = document.querySelector("#btn")
const inputdata = document.querySelector("#inputdata")
const result = document.querySelector("#result")
const btn =document.querySelector(".talk")
const speakme = document.querySelector("#speakme")


//Translate the data
const translateme = ()=>{
    const datainp = inputdata.value

    const source_lan = document.querySelector("#source_lan").value
    const res_lan = document.querySelector("#res_lan").value

    console.log(source_lan)
    console.log(res_lan)
    
    const inputlink = "http://localhost:3000/translated?source_lan="+source_lan+"&res_lan="+res_lan+"&inputstring=" + datainp;
    console.log(inputlink)
    result.textContent ="Loading...."    

        fetch(inputlink).then((res)=>{
        
            res.json().then((data)=>{
                console.log(data)
                if(data.error){
                    result.value = data.error
                }else{
                    result.value = data.translatedText
                }
            })
           
        })

}
//Submit form event
submit.addEventListener("submit",(e)=>{
    e.preventDefault()
    translateme()
})
    

//Speech Recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = new SpeechRecognition()


recognition.onstart = ()=>{
    console.log("Voices activated!!")
}

recognition.onresult = (event)=>{
    console.log(event)
    const current = event.resultIndex

    const transcript = event.results[current][0].transcript
    inputdata.value = transcript
    translateme()
   
}
//Voice Recognition event
btn.addEventListener("click",()=>{
    recognition.start()
})
//Speak out event
speakme.addEventListener("click",()=>{
    const totranslate = document.querySelector("#result").value
    const lan = document.querySelector("#res_lan").value
    readOutLoud(totranslate , lan)
})

const readOutLoud = (message , lang)=>{
    const speech = new SpeechSynthesisUtterance()
    console.log(speech)

    speech.text = message
    speech.voulme = 1;
    speech.rate = 1;
    speech.lang = lang

    window.speechSynthesis.speak(speech)
}
