export function LanguageBox() {
  return (
    <div className="h-full relative text-black flex flex-col sm:p-2 gap-3">
      <h4 className="text-xl font-bold jetbrains-mono">Languages</h4>
      <div>
        <h5>
          Sinhala&nbsp;
          <span className="noto-sans-sinhala">(සිංහල)</span>
        </h5>
        <span className="text-xs bg-blue-600 text-white p-1/2 px-2 rounded-full">
          Native
        </span>
      </div>
      <div>
        <h5>English</h5>
        <span className="text-xs bg-green-600 text-white p-1/2 px-2 rounded-full">
          Intermediate
        </span>
      </div>
      <div className="noto-sans-sinhala absolute text-9xl right-4 top-0 -rotate-45 text-gray-300 select-none">
        අ
      </div>
      <div className="absolute text-9xl -bottom-2 right-6 rotate-12 text-gray-300 select-none font-thin">
        A
      </div>
    </div>
  );
}
