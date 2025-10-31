document.getElementById("checkBtn").addEventListener("click", async () => {
  const ssc=parseFloat(document.getElementById("ssc").value);
  const hsc=parseFloat(document.getElementById("hsc").value);
  const group=document.getElementById("group").value;
  const timer=document.getElementById("timer").value;
  const resultsDiv=document.getElementById("results");
  resultsDiv.innerHTML="";
  if(isNaN(ssc)||isNaN(hsc)||!group||!timer){alert("Please fill all fields properly.");return;}
  if(ssc<1||ssc>5||hsc<1||hsc>5){alert("⚠️ GPA must be between 1.00 and 5.00");return;}
  const res=await fetch(`/api/eligibility?ssc=${ssc}&hsc=${hsc}&group=${group}&timer=${timer}`);
  const data=await res.json();
  if(data.error){resultsDiv.innerHTML="<p style='color:red'>"+data.error+"</p>";return;}
  data.results.forEach((r,idx)=>{
    const card=document.createElement("div");
    card.className="card "+(r.eligible?"eligible":"not");
    card.innerHTML=`<h3>${r.university}</h3>`;
    resultsDiv.appendChild(card);
  });
});