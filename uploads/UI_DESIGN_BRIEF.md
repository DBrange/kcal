# Brief de Diseño UI/UX — App de Tracking Nutricional

## Contexto general

Estoy desarrollando una app móvil de tracking nutricional para mercado hispanohablante (LATAM y España, con foco inicial en Argentina). Compite directamente con Fitia, MyFitnessPal, Lifesum, YAZIO. Necesito diseño de UI/UX para iOS y Android (preferiblemente cross-platform con Flutter o React Native).

### Quién es el usuario

Persona principal: adulto 22-45 años que quiere bajar/subir peso, ganar músculo, o mejorar hábitos alimenticios. Mezcla de:
- Principiantes que nunca trackearon (necesitan onboarding fácil)
- Usuarios que vienen de otra app y quieren cambiar (necesitan import/familiaridad)
- Usuarios serios de fitness/musculación (quieren detalle y control)

Persona secundaria: gente que toma suplementos y quiere coordinar comida + suplementación.

### Qué la diferencia (importante para el diseño)

- Catálogo fuerte en alimentos LATAM (palta, dulce de leche, milanesas, etc.)
- Comparador inteligente de alimentos con scores transparentes
- Análisis de menús de restaurante por foto
- Tracking de suplementos integrado (no como add-on)
- Foco en cocina local (recetas argentinas, mexicanas, españolas)

### Tono y feel deseado

- **Profesional pero cálido**: no clínico ni de hospital, no infantil con confeti. Algo entre Notion (limpio, funcional) y Headspace (humano, alentador)
- **Datos al frente, sin abrumar**: el usuario quiere ver sus números rápido pero entendibles
- **No moralizar comida**: nada de etiquetar comida como "buena/mala", sin emoji de carita triste si se pasa de calorías, sin lenguaje de culpa
- **Inclusivo de cuerpos**: no usar solo modelos delgados, no asumir que todos quieren bajar de peso
- **Bilingüe-ready**: español primero, pero pensado para soportar varios idiomas. Evitar texto en imágenes.

## Pantallas necesarias

A continuación detallo cada pantalla con su propósito, estado, contenido y consideraciones. No incluyo specs visuales (colores, tipografías) porque eso lo definiría el diseñador.

### 1. Onboarding

**Objetivo**: capturar datos mínimos para calcular targets, generar primer "wow moment".

**Flujo (5-7 pasos)**:
1. Pantalla de bienvenida con propuesta de valor en 1 frase
2. Datos básicos: nombre/cómo te llamamos, edad, sexo
3. Medidas: peso actual, altura, peso objetivo (slider visual ayuda)
4. Objetivo: bajar / mantener / subir / recomp + ritmo deseado
5. Actividad: sedentario / liviano / moderado / activo / muy activo (con ejemplos visuales)
6. Restricciones: vegetariano, vegano, sin gluten, sin lactosa, otras alergias
7. Resultado: muestra el target calculado con explicación corta de por qué

**Consideraciones**:
- Permitir saltar pasos opcionales
- Cada pantalla con un solo input principal
- Progress bar visible
- No pedir email/cuenta hasta el final (reducir fricción)
- En el resultado mostrar BMR y TDEE explicados simple ("tu cuerpo quema X solo manteniéndose vivo")

### 2. Pantalla principal (Home / Dashboard del día)

**Objetivo**: ver de un vistazo cómo va el día, registrar rápido lo que comió.

**Elementos**:
- **Header**: fecha actual con flechas para días anteriores/siguientes (no permitir futuro)
- **Anillo o barra de calorías del día**: consumido vs target, con visualización clara del balance
- **Macros**: tres barras (proteína, carbos, grasa) con valores y % de target
- **Agua**: tracker visual rápido (vasos o ml acumulados)
- **Comidas del día**: secciones colapsables por meal_type (desayuno, almuerzo, merienda, cena, snacks)
  - Cada comida muestra: lista de items con calorías, total de la comida
  - Botón "+" para agregar item a esa comida
- **Suplementos del día**: si tiene régimen activo, lista con check
- **Actividad física**: resumen si hay registros
- **Footer**: barra de navegación a las otras secciones

