# Código abierto utilizado

## LubeLogger

- Proyecto: https://github.com/hargata/lubelog
- Autor y copyright: Copyright (c) 2024 Hargata Softworks.
- Licencia: MIT. Texto completo conservado en [LICENSE-LUBELOGGER.txt](LICENSE-LUBELOGGER.txt).
- Revisión consultada: `63fa5cd267497ba01c29f4888c65efbbdd4b94bf`.
- Archivo de origen: [wwwroot/js/reminderrecord.js](https://github.com/hargata/lubelog/blob/63fa5cd267497ba01c29f4888c65efbbdd4b94bf/wwwroot/js/reminderrecord.js).

### Uso concreto en esta página

`maintenance.js` adapta el flujo de filtrado y actualización de contadores de las funciones `filterReminderTable` y `updateReminderAggregateLabels` de LubeLogger. La adaptación utiliza DOM nativo en lugar de jQuery, atributos de estado explícitos y etiquetas en español. Los contadores conservan los totales por estado y muestran por separado la cantidad visible tras aplicar un filtro.

La clasificación local en Vencido, Próximo y Programado, las validaciones, los umbrales configurables y la integración con el registro son implementación propia. Los umbrales iniciales de 1.000 km y 30 días son valores editables de esta aplicación; no son recomendaciones del fabricante ni valores oficiales de LubeLogger.

El flujo de historial y costos toma como referencia funcional los registros de servicio de LubeLogger. `history.js` es una implementación propia para almacenamiento local, exportación y actualización de vencimientos. No incorpora el servidor, las cuentas de usuario, la base de datos ni la sincronización de LubeLogger.

## Alcance

Ruta Preventiva no es un fork completo, una instalación ni una distribución oficial de LubeLogger. La publicación de GitHub Pages sigue siendo una aplicación estática. Las funciones que necesitan servidor requieren un despliegue adicional.

Los datos de mantenimiento por marca y modelo proceden del Excel aportado y de los portales de Volkswagen y GAC Ecuador; no proceden de LubeLogger.

Los repositorios Fleetbase, Traccar y Garage se revisaron como alternativas. No se incorporó código suyo a esta versión.
