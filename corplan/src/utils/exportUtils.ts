import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Document, Packer, Paragraph, HeadingLevel, TextRun } from 'docx';
import PptxGenJS from 'pptxgenjs';
import * as XLSX from 'xlsx';
import { BusinessPlanData, PitchDeckData } from '../types';
import { formatCurrency, calculateFinancials } from './financialCalculations';

// Export as Markdown File
export function exportToMarkdown(plan: BusinessPlanData) {
  const fin = calculateFinancials(plan.financialModel);
  const curr = plan.financialModel.currency;

  let md = `# BIZPLAN AI - RENCANA BISNIS (BUSINESS PLAN)
**Nama Bisnis:** ${plan.businessName}  
**Slogan:** ${plan.tagline}  
**Industri:** ${plan.industry}  
**Tanggal Dibuat:** ${plan.createdAt}  

---

## 1. RINGKASAN EKSEKUTIF (EXECUTIVE SUMMARY)
${plan.executiveSummary}

---

## 2. ANALISIS PASAR & INDUSTRI
### Gambaran Umum Industri
${plan.marketAnalysis.industryOverview}

### Target Pasar / Segmen Pelanggan
${plan.marketAnalysis.targetAudience}

### Analisis SWOT
| Kekuatan (Strengths) | Kelemahan (Weaknesses) |
| --- | --- |
${plan.marketAnalysis.swot.strengths.map((s, i) => `| ${i+1}. ${s} | ${plan.marketAnalysis.swot.weaknesses[i] ? `${i+1}. ${plan.marketAnalysis.swot.weaknesses[i]}` : ''} |`).join('\n')}

| Peluang (Opportunities) | Ancaman (Threats) |
| --- | --- |
${plan.marketAnalysis.swot.opportunities.map((o, i) => `| ${i+1}. ${o} | ${plan.marketAnalysis.swot.threats[i] ? `${i+1}. ${plan.marketAnalysis.swot.threats[i]}` : ''} |`).join('\n')}

### Analisis PESTEL
- **Politik:** ${plan.marketAnalysis.pestel.political}
- **Ekonomi:** ${plan.marketAnalysis.pestel.economic}
- **Sosial:** ${plan.marketAnalysis.pestel.social}
- **Teknologi:** ${plan.marketAnalysis.pestel.technological}
- **Lingkungan:** ${plan.marketAnalysis.pestel.environmental}
- **Hukum & Regulasi:** ${plan.marketAnalysis.pestel.legal}

### Analisis Porter's 5 Forces
- **Persaingan Industri:** ${plan.marketAnalysis.portersFiveForces.competitiveRivalry}
- **Ancaman Pendatang Baru:** ${plan.marketAnalysis.portersFiveForces.threatOfNewEntrants}
- **Ancaman Produk Pengganti:** ${plan.marketAnalysis.portersFiveForces.threatOfSubstitutes}
- **Daya Tawar Pemasok:** ${plan.marketAnalysis.portersFiveForces.bargainingPowerOfSuppliers}
- **Daya Tawar Pembeli:** ${plan.marketAnalysis.portersFiveForces.bargainingPowerOfBuyers}

---

## 3. STRATEGI PEMASARAN & OPERASIONAL
### Strategi Pemasaran
${plan.marketingAndOperations.marketingStrategy}

### Saluran Penjualan
${plan.marketingAndOperations.salesChannels.map(c => `- ${c}`).join('\n')}

### Rencana Operasional
${plan.marketingAndOperations.operationalPlan}

### KPI Utama & Indikator Kinerja
${plan.marketingAndOperations.keyMetricsKPIs.map(k => `- ${k}`).join('\n')}

---

## 4. PROYEKSI KEUANGAN & SPREADSHEET
### Modal Awal & Biaya Investasi (CapEx)
| Item Pengeluaran Modal | Estimasi Biaya |
| --- | --- |
${plan.financialModel.capexItems.map(c => `| ${c.item} | ${formatCurrency(c.cost, curr)} |`).join('\n')}
| **Total CapEx** | **${formatCurrency(fin.totalCapex, curr)}** |

### Biaya Operasional Bulanan (OpEx)
| Item Biaya Operasional | Estimasi per Bulan |
| --- | --- |
${plan.financialModel.opexItems.map(o => `| ${o.item} | ${formatCurrency(o.cost, curr)} |`).join('\n')}
| **Total OpEx Bulanan** | **${formatCurrency(fin.totalMonthlyOpex, curr)}** |

### Saluran Pendapatan (Revenue Streams)
| Nama Produk / Layanan | Harga per Unit | Target Vol/Bln | COGS % | Total Pendapatan/Bln |
| --- | --- | --- | --- | --- |
${plan.financialModel.revenueStreams.map(r => `| ${r.name} | ${formatCurrency(r.pricePerUnit, curr)} | ${r.expectedMonthlyVolume} | ${r.cogsPercent}% | ${formatCurrency(r.pricePerUnit * r.expectedMonthlyVolume, curr)} |`).join('\n')}

### Analisis Titik Impas (Break-Even Point - BEP)
- **Target BEP Bulanan (Volume):** ${fin.bepUnits} unit
- **Target BEP Bulanan (Nilai Pendapatan):** ${formatCurrency(fin.bepRevenueMonthly, curr)}
- **Estimasi Payback Period:** ${fin.paybackMonth}
- **Estimasi ROI Tahun 1:** ${fin.roiYear1}

### Proyeksi Laba Rugi 3 Tahun
| Indikator Keuangan | Tahun 1 | Tahun 2 | Tahun 3 |
| --- | --- | --- | --- |
| Pendapatan Kotor | ${formatCurrency(fin.threeYearSummary[0].revenue, curr)} | ${formatCurrency(fin.threeYearSummary[1].revenue, curr)} | ${formatCurrency(fin.threeYearSummary[2].revenue, curr)} |
| Laba Kotor | ${formatCurrency(fin.threeYearSummary[0].grossProfit, curr)} | ${formatCurrency(fin.threeYearSummary[1].grossProfit, curr)} | ${formatCurrency(fin.threeYearSummary[2].grossProfit, curr)} |
| Total OpEx | ${formatCurrency(fin.threeYearSummary[0].opex, curr)} | ${formatCurrency(fin.threeYearSummary[1].opex, curr)} | ${formatCurrency(fin.threeYearSummary[2].opex, curr)} |
| **Laba Bersih** | **${formatCurrency(fin.threeYearSummary[0].netProfit, curr)}** | **${formatCurrency(fin.threeYearSummary[1].netProfit, curr)}** | **${formatCurrency(fin.threeYearSummary[2].netProfit, curr)}** |

---

## 5. MANAJEMEN RISIKO & MITIGASI
| Kategori Risiko | Tingkat Dampak | Strategi Mitigasi |
| --- | --- | --- |
${plan.riskManagement.map(r => `| ${r.risk} | ${r.impact} | ${r.mitigation} |`).join('\n')}

---
*Dokumen ini disusun menggunakan CorPlan Consultant Platform.*
`;

  downloadBlob(md, `${plan.businessName.replace(/\s+/g, '_')}_BusinessPlan.md`, 'text/markdown');
}