**Estados**:
- Día vacío (recién creado): CTA grande "registrá tu primer plato"
- Día con datos parciales: estado normal
- Día completo (cerca del target): mensaje alentador discreto
- Día con exceso: mostrar números honestos sin juzgar
- Día anterior (histórico): solo lectura con opción de editar

**Consideraciones**:
- Esta es la pantalla más usada, debe cargar rápido
- Acciones más comunes (agregar comida, agua) deben estar a 1 tap
- En día actual mostrar "tiempo desde última comida registrada" sutil
- Pull to refresh para sincronizar

### 3. Búsqueda y agregar alimento

**Objetivo**: que el usuario encuentre lo que comió en menos de 10 segundos.

**Elementos**:
- Search bar prominente arriba
- Tabs o filtros: Recientes / Favoritos / Mis comidas / Todos
- Resultados con: imagen pequeña, nombre, marca si tiene, calorías por porción
- Indicador de fuente: ✓ verificado, marca, comunidad
- Acciones rápidas en cada resultado:
  - Tap = ver detalle y porción
  - Long press = agregar con porción default
  - Botón estrella para favoritar

**Métodos alternativos de agregar (botones flotantes o tabs)**:
- Escanear código de barras
- Tomar foto (IA detecta)
- Crear alimento custom
- Crear receta
- Quick add (solo calorías sin alimento específico)

**Estados**:
- Vacío con sugerencias contextuales (hora del día → desayuno típico, etc.)
- Sin resultados: ofrecer "crear alimento nuevo" prominente
- Cargando: skeleton de resultados, no spinner

**Consideraciones**:
- Búsqueda debounced pero rápida (300ms)
- Mostrar primero alimentos del usuario (recientes, favoritos)
- Sugerencias de auto-completar al escribir
- Búsqueda fonética/sin acentos ("manzana" = "manzána")
- Recordar última pestaña usada

### 4. Detalle de alimento + selector de porción

**Objetivo**: confirmar qué comió y cuánto.

**Elementos**:
- Foto del alimento grande
- Nombre, marca
- **Selector de porción**: dropdown de unidades disponibles (taza, gramos, unidad, rebanada) + input de cantidad
  - Sliders alternativos para gente que prefiere visual
- **Tabla nutricional dinámica**: se actualiza al cambiar porción
  - Calorías destacadas
  - Macros (proteína, carbos, grasa) con visualización
  - "Ver más" expande micros (vitaminas, minerales, fibra, sodio, azúcar)
- **Selector de comida**: a qué meal_type asignar (desayuno/almuerzo/etc.)
- **Hora**: editable, default = ahora
- Botón principal "Agregar"
- Acciones secundarias: marcar favorito, editar info nutricional (si fue creado por usuario)

**Consideraciones**:
- Si viene de IA, mostrar confianza y permitir corrección fácil
- Si viene de barcode, mostrar el código para que el usuario verifique
- Permitir agregar múltiples sin volver atrás (botón "agregar y otro")

### 5. Cámara IA (foto de comida)

**Objetivo**: que el usuario pueda registrar tomando una foto.

**Flujo**:
1. Cámara abierta con guías de encuadre
2. Toma foto
3. Loading con mensaje claro ("identificando...")
4. Resultado: lista de alimentos detectados con porciones estimadas
5. Usuario puede confirmar, editar cantidades, agregar/eliminar items
6. Confirma y todo se agrega al log

**Estados**:
- Detección exitosa con alta confianza: prellenar todo, confirmación rápida
- Detección con baja confianza: marcar como "tenemos dudas" y pedir confirmación
- Detección fallida: mensaje claro, ofrecer logueo manual
- Múltiples items: lista clara con thumbnail de qué es qué

**Consideraciones**:
- Permitir editar porción de cada item independientemente
- Tip visual sobre cómo tomar buena foto (luz, ángulo)
- Si es feature premium, mostrar contador de usos restantes
- Galería: permitir foto previa, no solo cámara en vivo

### 6. Escáner de código de barras

**Objetivo**: registrar productos envasados rápido.

**Flujo**:
1. Cámara con marco de scan visible
2. Detecta automáticamente, vibración + sonido al detectar
3. Si producto existe: pasa a pantalla de detalle
4. Si no existe: ofrece crearlo con prefill de OFF si está disponible

