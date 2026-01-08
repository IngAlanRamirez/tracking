# Tracking de Tarjetas - RockStar

Aplicación móvil desarrollada con **Ionic** y **Angular 20** para el seguimiento de entrega de tarjetas de crédito y débito.

## 🚀 Características

- ✅ Seguimiento en tiempo real del estado de entrega
- ✅ Soporte para múltiples tipos de entrega (domicilio, sucursal, rescate)
- ✅ Diseño moderno y responsive
- ✅ Simulación de API con datos aleatorios
- ✅ Implementación de mejores prácticas y patrones de diseño

## 📁 Estructura del Proyecto

```
src/app/
├── components/          # Componentes reutilizables
│   └── vertical-stepper/  # Componente del stepper de tracking
├── constants/          # Constantes y configuraciones
│   └── status-catalog.constants.ts
├── models/             # Interfaces y tipos TypeScript
│   ├── delivery-type.enum.ts
│   ├── stepper.interface.ts
│   ├── card-delivery-status.interface.ts
│   ├── branch-delivery-info.interface.ts
│   └── tracking-delivery-response.interface.ts
├── pages/              # Páginas de la aplicación
│   └── tracking/        # Página principal de tracking
├── services/           # Servicios y lógica de negocio
│   ├── tracking.service.ts        # Servicio de API (simulado)
│   └── tracking-facade.service.ts # Lógica de negocio
└── utils/              # Utilidades
    ├── date-formatter.util.ts
    └── status-helper.util.ts
```

## 🎨 Tecnologías y Patrones

- **Framework**: Ionic 8 + Angular 20
- **Metodología CSS**: BEM (Block Element Modifier)
- **Preprocesador**: Sass/SCSS
- **Arquitectura**: Standalone Components
- **Patrón**: Facade Service para lógica de negocio
- **RxJS**: Para manejo de observables

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm start

# Compilar para producción
npm run build
```

## 🔧 Configuración

El proyecto está configurado para:
- Ir directamente a la página de tracking (sin autenticación)
- Usar datos simulados aleatorios del servicio de tracking
- Generar diferentes escenarios de entrega automáticamente

## 📊 Tipos de Entrega

### 1. HOME_DELIVERY (Entrega a Domicilio)
Flujo: Preparación → Envío a domicilio → Entrega completada

### 2. BRANCH_DELIVERY (Entrega en Sucursal)
Flujo: Preparación → Envío a sucursal → Disponible → Recogida

### 3. RESCUE_DELIVERY (Entrega de Rescate)
Flujo: Preparación → Envío a domicilio → Envío a sucursal → Disponible → Recogida

## 🎯 Estados del Stepper

- **PENDING**: Estado futuro, aún no alcanzado
- **IN_PROGRESS**: Estado actual en proceso
- **SUCCESS**: Estado completado exitosamente
- **CANCEL**: Estado cancelado o fallido

## 🎨 Estilos BEM

El proyecto utiliza la metodología BEM para los estilos:

```scss
// Block
.tracking-page { }

// Element
.tracking-page__title { }

// Modifier
.tracking-page__title--large { }
```

## 🔄 Escenarios Simulados

El servicio de tracking genera aleatoriamente uno de estos escenarios:

1. **Entrega a domicilio exitosa**
2. **Intento de entrega fallido**
3. **Entrega en sucursal en progreso**
4. **Entrega cancelada (no recogida)**
5. **Rescate (domicilio → sucursal)**
6. **Estado inicial (sin estados completados)**

## 📱 Uso

1. Al cargar la aplicación, se muestra automáticamente la página de tracking
2. El servicio genera un escenario aleatorio
3. Se puede recargar para generar un nuevo escenario usando el botón "Generar nuevo escenario"

## 🛠️ Desarrollo

### Agregar un nuevo estado

1. Agregar el estado en `constants/status-catalog.constants.ts`
2. Actualizar los flujos válidos según el tipo de entrega
3. Actualizar la lógica en `tracking-facade.service.ts` si es necesario

### Modificar estilos

Los estilos siguen BEM y están organizados por componente. Cada componente tiene su archivo `.scss` con:
- Variables al inicio
- Block principal
- Elements
- Modifiers

## 📝 Notas

- El proyecto no incluye autenticación (se accede directamente a tracking)
- Los datos son simulados y se generan aleatoriamente
- El tiempo de respuesta simulado es de 800ms

## 🚀 Próximos Pasos

- [ ] Integración con API real
- [ ] Autenticación y autorización
- [ ] Notificaciones push
- [ ] Historial de tracking
- [ ] Modo offline

## 📄 Licencia

Proyecto desarrollado para RockStar
