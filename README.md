## Descripción del proyecto

Este proyecto es una aplicación de frontend construida con `Next.js`, `React` y `Vitest` para pruebas, usando `Biome` para linting y formateo de código.

El objetivo es mantener un código **limpio**, **tipado** y **fácil de escalar**, con un flujo de validación automático en desarrollo (pre-commit) y en build.

## Enlace de aplicación en Vercel

`https://bold-frontend-blue.vercel.app/`

## Variables de entorno

### NEXT_PUBLIC_API_BASE_URL

**Valor por defecto**: `https://bold-fe-api.vercel.app`

**Descripción**: URL base de la API que se utiliza para realizar todas las peticiones HTTP del proyecto.

**Archivos donde se consume**:

- **`src/lib/enviroments.ts`**: Se valida y exporta la variable de entorno con validación de requerimiento. Si no está definida, lanza un error.
- **`src/services/transactions/transactions.service.ts`**: Se utiliza para construir el endpoint completo de la API de transacciones (`${enviroments.apiBaseUrl}${ROUTES.list}`).
- **`vite.config.ts`**: Se define para el entorno de tests, con fallback a `http://localhost:3000` si no está configurada.
- **`src/utils/testing/setupTest.ts`**: Se configura para el entorno de testing con el mismo fallback.

**Uso en el proyecto**:

```typescript
// Ejemplo de uso en un servicio
import { enviroments } from "@/lib/enviroments";
import { ROUTES } from "@/services/transactions/transactions.routes";

const ENDPOINT = `${enviroments.apiBaseUrl}${ROUTES.list}`;
// Resultado: https://bold-fe-api.vercel.app/api
```

**Cómo afecta a las peticiones**:

- Todas las peticiones HTTP pasan por el cliente centralizado (`src/services/apiClient/index.ts`).
- El servicio de transacciones (`getTransactions`) construye la URL completa concatenando `apiBaseUrl` con las rutas definidas en `transactions.routes.ts`.
- En desarrollo local, si no se define la variable, se usa `http://localhost:3000` como fallback.
- En producción, debe configurarse con el valor `https://bold-fe-api.vercel.app`.

**Configuración**:

