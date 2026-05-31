"use client";

import { useState } from "react";

const TOTAL_PAGES = 35;

export default function PdfPreview() {
  const [page, setPage] = useState(1);
  const [zoom, setZoom] = useState(121);
  const [recompiling, setRecompiling] = useState(false);

  const handleRecompile = () => {
    setRecompiling(true);
    setTimeout(() => setRecompiling(false), 1200);
  };

  return (
    <div
      className="flex flex-col h-full overflow-hidden"
      style={{ backgroundColor: "#2d3a4a", minWidth: 380 }}
    >
      {/* PDF toolbar */}
      <div
        className="flex items-center justify-between px-3 py-2 border-b shrink-0"
        style={{ borderColor: "#2d3d56", backgroundColor: "#243044" }}
      >
        {/* Recompile */}
        <div className="flex items-center gap-1">
          <button
            onClick={handleRecompile}
            disabled={recompiling}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white rounded transition-colors disabled:opacity-70"
            style={{ backgroundColor: "#4caf50" }}
            onMouseEnter={(e) =>
              !recompiling && (e.currentTarget.style.backgroundColor = "#45a049")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#4caf50")
            }
          >
            {recompiling ? (
              <>
                <svg className="animate-spin" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8Z" />
                </svg>
                Compiling...
              </>
            ) : (
              <>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7L8 5Z" />
                </svg>
                Recompile
              </>
            )}
          </button>

          {/* Dropdown arrow */}
          <button
            className="px-1.5 py-1.5 text-xs font-semibold text-white rounded transition-colors"
            style={{ backgroundColor: "#4caf50" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#45a049")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4caf50")}
          >
            ▾
          </button>

          {/* Error count badge */}
          <span className="ml-1 px-1.5 py-0.5 text-xs bg-red-600 text-white rounded-full">
            16
          </span>

          {/* Download */}
          <button className="ml-1 text-gray-400 hover:text-white transition-colors" title="Tải PDF">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 9h-4V3H9v6H5l7 7 7-7ZM5 18v2h14v-2H5Z" />
            </svg>
          </button>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          {/* Brightness */}
          <button className="text-gray-400 hover:text-white transition-colors" title="Độ sáng">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5ZM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1Zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1ZM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1Zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1Z" />
            </svg>
          </button>

          {/* Page up/down */}
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            className="text-gray-400 hover:text-white disabled:opacity-30 transition-colors"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6 1.41 1.41Z" />
            </svg>
          </button>

          <span className="text-xs text-gray-300 whitespace-nowrap">
            {page} / {TOTAL_PAGES}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(TOTAL_PAGES, p + 1))}
            disabled={page >= TOTAL_PAGES}
            className="text-gray-400 hover:text-white disabled:opacity-30 transition-colors"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41Z" />
            </svg>
          </button>

          {/* Zoom */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setZoom((z) => Math.max(50, z - 10))}
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              −
            </button>
            <span className="text-xs text-gray-300 w-10 text-center">{zoom}%</span>
            <button
              onClick={() => setZoom((z) => Math.min(200, z + 10))}
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* PDF Page */}
      <div className="flex-1 overflow-auto code-scroll flex justify-center py-6 px-4">
        <div
          className="bg-white shadow-2xl relative"
          style={{
            width: `${(595 * zoom) / 100}px`,
            minHeight: `${(842 * zoom) / 100}px`,
            padding: `${(72 * zoom) / 100}px`,
            fontSize: `${(12 * zoom) / 100}px`,
            transformOrigin: "top center",
          }}
        >
          {/* Cover page content */}
          <div className="flex flex-col items-center text-center h-full" style={{ color: "#1a1a1a" }}>
            {/* University name */}
            <div className="mb-2" style={{ fontSize: `${(14 * zoom) / 100}px`, fontWeight: 700 }}>
              ĐẠI HỌC BÁCH KHOA HÀ NỘI
            </div>
            <div
              className="mb-6 font-semibold"
              style={{ fontSize: `${(13 * zoom) / 100}px` }}
            >
              TRƯỜNG CÔNG NGHỆ THÔNG TIN VÀ TRUYỀN THÔNG
            </div>

            {/* University logo */}
            <div className="mb-8 flex items-center justify-center">
              <img
                src="/image/hust.png"
                alt="HUST"
                style={{
                  width: `${(90 * zoom) / 100}px`,
                  height: `${(90 * zoom) / 100}px`,
                  objectFit: "contain",
                }}
              />
            </div>

            {/* Title */}
            <div
              className="font-bold mb-6 leading-tight"
              style={{ fontSize: `${(22 * zoom) / 100}px`, letterSpacing: "0.05em" }}
            >
              ĐỒ ÁN TỐT NGHIỆP
            </div>

            {/* Thesis title */}
            <div
              className="font-semibold mb-8 leading-relaxed max-w-full"
              style={{ fontSize: `${(14 * zoom) / 100}px` }}
            >
              Hệ thống quản lý và tiện ích ký túc xá cho sinh viên
              <br />
              tích hợp phân bổ phòng tự động và trực quan hóa
              <br />
              không gian
            </div>

            {/* Author */}
            <div
              className="font-bold mb-2"
              style={{ fontSize: `${(16 * zoom) / 100}px` }}
            >
              PHAN ĐỨC QUYỀN
            </div>
            <div
              className="mb-8"
              style={{ fontSize: `${(11 * zoom) / 100}px`, color: "#555" }}
            >
              quyenn.pd225916@sis.hust.edu.vn
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Info table */}
            <div
              className="w-full text-left border-t pt-4 mt-4"
              style={{ fontSize: `${(11 * zoom) / 100}px`, borderColor: "#ccc" }}
            >
              {[
                ["Giảng viên hướng dẫn:", "PGS. TS. Cao Tuấn Dũng"],
                ["Khoa:", "Khoa học máy tính"],
                ["Trường:", "Trường Công nghệ Thông tin và Truyền thông"],
              ].map(([label, value]) => (
                <div key={label} className="flex gap-2 mb-1.5">
                  <span className="font-semibold whitespace-nowrap" style={{ minWidth: `${(130 * zoom) / 100}px` }}>
                    {label}
                  </span>
                  <span>{value}</span>
                </div>
              ))}

              <div className="flex gap-2 mb-1.5">
                <span className="font-semibold" style={{ minWidth: `${(130 * zoom) / 100}px` }}>
                  Chương trình đào tạo:
                </span>
                <span>Công nghệ thông tin Việt – Nhật</span>
              </div>
            </div>

            {/* Year */}
            <div
              className="mt-6 font-semibold"
              style={{ fontSize: `${(12 * zoom) / 100}px` }}
            >
              Hà Nội — 2024
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
