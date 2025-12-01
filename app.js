const BACKEND_BASE="https://instagram-id-views.onrender.com";
const ADMIN_USER="sharun";
const ADMIN_PASSWORD="adminlgsharun123";

const $=id=>document.getElementById(id);

async function fetchIdsFromBackend(){
    const box=$("currentList");
    box.innerHTML="<p>Loading...</p>";

    try{
        let res=await fetch(`${BACKEND_BASE}/api/ids`);
        let list=await res.json();
        box.innerHTML="";

        list.forEach(user=>{
            let li=document.createElement("li");
            li.className="card";

            li.innerHTML=`
                <a href="https://instagram.com/${user.username}" target="_blank" class="link">
                    <img src="${user.profilePicUrl || "https://i.imgur.com/OV3D9aq.png"}" class="dp">
                    <span>@${user.username}</span>
                </a>`;

            box.appendChild(li);
        });

    }catch{
        box.innerHTML="<p style='color:red;'>Backend Offline</p>";
    }
}

document.addEventListener("DOMContentLoaded",()=>{

    $("openAdmin").onclick=()=>{
        if(prompt("Admin Username:")!==ADMIN_USER) return alert("Wrong User");
        if(prompt("Admin Password:")!==ADMIN_PASSWORD) return alert("Wrong Password");
        $("adminPanel").style.display="block";
    };

    $("addForm").onsubmit=(e)=>{
        e.preventDefault();
        let id=$("newId").value.trim();
        if(!id)return;

        fetch(`${BACKEND_BASE}/api/ids`,{
            method:"POST",
            headers:{
                "Authorization":"Basic "+btoa(`${ADMIN_USER}:${ADMIN_PASSWORD}`),
                "Content-Type":"application/json"
            },
            body:JSON.stringify({username:id})
        }).then(()=>fetchIdsFromBackend());
    };

    fetchIdsFromBackend();
});