**Consideraciones**:
- Manejar mala iluminación, ángulos
- Timeout claro si no detecta nada
- Botón para ingresar código manualmente como fallback

### 7. Comparador de alimentos

**Objetivo**: feature diferenciadora. Usuario compara 2-3 opciones para elegir.

**Variantes**:

**A. Texto vs texto**:
- Input para opción 1 ("pizza muzzarella")
- Input para opción 2 ("hamburguesa")
- Botón comparar
- Resultado side-by-side con scores

**B. Imagen vs imagen**:
- Toma 2 fotos secuencialmente
- Detección IA de cada una
- Resultado side-by-side

**C. Análisis de menú**:
- Foto del menú de restaurante
- Lista de platos detectados
- Ranking según contexto del usuario
- Top 3 destacados con razones

**Pantalla de resultado de comparación**:
- Tarjetas lado a lado con:
  - Nombre del alimento
  - Calorías
  - Macros principales
  - Score total (0-100) visualizado (estrella, barra, círculo)
  - "Pros" y "Cons" listados
- Recomendación destacada con explicación textual ("X es mejor para vos hoy porque...")
- Botón para registrar la opción elegida (no necesariamente la recomendada)

**Consideraciones**:
- El score debe explicarse al tap (qué factores se consideraron)
- Si una opción rompe restricción dura del usuario, marcarla con warning
- Permitir comparar más de 2 (hasta 4-5) en formato lista

### 8. Estadísticas y progreso

**Objetivo**: mostrar evolución y patrones, motivar sin presionar.

**Secciones**:

**Peso**:
- Gráfico de línea con peso a lo largo del tiempo
- Filtros: 7d / 30d / 3m / 6m / 1a / todo
- Línea de tendencia
- Distancia al objetivo
- Botón rápido para registrar peso

**Calorías**:
- Gráfico de barras día por día
- Línea de target superpuesta
- Promedio del período
- Adherencia (% de días dentro del target)

**Macros**:
- Gráfico apilado o de líneas
- Distribución promedio
- Comparación con target

**Micronutrientes**:
- Lista de vitaminas/minerales con barra de % de RDA
- Top 5 deficitarios y top 5 cubiertos
- Vista "del día" vs "promedio semanal"
- Diferenciación visual entre lo que viene de comida vs suplementos

**Hábitos**:
- Días consecutivos logueando
- Hidratación promedio
- Adherencia a suplementos

**Mediciones corporales**:
- Si tiene datos: cintura, brazos, etc. con gráficos

**Consideraciones**:
- Gráficos deben ser interpretables sin leer leyenda
- Tap en punto del gráfico muestra detalle del día
- Comparar con período anterior (delta)
- Sin gamificación agresiva, sí celebraciones discretas de hitos
- **No mostrar rankings con otros usuarios** (no hay social en esta versión)

### 9. Suplementos

**Pantalla de mi régimen**:
- Lista de suplementos activos con:
  - Imagen/icono
  - Nombre y dosis
  - Frecuencia (diaria, días específicos)
  - Próximo recordatorio
  - Stock restante (si aplica)
- Botón flotante "+" para agregar
- Ordenar por: hora del día, alfabético, categoría

**Detalle de suplemento**:
- Info del producto: ingredientes activos, marca, foto
- Mi configuración: dosis, frecuencia, horarios, recordatorios on/off
- Stock: pastillas restantes, fecha de vencimiento
- Historial de tomas (calendario con marcas)
- Adherencia: % cumplimiento últimos 30 días
- Botón "marcar como tomado ahora"
- Botón "pausar régimen" / "finalizar"

**Agregar suplemento**:
- Buscar en catálogo (similar a alimentos)
- O crear custom
- Configurar dosis (cantidad y forma)
- Configurar horario(s) y frecuencia
- Configurar recordatorios
- Configurar stock inicial (opcional)

**Recordatorios activos**:
- Vista tipo "agenda" con próximos recordatorios del día
- Cada uno con tap rápido: tomé / posponer / saltar

### 10. Recetas

**Pantalla de mis recetas**:
- Lista con foto, nombre, calorías por porción, tiempo
- Filtros: mis recetas / favoritas / de la comunidad / por cuisine
- Búsqueda
- Botón "+" para crear

