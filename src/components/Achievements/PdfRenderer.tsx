"use client";
import React from "react";
import { Document, Page, pdfjs } from "react-pdf";

// Konfigurasi worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PdfRenderer({ file, className, loading }: { file: string, className?: string, loading?: React.ReactNode }) {
  return (
    <Document file={file} className={className} loading={loading}>
      <Page pageNumber={1} renderTextLayer={false} renderAnnotationLayer={false} />
    </Document>
  );
}

