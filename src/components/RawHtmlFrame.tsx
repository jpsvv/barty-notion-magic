import { forwardRef, useEffect, useMemo, useRef, useState } from "react";

interface Props {
  html: string;
  className?: string;
  /** Minimum height in px before content measures */
  minHeight?: number;
}

/**
 * Renders user-supplied raw HTML (with its own <style>, fonts, layout)
 * inside an isolated iframe using srcDoc so it cannot inherit or leak
 * CSS to/from the host site. Auto-resizes to content height.
 */
const RawHtmlFrame = forwardRef<HTMLIFrameElement, Props>(
  ({ html, className, minHeight = 400 }, ref) => {
  const [height, setHeight] = useState(minHeight);

  // Auto-resize script injected in every doc
  const resizeScript = `<script>
(function(){
  var lastH = 0;
  function send(){
    var h = Math.max(
      document.documentElement.scrollHeight,
      document.body ? document.body.scrollHeight : 0
    );
    if (Math.abs(h - lastH) < 2) return;
    lastH = h;
    parent.postMessage({ __bartyFrameHeight: h }, "*");
  }
  window.addEventListener("load", send);
  window.addEventListener("resize", send);
  if (window.ResizeObserver) {
    new ResizeObserver(function(){
      // debounce within a frame to avoid feedback loops
      if (window.__bartyRaf) cancelAnimationFrame(window.__bartyRaf);
      window.__bartyRaf = requestAnimationFrame(send);
    }).observe(document.documentElement);
  } else {
    setInterval(send, 500);
  }
  // Re-measure after web fonts finish loading (prevents clipped layouts)
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function(){ send(); setTimeout(send, 200); });
  }
  // Re-measure when any <img> finishes loading
  Array.prototype.forEach.call(document.images, function(img){
    if (!img.complete) img.addEventListener("load", send);
  });
  setTimeout(send, 100);
  setTimeout(send, 800);
  setTimeout(send, 2000);
  setTimeout(send, 4000);
})();
<\/script>`;

  // Memoize the document string so the iframe's srcDoc is stable between
  // parent rerenders that don't change `html`. Without this, every keystroke
  // anywhere in the editor would recompute `doc` and React would diff a new
  // string identity, causing the iframe to reload and appear blank/loading.
  const googleFontsPreconnect = `
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />`;

  const doc = useMemo(() => {
    const trimmed = (html || "").trim();
    const isFullDoc = /<!doctype\s+html|<html[\s>]/i.test(trimmed);
    const usesGoogleFonts = /fonts\.googleapis\.com|fonts\.gstatic\.com/i.test(trimmed);
    let out: string;
    if (isFullDoc) {
    if (/<\/body>/i.test(trimmed)) {
        out = trimmed.replace(/<\/body>/i, `${resizeScript}</body>`);
    } else {
        out = trimmed + resizeScript;
    }
      if (/<head[\s>]/i.test(out)) {
        const inject =
          (!/<base\s/i.test(out) ? `<base target="_blank" />` : ``) +
          (usesGoogleFonts ? googleFontsPreconnect : ``);
        if (inject) out = out.replace(/<head([^>]*)>/i, `<head$1>${inject}`);
      }
    } else {
      out = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<base target="_blank" />
${usesGoogleFonts ? googleFontsPreconnect : ""}
<style>
  html,body{margin:0;padding:0;background:transparent;}
  body{overflow-x:hidden;}
  img,video,iframe{max-width:100%;height:auto;}
</style>
</head>
<body>
${html}
${resizeScript}
</body></html>`;
    }
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [html]);

  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      const data = e.data as { __bartyFrameHeight?: number } | null;
      if (data && typeof data.__bartyFrameHeight === "number") {
        setHeight(Math.max(minHeight, Math.ceil(data.__bartyFrameHeight) + 8));
      }
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, [minHeight]);

  return (
    <iframe
      ref={ref}
      title="Conteúdo do post"
      srcDoc={doc}
      sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
      className={className}
      style={{ width: "100%", border: 0, display: "block", height }}
    />
  );
});

RawHtmlFrame.displayName = "RawHtmlFrame";

export default RawHtmlFrame;