**Detalle de receta**:
- Foto grande
- Nombre, descripción, tags
- Porciones, tiempo prep, tiempo cook
- Tabla nutricional por porción
- Lista de ingredientes con cantidades
- Pasos de preparación numerados
- Botón "registrar como comida" → selector de porciones consumidas
- Botón "agregar a lista de compras"

**Crear/editar receta**:
- Nombre, foto opcional, descripción
- Porciones que rinde
- Agregar ingredientes (busca en catálogo)
- Pasos de preparación
- Cálculo automático de nutrición al agregar ingredientes

### 11. Lista de compras

**Pantalla principal**:
- Lista de items agrupados por categoría (lácteos, verdulería, almacén)
- Cada item con: nombre, cantidad, checkbox
- Items checked se mueven al final o se tachan
- Total estimado en moneda local (si tiene precios)
- Acciones: limpiar, exportar, compartir

**Crear lista**:
- Manual: agregar items uno por uno
- Desde plan de comidas: genera automáticamente sumando ingredientes
- Desde recetas seleccionadas: combina y agrupa

**Consideraciones**:
- Modo "shopping" con texto más grande, fácil de leer en supermercado
- Permitir agregar items custom (no del catálogo) para cosas no comestibles
- Persistencia: la lista no se borra hasta que el usuario lo decida

### 12. Plan de comidas

**Vista calendario**:
- Semana o mes con comidas planeadas por día
- Tap en día → vista detalle del día
- Drag and drop para mover comidas (en tablet/web)

**Crear plan**:
- Definir período (semana, 2 semanas, mes)
- Para cada día y meal_type: elegir receta o alimento
- Cálculo automático de calorías y macros
- Comparación con targets

**Plan automático** (si lo agregás):
- IA arma plan según preferencias y target
- Usuario revisa y ajusta antes de confirmar
- *Importante: framing explícito como "sugerencia", no prescripción médica*

### 13. Perfil y configuración

**Mi perfil**:
- Foto, nombre
- Datos personales editables
- Objetivos y targets actuales (con histórico accesible)
- Restricciones dietéticas

**Configuración de la app**:
- Unidades (kg/lb, cm/ft, ml/oz, kcal/kJ)
- Idioma
- Tema (claro/oscuro/sistema)
- Notificaciones (granular: comidas, agua, suplementos, logros)
- Privacidad y datos
- Suscripción

**Datos**:
- Exportar todos mis datos (JSON/CSV)
- Borrar cuenta
- Conectar con HealthKit / Google Fit
- Importar desde otra app (MyFitnessPal, Fitia)

**Suscripción** (si aplica modelo freemium):
- Plan actual
- Beneficios premium
- Comparativa free vs premium
- Botones de upgrade

### 14. Estados especiales

**Sin conexión** (mensaje claro si la app es online-only):
- Mensaje: "necesitamos internet para guardar tus datos"
- Mostrar qué se puede ver/hacer offline (datos cacheados)
- Botón reintentar

**Error**: nunca mostrar error técnico al usuario. Mensaje humano + acción clara.

**Loading**: skeletons preferibles a spinners. Animaciones sutiles.

**Empty states**: cada pantalla vacía tiene:
- Ilustración acorde
- Mensaje empático
- CTA claro

## Flujos críticos a diseñar bien

Estos son los caminos más frecuentes y deben ser los más pulidos:

1. **Loguear comida rápido**: home → buscar → seleccionar → confirmar porción → guardar (max 4 taps, 15 segundos)
2. **Ver mi progreso**: home → estadísticas → peso (max 2 taps)
3. **Tomar suplemento**: notif push → tap → confirmar (1-2 taps desde notif)
4. **Comparar dos comidas**: home → comparar → input ambas → resultado (4-5 taps)

## Componentes reutilizables (design system)

Para mantener coherencia, estos componentes aparecen muchas veces:

- **Food card**: imagen + nombre + marca + kcal/porción + acciones rápidas
- **Macro bar**: barra horizontal con valor / target y color
- **Calorie ring/donut**: anillo con consumido vs target
- **Meal section**: header colapsable con totales + lista de items
- **Quantity selector**: input numérico + dropdown de unidad
- **Score badge**: badge circular o pill con número 0-100
- **Empty state**: ilustración + texto + CTA
- **Date picker**: navegación entre días (flechas + tap para calendario)
- **Bottom sheet**: para acciones secundarias y detalles