// Export as Text File
export function exportToText(plan: BusinessPlanData) {
  const fin = calculateFinancials(plan.financialModel);
  const curr = plan.financialModel.currency;

  let txt = `========================================================================
BIZPLAN AI - RENCANA BISNIS PROFESSIONAL
========================================================================
Nama Bisnis: ${plan.businessName}
Slogan     : ${plan.tagline}
Industri   : ${plan.industry}
Tanggal    : ${plan.createdAt}

1. RINGKASAN EKSEKUTIF
------------------------------------------------------------------------
${plan.executiveSummary}

2. ANALISIS PASAR & INDUSTRI
------------------------------------------------------------------------
Gambaran Umum:
${plan.marketAnalysis.industryOverview}

Target Pasar:
${plan.marketAnalysis.targetAudience}

SWOT Analysis:
- Kekuatan: ${plan.marketAnalysis.swot.strengths.join('; ')}
- Kelemahan: ${plan.marketAnalysis.swot.weaknesses.join('; ')}
- Peluang: ${plan.marketAnalysis.swot.opportunities.join('; ')}
- Ancaman: ${plan.marketAnalysis.swot.threats.join('; ')}

3. KEUANGAN & PROYEKSI
------------------------------------------------------------------------
Total CapEx: ${formatCurrency(fin.totalCapex, curr)}
Total OpEx Bulanan: ${formatCurrency(fin.totalMonthlyOpex, curr)}
Proyeksi Pendapatan Th 1: ${formatCurrency(fin.year1Revenue, curr)}
Proyeksi Laba Bersih Th 1: ${formatCurrency(fin.year1NetProfit, curr)}
Target BEP Bulanan: ${fin.bepUnits} unit (${formatCurrency(fin.bepRevenueMonthly, curr)})

4. MANAJEMEN RISIKO
------------------------------------------------------------------------
${plan.riskManagement.map(r => `- [${r.impact}] ${r.risk}: ${r.mitigation}`).join('\n')}

========================================================================
Disusun oleh CorPlan Consultant
========================================================================
`;

  downloadBlob(txt, `${plan.businessName.replace(/\s+/g, '_')}_BusinessPlan.txt`, 'text/plain');
}

