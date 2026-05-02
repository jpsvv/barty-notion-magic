import { useEffect, useRef, useState } from "react";

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
const RawHtmlFrame = ({ html, className, minHeight = 400 }: Props) => {
  const ref = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(minHeight);

  // Auto-resize script injected in every doc
  const resizeScript = `<script>
(function(){
  function send(){
    var h = Math.max(
      document.documentElement.scrollHeight,
      document.body ? document.body.scrollHeight : 0
    );
    parent.postMessage({ __bartyFrameHeight: h }, "*");
  }
  window.addEventListener("load", send);
  window.addEventListener("resize", send);
  if (window.ResizeObserver) {
    new ResizeObserver(send).observe(document.documentElement);
  } else {
    setInterval(send, 500);
  }
  setTimeout(send, 100);
  setTimeout(send, 800);
  setTimeout(send, 2000);
})();
<\/script>`;

  // Detect whether the user pasted a full HTML document (with <html>/<head>/<!doctype>)
  // or only a fragment. If full document, use it as-is and just append the resize script
  // before </body>. Otherwise, wrap it with a sensible default shell.
  const trimmed = html.trim();
  const isFullDoc = /<!doctype\s+html|<html[\s>]/i.test(trimmed);

  let doc: string;
  if (isFullDoc) {
    if (/<\/body>/i.test(trimmed)) {
      doc = trimmed.replace(/<\/body>/i, `${resizeScript}</body>`);
    } else {
      doc = trimmed + resizeScript;
    }
    // Ensure links open in new tab if no <base> set
    if (!/<base\s/i.test(doc) && /<head[\s>]/i.test(doc)) {
      doc = doc.replace(/<head([^>]*)>/i, `<head$1><base target="_blank" />`);
    }
  } else {
    doc = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<base target="_blank" />
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
};

export default RawHtmlFrame;
