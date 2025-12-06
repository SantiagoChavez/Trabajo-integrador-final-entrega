import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generarFacturaPDF = (pedido) => {
  try {
    const doc = new jsPDF();

    // --- COLORES CORPORATIVOS (Extraídos de tu CSS) ---
    const azulCorporativo = [41, 128, 185]; 
    const colorNeon = [0, 210, 255];      // #00d2ff (Tu color principal de Inicio.css)
    const fondoOscuro = [43, 43, 61];     // #2b2b3d (Fondo del gradiente de Inicio)
    const grisOscuro = [44, 62, 80];
    const grisClaro = [245, 245, 245];

    // ==========================================
    // 1. ENCABEZADO (ESTILO GAMER/TECH)
    // ==========================================
    
    // --- LOGO CIRCULAR VECTORIAL ---
    // Recreamos el estilo visual de tu logo sin depender de la imagen externa
    
    // 1. Círculo de fondo oscuro
    doc.setFillColor(...fondoOscuro);
    doc.setDrawColor(...colorNeon); // Borde color Neón
    doc.setLineWidth(1.5);          // Borde un poco más grueso para que destaque
    doc.circle(25, 26, 12, "FD");   // F=Fill (Relleno), D=Draw (Borde)

    // 2. Texto "UTN" y "STORE" dentro del círculo
    doc.setTextColor(255, 255, 255); // Blanco
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("UTN", 25, 29, { align: "center" }); // Centrado

    doc.setFontSize(6);
    doc.setTextColor(...colorNeon); // La palabra STORE en Neón
    doc.text("STORE", 25, 33, { align: "center" });

    // --- DATOS DE LA EMPRESA ---
    doc.setTextColor(...grisOscuro);
    doc.setFontSize(20);
    doc.text("UTN Computer Store", 45, 22); // Ajustado X para no pisar el logo

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100);
    doc.text("Av. Tecnología 1234, Ciudad Digital", 45, 28);
    doc.text("IVA Responsable Inscripto", 45, 33);
    doc.text("CUIT: 30-11223344-9", 45, 38);
    doc.text("www.utnstore.com", 45, 43);

    // --- CAJA DE INFO FACTURA (Derecha) ---
    doc.setDrawColor(200);
    doc.setLineWidth(0.1); // Volvemos a línea fina
    doc.setFillColor(...grisClaro);
    doc.roundedRect(130, 15, 70, 32, 2, 2, "FD");

    doc.setFontSize(14);
    doc.setTextColor(...azulCorporativo);
    doc.setFont("helvetica", "bold");
    doc.text("FACTURA B", 165, 24, { align: "center" });

    doc.setFontSize(10);
    doc.setTextColor(0);
    doc.text(`N° 0001-${pedido.id ? pedido.id.substring(0, 8).toUpperCase() : '000000'}`, 135, 33);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 135, 40);

    // ==========================================
    // 2. DATOS DEL CLIENTE
    // ==========================================
    doc.setDrawColor(...azulCorporativo);
    doc.setLineWidth(0.5);
    doc.line(14, 52, 196, 52); 

    doc.setFontSize(10);
    doc.setTextColor(...grisOscuro);
    doc.setFont("helvetica", "bold");
    doc.text("FACTURAR A:", 14, 60);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(0);
    doc.text(`Cliente: ${pedido.usuarioId || "Consumidor Final"}`, 14, 66);
    doc.text("Condición: Consumidor Final", 14, 71);
    doc.text("Forma de Pago: Contado / Electrónico", 14, 76);

    // ==========================================
    // 3. TABLA DE PRODUCTOS
    // ==========================================
    let totalCalculado = 0;

    const filas = pedido.lineas ? pedido.lineas.map(item => {
      const nombre = item.productoNombre || item.nombre || "Producto sin nombre";
      const precioUnitario = item.productoPrecio || item.precio || 0;
      const cantidad = item.cantidad || 1;
      const subtotal = precioUnitario * cantidad;
      
      totalCalculado += subtotal;

      return [
        nombre,
        cantidad,
        `$ ${precioUnitario.toLocaleString('es-AR', {minimumFractionDigits: 2})}`,
        `$ ${subtotal.toLocaleString('es-AR', {minimumFractionDigits: 2})}`
      ];
    }) : [];

    autoTable(doc, {
      startY: 85,
      head: [["DESCRIPCIÓN", "CANT.", "PRECIO UNIT.", "SUBTOTAL"]],
      body: filas,
      theme: 'striped',
      headStyles: { 
          fillColor: azulCorporativo, 
          textColor: 255, 
          fontStyle: 'bold',
          halign: 'center'
      },
      styles: { 
          fontSize: 9, 
          cellPadding: 4, 
          valign: 'middle' 
      },
      columnStyles: {
        0: { halign: 'left' },
        1: { halign: 'center' },
        2: { halign: 'right' },
        3: { halign: 'right' }
      },
      alternateRowStyles: {
          fillColor: [245, 245, 250]
      }
    });

    // ==========================================
    // 4. TOTALES (DINÁMICO Y CORREGIDO)
    // ==========================================
    const finalY = doc.lastAutoTable.finalY + 10;
    
    doc.setDrawColor(200);
    doc.setLineWidth(0.1);
    doc.line(130, finalY, 196, finalY); // Línea divisoria

    // Configuración de fuente para el PRECIO
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...azulCorporativo);

    // Preparar el string del precio
    const precioTexto = `$ ${totalCalculado.toLocaleString('es-AR', {minimumFractionDigits: 2})}`;
    
    // --- LÓGICA CLAVE ---
    // 1. Medimos cuánto ocupa el precio en píxeles
    const anchoPrecio = doc.getTextWidth(precioTexto);
    // 2. Definimos dónde termina la hoja (margen derecho)
    const margenDerecho = 196;

    // 3. Imprimimos el precio pegado a la derecha
    doc.text(precioTexto, margenDerecho, finalY + 10, { align: "right" });

    // 4. Calculamos dónde poner la etiqueta "TOTAL A PAGAR"
    //    Posición = MargenDerecho - AnchoDelPrecio - 5px de aire
    doc.setFontSize(14);
    doc.setTextColor(...grisOscuro);
    
    // Alineamos a la derecha respecto a ese punto calculado, para que crezca hacia la izquierda
    doc.text("TOTAL A PAGAR:", margenDerecho - anchoPrecio - 5, finalY + 10, { align: "right" });

    // ==========================================
    // 5. PIE DE PÁGINA
    // ==========================================
    const pageHeight = doc.internal.pageSize.height;
    
    // Franja decorativa oscura
    doc.setFillColor(...grisOscuro);
    doc.rect(0, pageHeight - 15, 210, 15, "F");
    
    doc.setTextColor(255);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text("Gracias por su compra en UTN Computer Store", 105, pageHeight - 6, { align: "center" });

    doc.save(`Factura_${pedido.id ? pedido.id.substring(0,5) : 'temp'}.pdf`);

  } catch (error) {
    console.error("❌ Error generando PDF:", error);
    alert("Error al generar la factura. Revisa la consola.");
  }
};