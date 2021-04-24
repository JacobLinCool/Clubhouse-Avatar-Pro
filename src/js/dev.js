/* Edura */
function dev_edura() {
  let src = "//cdn.jsdelivr.net/npm/eruda";
  if (!window.location.href.includes("edura") && localStorage.getItem("active-eruda") != "true") return;
  document.write("<scr" + 'ipt src="' + src + '"></scr' + "ipt>");
  document.write("<scr" + "ipt>eruda.init();</scr" + "ipt>");
}

export { dev_edura };
