import { FeatureTag } from "./FeatureTag";
import { IconType } from "react-icons";

export interface FeatureProps {
    icon: IconType
    title: string;
    text: string;
    tagText: string;
}

const Feature = ({ feature, primary }: { feature: FeatureProps, primary: boolean }) => {
  return (
    <div className={`rounded-xl p-4 relative overflow-hidden border transition-all duration-200 hover:border-[rgba(127,119,221,0.3)] hover:shadow-[0_0_20px_rgba(127,119,221,0.08) ${primary ? "border border-[rgba(127,119,221,0.22)] bg-[rgba(127,119,221,0.05)]" : "border-white/[0.07] bg-[#111115]"}`}>
        {primary && <div className="absolute top-[-30px] right-[-30px] w-[90px] h-[90px] rounded-full bg-[rgba(127,119,221,0.1)] pointer-events-none" style={{ filter: "blur(25px)" }} />}
        <div className="w-7.5 h-7.5 rounded-lg bg-[rgba(127,119,221,0.14)] border border-[rgba(127,119,221,0.25)] flex items-center justify-center mb-2.5">
            <feature.icon color="#AFA9EC"/>
        </div>
        <p className="text-[13px] font-medium text-white mb-1">{ feature.title }</p>
        <p className="text-[12px] text-white/35 leading-[1.6] mb-2">{ feature.text }</p>
        <FeatureTag text={feature.tagText} />
    </div>
  )
}

export default Feature