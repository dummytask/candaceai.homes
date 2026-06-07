"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function randomHex(length: number): string {
  const chars = "0123456789abcdef";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

function generateHash(): string {
  return `0x${randomHex(4)}...${randomHex(4)}`;
}

function generateTimestamp(): string {
  const now = new Date();
  return now.toISOString().slice(11, 19);
}

const EVENT_TYPES = [
  "PROVENANCE_RECORDED",
  "TRAINING_EPOCH",
  "OWNERSHIP_TRANSFER",
  "INTEGRITY_PROOF",
  "TELEMETRY_ANCHOR",
];

interface LedgerEntry {
  id: number;
  hash: string;
  event: string;
  timestamp: string;
}

let entryIdCounter = 1;

function generateEntry(): LedgerEntry {
  return {
    id: entryIdCounter++,
    hash: generateHash(),
    event: EVENT_TYPES[Math.floor(Math.random() * EVENT_TYPES.length)],
    timestamp: generateTimestamp(),
  };
}

export default function LiveLedger() {
  const [blockCount, setBlockCount] = useState(1842317);
  const [entries, setEntries] = useState<LedgerEntry[]>([]);
  const [newEntryId, setNewEntryId] = useState<number | null>(null);

  useEffect(() => {
    setEntries(Array.from({ length: 8 }, generateEntry));
  }, []);

  useEffect(() => {
    const blockInterval = setInterval(() => {
      const increment = Math.floor(Math.random() * 3) + 1;
      setBlockCount((prev) => prev + increment);
    }, 2000 + Math.random() * 1000);
    return () => clearInterval(blockInterval);
  }, []);

  useEffect(() => {
    const ledgerInterval = setInterval(() => {
      const entry = generateEntry();
      setNewEntryId(entry.id);
      setEntries((prev) => [entry, ...prev].slice(0, 8));
    }, 3000);
    return () => clearInterval(ledgerInterval);
  }, []);

  return (
    <section className="py-32 px-6 md:px-16 max-w-6xl mx-auto">
      <p className="text-[10px] tracking-[0.3em] text-[#444] uppercase mb-12">
        VI · PROVENANCE
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Left column */}
        <div>
          <h2 className="text-4xl md:text-6xl font-light text-white leading-tight">
            Every movement,
          </h2>
          <h2 className="text-4xl md:text-6xl font-light text-[#444] leading-tight mb-8">
            recorded on-chain.
          </h2>
          <p className="text-sm text-[#555] max-w-xs leading-relaxed">
            A decentralised, immutable record of device provenance, training
            epochs, and ownership. Verifiable by anyone. Revocable by no one.
          </p>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-6">
          {/* Block counter */}
          <div className="flex flex-col gap-1">
            <p className="text-[10px] tracking-widest text-[#444] uppercase">
              BLOCK · LIVE
            </p>
            <p className="text-3xl font-mono text-white tabular-nums">
              {blockCount.toLocaleString("en-US")}
            </p>
          </div>

          {/* Live ledger feed */}
          <div className="h-48 overflow-hidden border border-[#111] bg-[#040404] p-3">
            <div className="flex flex-col gap-1.5">
              {entries.map((entry) => (
                <motion.div
                  key={entry.id}
                  initial={entry.id === newEntryId ? { opacity: 0, y: -6 } : { opacity: 1, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex items-center gap-3 font-mono text-[10px] text-[#444]"
                >
                  <span className="text-[#333] shrink-0">{entry.hash}</span>
                  <span className="text-[#666] shrink-0">{entry.event}</span>
                  <span className="text-[#2a2a2a] ml-auto shrink-0">{entry.timestamp}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Accepted crypto */}
          <p className="text-[10px] tracking-widest text-[#333] uppercase">
            BTC · ETH · USDC · USDT · SOL
          </p>
        </div>
      </div>
    </section>
  );
}
