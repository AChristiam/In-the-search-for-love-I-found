async function gerarFrase() {
  const url = "https://pt.wikipedia.org/w/api.php?action=query&generator=random&grnnamespace=0&prop=info&inprop=url&format=json&origin=*";

  try {
    const response = await fetch(url);
    const data = await response.json();

    const pages = data.query.pages;
    const page = Object.values(pages)[0];

    const titulo = page.title;
    const link = page.fullurl;

    const frase = `Hoje eu descobri algo inesperado sobre 
      <a href="${link}" target="_blank">${titulo}</a>.`;

    document.getElementById("frase").innerHTML = frase;

  } catch (error) {
    document.getElementById("frase").innerText = "Erro ao carregar 😢";
    console.error(error);
  }
}

gerarFrase();
