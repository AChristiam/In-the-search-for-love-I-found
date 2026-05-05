async function getSummary(title) {
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;

  const res = await fetch(url);
  const data = await res.json();

  return data;
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

   const frase = `
<p>
In the search for love, <br>
I found <a href="${link}" target="_blank">${titulo}</a> <br><br>

So I started to wonder <br>
if <a href="${link}" target="_blank">${titulo}</a> <br>
could also be a form of love
</p>
`;

    document.getElementById("frase").innerHTML = frase;

  } catch (error) {
    console.error(error);
    document.getElementById("frase").innerText = "Erro ao carregar 😢";
  }
}

gerarFrase();
