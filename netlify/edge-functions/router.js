/**
 * Netlify Edge Function: Semantic and Hybrid Affiliate Redirection Router
 * 
 * Intercepts incoming traffic, parses bilingually (EN/ES), detects high-intent niches,
 * applies secondary-level logic (e.g. builders vs platforms, language headers), and
 * performs quick 302 redirects to optimized affiliate destinations.
 * 
 * @license SPDX-License-Identifier: Apache-2.0
 */

export default async (request, context) => {
  try {
    const url = new URL(request.url);
    
    // 1. Capture routing signals from both search query (?q=) and sub-path
    const qParam = url.searchParams.get("q") || "";
    const subPath = decodeURIComponent(url.pathname).replace(/^\//, "");
    
    // Consolidate normalized criteria text
    const fullText = `${qParam} ${subPath}`.toLowerCase().trim();
    
    // 2. Identify client language context (Bilingual fallback)
    const acceptLanguage = request.headers.get("accept-language") || "";
    const isSpanishHeader = acceptLanguage.toLowerCase().includes("es");
    
    // Explicit Spanish keyword indicators
    const containsSpanishKeywords = 
      fullText.includes("redaccion") || 
      fullText.includes("miniatura") || 
      fullText.includes("plantillas") || 
      fullText.includes("logotipo") || 
      fullText.includes("voz") || 
      fullText.includes("locutor") || 
      fullText.includes("narrador") || 
      fullText.includes("embudo") || 
      fullText.includes("automatizar") || 
      fullText.includes("armar");
      
    const isSpanish = isSpanishHeader || containsSpanishKeywords;

    // Log the incoming router evaluation for debugging / analytics
    console.log(`[Affiliate Router] Path: "${url.pathname}", Q: "${qParam}", Evaluated: "${fullText}", LangES: ${isSpanish}`);

    // --- NICHE 1: Automatizaciones ---
    if (
      fullText.includes("automation") || 
      fullText.includes("make") || 
      fullText.includes("n8n") || 
      fullText.includes("automatizar")
    ) {
      return Response.redirect("https://go.fiverr.com/visit/?bta=184936&brand=fiverrcpa&landingPage=https%253A%252F%252Fwww.fiverr.com%252Fadeola_segun7%252Fautomate-your-workflow-with-make-com-automation%253Fcontext_referrer%253Dsearch_gigs_with_sellers_who_speak%2526source%253Dtop-bar%2526ref_ctx_id%253Dd132d0549c214c35a7a157ece1f79c50%2526pckg_id%253D1%2526pos%253D6%2526context_type%253Dauto%2526funnel%253Dd132d0549c214c35a7a157ece1f79c50%2526seller_online%253Dtrue%2526imp_id%253Dba03eca1-a3b7-4dad-834a-41c5fdee2378", 302);
    }

    // --- NICHE 2: Avatares de IA y Video de Anuncios ---
    if (
      fullText.includes("arcads") || 
      fullText.includes("ai avatar") || 
      fullText.includes("avatar video") || 
      fullText.includes("ugc ai")
    ) {
      return Response.redirect("https://arcads.ai/?via=juan-marchesi", 302);
    }

    // --- NICHE 3: Edición de Video Corto ---
    if (
      fullText.includes("video") || 
      fullText.includes("reel") || 
      fullText.includes("tiktok") || 
      fullText.includes("short") || 
      fullText.includes("capcut")
    ) {
      return Response.redirect("https://go.fiverr.com/visit/?bta=184936&brand=fiverrcpa&landingPage=https%253A%252F%252Fwww.fiverr.com%252Fiamkamran01%252Fdo-video-editing-for-instagram-reels-youtube-shorts-and-tik-tok-using-capcut%253Fcontext_referrer%253Dsearch_gigs_with_sellers_who_speak%2526source%253Dtop-bar%2526ref_ctx_id%253D8f8ddfba6c26431199c596a0e2789046%2526pckg_id%253D1%2526pos%253D15%2526context_type%253Dauto%2526funnel%253D8f8ddfba6c26431199c596a0e2789046%2526imp_id%253D8d82e5f0-47ac-4cc9-bae5-849f41677146", 302);
    }

    // --- NICHE 4: Locución / Voice Over ---
    if (
      fullText.includes("voice") || 
      fullText.includes("locutor") || 
      fullText.includes("narrador") || 
      fullText.includes("voz")
    ) {
      return Response.redirect("https://go.fiverr.com/visit/?bta=184936&brand=fiverrcpa&landingPage=https%253A%252F%252Fwww.fiverr.com%252Fglifomedia%252Fcreate-an-english-or-spanish-voice-over-with-male-or-female-realistic-voice%253Fcontext_referrer%253Dsearch_gigs_with_sellers_who_speak%2526source%253Dsellers_who_speak_es%2526ref_ctx_id%253D904b280abc434f45b09af00076525917%2526pckg_id%253D1%2526pos%253D2%2526context_type%253Dauto%2526funnel%253D904b280abc434f45b09af00076525917%2526imp_id%253D5a458078-99db-48dc-9a91-a928e840f6c7", 302);
    }

    // --- NICHE 5: Embudos de Venta y Landings ---
    if (
      fullText.includes("systeme") || 
      fullText.includes("funnel") || 
      fullText.includes("embudo") || 
      fullText.includes("landing")
    ) {
      // Sub-logic: Builder/Expert vs General platform referral
      if (
        fullText.includes("builder") || 
        fullText.includes("expert") || 
        fullText.includes("armar")
      ) {
        return Response.redirect("https://go.fiverr.com/visit/?bta=184936&brand=fiverrcpa&landingPage=https%253A%252F%252Fwww.fiverr.com%252Fayenastechteam%252Fbuild-clickfunnels-sales-funnel-kajabi-gohighlevel-funnelish-systeme-funnel-page%253Fcontext_referrer%253Dsearch_gigs_with_sellers_who_speak%2526source%253Dtop-bar%2526ref_ctx_id%253D0be3392fbb6a4f8190f16c0fd2704c20%2526pckg_id%253D1%2526pos%253D39%2526context_type%253Dauto%2526funnel%253D0be3392fbb6a4f8190f16c0fd2704c20%2526imp_id%253D7fa4375a-3b8c-4d2f-98aa-0d963ab8ab2c", 302);
      }
      return Response.redirect("https://systeme.io/?sa=sa00328178523a30364188e38098725025f22d6919", 302);
    }

    // --- NICHE 6: Copywriting / Redacción ---
    if (
      fullText.includes("copy") || 
      fullText.includes("redaccion") || 
      fullText.includes("seo content") || 
      fullText.includes("blog")
    ) {
      if (isSpanish) {
        return Response.redirect("https://go.fiverr.com/visit/?bta=184936&brand=fiverrcpa&landingPage=https%253A%252F%252Fwww.fiverr.com%252Fjorge_porcayo%252Fcopywriting-seo-website-content-article-or-blog-writing-in-spanish%253Fcontext_referrer%253Dsearch_gigs_with_sellers_who_speak%2526source%253Dtop-bar%2526ref_ctx_id%253Db7b6d9edfcb94aab93184eb459b03225%2526pckg_id%253D1%2526pos%253D26%2526context_type%253Dauto%2526funnel%253Db7b6d9edfcb94aab93184eb459b03225%2526imp_id%253Ded538e32-a890-4a25-888b-dbe88e02eaeb", 302);
      }
      return Response.redirect("https://go.fiverr.com/visit/?bta=184936&brand=fiverrcpa&landingPage=https%253A%252F%252Fwww.fiverr.com%252Fwadimfiliks%252Fwrite-seo-friendly-content-for-any-website-pl-en-ru%253Fcontext_referrer%253Dsearch_gigs_with_sellers_who_speak%2526source%253Dtop-bar%2526ref_ctx_id%253Db7b6d9edfcb94aab93184eb459b03225%2526pckg_id%253D1%2526pos%253D45%2526context_type%253Dauto%2526funnel%253Db7b6d9edfcb94aab93184eb459b03225%2526imp_id%253D2bb663c7-9d1e-433f-810d-3a64c08d2a0e%2526ad_key%253D370edef0-2a4f-4de3-943d-8c230a31682d", 302);
    }

    // --- NICHE 7: Miniaturas ---
    if (
      fullText.includes("thumbnail") || 
      fullText.includes("miniatura") || 
      fullText.includes("youtube cover")
    ) {
      if (isSpanish) {
        return Response.redirect("https://go.fiverr.com/visit/?bta=184936&brand=fiverrcpa&landingPage=https%253A%252F%252Fwww.fiverr.com%252Felomag%252Fdraw-cartoon-youtube-thumbnails%253Fcontext_referrer%253Dsearch_gigs_with_sellers_who_speak%2526source%253Dsellers_who_speak_es%2526ref_ctx_id%253De47e42bfbe1d4bc7b6a4f1e1e5d43cc0%2526pckg_id%253D1%2526pos%253D3%2526context_type%253Dauto%2526funnel%253De47e42bfbe1d4bc7b6a4f1e1e5d43cc0%2526seller_online%253Dtrue%2526imp_id%253Db4c63f9a-0e65-488a-9ee1-2c34ad22724f", 302);
      }
      return Response.redirect("https://go.fiverr.com/visit/?bta=184936&brand=fiverrcpa&landingPage=https%253A%252F%252Fwww.fiverr.com%252Fwp_forge%252Fcreate-build-revamp-wordpress-website-design-redesign-website-development%253Fcontext_referrer%253Dsearch_gigs_with_sellers_who_speak%2526source%253Dtop-bar%2526ref_ctx_id%253De47e42bfbe1d4bc7b6a4f1e1e5d43cc0%2526pckg_id%253D1%2526pos%253D1%2526context_type%253Dauto%2526funnel%253De47e42bfbe1d4bc7b6a4f1e1e5d43cc0%2526seller_online%253Dtrue%2526imp_id%253D9a4aafe2-0660-4089-a8a1-217820d1c333", 302);
    }

    // --- NICHE 8: Canva e Instagram Posts ---
    if (
      fullText.includes("canva") || 
      fullText.includes("instagram post") || 
      fullText.includes("plantillas")
    ) {
      return Response.redirect("https://go.fiverr.com/visit/?bta=184936&brand=fiverrcpa&landingPage=https%253A%252F%252Fwww.fiverr.com%252Fblacklline%252Fdesign-instagram-facebook-post-and-social-media-ad-creative%253Fcontext_referrer%253Dsearch_gigs_with_sellers_who_speak%2526source%253Dtop-bar%2526ref_ctx_id%253D1861b29bf9ce47bfa54c9ce46b0265f5%2526pckg_id%253D1%2526pos%253D11%2526context_type%253Dauto%2526funnel%253D1861b29bf9ce47bfa54c9ce46b0265f5%2526imp_id%253Dc4bb60a8-50ed-438c-b50c-5d15764eec45%2526ad_key%253D53d47460-ba02-469a-82b3-fae0a8ea19ed", 302);
    }

    // --- NICHE 9: Logos ---
    if (
      fullText.includes("logo") || 
      fullText.includes("branding") || 
      fullText.includes("logotipo")
    ) {
      return Response.redirect("https://go.fiverr.com/visit/?bta=184936&brand=fiverrcpa&landingPage=https%253A%252F%252Fwww.fiverr.com%252Fwolf_studio_%252Fdo-unique-business-minimalist-logo-design%253Fcontext_referrer%253Dsearch_gigs_with_sellers_who_speak%2526source%253Dtop-bar%2526ref_ctx_id%253D5f4d0466b4b24165a1cbe45b1a43838a%2526pckg_id%253D1%2526pos%253D10%2526context_type%253Dauto%2526funnel%253D5f4d0466b4b24165a1cbe45b1a43838a%2526imp_id%253D4a0a773c-28f8-4436-9b6b-92c86f02069e%2526ad_key%253Db4b8039c-bd5e-4c7f-9ea1-b65fa8010da9", 302);
    }

    // --- FALLBACK: Default General Fiverr Affiliate Link ---
    return Response.redirect("https://go.fiverr.com/visit/?bta=184936&brand=fiverrcpa", 302);
  } catch (error) {
    console.error("[Affiliate Router Error]:", error);
    // Silent failover to general affiliate home
    return Response.redirect("https://go.fiverr.com/visit/?bta=184936&brand=fiverrcpa", 302);
  }
};

export const config = {
  path: "/*"
};
