// Edita este archivo para cambiar el contenido del carrousel.
// Estructura:
//   brand      — iniciales en header izquierdo (ej. "JR")
//   date       — fecha header derecho (formato 05·05·2026, usa el bullet ·)
//   author     — nombre completo en la página de cierre
//   pages      — array de páginas. Tipos: cover | insight | closer
//
// Patrones disponibles: bars | blocks | diamonds | wireframe | arrow | none
// Usa <strong>...</strong> dentro del body para los énfasis en bold.

window.CAROUSEL = {
  brand: "JR",
  date: "05·05·2026",
  author: "Juan Manuel Rojas",
  pages: [
    {
      type: "cover",
      headline: "Hay algo que sabes hacer y no sabes cómo lo haces.",
      aphorism: "y por años bastaba con tu presencia.",
      pattern: "bars",
    },
    {
      type: "insight",
      label: "THE INSIGHT 01",
      headline: "Por décadas trabajamos así.",
      body: "Cada profesional cargaba en la cabeza el cómo. Cómo se vendía, cómo se cobraba, cómo se hablaba con un cliente difícil. Lo aprendías al lado de alguien, lo refinabas con cada error, y al final <strong>salía sin pensar. Nadie escribía nada porque no hacía falta</strong>.",
      aphorism: "el conocimiento vivía en quien lo usaba.",
      pattern: "blocks",
    },
    {
      type: "insight",
      label: "THE INSIGHT 02",
      headline: "Las empresas se sostenían sobre eso.",
      body: "Los huecos los rellenaba alguien. Si una documentación no existía, se preguntaba en pasillo. Si un proceso no estaba escrito, alguien lo había hecho cien veces y lo recordaba. <strong>Esa memoria informal era el verdadero sistema operativo.</strong> Funcionó por mucho tiempo.",
      aphorism: "toda la operación cabía en quienes la operaban.",
      pattern: "diamonds",
    },
    {
      type: "insight",
      label: "THE INSIGHT 03",
      headline: "Hoy tu trabajo vive en treinta conversaciones a la vez.",
      body: "Clientes, equipos, partners, sistemas, decisiones. Cada uno espera <strong>tu mejor versión, con el mismo rigor</strong>. Ya no puedes pasar por cada conversación y dejar tu marca personal. <strong>La escala te superó antes de que te dieras cuenta.</strong>",
      aphorism: "el límite ya no es lo que sabes. es a cuántos lados puedes llegar.",
      pattern: "bars",
    },
    {
      type: "insight",
      label: "THE INSIGHT 04",
      headline: "Repetirte agota. Y peor: degrada.",
      body: "Cada vez que vuelves a explicar lo mismo desde cero, <strong>tu rigor pierde un poco</strong>. La precisión de la primera vez termina siendo <strong>paráfrasis a la décima</strong>. El mensaje no llega igual. <strong>Tú no llegas igual.</strong>",
      aphorism: "lo que se repite mil veces se transforma en eco.",
      pattern: "bars",
    },
    {
      type: "insight",
      label: "THE INSIGHT 05",
      headline: "Documentar dejó de ser tarea de auditoría.",
      body: "Por décadas lo asociamos con compliance, con burocracia, con cosas que retrasan el trabajo real. <strong>Eso terminó.</strong> Cada cosa que escribes es <strong>una versión de ti que puede estar en una conversación donde tú no estás, con el mismo criterio que pondrías tú</strong>. Te extiende sin que tengas que estar.",
      aphorism: "tu pensamiento, escrito, llega adonde tú no llegas.",
      pattern: "wireframe",
    },
    {
      type: "insight",
      label: "THE INSIGHT 06",
      headline: "Los próximos cinco años se van a ganar así.",
      body: "Las empresas y profesionales que <strong>escriban su pensamiento</strong> van a sostener <strong>el mismo rigor en cien conversaciones a la vez</strong>. Los demás van a tener que escoger: <strong>estar en pocos lugares con calidad o en muchos sin coherencia</strong>. La diferencia se compone semana a semana. Al mes doce el contraste se vuelve impagable.",
      aphorism: "el rigor sostenido en escala es el verdadero diferenciador.",
      pattern: "wireframe",
    },
    {
      type: "insight",
      label: "THE INSIGHT 07",
      headline: "La voz es el atajo más corto entre tu cabeza y el archivo.",
      body: "<strong>Camina por tu trabajo en voz alta.</strong> Whisper, dictado del teléfono, ElevenLabs. Cualquier cosa que convierta voz en archivo. La parte fácil es la herramienta. La parte difícil es admitir que <strong>tu pensamiento merece más alcance del que tu calendario te permite</strong>.",
      aphorism: "sácalo de la cabeza. ponlo en un archivo.",
      pattern: "arrow",
    },
    {
      type: "closer",
      headline: "¿Quién está escribiendo lo que tú haces?",
      pattern: "bars",
    },
  ],
};
