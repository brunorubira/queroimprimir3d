"use client";

import { motion } from "framer-motion";

export const BlueprintGrid = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none opacity-20">
      {/* Primary Grid Lines */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--border) / 0.3) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--border) / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Secondary Detailed Grid */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--border) / 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--border) / 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '10px 10px'
        }}
      />

      {/* Origin Marker */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 border-2 border-primary/40 rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-12 bg-primary/20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-px w-12 bg-primary/20" />

      {/* Axis Labels */}
      <div className="absolute top-[51%] left-[51%] text-[10px] font-mono text-slate-600 uppercase tracking-widest">
        Origin [0,0,0]
      </div>

      {/* Top-Right Technical Info */}
      <div className="absolute top-8 right-8 text-[10px] font-mono text-slate-700 space-y-1 hidden md:block">
        <div>SYS_IDENT: QUERO_IMPR_3D_V1.0</div>
        <div>R_GRID: 40.00mm</div>
        <div>COORD_SYSTEM: CARTESIAN</div>
      </div>

      {/* Bottom-Left Technical Info */}
      <div className="absolute bottom-8 left-8 text-[10px] font-mono text-slate-700 hidden md:block">
        <div>// G-CODE_STREAM: ACTIVE</div>
        <div>// LAYER_SCAN_READY: TRUE</div>
      </div>

      {/* Decorative Corner Brackets */}
      <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-slate-800" />
      <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-slate-800" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-slate-800" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-slate-800" />

      {/* Scanning Line Animation */}
      <motion.div 
        animate={{
          top: ["0%", "100%", "0%"]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute left-0 right-0 h-px bg-primary/10 shadow-[0_0_15px_rgba(6,182,212,0.3)] z-10"
      />
    </div>
  );
};
