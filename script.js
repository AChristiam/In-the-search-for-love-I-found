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
      <div class="wiki-tooltip">
        <div class="wiki-tooltip-inner">
          ${img ? `<img src="${img}" />` : ""}
          <div class="wiki-tooltip-text">
            <strong>${titulo}</strong>
            <p>${desc}</p>
          </div>
        </div>
      </div>
    </span>`;
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
    const summaryData = await getSummary(titulo);
    const img = summaryData.thumbnail ? summaryData.thumbnail.source : null;
    const desc = summaryData.extract || "";

   const span1 = makeWikiSpan(titulo, link, img, desc);
   const span2 = makeWikiSpan(titulo, link, img, desc);

   const frase = `
  <p>
    In the search for love, <br>
    I found ${span1} <br><br>
    So I started to wonder <br>
    if ${span2} <br>
    could also be a form of love
  </p>`;
    document.getElementById("frase").innerHTML = frase;

    document.querySelectorAll(".wiki-wrapper").forEach(wrapper => {
      const tooltip = wrapper.querySelector(".wiki-tooltip");
      wrapper.addEventListener("mouseenter", e => {
        const rect = wrapper.getBoundingClientRect();
        tooltip.style.top = (rect.bottom + 8) + "px";
        tooltip.style.left = Math.min(rect.left, window.innerWidth - 340) + "px";
      });
    });

  } catch (error) {
    console.error(error);
    document.getElementById("frase").innerText = "Erro ao carregar 😢";
  }
}

gerarFrase();
