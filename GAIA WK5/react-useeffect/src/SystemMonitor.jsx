import { useState, useEffect } from 'react';

export default function SystemMonitor() {
  // 1. Core States for Metrics
  const [cpu, setCpu] = useState(() => {
    const saved = localStorage.getItem('sys_cpu');
    return saved ? Number(saved) : 25;
  });
  
  const [memory, setMemory] = useState(() => {
    const saved = localStorage.getItem('sys_memory');
    return saved ? Number(saved) : 40;
  });
  
  const [network, setNetwork] = useState(() => {
    const saved = localStorage.getItem('sys_network');
    return saved ? Number(saved) : 15;
  });

  // Alert system status flags
  const [alerts, setAlerts] = useState([]);

  // Threshold limits
  const CPU_THRESHOLD = 85;
  const MEM_THRESHOLD = 80;

  // 2. Multiple useEffect Hooks for Different Metrics + Cleanups
  
  // CPU Simulation Loop (Updates every 1.5s)
  useEffect(() => {
    const cpuInterval = setInterval(() => {
      setCpu((prev) => {
        // Generate a random swing between -15% and +15%
        const change = Math.floor(Math.random() * 31) - 15;
        const nextCpu = Math.max(5, Math.min(100, prev + change));
        localStorage.setItem('sys_cpu', nextCpu.toString());
        return nextCpu;
      });
    }, 1500);

    return () => clearInterval(cpuInterval);
  }, []);

  // Memory Simulation Loop (Updates every 3s)
  useEffect(() => {
    const memInterval = setInterval(() => {
      setMemory((prev) => {
        const change = Math.floor(Math.random() * 11) - 5; // -5% to +5% swing
        const nextMem = Math.max(10, Math.min(100, prev + change));
        localStorage.setItem('sys_memory', nextMem.toString());
        return nextMem;
      });
    }, 3000);

    return () => clearInterval(memInterval);
  }, []);

  // Network Simulation Loop (Updates every 1s)
  useEffect(() => {
    const netInterval = setInterval(() => {
      setNetwork((prev) => {
        const change = Math.floor(Math.random() * 21) - 10; // -10 Mbps to +10 Mbps swing
        const nextNet = Math.max(0, Math.min(500, prev + change));
        localStorage.setItem('sys_network', nextNet.toString());
        return nextNet;
      });
    }, 1000);

    return () => clearInterval(netInterval);
  }, []);

  // 3. Alert Tracking Logic based on Threshold Violations
  useEffect(() => {
    const newAlerts = [];
    if (cpu > CPU_THRESHOLD) {
      newAlerts.push(`⚠️ High CPU Usage Warning: ${cpu}% (Threshold: ${CPU_THRESHOLD}%)`);
    }
    if (memory > MEM_THRESHOLD) {
      newAlerts.push(`🚨 Critical Memory Usage Warning: ${memory}% (Threshold: ${MEM_THRESHOLD}%)`);
    }
    setAlerts(newAlerts);
  }, [cpu, memory]);

  return (
    <div style={{ maxWidth: '650px', margin: '30px auto', fontFamily: 'monospace', background: '#0f172a', color: '#38bdf8', border: '1px solid #334155', borderRadius: '8px', padding: '20px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.5)' }}>
      
      {/* Dashboard Title */}
      <div style={{ borderBottom: '1px dashed #334155', paddingBottom: '10px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, color: '#f8fafc' }}>⚙️ SYSTEM CORE MONITOR v1.0</h2>
        <span style={{ fontSize: '12px', color: '#64748b' }}>PERSISTENCE: LOCAL_STORAGE</span>
      </div>

      {/* Metrics Layout Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '25px' }}>
        
        {/* CPU Monitoring Gauge */}
        <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '6px', padding: '15px' }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#94a3b8' }}>PROCESSOR (CPU)</h4>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: cpu > CPU_THRESHOLD ? '#ef4444' : '#4ade80' }}>
            {cpu}%
          </div>
          <div style={{ width: '100%', height: '8px', background: '#334155', borderRadius: '4px', marginTop: '10px', overflow: 'hidden' }}>
            <div style={{ width: `${cpu}%`, height: '100%', background: cpu > CPU_THRESHOLD ? '#ef4444' : '#4ade80', transition: 'width 0.5s ease-out' }} />
          </div>
        </div>

        {/* Memory Monitoring Gauge */}
        <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '6px', padding: '15px' }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#94a3b8' }}>SYSTEM MEMORY (RAM)</h4>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: memory > MEM_THRESHOLD ? '#f97316' : '#4ade80' }}>
            {memory}%
          </div>
          <div style={{ width: '100%', height: '8px', background: '#334155', borderRadius: '4px', marginTop: '10px', overflow: 'hidden' }}>
            <div style={{ width: `${memory}%`, height: '100%', background: memory > MEM_THRESHOLD ? '#f97316' : '#4ade80', transition: 'width 0.5s ease-out' }} />
          </div>
        </div>

        {/* Network Utilization Module */}
        <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '6px', padding: '15px', gridColumn: '1 / -1' }}>
          <h4 style={{ margin: '0 0 5px 0', color: '#94a3b8' }}>NETWORK BANDWIDTH USE</h4>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#38bdf8' }}>
            {network} <span style={{ fontSize: '14px' }}>Mbps / 500 Mbps max</span>
          </div>
        </div>

      </div>

      {/* 4. Alert Panel Window */}
      <div style={{ background: '#111827', border: '1px solid #334155', borderRadius: '6px', padding: '15px' }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#f8fafc' }}>📢 LIVE SYSTEM ALERTS ({alerts.length})</h4>
        {alerts.length === 0 ? (
          <div style={{ color: '#64748b', fontSize: '13px', fontStyle: 'italic' }}>🟢 All systems nominal. No threshold violations detected.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {alerts.map((alert, index) => (
              <div key={index} style={{ padding: '8px 12px', background: alert.includes('🚨') ? '#450a0a' : '#431407', borderLeft: `4px solid ${alert.includes('🚨') ? '#ef4444' : '#f97316'}`, color: '#f8fafc', fontSize: '13px', borderRadius: '0 4px 4px 0' }}>
                {alert}
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
