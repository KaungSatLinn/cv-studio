import jsPDF from 'jspdf';
import html2canvas from 'html2canvas-pro';
import { CVData } from '../types/cv';

export function downloadJSON(data: CVData): void {
  const dataStr = JSON.stringify(data, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const fileNameSlug = (data.name || 'software-engineer').toLowerCase().replace(/[^a-z0-9]+/g, '-');
  a.href = url;
  a.download = `${fileNameSlug}-cv-data.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export async function downloadDirectPDF(name: string): Promise<boolean> {
  // Ensure preview is visible in DOM even if user is on mobile edit tab
  const wrapper = document.getElementById('preview-wrapper');
  const wasHidden = wrapper?.classList.contains('hidden');
  if (wasHidden && wrapper) {
    wrapper.classList.remove('hidden');
  }

  try {
    const cleanName = (name || 'Software_Engineer')
      .trim()
      .replace(/[^a-zA-Z0-9_\-\s]/g, '')
      .replace(/\s+/g, '_');

    const pages = document.querySelectorAll<HTMLElement>('.cv-page');
    if (!pages || pages.length === 0) {
      console.error('No .cv-page elements found');
      return false;
    }

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm

    for (let i = 0; i < pages.length; i++) {
      if (i > 0) {
        pdf.addPage('a4', 'portrait');
      }

      // Render each page element individually to guarantee clean page boundary
      const canvas = await html2canvas(pages[i], {
        scale: 2, // 2x crisp retina scale
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.98);
      pdf.addImage(imgData, 'JPEG', 0, 0, pageWidth, pageHeight, undefined, 'FAST');
    }

    pdf.save(`${cleanName}_CV.pdf`);
    return true;
  } catch (err) {
    console.error('Direct PDF export error, falling back to print dialog:', err);
    printCV(name);
    return false;
  } finally {
    if (wasHidden && wrapper) {
      wrapper.classList.add('hidden');
    }
  }
}

export function printCV(name: string): void {
  const originalTitle = document.title;
  const cleanName = (name || 'Software_Engineer')
    .trim()
    .replace(/[^a-zA-Z0-9_\-\s]/g, '')
    .replace(/\s+/g, '_');
  document.title = `${cleanName}_CV`;

  const wrapper = document.getElementById('preview-wrapper');
  const wasHidden = wrapper?.classList.contains('hidden');
  if (wasHidden && wrapper) {
    wrapper.classList.remove('hidden');
  }

  window.print();

  if (wasHidden && wrapper) {
    wrapper.classList.add('hidden');
  }
  document.title = originalTitle;
}