// Export as DOCX File
export async function exportToDocx(plan: BusinessPlanData) {
  const fin = calculateFinancials(plan.financialModel);
  const curr = plan.financialModel.currency;

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            text: plan.businessName.toUpperCase(),
            heading: HeadingLevel.TITLE,
          }),
          new Paragraph({
            children: [
              new TextRun({ text: plan.tagline, italics: true, size: 24 }),
            ],
          }),
          new Paragraph({
            text: `Industri: ${plan.industry} | Tanggal: ${plan.createdAt}`,
            spacing: { after: 300 },
          }),

          // Heading 1
          new Paragraph({
            text: '1. Ringkasan Eksekutif',
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 100 },
          }),
          new Paragraph({
            text: plan.executiveSummary,
            spacing: { after: 200 },
          }),

          // Heading 2
          new Paragraph({
            text: '2. Analisis Pasar & Industri',
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 100 },
          }),
          new Paragraph({
            text: plan.marketAnalysis.industryOverview,
            spacing: { after: 150 },
          }),

          // Financial Table
          new Paragraph({
            text: '3. Ikhtisar Keuangan & Proyeksi',
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 100 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: `Total Investasi (CapEx): ${formatCurrency(fin.totalCapex, curr)}`, bold: true }),
            ],
            spacing: { after: 100 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: `Biaya Operasional Bulanan (OpEx): ${formatCurrency(fin.totalMonthlyOpex, curr)}`, bold: true }),
            ],
            spacing: { after: 100 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: `Proyeksi Pendapatan Tahun 1: ${formatCurrency(fin.year1Revenue, curr)}`, bold: true }),
            ],
            spacing: { after: 100 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: `Proyeksi Laba Bersih Tahun 1: ${formatCurrency(fin.year1NetProfit, curr)}`, bold: true }),
            ],
            spacing: { after: 200 },
          }),

          // Risk Table
          new Paragraph({
            text: '4. Manajemen Risiko',
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 100 },
          }),
          ...plan.riskManagement.map(r => 
            new Paragraph({
              text: `• [Dampak: ${r.impact}] ${r.risk}: ${r.mitigation}`,
              spacing: { after: 80 },
            })
          ),
        ],
      },
    ],
  });

  const buffer = await Packer.toBlob(doc);
  downloadBlob(buffer, `${plan.businessName.replace(/\s+/g, '_')}_BusinessPlan.docx`, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
}

