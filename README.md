# Mantenimiento vehicular — Ecuador

Programa de mantenimiento preventivo en Excel para consultar actividades, repuestos y costos por vehículo y kilometraje.

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

La matriz contiene 23.019 líneas de actividades y repuestos. La cobertura corresponde al archivo aportado y a los portales nacionales consultados. No implica que todas las versiones sigan a la venta o estén disponibles en una agencia específica.

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

Herramienta independiente, sin afiliación ni aprobación de Mirasol o de los fabricantes. Este repositorio conserva el programa en Excel y sus instrucciones; no despliega una aplicación web.
