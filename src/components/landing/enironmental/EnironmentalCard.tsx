interface EnvironmentalCardProps {
    title: string;
    text: string;
}

const EnironmentalCard = ({ecard}: {ecard: EnvironmentalCardProps}) => {
  return (
    <div className="rounded-[11px] p-3.5" style={{ background: "#0e150f", border: "0.5px solid rgba(93,202,165,0.14)" }}>
        <div className="text-[22px] font-medium text-[#5DCAA5] tracking-[-0.02em] mb-1">{ecard.title}</div>
        <div className="text-[11px] text-white/32 leading-[1.5]">{ecard.text}</div>
    </div>
  )
}

export default EnironmentalCard