Crea un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_API_BASE_URL=https://bold-fe-api.vercel.app
```

O configura la variable en tu plataforma de despliegue (Vercel, Netlify, etc.).

## Scripts disponibles

- **dev**: levanta el servidor de desarrollo de Next.js.
- **build**: ejecuta las validaciones de código y luego genera el bundle de producción.
- **start**: inicia la aplicación ya construida.
- **lint**: ejecuta `biome check`.
- **format**: ejecuta `biome format --write`.
- **biome:fix**: ejecuta `biome check --write --unsafe`.
- **test**: ejecuta los tests con `vitest run`.
- **test:coverage**: ejecuta los tests con reporte de cobertura.
- **typecheck**: ejecuta `tsc --noEmit` para validar tipos sin generar archivos.
- **validate**: ejecuta en cadena `typecheck`, `lint` y `test`.

## Flujo de validación

- **Pre-commit**: se ejecuta automáticamente `pnpm validate`, que incluye:
  - **Validación de TypeScript**: `tsc --noEmit`.
  - **Validación de Biome**: `biome check`.
  - **Ejecución de tests**: `vitest run`.
- **Build**: el script de `build` ejecuta primero `pnpm validate` y, solo si todo pasa, corre `next build`.

## Recomendaciones de arquitectura y buenas prácticas

- **Manejo de peticiones**:
  - Se recomienda usar **React Query** para el manejo de peticiones HTTP de manera eficiente (caché, revalidación, estados de loading/error, etc.).
- **Manejo de estado global**:
  - Se recomienda usar **Zustand** para el estado global en lugar de contextos complejos, manteniendo stores pequeños, testables y desacoplados de la UI.
- **Listas extensas y performance**:
  - Para listas muy largas sin paginación, se recomienda usar **virtualización** (por ejemplo, `react-window` o `react-virtualized`) para mejorar la performance y evitar bloqueos de render.
- **Filtros y experiencia de usuario**:
  - Los filtros pueden **persistirse en query parameters** (por ejemplo `?status=paid&from=2025-01-01`), lo que permite:
    - Compartir URLs con el estado actual de filtros.
    - Mantener el estado de la pantalla al refrescar o navegar hacia atrás.
- **Design System**:
  - Se puede implementar un **Design System** organizando los componentes como:
    - **Átomos**: botones, inputs, tipografías, iconos, etc.
    - **Moléculas**: combinaciones de átomos (por ejemplo, cards, items de lista, filtros compuestos).
  - Esto facilita la reutilización, consistencia visual y escalabilidad del proyecto.
- **SVGs como componentes React**:
  - Los SVGs pueden usarse como **componentes de React**, lo que permite:
    - Controlar propiedades como `fill`, `stroke`, `className` y accesibilidad (`aria-*`).
    - Evitar dependencias de optimizaciones específicas como `next/image` para iconografía.
  - A cambio, esto puede **aumentar ligeramente el tamaño del bundle**, pero se gana control total sobre el renderizado y estilo.
- **Internacionalización (i18n)**:
  - Actualmente se maneja una **internacionalización local**, con traducciones y contexto propio.
  - Si fuera necesario escalar, se puede integrar una librería de traducciones dedicada (por ejemplo, `react-intl`, `next-intl` o similares) para manejar:
    - Plurales.
    - Formateo avanzado de fechas/números.
    - Carga dinámica de locales.

## Arquitectura y patrones del proyecto

### Estructura de carpetas

**Nota**
La estructura se podría mejorar para una mejor visualización/semántica, separando un poco las responsabilidades

El proyecto sigue una organización modular y escalable:

```
src/
├── app/                    # App Router de Next.js (layout, page, rutas)
├── components/             # Componentes reutilizables globales
│   ├── Header/            # Componente de navegación
│   ├── icons/             # Iconos SVG como componentes React
│   ├── LanguageSwitcher/  # Selector de idioma
│   ├── Popover/           # Componente de popover reutilizable
│   └── Skeleton/          # Componente de carga
├── contexts/              # Contextos de React (estado global)
│   └── TranslationContext.tsx
├── hooks/                 # Hooks personalizados globales
│   └── useTranslations.ts
├── lib/                   # Utilidades y funciones puras
│   ├── calculateTotal.ts
│   ├── formatCurrency.ts
│   ├── formatDateTime.ts
│   ├── translations.ts    # Sistema de traducciones
│   └── enviroments.ts     # Variables de entorno
├── locales/               # Archivos JSON de traducciones
│   ├── es.json
│   └── en.json
├── modules/               # Módulos de funcionalidad específica
│   └── listTransactions/ # Módulo de listado de transacciones
│       ├── components/   # Componentes específicos del módulo
│       ├── context/       # Contexto del módulo
│       ├── hooks/         # Hooks específicos del módulo
│       └── index.tsx      # Punto de entrada del módulo
├── providers/             # Providers de alto nivel
│   └── AppProvider.tsx    # Provider principal de la app
├── services/              # Servicios y lógica de negocio
│   ├── apiClient/        # Cliente HTTP centralizado
│   ├── mocks/            # Mocks para testing (MSW)
│   └── transactions/     # Servicios de transacciones
│       ├── hooks/        # Hooks de fetching de datos
│       ├── transactions.service.ts
│       └── transactions.routes.ts
└── utils/                # Utilidades de testing y helpers
    └── testing/
        └── setupTest.ts  # Configuración global de tests
