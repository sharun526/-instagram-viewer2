const BACKEND_BASE="https://instagram-id-views.onrender.com";
const ADMIN_USER="sharun";
const ADMIN_PASSWORD="adminlgsharun123";

const $=id=>document.getElementById(id);

async function fetchIdsFromBackend(){
    const box=$("currentList");
    box.innerHTML="<p>Loading...</p>";
    try{
        let r=await fetch(`${BACKEND_BASE}/api/ids`);
        let data=await r.json();
        box.innerHTML="";
        data.forEach(u=>{
            let li=document.createElement("li");
            li.textContent=u.username;
            box.appendChild(li);
        })
    }catch{
        box.innerHTML="<p style='color:red;'>Backend not responding.</p>";
    }
}

function showAdminPanel(){
    $("adminPanel").style.display="block";
}

document.addEventListener("DOMContentLoaded",()=>{

    $("openAdmin").onclick=()=>{
        if(prompt("Admin Username:")!==ADMIN_USER) return alert("Wrong User");
        if(prompt("Admin Password:")!==ADMIN_PASSWORD) return alert("Wrong Password");
        showAdminPanel();
    };

    $("addForm").onsubmit=(e)=>{
        e.preventDefault();
        let id=$("newId").value.trim();
        if(!id)return;

        fetch(`${BACKEND_BASE}/api/ids`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Basic "+btoa(`${ADMIN_USER}:${ADMIN_PASSWORD}`)
            },
            body:JSON.stringify({username:id})
        }).then(()=>fetchIdsFromBackend());
    };

    fetchIdsFromBackend();
});