// Export as PDF File (HTML Element Capture or Native PDF layout)
export async function exportToPDF(elementId: string, fileName: string) {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error("Element not found for PDF export:", elementId);
    return;
  }

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      onclone: (clonedDoc) => {
        // 1. Sanitize all <style> elements in cloned document to remove oklch declarations
        const styleElements = clonedDoc.getElementsByTagName('style');
        for (let i = 0; i < styleElements.length; i++) {
          const cssText = styleElements[i].textContent;
          if (cssText && cssText.includes('oklch')) {
            styleElements[i].textContent = cssText.replace(/oklch\([^)]+\)/gi, 'rgb(100, 100, 100)');
          }
        }

        // 2. Prepare cloned element for capture
        const clonedEl = clonedDoc.getElementById(elementId);
        if (clonedEl) {
          clonedEl.style.position = 'static';
          clonedEl.style.left = '0';
          clonedEl.style.top = '0';
          clonedEl.style.pointerEvents = 'auto';

          const allNodes = [clonedEl, ...Array.from(clonedEl.querySelectorAll('*'))] as HTMLElement[];
          allNodes.forEach((node) => {
            if (node.style) {
              const comp = window.getComputedStyle(node);
              const props = ['color', 'backgroundColor', 'borderColor', 'borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor'];
              props.forEach((prop) => {
                const val = comp.getPropertyValue(prop);
                if (val && val.includes('oklch')) {
                  if (prop.includes('background')) {
                    node.style.setProperty(prop, '#ffffff', 'important');
                  } else if (prop.includes('border')) {
                    node.style.setProperty(prop, '#cbd5e1', 'important');
                  } else {
                    node.style.setProperty(prop, '#0f172a', 'important');
                  }
                }
              });
            }
          });
        }
      },
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    pdf.save(fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`);
  } catch (err) {
    console.error("Error generating PDF:", err);
    alert("Gagal mengunduh PDF. Silakan coba kembali.");
  }
}

// Pitch Deck Export to Markdown
export function exportPitchDeckToMarkdown(deck: PitchDeckData) {
  let md = `# INVESTOR PITCH DECK - ${deck.businessName.toUpperCase()}
**Slogan:** ${deck.tagline}  
**Target Pendanaan (Ask):** ${formatCurrency(deck.targetAsk, deck.currency)}  

---

`;

  deck.slides.forEach((slide) => {
    md += `## SLIDE ${slide.slideNumber}: ${slide.title.toUpperCase()}
### ${slide.headline}

${slide.bullets.map(b => `- ${b}`).join('\n')}

*Catatan Presenter:*
> ${slide.presenterNotes}

---

`;
  });

  downloadBlob(md, `${deck.businessName.replace(/\s+/g, '_')}_PitchDeck.md`, 'text/markdown');
}

// Pitch Deck Export to PowerPoint Presentation (.pptx)
export async function exportPitchDeckToPptx(deck: PitchDeckData) {
  const pptx = new PptxGenJS();

  pptx.layout = 'LAYOUT_16x9';
  pptx.author = 'CorPlan Consultant';
  pptx.company = deck.businessName;
  pptx.title = `${deck.businessName} - Investor Pitch Deck`;

  // --- Title Slide ---
  const titleSlide = pptx.addSlide();
  titleSlide.background = { color: '0F172A' };

  // Inner Card Frame
  titleSlide.addShape(pptx.ShapeType.rect, {
    x: 0.8, y: 0.8, w: 8.4, h: 4.0,
    fill: { color: '1E293B' },
    line: { color: '3B82F6', width: 1.5 }
  });

  titleSlide.addText(deck.businessName.toUpperCase(), {
    x: 1.2, y: 1.2, w: 7.6, h: 0.8,
    fontSize: 32, bold: true, color: '60A5FA', align: 'left'
  });

  titleSlide.addText(deck.tagline, {
    x: 1.2, y: 2.0, w: 7.6, h: 0.6,
    fontSize: 18, italic: true, color: '94A3B8', align: 'left'
  });

  titleSlide.addText(`Target Pendanaan (Ask): ${formatCurrency(deck.targetAsk, deck.currency)}`, {
    x: 1.2, y: 2.8, w: 7.6, h: 0.5,
    fontSize: 16, bold: true, color: '34D399', align: 'left'
  });

  titleSlide.addText('Disusun menggunakan CorPlan Consultant Platform', {
    x: 1.2, y: 3.8, w: 7.6, h: 0.4,
    fontSize: 11, color: '64748B'
  });

  // --- Slide Items ---
  deck.slides.forEach((slide) => {
    const s = pptx.addSlide();
    s.background = { color: '0F172A' };

    // Header Badge
    s.addShape(pptx.ShapeType.rect, {
      x: 0.6, y: 0.4, w: 8.8, h: 0.6,
      fill: { color: '1E293B' },
      line: { color: '3B82F6', width: 1 }
    });

    s.addText(`SLIDE ${slide.slideNumber}: ${slide.title.toUpperCase()}`, {
      x: 0.8, y: 0.4, w: 6.0, h: 0.6,
      fontSize: 13, bold: true, color: '60A5FA', align: 'left', valign: 'middle'
    });

    s.addText(deck.businessName, {
      x: 6.8, y: 0.4, w: 2.4, h: 0.6,
      fontSize: 11, color: '94A3B8', align: 'right', valign: 'middle'
    });

    // Headline Text
    s.addText(slide.headline, {
      x: 0.6, y: 1.1, w: 8.8, h: 0.7,
      fontSize: 18, bold: true, color: 'FFFFFF', align: 'left'
    });

    // Content Box
    s.addShape(pptx.ShapeType.rect, {
      x: 0.6, y: 1.9, w: 8.8, h: 2.5,
      fill: { color: '1E293B' },
      line: { color: '334155', width: 1 }
    });

    const bulletRows = slide.bullets.map(b => ({
      text: b,
      options: {
        fontSize: 13,
        color: 'E2E8F0',
        bullet: { type: 'number' as const },
        paraSpaceBefore: 6,
        paraSpaceAfter: 6
      }
    }));

    if (bulletRows.length > 0) {
      s.addText(bulletRows, {
        x: 0.8, y: 2.0, w: 8.4, h: 2.3,
        valign: 'top'
      });
    }

    // Footer Presenter Note Banner inside slide
    if (slide.presenterNotes) {
      s.addShape(pptx.ShapeType.rect, {
        x: 0.6, y: 4.5, w: 8.8, h: 0.7,
        fill: { color: '0B132B' },
        line: { color: '1E293B', width: 1 }
      });

      s.addText(`Catatan Presenter: ${slide.presenterNotes}`, {
        x: 0.8, y: 4.5, w: 8.4, h: 0.7,
        fontSize: 10, italic: true, color: '94A3B8', valign: 'middle'
      });

      // Also attach to PowerPoint Native Presenter Notes
      s.addNotes(slide.presenterNotes);
    }
  });

  await pptx.writeFile({ fileName: `${deck.businessName.replace(/\s+/g, '_')}_PitchDeck.pptx` });
}

// Export Pitch Deck as Landscape PDF Presentation
export function exportPitchDeckToPdf(deck: PitchDeckData) {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4', // 297mm x 210mm
  });

  const pageWidth = 297;
  const pageHeight = 210;

  // --- Slide 0: Cover / Title Slide ---
  doc.setFillColor(15, 23, 42); // slate-900 (#0f172a)
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Inner Frame
  doc.setDrawColor(59, 130, 246); // blue-500
  doc.setLineWidth(1);
  doc.setFillColor(30, 41, 59); // slate-800
  doc.roundedRect(20, 20, pageWidth - 40, pageHeight - 40, 4, 4, 'FD');

  doc.setTextColor(96, 165, 250); // blue-400
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.text(deck.businessName.toUpperCase(), 35, 55);

  doc.setTextColor(148, 163, 184); // slate-400
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(15);
  const splitTagline = doc.splitTextToSize(deck.tagline, pageWidth - 80);
  doc.text(splitTagline, 35, 75);

  // Target Ask Badge
  doc.setFillColor(16, 185, 129); // emerald-500
  doc.setDrawColor(52, 211, 153);
  doc.roundedRect(35, 100, 160, 25, 3, 3, 'FD');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text(`TARGET PENDANAAN (ASK): ${formatCurrency(deck.targetAsk, deck.currency)}`, 45, 116);

  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text('Diterbitkan oleh CorPlan Consultant Platform', 35, 165);

  // --- Subsequent Slides ---
  deck.slides.forEach((slide) => {
    doc.addPage('a4', 'landscape');

    // Background
    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    // Header Bar
    doc.setFillColor(30, 41, 59);
    doc.setDrawColor(59, 130, 246);
    doc.roundedRect(15, 12, pageWidth - 30, 20, 3, 3, 'FD');

    doc.setTextColor(96, 165, 250);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text(`SLIDE ${slide.slideNumber}: ${slide.title.toUpperCase()}`, 25, 25);

    doc.setTextColor(148, 163, 184);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.text(deck.businessName, pageWidth - 25, 25, { align: 'right' });

    // Headline
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    const splitHeadline = doc.splitTextToSize(slide.headline, pageWidth - 40);
    doc.text(splitHeadline, 20, 45);

    // Content Card
    doc.setFillColor(30, 41, 59);
    doc.setDrawColor(51, 65, 85);
    doc.roundedRect(15, 58, pageWidth - 30, 102, 3, 3, 'FD');

    doc.setTextColor(226, 232, 240);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);

    let startY = 72;
    slide.bullets.forEach((bullet, idx) => {
      const bulletText = `${idx + 1}. ${bullet}`;
      const splitBullet = doc.splitTextToSize(bulletText, pageWidth - 50);
      doc.text(splitBullet, 25, startY);
      startY += splitBullet.length * 7 + 4;
    });

    // Presenter Notes Box
    if (slide.presenterNotes) {
      doc.setFillColor(11, 19, 43);
      doc.setDrawColor(30, 41, 59);
      doc.roundedRect(15, 168, pageWidth - 30, 25, 2, 2, 'FD');

      doc.setTextColor(148, 163, 184);
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(9);
      const splitNotes = doc.splitTextToSize(`Catatan Presenter: ${slide.presenterNotes}`, pageWidth - 40);
      doc.text(splitNotes, 22, 178);
    }
  });

  doc.save(`${deck.businessName.replace(/\s+/g, '_')}_PitchDeck.pdf`);
}

// Export Financial Model to Excel Spreadsheet (.xlsx)
export function exportFinancialModelToExcel(plan: BusinessPlanData) {
  const fin = calculateFinancials(plan.financialModel);
  const curr = plan.financialModel.currency;

  const wb = XLSX.utils.book_new();

  // Sheet 1: Ringkasan Finansial & BEP
  const summaryData = [
    ["BIZPLAN AI - MODEL KEUANGAN & PROYEKSI FINANSIAL"],
    ["Nama Bisnis", plan.businessName],
    ["Industri", plan.industry],
    ["Mata Uang", curr],
    ["Tanggal Dibuat", plan.createdAt],
    [""],
    ["METRIK UTAMA KEUANGAN", "NILAI"],
    ["Total Modal Awal (CapEx)", fin.totalCapex],
    ["Total Biaya Operasional Bulanan (OpEx)", fin.totalMonthlyOpex],
    ["Target BEP Bulanan (Volume Unit)", fin.bepUnits],
    ["Target BEP Bulanan (Nilai Pendapatan)", fin.bepRevenueMonthly],
    ["Payback Period (Estimasi)", fin.paybackMonth],
    ["Estimasi ROI Tahun 1", fin.roiYear1],
    ["Laba Bersih Tahun 1", fin.year1NetProfit]
  ];
  const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
  XLSX.utils.book_append_sheet(wb, wsSummary, "Ringkasan Finansial");

  // Sheet 2: CapEx (Modal Awal)
  const capexData = [
    ["ITEM PENGELUARAN MODAL (CapEx)", "KATEGORI", "ESTIMASI BIAYA (" + curr + ")"],
    ...plan.financialModel.capexItems.map(c => [c.item, "Investasi Awal", c.cost]),
    ["TOTAL CAPEX", "", fin.totalCapex]
  ];
  const wsCapex = XLSX.utils.aoa_to_sheet(capexData);
  XLSX.utils.book_append_sheet(wb, wsCapex, "Modal Awal (CapEx)");

  // Sheet 3: OpEx (Biaya Operasional)
  const opexData = [
    ["ITEM BIAYA OPERASIONAL (OpEx)", "KATEGORI", "BIAYA PER BULAN (" + curr + ")"],
    ...plan.financialModel.opexItems.map(o => [o.item, "Operasional Rutin", o.cost]),
    ["TOTAL OPEX BULANAN", "", fin.totalMonthlyOpex]
  ];
  const wsOpex = XLSX.utils.aoa_to_sheet(opexData);
  XLSX.utils.book_append_sheet(wb, wsOpex, "Operasional (OpEx)");

  // Sheet 4: Revenue Streams
  const revData = [
    ["NAMA PRODUK / LAYANAN", "HARGA / UNIT (" + curr + ")", "TARGET VOLUME / BULAN", "COGS %", "TOTAL PENDAPATAN / BULAN (" + curr + ")"],
    ...plan.financialModel.revenueStreams.map(r => [
      r.name,
      r.pricePerUnit,
      r.expectedMonthlyVolume,
      r.cogsPercent + "%",
      r.pricePerUnit * r.expectedMonthlyVolume
    ])
  ];
  const wsRev = XLSX.utils.aoa_to_sheet(revData);
  XLSX.utils.book_append_sheet(wb, wsRev, "Sumber Pendapatan");

  // Sheet 5: Proyeksi Laba Rugi 3 Tahun
  const projData = [
    ["INDIKATOR KEUANGAN", "TAHUN 1 (" + curr + ")", "TAHUN 2 (" + curr + ")", "TAHUN 3 (" + curr + ")"],
    ["Pendapatan Kotor (Revenue)", fin.threeYearSummary[0].revenue, fin.threeYearSummary[1].revenue, fin.threeYearSummary[2].revenue],
    ["Laba Kotor (Gross Profit)", fin.threeYearSummary[0].grossProfit, fin.threeYearSummary[1].grossProfit, fin.threeYearSummary[2].grossProfit],
    ["Total OpEx Tahunan", fin.threeYearSummary[0].opex, fin.threeYearSummary[1].opex, fin.threeYearSummary[2].opex],
    ["Laba Bersih (Net Profit)", fin.threeYearSummary[0].netProfit, fin.threeYearSummary[1].netProfit, fin.threeYearSummary[2].netProfit]
  ];
  const wsProj = XLSX.utils.aoa_to_sheet(projData);
  XLSX.utils.book_append_sheet(wb, wsProj, "Proyeksi 3 Tahun");

  XLSX.writeFile(wb, `${plan.businessName.replace(/\s+/g, '_')}_Financial_Model.xlsx`);
}

// Download Helper
function downloadBlob(content: string | Blob, filename: string, contentType: string) {
  const blob = content instanceof Blob ? content : new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
