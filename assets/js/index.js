function checklogin()
{
    var storedName = localStorage.getItem('JWT_Token')

    if (storedName == null) {

        window.location.replace("/")
        alert('Please Login To Continue.')
    } 
    else{
        checkGiven()
    }
}
function checklogin2()
{
    var storedName = localStorage.getItem('JWT_Token')

    if (storedName == null) {

        window.location.replace("/")
        alert('Please Login To Continue.')
    } 
    else{
        checkGiven2()
    }
}
function register()
{
    var data=
    {
    "name":document.getElementById('first_name').value + document.getElementById('last_name').value,
	"email":document.getElementById('remail').value,
    "password":document.getElementById('password').value,
    "phone":document.getElementById('phoneno').value,
    "regno":document.getElementById('regno').value
    }
    // console.log(data)
    var xh = new XMLHttpRequest();
    xh.open("POST", "https://cc-design.herokuapp.com/design/user/create", true)
    xh.setRequestHeader('Content-Type', 'application/json')
    xh.send(JSON.stringify(data))
    xh.onload=function(){
        // console.log(this.status)
        if(this.status==201)
        {
            alert('Registered successfully! Login to continue.')
            window.location.replace('/#login')
        }
        else if(this.status==402){
            alert('Are you sure you entered a valid registration number of the batch of 2022?')
            window.location.replace('/#sign-up')
        }
        else if(this.status==401)
        {
            alert('Looks like your profile already exists...')
            window.location.replace('/#sign-up')
        }
        else{
            alert('There was some error. Please try again!')
            window.location.replace('/#sign-up')
        }
}
}

function submitdata() 
{
    var data=
    {
    "link":document.getElementById('urls_des').value
    }
    // console.log(data)
    var jwt = localStorage.getItem('JWT_Token')
    var xh = new XMLHttpRequest();
    xh.open("POST", "https://cc-design.herokuapp.com/submit/design/url", true)
    xh.setRequestHeader('Content-Type', 'application/json')
    xh.setRequestHeader('Authorization', jwt)
    xh.send(JSON.stringify(data))
    xh.onload=function(){
        // console.log(this.status)
        if(this.status==201)
        {
            alert('We have received your submission. Keep checking your email for further updates.')
            window.location.replace('/exam')
        }
        else{
            alert('There was some error. Please try again!')
            window.location.replace('/des_urls')
        }
}
}

function checkGiven()
{
    var jwt = localStorage.getItem('JWT_Token')
    var xh = new XMLHttpRequest();
    xh.open("GET", "https://cc-design.herokuapp.com/check/user/submission", true)
    xh.setRequestHeader('Content-Type', 'application/json')
    xh.setRequestHeader('Authorization', jwt)
    xh.send()
    xh.onload=function(){
        // console.log(this.status)
        if(this.status==200)
        {
            var data=JSON.parse(this.responseText)
            if(data.link!=undefined)
            {
            document.getElementById('dh1').innerHTML='Submission completed'
            document.getElementById('dh2').innerHTML='Thanks for your response'
            document.getElementById('dh3').innerHTML='Results will be out soon!'
            document.getElementById('da1').href='#'
            }
        }
        else{
            alert('There was some error. Please try again!')
            window.location.replace('/exam')
        }
}
}
function checkGiven2()
{
    var jwt = localStorage.getItem('JWT_Token')
    var xh = new XMLHttpRequest();
    xh.open("GET", "https://cc-design.herokuapp.com/check/user/submission", true)
    xh.setRequestHeader('Content-Type', 'application/json')
    xh.setRequestHeader('Authorization', jwt)
    xh.send()
    xh.onload=function(){
        // console.log(this.status)
        if(this.status==200)
        {
            var data=JSON.parse(this.responseText)
            if(data.link!=undefined)
            {
                window.location.replace('/exam')
            }
        }
        else{
            alert('There was some error. Please try again!')
            window.location.replace('/exam')
        }
}
}

function logout()
{
    localStorage.removeItem("JWT_Token");
    alert('Thank you for visiting. We hope to see you with us soon!')
    window.location.replace("/")
}

function contact()
{
    var data=
    {
    "name":document.getElementById('name').value,
	"email":document.getElementById('email').value,
    "message":document.getElementById('message').value
    }
    // console.log(data)
    var xh = new XMLHttpRequest();
    xh.open("POST", "https://cc-design.herokuapp.com/contact/team", true)
    xh.setRequestHeader('Content-Type', 'application/json')
    xh.send(JSON.stringify(data))
    xh.onload=function(){
        // console.log(this.status)
        if(this.status==201)
        {
            alert('We have received your message. Keep checking your inbox to hear more from us!')
            window.location.replace('/')
        }
        
        else{
            alert('Failed to send message. Please try again!')
            window.location.replace('/#contact')
        }
}
}

console.clear();