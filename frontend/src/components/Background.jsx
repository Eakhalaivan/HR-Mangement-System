import DotGrid from "./DotGrid";

const Background = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-slate-950">
      <DotGrid
        dotSize={3}
        gap={25}
        baseColor="#1e293b"
        activeColor="#6366f1"
        proximity={100}
        shockRadius={200}
        shockStrength={4}
        resistance={700}
        returnDuration={1.2}
      />
    </div>
  );
};

export default Background;