## Sistema de diseño deseado

- **Modo claro y oscuro**: ambos primera clase, no oscuro como afterthought
- **Paleta**: prefiero un color primario distintivo (no verde/azul típicos de fitness), neutros bien graduados. Sugerencia: explorar paletas tierra/cálidas que sienten "comida real" más que "gym"
- **Tipografía**: legible en pantallas pequeñas. Una display + una sans-serif. Considerar Inter, DM Sans, o similar
- **Iconografía**: consistente, prefiero outline sobre filled (Lucide, Phosphor)
- **Espaciado**: generoso. La app maneja muchos datos, necesita respirar.
- **Animaciones**: sutiles. Transitions y micro-interacciones, no animaciones decorativas.

## Accesibilidad (importante)

- Cumplir WCAG AA mínimo
- Contraste suficiente en ambos temas
- Targets táctiles mínimo 44x44pt
- Soportar tipografía grande del sistema
- VoiceOver / TalkBack labels en todos los elementos interactivos
- No depender solo de color para transmitir info (también iconos, texto)
- Permitir zoom

## Plataformas

- **iOS**: respetar Human Interface Guidelines, gestos nativos, swipe to go back
- **Android**: respetar Material 3, back button del sistema
- **Diferencias**: tabs en bottom para iOS, navegación puede variar en Android
- Pensar para tamaños desde iPhone SE hasta tablets

## Lo que NO quiero

- Gamificación agresiva (badges por todos lados, confeti permanente)
- Comparaciones sociales con otros usuarios
- Lenguaje moralizante sobre comida ("guilty pleasure", "cheat day")
- Modelos solo delgados/musculosos en imágenes/ilustraciones
- Color verde/rojo para alimentos (sano/no sano) — todo es contexto
- Pantallas con demasiada densidad de información
- Pop-ups intrusivos de upgrade a premium
- Onboarding de 15 pantallas

## Referencias visuales que me gustan

(opcional, pero ayuda mucho al diseñador entender el "feel")

- **Notion**: por su limpieza y enfoque en datos
- **Linear**: por la pulcritud y velocidad percibida
- **Headspace**: por la calidez sin caer en infantil
- **Things 3**: por la simplicidad en una app de productividad densa
- **MacroFactor**: por su honestidad con datos sin moralizar
- **Apple Health**: por la organización de datos densos en cards

## Entregables esperados

Por orden de prioridad:

1. **Wireframes** de las pantallas principales (1-13) en estado lleno y vacío
2. **Design system básico**: paleta, tipografías, espaciados, componentes core
3. **High fidelity** de pantallas críticas: Home, Búsqueda, Detalle de alimento, Comparador, Estadísticas
4. **Flujos** documentados con conexiones entre pantallas
5. **Variantes**: estado claro/oscuro, error/loading/vacío de las pantallas críticas
6. **Mockup interactivo** de los flujos críticos para hacer user testing

## Información adicional disponible si la necesitás

- Schema de base de datos completo (define qué datos hay disponibles)
- Reglas de cálculo de targets nutricionales
- Lógica de comparador de alimentos con scores
- Estructura del catálogo de suplementos
- Modelo de suscripción y features premium

Pedímelos cuando los necesites.

---

## Preguntas que probablemente me hagas y mis respuestas tentativas

**¿Qué tan customizable quiero el dashboard?** 
Para v1, no customizable. Layout fijo. En v2 evaluamos.

**¿Cuántas pantallas en bottom nav?** 
4 o 5: Home, Estadísticas, Agregar (botón central), Recetas/Plan, Perfil. Suplementos puede vivir en perfil o en home según diseño.

**¿Cómo manejar features premium en la UI?** 
Mostrar features con candado discreto. Al tap, modal explicando beneficio. No bloquear funcionalidad core gratis.

**¿Soporte para wearables?** 
v2. Por ahora solo ingreso manual y HealthKit/Google Fit básico.

**¿Modo familiar / múltiples perfiles?** 
v2 o v3. No para el MVP.

**¿Diseñamos también la web app?** 
v2. MVP es solo móvil.
