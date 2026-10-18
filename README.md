# Mantenimiento vehicular — Ecuador

Aplicación web y programa Excel para consultar actividades, repuestos y costos por vehículo y kilometraje.

## Abrir la página

https://alfonso2a.github.io/mantenimiento-vehicular-ecuador/

La página permite consultar planes, comparar costos y registrar vehículos. Los registros se guardan solo en el navegador. Utilice las opciones de exportar e importar copias JSON para conservarlos.

## Código y publicación

Sitio estático sin dependencias externas: index.html, styles.css, maintenance.js, history.js, app.js y data.json. GitHub Pages publica desde la rama main y la carpeta raíz. Los cambios en estos archivos se publican con el siguiente despliegue de Pages.

Para probarlo localmente, sirva esta carpeta con un servidor HTTP y abra su dirección en el navegador. El archivo data.json se carga mediante una petición local relativa.

## Archivo principal

Descargue **Programa_mantenimiento_Ecuador.xlsx** y ábralo en Microsoft Excel. No requiere macros.

## Cómo utilizarlo

1. En **Consulta**, seleccione el vehículo y el kilometraje en las celdas amarillas. Aparecerán las actividades, los repuestos y los costos del servicio.
2. En **Comparador**, revise los costos acumulados del plan hasta 100.000 km. Los trabajos consultivos aparecen por separado.
3. En **Registro**, ingrese la placa, el vehículo, el odómetro, los datos del último mantenimiento y los intervalos confirmados. El archivo calcula el próximo servicio y señala si está vencido por fecha o kilometraje.
4. En **Servicios**, consulte todos los hitos disponibles y la URL del plan correspondiente. En **Detalle**, revise las actividades y los repuestos con filtros.
5. En **Guía y fuentes**, consulte las instrucciones y las limitaciones de cada fuente.

## Cobertura

| Marca | Modelos y versiones | Servicios por kilometraje |
| --- | ---: | ---: |
| Chevrolet | 73 | 1.312 |
| GAC | 25 | 379 |
| Volkswagen | 13 | 156 |
| **Total** | **111** | **1.847** |

La matriz contiene 22.995 líneas de actividades y repuestos. La cobertura corresponde al archivo aportado y a los portales nacionales consultados. No implica que todas las versiones sigan a la venta o estén disponibles en una agencia específica.

## Fuentes y precios

- **Chevrolet:** archivo aportado «01 - Plan. de mtto ECUADOR - Enero 2026 (1).xlsx», hoja MATRIZ. Valores históricos **sin IVA**, correspondientes a enero de 2026.
- **Volkswagen:** https://servicio.volkswagen.com.ec/. Valores publicados **con IVA**, consultados el 17 de octubre de 2026.
- **GAC:** https://servicio.gac.com.ec/. Valores publicados **con IVA**, consultados el 17 de octubre de 2026.

Los precios web son referenciales. El programa conserva el total publicado, incluso si los componentes presentan una diferencia de un centavo por redondeo. Compare costos con la misma base tributaria. Los precios no se actualizan automáticamente.

## Datos pendientes de la fuente

El precio del aceite de transmisión de **CAPTIVA PHEV MY26** no figura en el archivo original para los servicios de **40.000 y 80.000 km**. Los totales afectados muestran **Incompleto** en lugar de un costo reducido.

Los portales de Volkswagen y GAC no publican todos los códigos, cantidades y precios unitarios por pieza. Esos campos permanecen vacíos.

## Aplicación del plan

Confirme los intervalos según el año, motor, transmisión, VIN y condiciones de uso. La edad en meses de la hoja Servicios corresponde al hito acumulado publicado, no al tiempo desde la última visita. En Chevrolet no se deducen intervalos de tiempo a partir del kilometraje.

El registro dispone de 50 filas preparadas. Para consultar hitos que no aparezcan en la lista de Consulta, utilice los filtros de Servicios.

Herramienta independiente, sin afiliación ni aprobación de Mirasol o de los fabricantes. Este repositorio incluye la aplicación web y el programa Excel.


## Funciones adaptadas de LubeLogger

- Filtros y contadores de recordatorios adaptados de hargata/lubelog bajo licencia MIT.
- Avisos de Vencido, Próximo y Programado con anticipación configurable por vehículo. Los valores iniciales de 1.000 km y 30 días son editables y no modifican el intervalo del fabricante.
- Historial de servicios con fecha, odómetro, costo pagado, taller y notas.
- Opción para que un servicio realizado actualice el próximo mantenimiento periódico.
- Copia JSON versión 2 con vehículos e historial. Se siguen aceptando copias versión 1 de vehículos. La importación combina registros por identificador.
- Historial conservado aunque se retire un vehículo del registro activo.

La aplicación conserva los registros existentes del navegador. No instala el servidor completo de LubeLogger ni incorpora cuentas o sincronización entre equipos. Consulte THIRD_PARTY_NOTICES.md y LICENSE-LUBELOGGER.txt para conocer el código adaptado y la licencia.
