"use client";

import { useState, useEffect } from "react";

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
      <p className="section-label mb-12">VI · Provenance</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <h2 className="text-4xl md:text-5xl font-semibold text-foreground leading-tight">
            Every movement,
          </h2>
          <h2 className="text-4xl md:text-5xl font-semibold text-accent-soft leading-tight mb-8">
            recorded on-chain.
          </h2>
          <p className="text-sm text-muted max-w-sm leading-relaxed">
            A decentralised, immutable record of device provenance, training
            epochs, and ownership. Verifiable by anyone. Revocable by no one.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <div className="card-surface p-5 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <p className="text-[10px] tracking-widest text-accent uppercase font-medium">
                Block · Live
              </p>
            </div>
            <p className="text-3xl font-mono text-foreground tabular-nums">
              {blockCount.toLocaleString("en-US")}
            </p>
          </div>

          <div className="h-48 overflow-hidden rounded-xl border border-border bg-background-card p-4">
            <div className="flex flex-col gap-2">
              {entries.map((entry) => (
                <div
                  key={entry.id}
                  className={`flex items-center gap-3 font-mono text-[10px]${
                    entry.id === newEntryId ? " ledger-entry-new" : ""
                  }`}
                >
                  <span className="text-accent/70 shrink-0">{entry.hash}</span>
                  <span className="text-muted shrink-0">{entry.event}</span>
                  <span className="text-muted/50 ml-auto shrink-0">{entry.timestamp}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-[10px] tracking-widest text-muted/60 uppercase">
            BTC · ETH · USDC · USDT · SOL
          </p>
        </div>
      </div>
    </section>
  );
}
