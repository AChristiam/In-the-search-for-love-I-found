async function getSummary(title) {
  const encoded = encodeURIComponent(title.replace(/ /g, "_"));
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encoded}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

function makeWikiSpan(titulo, link, img, desc) {
  return `
    <span class="wiki-wrapper">
      <a href="${link}" target="_blank" class="wiki-link">${titulo}</a>
      <span class="wiki-tooltip">
        <span class="wiki-tooltip-inner">
          ${img ? `<img src="${img}" />` : ""}
          <span class="wiki-tooltip-text">
            <strong>${titulo}</strong>
            <span>${desc}</span>
          </span>
        </span>
      </span>
    </span>`;
}

let currentLink = "";

function openWiki() {
  if (currentLink) window.open(currentLink, "_blank");
}

async function gerarFrase() {
  const url = "https://en.wikipedia.org/w/api.php?action=query&generator=random&grnnamespace=0&prop=info&inprop=url&format=json&origin=*";
  try {
    const response = await fetch(url);
    const data = await response.json();
    const pages = data.query.pages;
    const page = Object.values(pages)[0];
    const titulo = page.title;
    const link = page.fullurl;
    currentLink = link;
    const summaryData = await getSummary(titulo);
    const img = summaryData.thumbnail ? summaryData.thumbnail.source : null;
    const desc = summaryData.extract || "";

   const span1 = makeWikiSpan(titulo, link, img, desc);
   const span2 = makeWikiSpan(titulo, link, img, desc);

   const frase = `
  <p>
    As I searched for something that really mattered, <br>
    something that made it all worth it, <br>
    I found ${span1} <br><br>
    So for a while, <br>
    even if a brief while <br>
    I wondered if <br>
    ${span2} <br>
    could be a form of love
  </p>`;
    document.getElementById("frase").innerHTML = frase;

    document.querySelectorAll(".wiki-wrapper").forEach(wrapper => {
  const tooltip = wrapper.querySelector(".wiki-tooltip");
  wrapper.addEventListener("mousemove", e => {
    tooltip.style.top = (e.clientY + 16) + "px";
    tooltip.style.left = Math.min(e.clientX + 16, window.innerWidth - 340) + "px";
  });
});

  } catch (error) {
    console.error(error);
    document.getElementById("frase").innerText = "Erro ao carregar 😢";
  }
}

gerarFrase();