```

### Patrones de diseño utilizados

#### 1. **Provider Pattern**

El proyecto utiliza el patrón Provider para compartir estado y configuración:

- **`TranslationProvider`** (`src/contexts/TranslationContext.tsx`):
  - Maneja el estado del idioma actual (`es` | `en`).
  - Persiste la preferencia en `localStorage`.
  - Proporciona la función `t()` para traducciones.
  - Actualiza el atributo `lang` del HTML.

- **`TransactionsProvider`** (`src/modules/listTransactions/context/TransactionsContext.tsx`):
  - Gestiona el estado de transacciones (datos, loading, error).
  - Maneja filtros (búsqueda, rango de fechas, tipo de venta).
  - Sincroniza filtros con query parameters de la URL.
  - Calcula el total de transacciones filtradas.

- **`AppProvider`** (`src/providers/AppProvider.tsx`):
  - Compone los providers principales.
  - Renderiza componentes globales como `Header`.

#### 2. **Custom Hooks**

Hooks personalizados para encapsular lógica reutilizable:

- **`useTranslation()`**: Hook para acceder al contexto de traducciones.
- **`useTransactions()`** (`src/services/transactions/hooks/useGetTransaction.ts`):
  - Maneja el fetching de transacciones.
  - Gestiona estados de loading y error.
  - Implementa cleanup para evitar memory leaks.
  - Soporta callbacks `onSuccess` y `onError`.

- **`useTransactionsFilters()`** (`src/modules/listTransactions/hooks/useTransactionFilter.ts`):
  - Filtra transacciones por búsqueda, fecha y tipo de venta.
  - Utiliza `useMemo` para optimizar cálculos.
  - Normaliza búsquedas para encontrar coincidencias en múltiples campos.

- **`useTransactionsContext()`**: Hook para acceder al contexto de transacciones con validación.

#### 3. **Context API**

Se utiliza Context API de React para estado global:

- **Ventajas**:
  - Evita prop drilling.
  - Centraliza la lógica de estado por módulo.
  - Facilita el testing con providers mock.

- **Implementación**:
  - Cada contexto expone un hook personalizado (`useTranslation`, `useTransactionsContext`).
  - Los hooks validan que se usen dentro del provider correspondiente.
  - Los providers se componen en `AppProvider` para facilitar el setup.

#### 4. **Componentización modular**

Los componentes se organizan por módulos y nivel de complejidad:

- **Componentes globales** (`src/components/`):
  - Componentes reutilizables en toda la aplicación.
  - Ejemplos: `Header`, `Skeleton`, `Popover`, `LanguageSwitcher`.

- **Componentes de módulo** (`src/modules/listTransactions/components/`):
  - Componentes específicos de funcionalidad.
  - Organizados por responsabilidad: `filters`, `table`, `summary`, `search`, `sidePanel`.

- **Componentes atómicos**:
  - Los iconos SVG son componentes React independientes (`src/components/icons/`).
  - Cada componente tiene su propio archivo de estilos (`styles.ts` o `style.ts`).

#### 5. **Servicios y APIs**

**Cliente HTTP centralizado** (`src/services/apiClient/index.ts`):
- Función `apiClient` genérica y tipada.
- Maneja query parameters automáticamente.
- Headers por defecto (`Content-Type: application/json`).
- Manejo de errores HTTP (lanza excepciones para respuestas no OK).

**Servicios por dominio** (`src/services/transactions/`):
- Cada dominio tiene su propio servicio (`transactions.service.ts`).
- Rutas centralizadas en archivos `*.routes.ts`.
- Tipos TypeScript en `*.types.ts`.
- Enums para valores constantes (`transactions.enum.ts`).

**Hooks de fetching** (`src/services/transactions/hooks/useGetTransaction.ts`):
- Encapsulan la lógica de fetching.
- Manejan estados de loading, error y datos.
- Implementan cleanup para evitar memory leaks.

**Manejo de errores**:
- Los errores se propagan a través de los hooks.
- Los componentes pueden manejar errores mediante el estado `error` del contexto.
- En tests, se utiliza MSW para simular errores de red.

**Caching**:
- Actualmente no se implementa caching automático.
- Se recomienda integrar React Query para mejorar el manejo de caché y revalidación.

#### 6. **Estado global**

**Estrategia actual**: Context API de React.

- **`TranslationContext`**: Estado del idioma y traducciones.
- **`TransactionsContext`**: Estado de transacciones y filtros.

**Ventajas**:
- Integración nativa con React.
- No requiere librerías adicionales.
- Fácil de testear con providers mock.

**Limitaciones y recomendaciones**:
- Para proyectos más grandes, se recomienda migrar a **Zustand** para:
  - Mejor performance (evita re-renders innecesarios).
  - Stores más pequeños y desacoplados.
  - Mejor experiencia de desarrollo con DevTools.

#### 7. **Internacionalización (i18n)**

**Sistema actual**: Implementación propia con Context API.

**Estructura**:
- Archivos JSON por idioma (`src/locales/es.json`, `src/locales/en.json`).
- Función `getTranslation()` para obtener traducciones con soporte de parámetros.
- Context `TranslationProvider` para estado del idioma.
- Persistencia en `localStorage`.

**Características**:
- Soporte de parámetros en traducciones: `{key}` se reemplaza por valores.
- Fallback al idioma por defecto (`es`) si falta una traducción.
- Cambio dinámico de idioma con actualización del DOM (`lang` attribute).

**Ejemplo de uso**:
```typescript
const { t } = useTranslation();
const message = t("listTransactions.summary.tooltip", { amount: "$100.000" });
```

**Mejoras futuras**:
- Integrar librería dedicada (`next-intl`, `react-intl`) para:
  - Plurales avanzados.
  - Formateo de fechas/números por locale.
  - Carga dinámica de traducciones.

#### 8. **Testing**

**Stack de testing**:
- **Vitest**: Runner de tests y framework de aserciones.
- **Testing Library**: Utilidades para testing de componentes React.
- **MSW (Mock Service Worker)**: Interceptación de peticiones HTTP en tests.

**Estructura de tests**:
- Cada componente/servicio tiene su archivo de test (`*.test.tsx` o `*.test.ts`).
- Setup global en `src/utils/testing/setupTest.ts`:
  - Configura MSW para interceptar peticiones.
  - Mock de `next/navigation` (router, pathname, searchParams).
  - Configuración de variables de entorno para tests.

**Patrones de testing**:
- Tests de componentes con `render` y `screen` de Testing Library.
- Tests de servicios con MSW para mockear respuestas HTTP.
- Tests de hooks con `renderHook` (cuando sea necesario).
- Wrappers personalizados para providers en tests.

**Ejemplo de test**:
```typescript
const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <TranslationProvider>
    <TransactionsProvider>{children}</TransactionsProvider>
  </TranslationProvider>
);

