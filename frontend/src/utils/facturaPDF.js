import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // 👈 CAMBIO IMPORTANTE: Importación explícita

export const generarFacturaPDF = (pedido) => {
  try {
    const doc = new jsPDF();

    // --- ENCABEZADO MINIMALISTA ---
    doc.setFontSize(18);
    doc.setTextColor(40, 40, 40); // Gris oscuro elegante
    doc.text("UTN Computer Store", 14, 20);

    doc.setFontSize(9);
    doc.setTextColor(100);
    doc.text("Comprobante de Pedido", 14, 26);
    
    // --- DATOS ---
    const fecha = new Date().toLocaleDateString();
    doc.text(`Fecha: ${fecha}`, 150, 20);
    doc.text(`ID Pedido: ${pedido.id.substring(0, 8)}...`, 150, 26);

    // --- TABLA (Forma robusta) ---
    const filas = pedido.lineas ? pedido.lineas.map(item => [
      "Prod. ID: " + (item.productoId || "?"),
      item.cantidad,
      `$${item.precio || 0}`,
      `$${(item.precio || 0) * (item.cantidad || 1)}`
    ]) : [];

    // Usamos la función importada directamente 'autoTable(doc, options)'
    autoTable(doc, {
      head: [["Producto", "Cant.", "Unitario", "Subtotal"]],
      body: filas,
      startY: 35,
      theme: 'plain', // Tema simple, sin colores chillones
      styles: { fontSize: 9, cellPadding: 2 },
      headStyles: { fillColor: [40, 40, 40], textColor: 255, fontStyle: 'bold' }, // Cabecera negra sobria
    });

    // --- TOTAL ---
    // Calculamos la posición Y final de la tabla para poner el total abajo
    const finalY = doc.lastAutoTable ? doc.lastAutoTable.finalY : 50;
    
    let total = 0;
    if(pedido.lineas) {
        total = pedido.lineas.reduce((acc, item) => acc + ((item.precio||0) * (item.cantidad||1)), 0);
    }

    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(`TOTAL: $${total}`, 150, finalY + 10);

    doc.save(`Pedido_${pedido.id.substring(0,5)}.pdf`);
    
  } catch (error) {
    console.error("❌ Error generando PDF:", error);
    // Relanzamos el error para que el componente Admin lo capture y muestre la alerta
    throw error; 
  }
};