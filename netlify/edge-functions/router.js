export default async (request, context) => {
  const url = new URL(request.url);
  const searchParam = url.searchParams.get("q") || "";
  const query = searchParam.toLowerCase();

  // 1. Si NO hay búsqueda (?q=), dejamos pasar el tráfico a la landing de /dist
  if (!query) {
    return context.next();
  }

  // 2. Si hay búsqueda, evaluamos los afiliados
  if (query.includes("capcut") || query.includes("fiverr") || query.includes("editor")) {
    return Response.redirect("https://go.fiverr.com/visit/?bta=1034444&brand=fiverrcpa&landingPage=https%3A%2F%2Fwww.fiverr.com%2Fs%2F200YEYK", 302);
  }

  if (query.includes("arcads") || query.includes("video ia")) {
    return Response.redirect("https://arcads.ai/?via=juan-marchesi", 302);
  }

  // Si busca cualquier otra cosa, también pasa de largo a la landing
  return context.next();
};

export const config = { path: "/*" };
