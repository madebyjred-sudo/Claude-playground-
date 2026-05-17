# cortex · launch video

Motion graphics para el lanzamiento de Cortex, construidas en
[Remotion](https://www.remotion.dev) (React + TypeScript) con el
sistema visual JR (cream paper, navy ink, terracota accents,
blackletter + Söhne).

## Cómo arrancar

```bash
cd cortex-cli/launch-video
npm install
npm start
```

Eso abre Remotion Studio en `http://localhost:3000` con preview en vivo
de la composición.

## Cómo renderizar

```bash
# vertical (1080×1350) para LinkedIn / IG feed
npm run build

# cuadrado (1080×1080) para LinkedIn / IG square
npm run build:square
```

Los MP4 quedan en `out/`.

## Compositions

| ID | Tamaño | Uso |
|---|---|---|
| `cortex-launch` | 1080×1350 | feed vertical |
| `cortex-launch-square` | 1080×1080 | cuadrado |

## Estructura

```
src/
├── index.ts         # entry point (registerRoot)
├── Root.tsx         # registro de compositions
├── CortexLaunch.tsx # composición principal (en construcción)
└── theme.ts         # tokens de paleta, tipografía, dimensiones
```
