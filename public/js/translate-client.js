const submit = document.querySelector("#btn")
const inputdata = document.querySelector("#inputdata")
const result = document.querySelector("#result")



submit.addEventListener("submit",(e)=>{
    e.preventDefault()
    const datainp = inputdata.value

    const source_lan = document.querySelector("#source_lan").value
    const res_lan = document.querySelector("#res_lan").value

    console.log(source_lan)
    console.log(res_lan)
    
    const inputlink = "http://localhost:3000/translated?source_lan"+source_lan+"&res_lan="+res_lan+"&inputstring=" + datainp;
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

})
    
// weatherForm.addEventListener("submit",(e)=>{
//     e.preventDefault();  //Restricts the refreshing of the page on input
//     const location=search.value;
//     const loc_url="/weather?address="+location;  
//     message_1.textContent="LOADING....";
//     message_2.textContent='';
//     fetch(loc_url).then((response)=>{
//         response.json().then((data)=>{

//             if(data.error){
//                message_1.textContent=data.error;
//             }
//             else{
//                 message_1.textContent=data.location;
//                 message_2.textContent=data.forecast;
//             }
//         })
//     })

// })
