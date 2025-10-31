function enableAutoDotAfterFirstDigit(id) {
  const input = document.getElementById(id);
  if (!input) return;
  input.addEventListener("keydown", (e) => {
    const key = e.key;
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (["Backspace","Delete","ArrowLeft","ArrowRight","Tab","Enter"].includes(key)) return;
    if (/^[0-9]$/.test(key)) {
      const val = input.value;
      const selStart = input.selectionStart;
      const selEnd = input.selectionEnd;
      if ((val === "" || val === ".") && selStart === 0 && selEnd === 0) {
        e.preventDefault();
        input.value = key + ".";
        setTimeout(()=>{input.setSelectionRange(input.value.length,input.value.length)},0);
        return;
      }
      return;
    }
    if (key === ".") return;
    if (!/^[0-9.]$/.test(key)) e.preventDefault();
  });
  input.addEventListener("input", ()=>{
    let v = input.value.replace(/[^0-9.]/g,"");
    const parts = v.split(".");
    if (parts.length>2) v=parts[0]+"."+parts.slice(1).join("");
    if (v!==input.value){
      const curPos = input.selectionStart;
      input.value=v;
      input.setSelectionRange(Math.min(curPos,v.length),Math.min(curPos,v.length));
    }
  });
  input.addEventListener("blur",()=>{if(input.value===".") input.value=""; else if(input.value.endsWith(".")) input.value=input.value.slice(0,-1);});
}
enableAutoDotAfterFirstDigit("ssc");
enableAutoDotAfterFirstDigit("hsc");