render(<Component />, { wrapper: Wrapper });
```

#### 9. **Buenas prácticas observadas**

**Validaciones**:
- Pre-commit hook ejecuta validaciones automáticas (TypeScript, Biome, Tests).
- Build falla si las validaciones no pasan.
- TypeScript en modo `strict` para mayor seguridad de tipos.

**Linting y formateo**:
- **Biome** para linting y formateo de código.
- Configuración en `biome.json` con reglas recomendadas.
- Scripts de fix automático (`biome:fix`).

**Organización de código**:
- Separación clara de responsabilidades (servicios, componentes, hooks).
- Tipos TypeScript en archivos `*.types.ts`.
- Enums para valores constantes.
- Funciones puras en `lib/` para utilidades.

**Performance**:
- Uso de `useMemo` para cálculos costosos (filtros).
- `memo` para componentes de iconos que no cambian frecuentemente.
- Cleanup en hooks para evitar memory leaks.

**Accesibilidad**:
- Iconos SVG con `aria-hidden` y `aria-label` cuando es necesario.
- Atributo `lang` dinámico en el HTML según el idioma seleccionado.

## Flujo de desarrollo recomendado

- **Antes de commitear**:
  - Verificar que los cambios pasan `pnpm validate`.
- **Antes de hacer deploy / build**:
  - Ejecutar `pnpm build` para asegurarse de que:
    - El tipado de TypeScript es correcto.
    - El código pasa las reglas de Biome.
    - Los tests de Vitest están en verde.

## Notas finales

- El código del proyecto está pensado para mantenerse **limpio** (sin comentarios innecesarios) y respaldado por:
  - **TypeScript** para tipos.
  - **Tests automatizados** para comportamiento.
  - **Biome** para estilo y calidad de código.

## Nota: La documentación contó con apoyo de IA y fue validada manualmente.