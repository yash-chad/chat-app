const socket = io()

//Elements
const messageForm = document.querySelector("#message_form")
const messageFormInput=messageForm.querySelector("#input")
const messageFormButton=document.querySelector("#send_button")
const translateBtn = document.querySelector("#translate_btn")
const locationbutton =document.querySelector("#locationbutton")
const messages= document.querySelector("#messages")

//Templates
const messageTemplate = document.querySelector("#message-template").innerHTML
const locationTemplate =document.querySelector("#location-template").innerHTML
const sidebarTemplate =document.querySelector("#sidebar-template").innerHTML

translateBtn.addEventListener("click",()=>{ translateme()})
//messageFormButton.addEventListener("click",()=>{console.log("efjh")})
//Options --This is the qs library whose link we've included in the html file
//location.search is a browser side tool which gives us the querystring
//eg : ?username=yashchachad1&room=myroom
//Qs.parse returns all the query parameters as object
var {username , room , source_lan , res_lan } = Qs.parse(location.search, {ignoreQueryPrefix : true })
console.log(source_lan)
console.log(res_lan)

const autoscroll =()=>{
    messages.scrollTop = messages.scrollHeight
}

socket.on("message",(message)=>{
    console.log(message)
    const html = Mustache.render(messageTemplate,{
        username : message.username,
        message : message.text,
        createdAt : moment(message.createdAt).format('h:mm a')
    })
    messages.insertAdjacentHTML('beforeend',html)
    autoscroll()
})


socket.on("locationMessage",(message)=>{
    console.log(message)
    const html = Mustache.render(locationTemplate,{
        username: message.username,
        locationlink : message.locationlink,
        createdAt : moment(message.createdAt).format('h:mm a')
    })
    messages.insertAdjacentHTML("beforeend",html)
    autoscroll()
})

socket.on("roomData",({ room , users })=>{
    const html = Mustache.render(sidebarTemplate,{
        room,
        users
    })
    document.querySelector("#sidebar").innerHTML = html

})

messageFormButton.addEventListener("click",(e)=>{
    e.preventDefault()

    messageFormButton.setAttribute("disabled","disabled")  //Disable send button on clicking
    const message =document.querySelector("input").value 

    socket.emit("message",message,(error)=>{

        messageFormButton.removeAttribute("disabled")  //Reactivate the button on sending
        messageFormInput.value=""
        messageFormInput.focus()


        if(error){
            return console.log(error)
        }else{
            console.log("Message Delivered!")
        }
     
    })
})

locationbutton.addEventListener("click",()=>{

    locationbutton.setAttribute("disabled","disabled")

    if(!navigator.geolocation){
        return alert("OOps! The current browser doesn't support this feature")
    }

    navigator.geolocation.getCurrentPosition((position)=>{
        socket.emit("sendLocation",{
            latitude :position.coords.latitude,
            longitude :position.coords.longitude
        },()=>{
            console.log("Location Shared!")
            locationbutton.removeAttribute("disabled")
        })
    })
    
})

socket.emit("join", { username , room },(error)=>{
    if(error){
        alert(error)
        location.href = "/"
    }
})