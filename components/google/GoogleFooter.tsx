export default function GoogleFooter() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-[#f2f2f2] border-t border-[#e4e4e4]">
      <div className="flex flex-col sm:flex-row">
        {/* Country */}
        <div className="flex items-center px-6 py-3 border-b sm:border-b-0 sm:border-r border-[#e4e4e4]">
          <span className="text-sm text-[#70757a]">Việt Nam</span>
        </div>

        {/* Center links */}
        <div className="flex-1 flex flex-wrap items-center justify-center px-4 py-3 gap-x-6 gap-y-1">
          {["Quảng cáo", "Doanh nghiệp", "Cách hoạt động của Tìm kiếm"].map(
            (link) => (
              <a
                key={link}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-sm text-[#70757a] hover:underline"
              >
                {link}
              </a>
            )
          )}
        </div>

        {/* Right links */}
        <div className="flex items-center px-4 py-3 border-t sm:border-t-0 sm:border-l border-[#e4e4e4] gap-x-6">
          {["Cài đặt", "Điều khoản", "Quyền riêng tư"].map((link) => (
            <a
              key={link}
              href="#"
              onClick={(e) => e.preventDefault()}
              className="text-sm text-[#70757a] hover:underline"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
