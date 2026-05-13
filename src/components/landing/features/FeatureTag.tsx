export const FeatureTag = ({ text }: { text: string }) => {
  return (
    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[rgba(127,119,221,0.13)] text-[#AFA9EC] border border-[rgba(127,119,221,0.22)]">
      {text}
    </span>
  );
};