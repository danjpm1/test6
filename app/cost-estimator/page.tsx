"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

/* ─── Types & Config ───────────────────────────────────────────── */

type ProjectType = "custom-home" | "new-build" | "renovation" | "consulting" | "commercial" | "remote" | "";

interface FormState {
  step: string; projectType: ProjectType; zipCode: string; sqft: number;
  exteriorQuality: string; bedrooms: number; bathrooms: number; interiorFinish: string;
  stories: number; garageSpaces: number; renoScope: string; renoArea: number;
  renoCondition: string; renoFinish: string; renoFeatures: string[]; consultType: string;
  consultComplexity: string; consultTimeline: string;
  consultPropertyType: string; consultProjectValue: string;
  homeStyle: string; homeFeatures: string[];
  commercialType: string; commercialFinish: string;
  remoteType: string; remoteAccess: string; remoteFeatures: string[];
}

interface EstimateResult {
  total: number; perUnit: number; unitLabel: string;
  breakdown: { name: string; value: number }[];
  locationName: string; tierName: string; locationMultiplier: number; projectLabel: string;
}

/* ─── Pricing Data ─────────────────────────────────────────────── */

const PRICING_TIERS: Record<string, { name: string; multiplier: number }> = {
  premium: { name: "Premium Market", multiplier: 1.15 }, standard: { name: "Core Service Area", multiplier: 1.0 },
  extended: { name: "Extended Area", multiplier: 1.1 }, remote: { name: "Remote Area", multiplier: 1.2 },
};
const CUSTOM_HOME_BASE = 280;
const NEW_BUILD_BASE = 240;
const RENO_BASE: Record<string, number> = { kitchen: 45000, bathroom: 28000, addition: 220, "full-gut": 180, "whole-house": 160 };
const CONSULT_BASE: Record<string, { low: number; high: number }> = {
  estimation: { low: 2000, high: 6000 }, arbitration: { low: 5000, high: 20000 },
  structural: { low: 3500, high: 8000 }, feasibility: { low: 5000, high: 15000 },
  permits: { low: 2500, high: 6000 }, "site-analysis": { low: 4000, high: 12000 },
};
const EXTERIOR_MULT: Record<string, number> = { basic: 1.0, standard: 1.2, premium: 1.45 };
const INTERIOR_MULT: Record<string, number> = { basic: 1.0, standard: 1.15, premium: 1.35, luxury: 1.65 };
const CONDITION_MULT: Record<string, number> = { good: 0.85, fair: 1.0, poor: 1.2, gutted: 1.4 };
const COMPLEXITY_MULT: Record<string, number> = { standard: 1.0, moderate: 1.3, complex: 1.7 };
const TIMELINE_MULT: Record<string, number> = { flexible: 0.9, standard: 1.0, rush: 1.25 };
const FINISH_MULT: Record<string, number> = { basic: 1.0, standard: 1.15, premium: 1.4, luxury: 1.7 };
const PROP_TYPE_MULT: Record<string, number> = { residential: 1.0, commercial: 1.25, "multi-unit": 1.15, "mixed-use": 1.3 };
const PROJ_VALUE_MULT: Record<string, number> = { "under-500k": 0.85, "500k-1m": 1.0, "1m-5m": 1.2, "5m-plus": 1.45 };
const CONSULT_LOC_MULT: Record<string, number> = { premium: 1.0, standard: 1.0, extended: 1.05, remote: 1.12 };
const CONSTRAINTS = { minSqft: 500, maxSqft: 10000, sqftStep: 100 };
const HOME_STYLE_MULT: Record<string, number> = { modern: 1.15, craftsman: 1.05, farmhouse: 1.0, contemporary: 1.12, mediterranean: 1.18 };
const HOME_FEATURE_COST: Record<string, number> = { "smart-home": 25000, "outdoor-kitchen": 35000, "home-theater": 28000, "wine-cellar": 22000, "ev-garage": 18000, "in-floor-heat": 15000, "solar": 32000, "pool": 65000 };
const RENO_FEATURE_COST: Record<string, number> = { "open-concept": 12000, "new-windows": 8500, "hardwood": 7000, "custom-cabinets": 15000, "electrical": 6500, "plumbing": 9000, "insulation": 5500, "smart-lighting": 4500 };

/* ─── Commercial Pricing ──────────────────────────────────────── */
const COMMERCIAL_BASE: Record<string, number> = { office: 260, retail: 230, warehouse: 145, restaurant: 320 };
const COMMERCIAL_FINISH_MULT: Record<string, number> = { standard: 1.0, premium: 1.3, "high-end": 1.6 };

/* ─── Remote & Off-Grid Pricing ───────────────────────────────── */
const REMOTE_BASE: Record<string, number> = { cabin: 210, adu: 245, workshop: 155, "off-grid-home": 295 };
const REMOTE_ACCESS_MULT: Record<string, number> = { "road-access": 1.0, seasonal: 1.15, "no-road": 1.35 };
const REMOTE_FEATURE_COST: Record<string, number> = { solar: 32000, "well-septic": 25000, generator: 12000, "satellite-internet": 5500, "propane-system": 8000, "rainwater": 9500 };

const ZIP_TO_TIER: Record<string, string> = {
  "83814":"premium","83815":"premium","83816":"premium","83835":"premium","83864":"premium","99019":"premium","99203":"premium","99223":"premium",
  "83813":"standard","83860":"standard","83809":"standard","83801":"standard","83804":"standard","83852":"standard","83840":"standard","83841":"standard","83869":"standard","83854":"standard","83877":"standard","83858":"standard",
  "99201":"standard","99202":"standard","99204":"standard","99205":"standard","99206":"standard","99207":"standard","99208":"standard","99212":"standard","99216":"standard","99217":"standard","99218":"standard","99224":"standard","99209":"standard","99210":"standard","99211":"standard","99213":"standard","99214":"standard","99215":"standard","99219":"standard","99220":"standard","99228":"standard",
  "99001":"standard","99003":"standard","99004":"standard","99005":"standard","99006":"standard","99016":"standard","99021":"standard","99022":"standard","99027":"standard","99037":"standard",
  "83805":"extended","83826":"extended","83845":"extended","83851":"extended","83856":"extended","83821":"extended","83865":"extended","83836":"extended","83811":"extended","83825":"extended","83868":"extended","83833":"extended","83861":"extended","83843":"extended","83844":"extended","99163":"extended","99164":"extended","99009":"extended","99025":"extended","99026":"extended","99029":"extended","99030":"extended","99031":"extended","99036":"extended","99156":"extended","99126":"extended","83870":"extended","83871":"extended","83824":"extended","83823":"extended","83832":"extended","83834":"extended","83855":"extended","83872":"extended",
  "83837":"remote","83839":"remote","83842":"remote","83846":"remote","83849":"remote","83850":"remote","83866":"remote","83867":"remote","83873":"remote","83808":"remote","83812":"remote","83810":"remote","99109":"remote","99114":"remote","99137":"remote","99138":"remote","99140":"remote","99141":"remote","99148":"remote","99151":"remote","99166":"remote","99180":"remote","99181":"remote","99101":"remote","99110":"remote","99119":"remote","99153":"remote","99173":"remote","59872":"remote","59874":"remote","59831":"remote","59859":"remote","59867":"remote","59842":"remote","59847":"remote",
};
const LOCATION_NAMES: Record<string, string> = {
  "83814":"Coeur d'Alene","83815":"Coeur d'Alene","83816":"Coeur d'Alene","83835":"Hayden","83864":"Sandpoint","99019":"Liberty Lake","99203":"Spokane","99223":"Spokane",
  "83813":"Cocolalla","83860":"Sagle","83809":"Careywood","83801":"Athol","83869":"Spirit Lake","83854":"Post Falls","83858":"Rathdrum",
  "83805":"Bonners Ferry","83856":"Priest River","83821":"Priest Lake","83843":"Moscow","83837":"Kellogg","83873":"Wallace",
};

function getZipTier(zip: string) { const k = ZIP_TO_TIER[zip]; return k ? PRICING_TIERS[k] : null; }
function getZipTierKey(zip: string) { return ZIP_TO_TIER[zip] ?? null; }
function getLocationName(zip: string) {
  if (LOCATION_NAMES[zip]) return LOCATION_NAMES[zip];
  if (zip.startsWith("838")) return "North Idaho";
  if (zip.startsWith("99")) return "Spokane Area";
  if (zip.startsWith("598")) return "Western Montana";
  return "Your Area";
}

/* ─── Step Orders ───── */

const STEP_ORDERS: Record<string, string[]> = {
  "custom-home": ["type-select", "sqft", "home-style", "exterior", "interior-finish", "interior-rooms", "home-features", "zip", "analyzing", "results"],
  "new-build": ["type-select", "sqft", "build-details", "exterior", "interior-finish", "interior-rooms", "zip", "analyzing", "results"],
  "renovation": ["type-select", "reno-scope", "reno-area", "reno-condition", "reno-finish", "reno-features", "zip", "analyzing", "results"],
  "consulting": ["type-select", "consult-type", "consult-details", "consult-property", "consult-value", "zip", "analyzing", "results"],
  "commercial": ["type-select", "commercial-type", "sqft", "commercial-finish", "zip", "analyzing", "results"],
  "remote": ["type-select", "remote-type", "sqft", "remote-access", "remote-features", "zip", "analyzing", "results"],
};

/* ─── Calculations ─────────────────────────────────────────────── */

function calcCustomHome(st: FormState): EstimateResult {
  const tier = getZipTier(st.zipCode); const lm = tier?.multiplier ?? 1.0;
  const avg = (EXTERIOR_MULT[st.exteriorQuality] + INTERIOR_MULT[st.interiorFinish]) / 2;
  const sm = HOME_STYLE_MULT[st.homeStyle] ?? 1.0;
  const baseCost = Math.round(st.sqft * CUSTOM_HOME_BASE * avg * sm * lm);
  const featureCost = st.homeFeatures.reduce((sum, f) => sum + (HOME_FEATURE_COST[f] ?? 0), 0);
  const total = baseCost + featureCost;
  const breakdown = [{ name: "Shell & Structure", value: Math.round(baseCost * 0.35) }, { name: "MEP Systems", value: Math.round(baseCost * 0.25) }, { name: "Interior Finishes", value: Math.round(baseCost * 0.30) }, { name: "Site & Foundation", value: Math.round(baseCost * 0.10) }];
  if (featureCost > 0) breakdown.push({ name: "Features & Upgrades", value: featureCost });
  return { total, perUnit: Math.round(total / st.sqft), unitLabel: "/ SF",
    breakdown, locationName: getLocationName(st.zipCode), tierName: tier?.name ?? "Standard", locationMultiplier: lm, projectLabel: "Signature Custom Design" };
}

function calcNewBuild(st: FormState): EstimateResult {
  const tier = getZipTier(st.zipCode); const lm = tier?.multiplier ?? 1.0;
  const avg = (EXTERIOR_MULT[st.exteriorQuality] + INTERIOR_MULT[st.interiorFinish]) / 2;
  const sm = st.stories === 1 ? 1.0 : st.stories === 2 ? 1.08 : 1.15;
  const gc = st.garageSpaces * 18000;
  const bc = Math.round(st.sqft * NEW_BUILD_BASE * avg * lm * sm);
  const total = bc + gc;
  return { total, perUnit: Math.round(total / st.sqft), unitLabel: "/ SF",
    breakdown: [{ name: "Foundation & Frame", value: Math.round(bc * 0.32) }, { name: "MEP Systems", value: Math.round(bc * 0.22) }, { name: "Interior Finishes", value: Math.round(bc * 0.28) }, { name: "Site Work", value: Math.round(bc * 0.12) }, ...(gc > 0 ? [{ name: "Garage", value: gc }] : []), { name: "Permits & Fees", value: Math.round(bc * 0.06) }],
    locationName: getLocationName(st.zipCode), tierName: tier?.name ?? "Standard", locationMultiplier: lm, projectLabel: "New Build" };
}

function calcRenovation(st: FormState): EstimateResult {
  const tier = getZipTier(st.zipCode); const lm = tier?.multiplier ?? 1.0;
  const cm = CONDITION_MULT[st.renoCondition] ?? 1.0; const fm = FINISH_MULT[st.renoFinish] ?? 1.0;
  const scope = st.renoScope;
  const base = (scope === "kitchen" || scope === "bathroom") ? (RENO_BASE[scope] ?? 30000) * fm * cm : st.renoArea * (RENO_BASE[scope] ?? 160) * fm * cm;
  const featureCost = st.renoFeatures.reduce((sum, f) => sum + (RENO_FEATURE_COST[f] ?? 0), 0);
  const total = Math.round(base * lm) + featureCost; const isPerSF = scope !== "kitchen" && scope !== "bathroom";
  const breakdown = [{ name: "Demolition", value: Math.round((total - featureCost) * 0.15) }, { name: "Structural", value: Math.round((total - featureCost) * 0.25) }, { name: "Finishes", value: Math.round((total - featureCost) * 0.40) }, { name: "Permits & Misc", value: Math.round((total - featureCost) * 0.20) }];
  if (featureCost > 0) breakdown.push({ name: "Upgrades", value: featureCost });
  return { total, perUnit: isPerSF ? Math.round(total / st.renoArea) : total, unitLabel: isPerSF ? "/ SF" : "flat",
    breakdown, locationName: getLocationName(st.zipCode), tierName: tier?.name ?? "Standard", locationMultiplier: lm, projectLabel: "Renovation" };
}

function calcConsulting(st: FormState): EstimateResult {
  const range = CONSULT_BASE[st.consultType] ?? { low: 3000, high: 10000 };
  const mid = (range.low + range.high) / 2;
  const cm = COMPLEXITY_MULT[st.consultComplexity] ?? 1.0;
  const tm = TIMELINE_MULT[st.consultTimeline] ?? 1.0;
  const pm = PROP_TYPE_MULT[st.consultPropertyType] ?? 1.0;
  const vm = PROJ_VALUE_MULT[st.consultProjectValue] ?? 1.0;
  const tk = getZipTierKey(st.zipCode);
  const lm = tk ? (CONSULT_LOC_MULT[tk] ?? 1.0) : 1.0;
  const tier = getZipTier(st.zipCode);
  const total = Math.round(mid * cm * tm * pm * vm * lm);
  return { total, perUnit: total, unitLabel: "flat fee",
    breakdown: [{ name: "Assessment", value: Math.round(total * 0.35) }, { name: "Analysis", value: Math.round(total * 0.30) }, { name: "Deliverables", value: Math.round(total * 0.25) }, { name: "Consultation", value: Math.round(total * 0.10) }],
    locationName: getLocationName(st.zipCode), tierName: tier?.name ?? "Standard", locationMultiplier: lm, projectLabel: "Consulting & Engineering" };
}

function calcCommercial(st: FormState): EstimateResult {
  const tier = getZipTier(st.zipCode); const lm = tier?.multiplier ?? 1.0;
  const base = COMMERCIAL_BASE[st.commercialType] ?? 230;
  const fm = COMMERCIAL_FINISH_MULT[st.commercialFinish] ?? 1.0;
  const total = Math.round(st.sqft * base * fm * lm);
  const labels: Record<string, string> = { office: "Office Build-Out", retail: "Retail Space", warehouse: "Warehouse / Industrial", restaurant: "Restaurant Build" };
  return { total, perUnit: Math.round(total / st.sqft), unitLabel: "/ SF",
    breakdown: [{ name: "Shell & Structure", value: Math.round(total * 0.30) }, { name: "MEP Systems", value: Math.round(total * 0.25) }, { name: "Interior Build-Out", value: Math.round(total * 0.28) }, { name: "Site & Permits", value: Math.round(total * 0.10) }, { name: "Code Compliance", value: Math.round(total * 0.07) }],
    locationName: getLocationName(st.zipCode), tierName: tier?.name ?? "Standard", locationMultiplier: lm, projectLabel: labels[st.commercialType] ?? "Commercial Project" };
}

function calcRemote(st: FormState): EstimateResult {
  const tier = getZipTier(st.zipCode); const lm = tier?.multiplier ?? 1.0;
  const base = REMOTE_BASE[st.remoteType] ?? 210;
  const am = REMOTE_ACCESS_MULT[st.remoteAccess] ?? 1.0;
  const baseCost = Math.round(st.sqft * base * am * lm);
  const featureCost = st.remoteFeatures.reduce((sum, f) => sum + (REMOTE_FEATURE_COST[f] ?? 0), 0);
  const total = baseCost + featureCost;
  const labels: Record<string, string> = { cabin: "Remote Cabin", adu: "ADU / Guest House", workshop: "Workshop / Outbuilding", "off-grid-home": "Off-Grid Home" };
  const breakdown = [{ name: "Structure & Shell", value: Math.round(baseCost * 0.35) }, { name: "Access & Site Work", value: Math.round(baseCost * 0.20) }, { name: "Interior Systems", value: Math.round(baseCost * 0.25) }, { name: "Foundation", value: Math.round(baseCost * 0.12) }, { name: "Permits & Transport", value: Math.round(baseCost * 0.08) }];
  if (featureCost > 0) breakdown.push({ name: "Off-Grid Systems", value: featureCost });
  return { total, perUnit: Math.round(total / st.sqft), unitLabel: "/ SF",
    breakdown, locationName: getLocationName(st.zipCode), tierName: tier?.name ?? "Standard", locationMultiplier: lm, projectLabel: labels[st.remoteType] ?? "Remote Build" };
}

function calcEstimate(st: FormState): EstimateResult | null {
  switch (st.projectType) { case "custom-home": return calcCustomHome(st); case "new-build": return calcNewBuild(st); case "renovation": return calcRenovation(st); case "consulting": return calcConsulting(st); case "commercial": return calcCommercial(st); case "remote": return calcRemote(st); default: return null; }
}

/* ─── Shared Styles ────────────────────────────────────────────── */

const gold = "#c6912c"; const goldHover = "#d4a03a"; const dark = "#0a0a0a";

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');
  @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes progressGlow { 0%, 100% { box-shadow: 0 0 8px rgba(198,145,44,0.3); } 50% { box-shadow: 0 0 16px rgba(198,145,44,0.6); } }
  @keyframes subtlePing { 0% { transform: scale(1); opacity: 0.8; } 100% { transform: scale(2.5); opacity: 0; } }
  .fade-up { animation: fadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
  .fade-up-d1 { animation: fadeUp 0.6s 0.1s cubic-bezier(0.22, 1, 0.36, 1) both; }
  .fade-up-d2 { animation: fadeUp 0.6s 0.2s cubic-bezier(0.22, 1, 0.36, 1) both; }
  .fade-up-d3 { animation: fadeUp 0.6s 0.3s cubic-bezier(0.22, 1, 0.36, 1) both; }
  .fade-up-d4 { animation: fadeUp 0.6s 0.4s cubic-bezier(0.22, 1, 0.36, 1) both; }
  .fade-up-d5 { animation: fadeUp 0.6s 0.5s cubic-bezier(0.22, 1, 0.36, 1) both; }
  .fade-in { animation: fadeIn 0.5s ease both; }
  input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; width: 28px; height: 28px; border-radius: 50%; background: ${dark}; border: 3px solid ${gold}; cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.2); transition: all 0.2s; }
  input[type="range"]::-webkit-slider-thumb:hover { background: ${gold}; transform: scale(1.15); }
  input[type="range"]::-moz-range-thumb { width: 28px; height: 28px; border-radius: 50%; background: ${dark}; border: 3px solid ${gold}; cursor: pointer; }
`;

/* ─── Reusable Components ──────────────────────────────────────── */

function GoldButton({ children, onClick, disabled, className = "" }: { children: React.ReactNode; onClick: () => void; disabled?: boolean; className?: string }) {
  return (<button onClick={onClick} disabled={disabled} className={className} style={{ background: disabled ? "#555" : gold, color: "#fff", border: "none", padding: "16px 40px", fontSize: "16px", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, letterSpacing: "0.03em", cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.4 : 1, transition: "all 0.3s", boxShadow: disabled ? "none" : `0 4px 20px ${gold}44`, display: "inline-flex", alignItems: "center", gap: "8px" }}
    onMouseEnter={(e) => { if (!disabled) { e.currentTarget.style.background = goldHover; e.currentTarget.style.boxShadow = `0 6px 28px ${gold}66`; e.currentTarget.style.transform = "translateY(-1px)"; } }}
    onMouseLeave={(e) => { if (!disabled) { e.currentTarget.style.background = gold; e.currentTarget.style.boxShadow = `0 4px 20px ${gold}44`; e.currentTarget.style.transform = "translateY(0)"; } }}>{children}</button>);
}

function OutlineButton({ children, onClick, className = "" }: { children: React.ReactNode; onClick: () => void; className?: string }) {
  return (<button onClick={onClick} className={className} style={{ background: "transparent", color: dark, border: `2px solid ${dark}`, padding: "14px 36px", fontSize: "16px", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, cursor: "pointer", transition: "all 0.3s" }}
    onMouseEnter={(e) => { e.currentTarget.style.background = "#f5f5f5"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>{children}</button>);
}

function DarkButton({ children, onClick, disabled, className = "" }: { children: React.ReactNode; onClick: () => void; disabled?: boolean; className?: string }) {
  return (<button onClick={onClick} disabled={disabled} className={className} style={{ background: disabled ? "#ccc" : dark, color: "#fff", border: "none", padding: "16px 40px", fontSize: "16px", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.4 : 1, transition: "all 0.3s", boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }}
    onMouseEnter={(e) => { if (!disabled) { e.currentTarget.style.background = gold; e.currentTarget.style.boxShadow = `0 6px 24px ${gold}55`; } }}
    onMouseLeave={(e) => { if (!disabled) { e.currentTarget.style.background = dark; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.15)"; } }}>{children}</button>);
}

function NavButtons({ onBack, onNext, nextDisabled, nextLabel = "Continue" }: { onBack: () => void; onNext: () => void; nextDisabled?: boolean; nextLabel?: string }) {
  return (<div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 32 }}>
    <OutlineButton onClick={onBack}>Back</OutlineButton>
    <DarkButton onClick={onNext} disabled={nextDisabled}>{nextLabel}</DarkButton>
  </div>);
}

function StepHeadline({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) {
  return (<div style={{ marginBottom: 32 }}><h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(24px, 4vw, 44px)", color: dark, lineHeight: 1.1, margin: 0, letterSpacing: "-0.02em" }}>{children}</h1>
    {subtitle && <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#999", marginTop: 10, fontWeight: 400 }}>{subtitle}</p>}</div>);
}

function TypeBadge({ projectType }: { projectType: string }) {
  const labels: Record<string, string> = { "custom-home": "Signature Custom Design Estimate", "new-build": "New Build Estimate", "renovation": "Renovation Estimate", "consulting": "Consulting & Engineering Estimate" };
  const icons: Record<string, string> = { "custom-home": "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", "new-build": "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4", "renovation": "M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1 2 2 0 110-4 1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z", "consulting": "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" };
  if (!labels[projectType]) return null;
  return (<div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}><div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${gold}0a`, border: `1px solid ${gold}25`, padding: "8px 18px", borderRadius: 40 }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={icons[projectType] ?? ""} /></svg><span style={{ fontSize: 13, fontWeight: 600, color: gold, letterSpacing: "0.06em", fontFamily: "'DM Sans', sans-serif" }}>{labels[projectType]}</span></div></div>);
}

function SelectCard({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (<button onClick={onClick} style={{ padding: "24px 16px", border: active ? `2px solid ${gold}` : "2px solid #e5e5e5", background: active ? `${gold}0a` : "#fff", color: active ? dark : dark, cursor: "pointer", transition: "all 0.25s", textAlign: "center", position: "relative", boxShadow: active ? `0 0 0 3px ${gold}15` : "none" }}
    onMouseEnter={(e) => { if (!active) { e.currentTarget.style.borderColor = gold; e.currentTarget.style.background = `${gold}06`; } }}
    onMouseLeave={(e) => { if (!active) { e.currentTarget.style.borderColor = "#e5e5e5"; e.currentTarget.style.background = "#fff"; } }}>
    {active && <div style={{ position: "absolute", top: 8, right: 8, width: 20, height: 20, borderRadius: "50%", background: gold, display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg></div>}
    {children}
  </button>);
}

/* ─── Type Select ──────────────────────────────────────────────── */

const PROJECT_TYPES: { id: ProjectType; label: string; desc: string; icon: string }[] = [
  { id: "custom-home", label: "Signature Custom Design", desc: "Design and build your dream home from scratch", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { id: "new-build", label: "New Build", desc: "New construction on your lot or ours", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
  { id: "renovation", label: "Renovation", desc: "Transform your existing space", icon: "M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1 2 2 0 110-4 1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" },
  { id: "commercial", label: "Commercial", desc: "Office, retail, warehouse, or restaurant", icon: "M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" },
  { id: "remote", label: "Remote & Off-Grid", desc: "Cabins, ADUs, and off-grid structures", icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" },
  { id: "consulting", label: "Consulting & Engineering", desc: "Expert analysis and project guidance", icon: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" },
];

function TypeSelectStep({ onSelect }: { onSelect: (type: ProjectType) => void }) {
  return (
    <div style={{ textAlign: "center", position: "relative" }}>
      <div className="fade-up" style={{ marginBottom: 32, display: "flex", justifyContent: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.06)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.12)", padding: "8px 20px", borderRadius: 40 }}>
          <span style={{ position: "relative", width: 8, height: 8, display: "inline-block" }}><span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: gold, animation: "subtlePing 2s infinite" }} /><span style={{ position: "relative", display: "block", width: 8, height: 8, borderRadius: "50%", background: gold }} /></span>
          <span style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.75)", letterSpacing: "0.12em", fontFamily: "'DM Sans', sans-serif" }}>AI-POWERED ESTIMATOR</span>
        </div>
      </div>
      <div className="fade-up-d1">
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(36px, 7vw, 80px)", lineHeight: 1.05, color: "#fff", margin: 0, letterSpacing: "-0.02em" }}>What are you</h1>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(36px, 7vw, 80px)", lineHeight: 1.05, color: gold, margin: "4px 0 0", letterSpacing: "-0.02em" }}>building?</h1>
      </div>
      <p className="fade-up-d2" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(16px, 2.5vw, 20px)", color: "rgba(255,255,255,0.5)", fontWeight: 300, maxWidth: 480, margin: "24px auto 0", lineHeight: 1.6 }}>Select your project type for a tailored AI estimate.</p>
      <div className="fade-up-d3" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, maxWidth: 860, margin: "40px auto 0" }}>
        {PROJECT_TYPES.map((pt) => (
          <button key={pt.id} onClick={() => onSelect(pt.id)} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", padding: "32px 24px", cursor: "pointer", textAlign: "center", transition: "all 0.3s", borderRadius: 4 }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.borderColor = gold; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 8px 32px ${gold}22`; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 16 }}><path d={pt.icon} /></svg>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 18, color: "#fff", marginBottom: 8 }}>{pt.label}</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.4)", lineHeight: 1.5 }}>{pt.desc}</div>
          </button>
        ))}
      </div>
      <div className="fade-up-d4" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10, marginTop: 32 }}>
        {["Instant Results", "No Signup Required", "150+ Builds"].map((t) => (<span key={t} style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans', sans-serif", border: "1px solid rgba(255,255,255,0.1)", padding: "7px 16px", borderRadius: 40, fontWeight: 500 }}>{t}</span>))}
      </div>
      <p className="fade-up-d5" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.8)", marginTop: 20, fontWeight: 500 }}>No email required • Under 60 seconds • Based on 50,000+ data points</p>
    </div>
  );
}

/* ─── Shared Steps ─────────────────────────────────────────────── */

function ZipCodeStep({ zipCode, onZipChange, onBack, onSubmit, projectType }: { zipCode: string; onZipChange: (z: string) => void; onBack: () => void; onSubmit: () => void; projectType: string }) {
  const headlines: Record<string, string> = { "custom-home": "Where will we build your custom home?", "new-build": "Where is your new build site?", "renovation": "Where is the property you're renovating?", "consulting": "Where is your project located?", "commercial": "Where is the commercial property?", "remote": "Where is the build site?" };
  const subtitles: Record<string, string> = { "custom-home": "Last step — your location determines final pricing for your custom home.", "new-build": "Last step — your build location determines the final pricing tier.", "renovation": "Last step — we'll tailor renovation costs to your local market.", "consulting": "Last step — location affects site visit and travel costs for your engagement.", "commercial": "Last step — local labor and material costs vary by market.", "remote": "Last step — remoteness and local conditions affect final pricing." };
  return (
    <div className="fade-up" style={{ textAlign: "center" }}>
      <StepHeadline subtitle={subtitles[projectType]}>{headlines[projectType] ?? "Where is your project?"}</StepHeadline>
      <input type="text" value={zipCode} onChange={(e) => onZipChange(e.target.value.replace(/\D/g, "").slice(0, 5))} placeholder="Enter ZIP code" autoFocus
        onKeyDown={(e) => { if (e.key === "Enter" && zipCode.length === 5) onSubmit(); }}
        style={{ width: "100%", maxWidth: 420, display: "block", margin: "0 auto", border: "2px solid #e0e0e0", padding: "20px 28px", fontSize: "clamp(24px, 4vw, 40px)", textAlign: "center", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, color: dark, outline: "none", background: "#fff", transition: "border-color 0.3s, box-shadow 0.3s", letterSpacing: "0.08em" }}
        onFocus={(e) => { e.target.style.borderColor = gold; e.target.style.boxShadow = `0 0 0 4px ${gold}18`; }}
        onBlur={(e) => { e.target.style.borderColor = "#e0e0e0"; e.target.style.boxShadow = "none"; }} />
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#999", marginTop: 16 }}>Serving the Inland Northwest — Idaho, Eastern Washington & beyond</p>
      <NavButtons onBack={onBack} onNext={onSubmit} nextDisabled={zipCode.length !== 5} nextLabel="See My Estimate" />
    </div>
  );
}

function OutsideAreaStep({ zipCode, onRetry, onReset }: { zipCode: string; onRetry: () => void; onReset: () => void }) {
  return (
    <div className="fade-up" style={{ textAlign: "center" }}>
      <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
      </div>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(28px, 5vw, 48px)", color: dark, margin: "0 0 16px" }}>Outside Our Service Area</h1>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: "#666", maxWidth: 480, margin: "0 auto 32px", lineHeight: 1.6 }}>We don&apos;t have data for <strong>{zipCode}</strong> yet, but we serve projects throughout the region.</p>
      <div style={{ background: "#fafafa", border: "1px solid #eee", borderRadius: 12, padding: 32, maxWidth: 400, margin: "0 auto 32px" }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, color: dark, marginBottom: 16 }}>Want a custom quote?</p>
        <GoldButton onClick={() => window.location.href = "/contact"}>Contact Us <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg></GoldButton>
      </div>
      <div style={{ display: "flex", gap: 16, justifyContent: "center" }}><OutlineButton onClick={onRetry}>Try Different ZIP</OutlineButton><OutlineButton onClick={onReset}>Start Over</OutlineButton></div>
    </div>
  );
}

function SqftStep({ sqft, onSqftChange, onBack, onNext, projectType }: { sqft: number; onSqftChange: (s: number) => void; onBack: () => void; onNext: () => void; projectType: string }) {
  const headlines: Record<string, string> = { "custom-home": "How large is your dream home?", "new-build": "What size new build are you planning?", "commercial": "How large is the commercial space?", "remote": "How large is the structure?" };
  const subtitles: Record<string, string> = { "custom-home": "Total living area for your custom home — we'll refine finishes next.", "new-build": "Total square footage including all floors.", "commercial": "Total leasable or usable square footage.", "remote": "Total square footage including all living and utility areas." };
  const { minSqft: min, maxSqft: max, sqftStep: step } = CONSTRAINTS;
  const pct = ((sqft - min) / (max - min)) * 100;
  return (
    <div className="fade-up" style={{ textAlign: "center" }}>
      <StepHeadline subtitle={subtitles[projectType]}>{headlines[projectType] ?? "Total square footage?"}</StepHeadline>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "clamp(16px, 4vw, 40px)" }}>
        <button onClick={() => onSqftChange(Math.max(min, sqft - step))} style={{ width: 64, height: 64, background: dark, color: "#fff", border: "none", fontSize: 28, fontWeight: 700, cursor: "pointer", transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center" }} onMouseEnter={(e) => { e.currentTarget.style.background = gold; }} onMouseLeave={(e) => { e.currentTarget.style.background = dark; }}>−</button>
        <div style={{ minWidth: "clamp(140px, 30vw, 300px)", textAlign: "center" }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(48px, 9vw, 96px)", color: dark, letterSpacing: "-0.02em", lineHeight: 1 }}>{sqft.toLocaleString()}</div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: "#999", marginTop: 8, letterSpacing: "0.05em" }}>square feet</div>
        </div>
        <button onClick={() => onSqftChange(Math.min(max, sqft + step))} style={{ width: 64, height: 64, background: dark, color: "#fff", border: "none", fontSize: 28, fontWeight: 700, cursor: "pointer", transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center" }} onMouseEnter={(e) => { e.currentTarget.style.background = gold; }} onMouseLeave={(e) => { e.currentTarget.style.background = dark; }}>+</button>
      </div>
      <div style={{ maxWidth: 560, margin: "40px auto 0", padding: "0 8px" }}>
        <input type="range" min={min} max={max} step={step} value={sqft} onChange={(e) => onSqftChange(+e.target.value)} style={{ width: "100%", height: 6, appearance: "none", borderRadius: 3, background: `linear-gradient(to right, ${dark} 0%, ${dark} ${pct}%, #e5e7eb ${pct}%, #e5e7eb 100%)`, cursor: "pointer", outline: "none" }} />
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#bbb", marginTop: 8 }}><span>{min} SF</span><span>{max.toLocaleString()} SF</span></div>
      </div>
      <NavButtons onBack={onBack} onNext={onNext} />
    </div>
  );
}

function ExteriorStep({ exteriorQuality, onQualityChange, onBack, onNext, projectType }: { exteriorQuality: string; onQualityChange: (q: string) => void; onBack: () => void; onNext: () => void; projectType: string }) {
  const headlines: Record<string, string> = { "custom-home": "Choose your exterior finish", "new-build": "Exterior finish for your new build" };
  const isCustom = projectType === "custom-home";
  const opts = [
    { id: "basic", label: "Essential", desc: isCustom ? "Vinyl siding, asphalt roof, standard windows" : "Standard materials", mult: "1.0×", accent: "#94a3b8" },
    { id: "standard", label: "Classic", desc: isCustom ? "Fiber cement, architectural shingles, upgraded trim" : "Quality finishes", mult: "1.2×", accent: "#a8956e" },
    { id: "premium", label: "Signature", desc: isCustom ? "Natural stone, standing seam metal, custom millwork" : "Luxury materials", mult: "1.45×", accent: gold },
  ];
  return (
    <div className="fade-up" style={{ textAlign: "center" }}>
      <StepHeadline subtitle={isCustom ? "Exterior materials define your home's character and curb appeal." : undefined}>{headlines[projectType] ?? "Exterior finish quality"}</StepHeadline>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "clamp(8px, 2vw, 20px)" }}>
        {opts.map((o) => { const a = exteriorQuality === o.id; return (
          <button key={o.id} onClick={() => onQualityChange(o.id)} style={{ padding: "32px 20px", border: a ? `2px solid ${gold}` : "2px solid #e5e5e5", background: a ? `${gold}0a` : "#fff", color: dark, cursor: "pointer", transition: "all 0.25s", textAlign: "center", position: "relative", overflow: "hidden", boxShadow: a ? `0 0 0 3px ${gold}15` : "none" }}
            onMouseEnter={(e) => { if (!a) { e.currentTarget.style.borderColor = gold; e.currentTarget.style.background = `${gold}06`; } }} onMouseLeave={(e) => { if (!a) { e.currentTarget.style.borderColor = "#e5e5e5"; e.currentTarget.style.background = "#fff"; } }}>
            {isCustom && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: a ? gold : o.accent, transition: "background 0.25s" }} />}
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "clamp(16px, 2.5vw, 24px)", marginBottom: 8 }}>{o.label}</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(12px, 1.3vw, 14px)", color: a ? gold : "#999", marginBottom: 12, lineHeight: 1.5 }}>{o.desc}</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "clamp(14px, 2vw, 20px)", color: a ? gold : "#bbb" }}>{o.mult}</div>
          </button>); })}
      </div>
      <NavButtons onBack={onBack} onNext={onNext} />
    </div>
  );
}

function InteriorFinishStep({ interiorFinish, onFinishChange, onBack, onNext, projectType }: { interiorFinish: string; onFinishChange: (f: string) => void; onBack: () => void; onNext: () => void; projectType: string }) {
  const isCustom = projectType === "custom-home";
  const finishOpts = [
    { id: "basic", label: "Essential", desc: isCustom ? "Builder-grade" : "Standard", mult: "1.0×" },
    { id: "standard", label: "Classic", desc: isCustom ? "Upgraded fixtures" : "Quality", mult: "1.15×" },
    { id: "premium", label: "Premium", desc: isCustom ? "Designer selections" : "High-end", mult: "1.35×" },
    { id: "luxury", label: "Luxury", desc: isCustom ? "Bespoke finishes" : "Top tier", mult: "1.65×" },
  ];
  return (
    <div className="fade-up" style={{ textAlign: "center", maxWidth: 560, margin: "0 auto" }}>
      <StepHeadline subtitle="Material quality and fixture grade that define the feel of every room.">Choose your finish level</StepHeadline>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
        {finishOpts.map((o) => { const a = interiorFinish === o.id; return (
          <SelectCard key={o.id} active={a} onClick={() => onFinishChange(o.id)}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 16 }}>{o.label}</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: a ? gold : "#999", marginTop: 4 }}>{o.desc}</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, color: a ? gold : "#bbb", marginTop: 8 }}>{o.mult}</div>
          </SelectCard>); })}
      </div>
      <NavButtons onBack={onBack} onNext={onNext} />
    </div>
  );
}

function InteriorRoomsStep({ bedrooms, bathrooms, onBedroomsChange, onBathroomsChange, onBack, onNext, projectType }: { bedrooms: number; bathrooms: number; onBedroomsChange: (b: number) => void; onBathroomsChange: (b: number) => void; onBack: () => void; onNext: () => void; projectType: string }) {
  const counterStyle: React.CSSProperties = { width: 44, height: 44, background: "#fff", border: "2px solid #e5e5e5", color: dark, fontSize: 22, fontWeight: 700, cursor: "pointer", transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center" };
  return (
    <div className="fade-up" style={{ textAlign: "center", maxWidth: 560, margin: "0 auto" }}>
      <StepHeadline subtitle="Room count affects plumbing, electrical, and overall square footage allocation.">How many rooms?</StepHeadline>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {[{ label: "Bedrooms", value: bedrooms, onChange: onBedroomsChange, min: 1, max: 8 }, { label: "Bathrooms", value: bathrooms, onChange: onBathroomsChange, min: 1, max: 8 }].map((c) => (
          <div key={c.label} style={{ textAlign: "left" }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 600, color: dark, marginBottom: 12 }}>{c.label}</p>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <button onClick={() => c.onChange(Math.max(c.min, c.value - 1))} style={counterStyle}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = gold; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e5e5e5"; }}>−</button>
              <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 36, color: dark, minWidth: 40, textAlign: "center" }}>{c.value}</span>
              <button onClick={() => c.onChange(Math.min(c.max, c.value + 1))} style={counterStyle}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = gold; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e5e5e5"; }}>+</button>
            </div>
          </div>))}
      </div>
      <NavButtons onBack={onBack} onNext={onNext} />
    </div>
  );
}

function BuildDetailsStep({ stories, garageSpaces, onStoriesChange, onGarageChange, onBack, onNext }: { stories: number; garageSpaces: number; onStoriesChange: (s: number) => void; onGarageChange: (g: number) => void; onBack: () => void; onNext: () => void }) {
  const storyOpts = [{ id: 1, label: "Single Story", desc: "Ranch style" }, { id: 2, label: "Two Story", desc: "Most common" }, { id: 3, label: "Three Story", desc: "Maximum space" }];
  return (
    <div className="fade-up" style={{ textAlign: "center", maxWidth: 560, margin: "0 auto" }}>
      <StepHeadline subtitle="These options affect structural costs and overall footprint.">Configure your new build</StepHeadline>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 600, color: dark, marginBottom: 16, textAlign: "left" }}>Number of stories</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 36 }}>{storyOpts.map((o) => { const a = stories === o.id; return (<SelectCard key={o.id} active={a} onClick={() => onStoriesChange(o.id)}><div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 20 }}>{o.label}</div><div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: a ? gold : "#999", marginTop: 4 }}>{o.desc}</div></SelectCard>); })}</div>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 600, color: dark, marginBottom: 16, textAlign: "left" }}>Garage spaces</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>{[0, 1, 2, 3].map((g) => { const a = garageSpaces === g; return (<SelectCard key={g} active={a} onClick={() => onGarageChange(g)}><span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 20 }}>{g === 0 ? "None" : g}</span></SelectCard>); })}</div>
      <NavButtons onBack={onBack} onNext={onNext} />
    </div>
  );
}

/* ─── Renovation Steps ─────────────────────────────────────────── */

function RenoScopeStep({ renoScope, onScopeChange, onBack, onNext }: { renoScope: string; onScopeChange: (s: string) => void; onBack: () => void; onNext: () => void }) {
  const scopes = [{ id: "kitchen", label: "Kitchen", desc: "Full kitchen remodel" }, { id: "bathroom", label: "Bathroom", desc: "Complete bath renovation" }, { id: "addition", label: "Addition", desc: "Expand your home" }, { id: "full-gut", label: "Full Gut Reno", desc: "Strip to studs and rebuild" }, { id: "whole-house", label: "Whole House", desc: "Comprehensive renovation" }];
  return (
    <div className="fade-up" style={{ textAlign: "center" }}>
      <StepHeadline subtitle="Different renovation types have different cost structures.">What are you renovating?</StepHeadline>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, maxWidth: 640, margin: "0 auto" }}>
        {scopes.map((s) => { const a = renoScope === s.id; return (<SelectCard key={s.id} active={a} onClick={() => onScopeChange(s.id)}><div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 18 }}>{s.label}</div><div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: a ? gold : "#999", marginTop: 6 }}>{s.desc}</div></SelectCard>); })}
      </div>
      <NavButtons onBack={onBack} onNext={onNext} nextDisabled={!renoScope} />
    </div>
  );
}

function RenoAreaStep({ renoArea, onAreaChange, onBack, onNext, renoScope }: { renoArea: number; onAreaChange: (a: number) => void; onBack: () => void; onNext: () => void; renoScope: string }) {
  const is: React.CSSProperties = { width: "100%", maxWidth: 420, display: "block", margin: "0 auto", border: "2px solid #e0e0e0", padding: "20px 28px", fontSize: "clamp(24px, 4vw, 40px)", textAlign: "center", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, color: dark, outline: "none", background: "#fff", transition: "border-color 0.3s, box-shadow 0.3s", letterSpacing: "0.04em" };
  const scopeLabels: Record<string, string> = { addition: "addition", "full-gut": "gut renovation", "whole-house": "whole-house renovation" };
  return (
    <div className="fade-up" style={{ textAlign: "center" }}>
      <StepHeadline subtitle={`Enter the total square footage for your ${scopeLabels[renoScope] ?? "renovation"}.`}>How large is the area?</StepHeadline>
      <input type="number" value={renoArea} onChange={(e) => onAreaChange(Math.max(50, Math.min(5000, +e.target.value || 50)))} autoFocus style={is}
        onFocus={(e) => { e.target.style.borderColor = gold; e.target.style.boxShadow = `0 0 0 4px ${gold}18`; }}
        onBlur={(e) => { e.target.style.borderColor = "#e0e0e0"; e.target.style.boxShadow = "none"; }} />
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#999", marginTop: 16 }}>Square feet of renovation area</p>
      <NavButtons onBack={onBack} onNext={onNext} />
    </div>
  );
}

function RenoConditionStep({ renoCondition, onConditionChange, onBack, onNext, renoScope }: { renoCondition: string; onConditionChange: (c: string) => void; onBack: () => void; onNext: () => void; renoScope: string }) {
  const condOpts = [{ id: "good", label: "Good", desc: "Mostly cosmetic" }, { id: "fair", label: "Fair", desc: "Some structural" }, { id: "poor", label: "Poor", desc: "Significant work" }, { id: "gutted", label: "Gutted", desc: "Down to studs" }];
  const scopeLabels: Record<string, string> = { kitchen: "kitchen", bathroom: "bathroom", addition: "addition area", "full-gut": "space", "whole-house": "home" };
  return (
    <div className="fade-up" style={{ textAlign: "center", maxWidth: 520, margin: "0 auto" }}>
      <StepHeadline subtitle="This affects the scope of demolition and structural work needed.">What condition is your {scopeLabels[renoScope] ?? "space"} in?</StepHeadline>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
        {condOpts.map((c) => { const a = renoCondition === c.id; return (<SelectCard key={c.id} active={a} onClick={() => onConditionChange(c.id)}><div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 16 }}>{c.label}</div><div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: a ? gold : "#999", marginTop: 4 }}>{c.desc}</div></SelectCard>); })}
      </div>
      <NavButtons onBack={onBack} onNext={onNext} nextDisabled={!renoCondition} />
    </div>
  );
}

function RenoFinishStep({ renoFinish, onFinishChange, onBack, onNext }: { renoFinish: string; onFinishChange: (f: string) => void; onBack: () => void; onNext: () => void }) {
  const finishOpts = [{ id: "basic", label: "Basic", desc: "Builder-grade materials" }, { id: "standard", label: "Standard", desc: "Quality mid-range" }, { id: "premium", label: "Premium", desc: "High-end finishes" }, { id: "luxury", label: "Luxury", desc: "Designer-grade" }];
  return (
    <div className="fade-up" style={{ textAlign: "center", maxWidth: 520, margin: "0 auto" }}>
      <StepHeadline subtitle="Finish level determines material quality, fixtures, and final look.">What finish level do you want?</StepHeadline>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
        {finishOpts.map((f) => { const a = renoFinish === f.id; return (<SelectCard key={f.id} active={a} onClick={() => onFinishChange(f.id)}><div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 16 }}>{f.label}</div><div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: a ? gold : "#999", marginTop: 4 }}>{f.desc}</div></SelectCard>); })}
      </div>
      <NavButtons onBack={onBack} onNext={onNext} />
    </div>
  );
}

function RenoFeaturesStep({ features, renoScope, onToggle, onBack, onNext }: { features: string[]; renoScope: string; onToggle: (f: string) => void; onBack: () => void; onNext: () => void }) {
  const allOpts = [
    { id: "open-concept", label: "Open Concept", desc: "Remove walls, add support beams", cost: "$12K", icon: "M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4", scopes: ["kitchen", "full-gut", "whole-house"] },
    { id: "new-windows", label: "New Windows", desc: "Energy-efficient, larger openings", cost: "$8.5K", icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", scopes: ["kitchen", "bathroom", "addition", "full-gut", "whole-house"] },
    { id: "hardwood", label: "Hardwood Floors", desc: "Solid hardwood throughout reno area", cost: "$7K", icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2zM4 21a1 1 0 011-1h14a1 1 0 011 1v0a1 1 0 01-1 1H5a1 1 0 01-1-1v0z", scopes: ["kitchen", "addition", "full-gut", "whole-house"] },
    { id: "custom-cabinets", label: "Custom Cabinetry", desc: "Built-to-order, soft-close, custom finish", cost: "$15K", icon: "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4", scopes: ["kitchen", "bathroom", "full-gut", "whole-house"] },
    { id: "electrical", label: "Electrical Upgrade", desc: "New panel, circuits, code compliance", cost: "$6.5K", icon: "M13 10V3L4 14h7v7l9-11h-7z", scopes: ["kitchen", "bathroom", "addition", "full-gut", "whole-house"] },
    { id: "plumbing", label: "Plumbing Overhaul", desc: "New pipes, tankless water heater", cost: "$9K", icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z", scopes: ["kitchen", "bathroom", "full-gut", "whole-house"] },
    { id: "insulation", label: "Insulation & Envelope", desc: "Spray foam, vapor barrier, energy seal", cost: "$5.5K", icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z", scopes: ["addition", "full-gut", "whole-house"] },
    { id: "smart-lighting", label: "Smart Lighting", desc: "Recessed, dimmers, app-controlled zones", cost: "$4.5K", icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z", scopes: ["kitchen", "bathroom", "addition", "full-gut", "whole-house"] },
  ];
  const opts = allOpts.filter((o) => o.scopes.includes(renoScope));
  const scopeLabel: Record<string, string> = { kitchen: "kitchen reno", bathroom: "bath remodel", addition: "addition", "full-gut": "gut renovation", "whole-house": "whole-house reno" };
  return (
    <div className="fade-up" style={{ textAlign: "center" }}>
      <StepHeadline subtitle={`Common upgrades to consider while walls are open for your ${scopeLabel[renoScope] ?? "renovation"}.`}>While we&apos;re at it&hellip;</StepHeadline>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12, maxWidth: 760, margin: "0 auto" }}>
        {opts.map((o) => { const a = features.includes(o.id); return (
          <button key={o.id} onClick={() => onToggle(o.id)} style={{ padding: "20px 16px", border: a ? `2px solid ${gold}` : "2px solid #e5e5e5", background: a ? `${gold}0a` : "#fff", color: dark, cursor: "pointer", transition: "all 0.25s", textAlign: "left", display: "flex", gap: 14, alignItems: "flex-start", boxShadow: a ? `0 0 0 3px ${gold}15` : "none" }}
            onMouseEnter={(e) => { if (!a) { e.currentTarget.style.borderColor = gold; e.currentTarget.style.background = `${gold}06`; } }} onMouseLeave={(e) => { if (!a) { e.currentTarget.style.borderColor = "#e5e5e5"; e.currentTarget.style.background = "#fff"; } }}>
            <div style={{ flexShrink: 0, width: 36, height: 36, borderRadius: "50%", background: a ? `${gold}22` : "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.25s" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={a ? gold : "#999"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.25s" }}><path d={o.icon} /></svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 15, marginBottom: 3 }}>{o.label}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: a ? gold : "#999", lineHeight: 1.4, marginBottom: 6 }}>{o.desc}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, color: a ? gold : "#bbb" }}>+{o.cost}</div>
            </div>
            {a && <div style={{ flexShrink: 0, width: 20, height: 20, borderRadius: "50%", background: gold, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2 }}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg></div>}
          </button>); })}
      </div>
      {features.length > 0 && (<div style={{ marginTop: 20, fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#999" }}>{features.length} upgrade{features.length > 1 ? "s" : ""} selected · +${features.reduce((s, f) => s + (RENO_FEATURE_COST[f] ?? 0), 0).toLocaleString()}</div>)}
      <NavButtons onBack={onBack} onNext={onNext} />
    </div>
  );
}

function HomeStyleStep({ homeStyle, onStyleChange, onBack, onNext }: { homeStyle: string; onStyleChange: (s: string) => void; onBack: () => void; onNext: () => void }) {
  const styles = [
    { id: "modern", label: "Modern", desc: "Clean lines, open spaces, walls of glass", mult: "1.15×", icon: "M4 6h16M4 12h16M4 18h16" },
    { id: "craftsman", label: "Craftsman", desc: "Covered porches, natural wood, tapered columns", mult: "1.05×", icon: "M3 12l9-8 9 8M5 10v10h14V10" },
    { id: "farmhouse", label: "Farmhouse", desc: "Gabled roof, board & batten, wraparound porch", mult: "1.0×", icon: "M3 21h18M5 21V7l7-4 7 4v14" },
    { id: "contemporary", label: "Contemporary", desc: "Mixed materials, asymmetric forms, bold angles", mult: "1.12×", icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" },
    { id: "mediterranean", label: "Mediterranean", desc: "Stucco walls, clay tile roof, arched openings", mult: "1.18×", icon: "M12 3c-4.97 0-9 2.69-9 6v9h18v-9c0-3.31-4.03-6-9-6z" },
  ];
  return (
    <div className="fade-up" style={{ textAlign: "center" }}>
      <StepHeadline subtitle="Architectural style shapes structure, materials, and pricing.">What&apos;s your vision?</StepHeadline>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14, maxWidth: 760, margin: "0 auto" }}>
        {styles.map((s) => { const a = homeStyle === s.id; return (
          <button key={s.id} onClick={() => onStyleChange(s.id)} style={{ padding: "28px 20px", border: a ? `2px solid ${gold}` : "2px solid #e5e5e5", background: a ? `${gold}0a` : "#fff", color: dark, cursor: "pointer", transition: "all 0.25s", textAlign: "left", position: "relative", boxShadow: a ? `0 0 0 3px ${gold}15` : "none" }}
            onMouseEnter={(e) => { if (!a) { e.currentTarget.style.borderColor = gold; e.currentTarget.style.background = `${gold}06`; } }} onMouseLeave={(e) => { if (!a) { e.currentTarget.style.borderColor = "#e5e5e5"; e.currentTarget.style.background = "#fff"; } }}>
            {a && <div style={{ position: "absolute", top: 10, right: 10, width: 20, height: 20, borderRadius: "50%", background: gold, display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg></div>}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={a ? gold : "#ccc"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 12, transition: "stroke 0.25s" }}><path d={s.icon} /></svg>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 18, marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: a ? gold : "#999", lineHeight: 1.5, marginBottom: 10 }}>{s.desc}</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 15, color: a ? gold : "#bbb" }}>{s.mult}</div>
          </button>); })}
      </div>
      <NavButtons onBack={onBack} onNext={onNext} nextDisabled={!homeStyle} />
    </div>
  );
}

function HomeFeaturesStep({ features, onToggle, onBack, onNext }: { features: string[]; onToggle: (f: string) => void; onBack: () => void; onNext: () => void }) {
  const opts = [
    { id: "smart-home", label: "Smart Home", desc: "Automated lighting, climate, security", cost: "$25K", icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
    { id: "outdoor-kitchen", label: "Outdoor Kitchen", desc: "Built-in grill, counters, wet bar", cost: "$35K", icon: "M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" },
    { id: "home-theater", label: "Home Theater", desc: "Acoustic room, projection, seating", cost: "$28K", icon: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" },
    { id: "wine-cellar", label: "Wine Cellar", desc: "Climate-controlled, custom racking", cost: "$22K", icon: "M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" },
    { id: "ev-garage", label: "EV-Ready Garage", desc: "Level 2 charging, electrical panel upgrade", cost: "$18K", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
    { id: "in-floor-heat", label: "In-Floor Heating", desc: "Radiant heat throughout living areas", cost: "$15K", icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
    { id: "solar", label: "Solar Array", desc: "Roof-mounted panels, battery storage", cost: "$32K", icon: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" },
    { id: "pool", label: "Pool & Spa", desc: "In-ground pool, heated spa, decking", cost: "$65K", icon: "M14 2a8 8 0 00-8 8 8 8 0 008 8 8 8 0 008-8 8 8 0 00-8-8zm0 12a4 4 0 110-8 4 4 0 010 8z" },
  ];
  return (
    <div className="fade-up" style={{ textAlign: "center" }}>
      <StepHeadline subtitle="Select any features you'd like — or skip this step.">Premium features</StepHeadline>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12, maxWidth: 760, margin: "0 auto" }}>
        {opts.map((o) => { const a = features.includes(o.id); return (
          <button key={o.id} onClick={() => onToggle(o.id)} style={{ padding: "20px 16px", border: a ? `2px solid ${gold}` : "2px solid #e5e5e5", background: a ? `${gold}0a` : "#fff", color: dark, cursor: "pointer", transition: "all 0.25s", textAlign: "left", display: "flex", gap: 14, alignItems: "flex-start", boxShadow: a ? `0 0 0 3px ${gold}15` : "none" }}
            onMouseEnter={(e) => { if (!a) { e.currentTarget.style.borderColor = gold; e.currentTarget.style.background = `${gold}06`; } }} onMouseLeave={(e) => { if (!a) { e.currentTarget.style.borderColor = "#e5e5e5"; e.currentTarget.style.background = "#fff"; } }}>
            <div style={{ flexShrink: 0, width: 36, height: 36, borderRadius: "50%", background: a ? `${gold}22` : "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.25s" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={a ? gold : "#999"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.25s" }}><path d={o.icon} /></svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 15, marginBottom: 3 }}>{o.label}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: a ? gold : "#999", lineHeight: 1.4, marginBottom: 6 }}>{o.desc}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, color: a ? gold : "#bbb" }}>+{o.cost}</div>
            </div>
            {a && <div style={{ flexShrink: 0, width: 20, height: 20, borderRadius: "50%", background: gold, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2 }}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg></div>}
          </button>); })}
      </div>
      {features.length > 0 && (<div style={{ marginTop: 20, fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#999" }}>{features.length} feature{features.length > 1 ? "s" : ""} selected · +${features.reduce((s, f) => s + (HOME_FEATURE_COST[f] ?? 0), 0).toLocaleString()}</div>)}
      <NavButtons onBack={onBack} onNext={onNext} />
    </div>
  );
}

/* ─── Consulting Steps ─────────────────────────────────────────── */

function ConsultTypeStep({ consultType, onTypeChange, onBack, onNext }: { consultType: string; onTypeChange: (t: string) => void; onBack: () => void; onNext: () => void }) {
  const types = [
    { id: "estimation", label: "Estimation", desc: "Detailed cost estimates, budget planning, value engineering", range: "$2K – $6K", icon: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" },
    { id: "arbitration", label: "Arbitration", desc: "Dispute resolution, expert testimony, construction claims", range: "$5K – $20K", icon: "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" },
    { id: "structural", label: "Structural Assessment", desc: "Load analysis, foundation review, structural integrity", range: "$3.5K – $8K", icon: "M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" },
    { id: "feasibility", label: "Feasibility Study", desc: "Project viability, cost projections, risk analysis", range: "$5K – $15K", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
    { id: "permits", label: "Permit Support", desc: "Permit applications, code compliance, regulatory guidance", range: "$2.5K – $6K", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" },
    { id: "site-analysis", label: "Site Analysis", desc: "Soil testing, grading plans, environmental review", range: "$4K – $12K", icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" },
  ];
  return (
    <div className="fade-up" style={{ textAlign: "center" }}>
      <StepHeadline subtitle="Select the engineering service that matches your project needs.">What do you need?</StepHeadline>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, maxWidth: 700, margin: "0 auto" }}>
        {types.map((t) => { const a = consultType === t.id; return (
          <button key={t.id} onClick={() => onTypeChange(t.id)} style={{ padding: "28px 20px", border: a ? `2px solid ${gold}` : "2px solid #e5e5e5", background: a ? `${gold}0a` : "#fff", color: dark, cursor: "pointer", transition: "all 0.25s", textAlign: "left", position: "relative", boxShadow: a ? `0 0 0 3px ${gold}15` : "none" }}
            onMouseEnter={(e) => { if (!a) { e.currentTarget.style.borderColor = gold; e.currentTarget.style.background = `${gold}06`; } }} onMouseLeave={(e) => { if (!a) { e.currentTarget.style.borderColor = "#e5e5e5"; e.currentTarget.style.background = "#fff"; } }}>
            {a && <div style={{ position: "absolute", top: 10, right: 10, width: 20, height: 20, borderRadius: "50%", background: gold, display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg></div>}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={a ? gold : "#ccc"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 12, transition: "stroke 0.25s" }}><path d={t.icon} /></svg>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 18, marginBottom: 6 }}>{t.label}</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: a ? gold : "#999", lineHeight: 1.5, marginBottom: 10 }}>{t.desc}</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 15, color: a ? gold : "#bbb" }}>{t.range}</div>
          </button>); })}
      </div>
      <div style={{ marginTop: 48, paddingTop: 28, borderTop: "1px solid #eee", display: "flex", alignItems: "center", justifyContent: "center", gap: "clamp(24px, 4vw, 56px)", flexWrap: "wrap" }}>
        {[{ value: "$620K+", label: "Client Savings" }, { value: "100%", label: "Permitting Success" }, { value: "9", label: "Disputes Resolved" }].map((s, i) => (
          <div key={s.label} style={{ textAlign: "center", paddingLeft: i > 0 ? "clamp(24px, 4vw, 56px)" : 0, borderLeft: i > 0 ? "1px solid #e0e0e0" : "none" }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(24px, 3vw, 36px)", color: gold, letterSpacing: "-0.02em", lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#999", fontWeight: 500, marginTop: 6, letterSpacing: "0.04em" }}>{s.label}</div>
          </div>))}
      </div>
      <NavButtons onBack={onBack} onNext={onNext} nextDisabled={!consultType} />
    </div>
  );
}

function ConsultDetailsStep({ consultComplexity, consultTimeline, onComplexityChange, onTimelineChange, onBack, onNext }: { consultComplexity: string; consultTimeline: string; onComplexityChange: (c: string) => void; onTimelineChange: (t: string) => void; onBack: () => void; onNext: () => void }) {
  const cOpts = [{ id: "standard", label: "Standard", desc: "Straightforward scope", mult: "1.0×" }, { id: "moderate", label: "Moderate", desc: "Multiple variables", mult: "1.3×" }, { id: "complex", label: "Complex", desc: "High difficulty", mult: "1.7×" }];
  const tOpts = [{ id: "flexible", label: "Flexible", desc: "No rush", mult: "0.9×" }, { id: "standard", label: "Standard", desc: "Normal timeline", mult: "1.0×" }, { id: "rush", label: "Rush", desc: "Expedited delivery", mult: "1.25×" }];
  return (
    <div className="fade-up" style={{ textAlign: "center", maxWidth: 560, margin: "0 auto" }}>
      <StepHeadline subtitle="Complexity and timeline affect the scope of engineering work.">Project scope</StepHeadline>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 600, color: dark, marginBottom: 16, textAlign: "left" }}>Complexity</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 36 }}>
        {cOpts.map((o) => { const a = consultComplexity === o.id; return (<SelectCard key={o.id} active={a} onClick={() => onComplexityChange(o.id)}><div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 18 }}>{o.label}</div><div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: a ? gold : "#999", marginTop: 4 }}>{o.desc}</div><div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 15, color: a ? gold : "#bbb", marginTop: 8 }}>{o.mult}</div></SelectCard>); })}
      </div>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 600, color: dark, marginBottom: 16, textAlign: "left" }}>Timeline</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
        {tOpts.map((o) => { const a = consultTimeline === o.id; return (<SelectCard key={o.id} active={a} onClick={() => onTimelineChange(o.id)}><div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 18 }}>{o.label}</div><div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: a ? gold : "#999", marginTop: 4 }}>{o.desc}</div><div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 15, color: a ? gold : "#bbb", marginTop: 8 }}>{o.mult}</div></SelectCard>); })}
      </div>
      <NavButtons onBack={onBack} onNext={onNext} nextDisabled={!consultComplexity || !consultTimeline} />
    </div>
  );
}

function ConsultPropertyStep({ propertyType, onPropertyChange, onBack, onNext }: { propertyType: string; onPropertyChange: (p: string) => void; onBack: () => void; onNext: () => void }) {
  const propOpts = [
    { id: "residential", label: "Residential", desc: "Single-family home", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
    { id: "commercial", label: "Commercial", desc: "Office, retail, industrial", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
    { id: "multi-unit", label: "Multi-Unit", desc: "Apartments, condos, townhomes", icon: "M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" },
    { id: "mixed-use", label: "Mixed-Use", desc: "Residential & commercial", icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" },
  ];
  return (
    <div className="fade-up" style={{ textAlign: "center", maxWidth: 560, margin: "0 auto" }}>
      <StepHeadline subtitle="Property type affects the scope and complexity of engineering work.">What type of property?</StepHeadline>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
        {propOpts.map((o) => { const a = propertyType === o.id; return (
          <button key={o.id} onClick={() => onPropertyChange(o.id)} style={{ padding: "24px 16px", border: a ? `2px solid ${gold}` : "2px solid #e5e5e5", background: a ? `${gold}0a` : "#fff", color: dark, cursor: "pointer", transition: "all 0.25s", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, position: "relative", boxShadow: a ? `0 0 0 3px ${gold}15` : "none" }}
            onMouseEnter={(e) => { if (!a) { e.currentTarget.style.borderColor = gold; e.currentTarget.style.background = `${gold}06`; } }} onMouseLeave={(e) => { if (!a) { e.currentTarget.style.borderColor = "#e5e5e5"; e.currentTarget.style.background = "#fff"; } }}>
            {a && <div style={{ position: "absolute", top: 8, right: 8, width: 20, height: 20, borderRadius: "50%", background: gold, display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg></div>}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={a ? gold : "#bbb"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.25s" }}><path d={o.icon} /></svg>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 18 }}>{o.label}</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: a ? gold : "#999" }}>{o.desc}</div>
          </button>); })}
      </div>
      <NavButtons onBack={onBack} onNext={onNext} nextDisabled={!propertyType} />
    </div>
  );
}

function ConsultValueStep({ projectValue, onValueChange, onBack, onNext }: { projectValue: string; onValueChange: (v: string) => void; onBack: () => void; onNext: () => void }) {
  const valOpts = [{ id: "under-500k", label: "Under $500K" }, { id: "500k-1m", label: "$500K – $1M" }, { id: "1m-5m", label: "$1M – $5M" }, { id: "5m-plus", label: "$5M+" }];
  return (
    <div className="fade-up" style={{ textAlign: "center", maxWidth: 520, margin: "0 auto" }}>
      <StepHeadline subtitle="Project value helps us calibrate the depth of analysis and deliverables.">Estimated project value?</StepHeadline>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
        {valOpts.map((o) => { const a = projectValue === o.id; return (
          <SelectCard key={o.id} active={a} onClick={() => onValueChange(o.id)}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 16 }}>{o.label}</div>
          </SelectCard>); })}
      </div>
      <NavButtons onBack={onBack} onNext={onNext} nextDisabled={!projectValue} />
    </div>
  );
}

/* ─── Commercial Steps ─────────────────────────────────────────── */

function CommercialTypeStep({ commercialType, onTypeChange, onBack, onNext }: { commercialType: string; onTypeChange: (t: string) => void; onBack: () => void; onNext: () => void }) {
  const types = [
    { id: "office", label: "Office", desc: "Corporate, co-working, or professional space", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
    { id: "retail", label: "Retail", desc: "Storefront, showroom, or gallery", icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" },
    { id: "warehouse", label: "Warehouse", desc: "Industrial, storage, or distribution", icon: "M3 3h18v18H3V3zm0 6h18M9 3v18" },
    { id: "restaurant", label: "Restaurant", desc: "Kitchen, dining, bar, or café", icon: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" },
  ];
  return (
    <div className="fade-up" style={{ textAlign: "center", maxWidth: 560, margin: "0 auto" }}>
      <StepHeadline subtitle="Each space type has different structural, MEP, and code requirements.">What type of commercial space?</StepHeadline>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
        {types.map((t) => { const a = commercialType === t.id; return (
          <button key={t.id} onClick={() => onTypeChange(t.id)} style={{ padding: "28px 20px", border: a ? `2px solid ${gold}` : "2px solid #e5e5e5", background: a ? `${gold}0a` : "#fff", color: dark, cursor: "pointer", transition: "all 0.25s", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, position: "relative", boxShadow: a ? `0 0 0 3px ${gold}15` : "none" }}
            onMouseEnter={(e) => { if (!a) { e.currentTarget.style.borderColor = gold; e.currentTarget.style.background = `${gold}06`; } }} onMouseLeave={(e) => { if (!a) { e.currentTarget.style.borderColor = "#e5e5e5"; e.currentTarget.style.background = "#fff"; } }}>
            {a && <div style={{ position: "absolute", top: 10, right: 10, width: 20, height: 20, borderRadius: "50%", background: gold, display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg></div>}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={a ? gold : "#bbb"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.25s" }}><path d={t.icon} /></svg>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 18 }}>{t.label}</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: a ? gold : "#999" }}>{t.desc}</div>
          </button>); })}
      </div>
      <NavButtons onBack={onBack} onNext={onNext} nextDisabled={!commercialType} />
    </div>
  );
}

function CommercialFinishStep({ commercialFinish, onFinishChange, onBack, onNext }: { commercialFinish: string; onFinishChange: (f: string) => void; onBack: () => void; onNext: () => void }) {
  const opts = [
    { id: "standard", label: "Standard", desc: "Functional, clean, code-compliant", mult: "1.0×" },
    { id: "premium", label: "Premium", desc: "Upgraded materials, branded elements", mult: "1.3×" },
    { id: "high-end", label: "High-End", desc: "Architect-designed, luxury finishes", mult: "1.6×" },
  ];
  return (
    <div className="fade-up" style={{ textAlign: "center", maxWidth: 520, margin: "0 auto" }}>
      <StepHeadline subtitle="Finish level drives material cost, design complexity, and build time.">What finish level?</StepHeadline>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
        {opts.map((o) => { const a = commercialFinish === o.id; return (
          <SelectCard key={o.id} active={a} onClick={() => onFinishChange(o.id)}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 16 }}>{o.label}</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: a ? gold : "#999", marginTop: 4 }}>{o.desc}</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, color: a ? gold : "#bbb", marginTop: 8 }}>{o.mult}</div>
          </SelectCard>); })}
      </div>
      <NavButtons onBack={onBack} onNext={onNext} />
    </div>
  );
}

/* ─── Remote Steps ─────────────────────────────────────────────── */

function RemoteTypeStep({ remoteType, onTypeChange, onBack, onNext }: { remoteType: string; onTypeChange: (t: string) => void; onBack: () => void; onNext: () => void }) {
  const types = [
    { id: "cabin", label: "Cabin", desc: "Year-round or seasonal retreat", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
    { id: "adu", label: "ADU / Guest House", desc: "Accessory dwelling, guest quarters", icon: "M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" },
    { id: "workshop", label: "Workshop", desc: "Studio, barn, garage, or outbuilding", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" },
    { id: "off-grid-home", label: "Off-Grid Home", desc: "Fully self-sufficient residence", icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" },
  ];
  return (
    <div className="fade-up" style={{ textAlign: "center", maxWidth: 560, margin: "0 auto" }}>
      <StepHeadline subtitle="Structure type determines foundation, insulation, and system requirements.">What are you building?</StepHeadline>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
        {types.map((t) => { const a = remoteType === t.id; return (
          <button key={t.id} onClick={() => onTypeChange(t.id)} style={{ padding: "28px 20px", border: a ? `2px solid ${gold}` : "2px solid #e5e5e5", background: a ? `${gold}0a` : "#fff", color: dark, cursor: "pointer", transition: "all 0.25s", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, position: "relative", boxShadow: a ? `0 0 0 3px ${gold}15` : "none" }}
            onMouseEnter={(e) => { if (!a) { e.currentTarget.style.borderColor = gold; e.currentTarget.style.background = `${gold}06`; } }} onMouseLeave={(e) => { if (!a) { e.currentTarget.style.borderColor = "#e5e5e5"; e.currentTarget.style.background = "#fff"; } }}>
            {a && <div style={{ position: "absolute", top: 10, right: 10, width: 20, height: 20, borderRadius: "50%", background: gold, display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg></div>}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={a ? gold : "#bbb"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.25s" }}><path d={t.icon} /></svg>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 18 }}>{t.label}</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: a ? gold : "#999" }}>{t.desc}</div>
          </button>); })}
      </div>
      <NavButtons onBack={onBack} onNext={onNext} nextDisabled={!remoteType} />
    </div>
  );
}

function RemoteAccessStep({ remoteAccess, onAccessChange, onBack, onNext }: { remoteAccess: string; onAccessChange: (a: string) => void; onBack: () => void; onNext: () => void }) {
  const opts = [
    { id: "road-access", label: "Year-Round Road", desc: "Paved or maintained gravel access", mult: "1.0×" },
    { id: "seasonal", label: "Seasonal Access", desc: "Dirt road, snow closures possible", mult: "1.15×" },
    { id: "no-road", label: "No Road Access", desc: "Helicopter, ATV, or boat only", mult: "1.35×" },
  ];
  return (
    <div className="fade-up" style={{ textAlign: "center", maxWidth: 520, margin: "0 auto" }}>
      <StepHeadline subtitle="Site accessibility directly impacts material delivery and labor costs.">How accessible is the site?</StepHeadline>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
        {opts.map((o) => { const a = remoteAccess === o.id; return (
          <SelectCard key={o.id} active={a} onClick={() => onAccessChange(o.id)}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 16 }}>{o.label}</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: a ? gold : "#999", marginTop: 4 }}>{o.desc}</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, color: a ? gold : "#bbb", marginTop: 8 }}>{o.mult}</div>
          </SelectCard>); })}
      </div>
      <NavButtons onBack={onBack} onNext={onNext} nextDisabled={!remoteAccess} />
    </div>
  );
}

function RemoteFeaturesStep({ features, onToggle, onBack, onNext }: { features: string[]; onToggle: (f: string) => void; onBack: () => void; onNext: () => void }) {
  const opts = [
    { id: "solar", label: "Solar Power", desc: "Panels, inverter, battery bank", cost: "$32K", icon: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" },
    { id: "well-septic", label: "Well & Septic", desc: "Drilled well, septic system", cost: "$25K", icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" },
    { id: "generator", label: "Backup Generator", desc: "Propane or diesel standby", cost: "$12K", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
    { id: "satellite-internet", label: "Satellite Internet", desc: "Starlink or equivalent setup", cost: "$5.5K", icon: "M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.858 15.355-5.858 21.213 0" },
    { id: "propane-system", label: "Propane System", desc: "Tank, lines, appliance hookup", cost: "$8K", icon: "M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" },
    { id: "rainwater", label: "Rainwater Collection", desc: "Cistern, filtration, storage", cost: "$9.5K", icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" },
  ];
  return (
    <div className="fade-up" style={{ textAlign: "center" }}>
      <StepHeadline subtitle="Select off-grid systems you need — or skip this step.">Off-grid systems</StepHeadline>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12, maxWidth: 760, margin: "0 auto" }}>
        {opts.map((o) => { const a = features.includes(o.id); return (
          <button key={o.id} onClick={() => onToggle(o.id)} style={{ padding: "20px 16px", border: a ? `2px solid ${gold}` : "2px solid #e5e5e5", background: a ? `${gold}0a` : "#fff", color: dark, cursor: "pointer", transition: "all 0.25s", textAlign: "left", display: "flex", gap: 14, alignItems: "flex-start", boxShadow: a ? `0 0 0 3px ${gold}15` : "none" }}
            onMouseEnter={(e) => { if (!a) { e.currentTarget.style.borderColor = gold; e.currentTarget.style.background = `${gold}06`; } }} onMouseLeave={(e) => { if (!a) { e.currentTarget.style.borderColor = "#e5e5e5"; e.currentTarget.style.background = "#fff"; } }}>
            <div style={{ flexShrink: 0, width: 36, height: 36, borderRadius: "50%", background: a ? `${gold}22` : "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.25s" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={a ? gold : "#999"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.25s" }}><path d={o.icon} /></svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 15, marginBottom: 3 }}>{o.label}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: a ? gold : "#999", lineHeight: 1.4, marginBottom: 6 }}>{o.desc}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, color: a ? gold : "#bbb" }}>+{o.cost}</div>
            </div>
            {a && <div style={{ flexShrink: 0, width: 20, height: 20, borderRadius: "50%", background: gold, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2 }}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg></div>}
          </button>); })}
      </div>
      {features.length > 0 && (<div style={{ marginTop: 20, fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#999" }}>{features.length} system{features.length > 1 ? "s" : ""} selected · +${features.reduce((s, f) => s + (REMOTE_FEATURE_COST[f] ?? 0), 0).toLocaleString()}</div>)}
      <NavButtons onBack={onBack} onNext={onNext} />
    </div>
  );
}

/* ─── Analyzing ────────────────────────────────────────────────── */

function AnalyzingStep({ projectType, zipCode }: { projectType: string; zipCode: string }) {
  const labels: Record<string, string> = { "custom-home": `Calculating costs for ${getLocationName(zipCode)}`, "new-build": `Calculating build costs for ${getLocationName(zipCode)}`, "renovation": `Estimating renovation costs for ${getLocationName(zipCode)}`, "consulting": `Generating consulting estimate for ${getLocationName(zipCode)}`, "commercial": `Estimating commercial build-out for ${getLocationName(zipCode)}`, "remote": `Calculating remote build costs for ${getLocationName(zipCode)}` };
  return (
    <div className="fade-in" style={{ textAlign: "center" }}>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 48 }}>
        <div style={{ position: "relative", width: 160, height: 160 }}>
          {[0, 0.3, 0.6].map((delay, i) => (<div key={i} style={{ position: "absolute", inset: 0, borderRadius: "50%", border: `2px solid ${gold}`, animation: `subtlePing 2s ${delay}s infinite`, opacity: 0.6 - i * 0.15 }} />))}
          <div style={{ position: "absolute", inset: 24, borderRadius: "50%", border: `3px solid ${gold}`, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5"><path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
        </div>
      </div>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(24px, 4.5vw, 48px)", color: dark, margin: "0 0 16px" }}>Analyzing your project...</h2>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: "#999", fontWeight: 300 }}>{labels[projectType] ?? "Processing..."}</p>
    </div>
  );
}

/* ─── Results (with download fix) ──────────────────────────────── */

function ResultsStep({ estimate, displayedTotal, onReset, isConsulting, isCustomHome }: { estimate: EstimateResult; displayedTotal: number; onReset: () => void; isConsulting?: boolean; isCustomHome?: boolean }) {
  const handleDownload = () => {
    const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Antova Builders – ${estimate.projectLabel} Estimate</title>
<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:system-ui,-apple-system,sans-serif;max-width:600px;margin:0 auto;padding:32px 24px;color:#1a1a1a}
h1{font-size:24px;margin-bottom:4px}h2{font-size:18px;margin:28px 0 12px;border-bottom:2px solid #c6912c;padding-bottom:6px}
.total{font-size:48px;font-weight:800;margin:8px 0}.meta{color:#888;font-size:14px;margin:4px 0}
table{width:100%;border-collapse:collapse;margin:8px 0}td{padding:10px 0;border-bottom:1px solid #eee}
td:last-child{text-align:right;font-weight:600}.brand{color:#c6912c;font-weight:700;letter-spacing:0.08em;margin-bottom:24px;display:block}
.footer{margin-top:32px;padding-top:16px;border-top:1px solid #eee;color:#999;font-size:12px;text-align:center}</style></head>
<body><span class="brand">ANTOVA BUILDERS</span>
<h1>${estimate.projectLabel} Estimate</h1>
<p class="meta">${estimate.locationName} · ${estimate.tierName}</p>
<div class="total">\$${estimate.total.toLocaleString()}</div>
${estimate.unitLabel !== "flat fee" && estimate.unitLabel !== "flat" ? `<p class="meta">\$${estimate.perUnit.toLocaleString()} ${estimate.unitLabel}</p>` : ""}
<h2>Cost Breakdown</h2><table>${estimate.breakdown.map(b => `<tr><td>${b.name}</td><td>\$${b.value.toLocaleString()}</td></tr>`).join("")}</table>
<div class="footer"><p>Generated ${new Date().toLocaleDateString()} · AI-powered estimate based on 50,000+ regional data points</p>
<p style="margin-top:8px">This is a preliminary estimate. Contact us for a detailed, locked-in quote.</p>
<p style="margin-top:8px">antovabuilders.com · (208) 625-8342</p></div></body></html>`;

    if (navigator.share && /Mobi|Android/i.test(navigator.userAgent)) {
      const blob = new Blob([html], { type: "text/html" });
      const file = new File([blob], `antova-estimate-${Date.now()}.html`, { type: "text/html" });
      navigator.share({ title: `${estimate.projectLabel} Estimate – \$${estimate.total.toLocaleString()}`, files: [file] }).catch(() => downloadFile(html));
    } else {
      downloadFile(html);
    }
  };

  const downloadFile = (html: string) => {
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `antova-estimate-${estimate.projectLabel.toLowerCase().replace(/\s+/g, "-")}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fade-up" style={{ maxWidth: 720, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
        <div style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: 8, background: `linear-gradient(135deg, ${gold}, ${goldHover}, ${gold})`, padding: "8px 20px", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)", animation: "shimmer 3s infinite" }} />
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" style={{ position: "relative", zIndex: 1 }}><path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#fff", letterSpacing: "0.12em", fontFamily: "'DM Sans', sans-serif", position: "relative", zIndex: 1 }}>AI-POWERED ESTIMATE — {estimate.projectLabel.toUpperCase()}</span>
        </div>
      </div>

      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 600, color: "#999", letterSpacing: "0.08em", marginBottom: 8 }}>YOUR ESTIMATE</p>
        <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: "clamp(48px, 10vw, 96px)", color: dark, letterSpacing: "-0.02em", lineHeight: 1 }}>${displayedTotal.toLocaleString()}</div>
        {estimate.unitLabel !== "flat fee" && estimate.unitLabel !== "flat" && <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 22, color: "#999", fontWeight: 300, marginTop: 8 }}>${estimate.perUnit.toLocaleString()} {estimate.unitLabel}</div>}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, marginTop: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="2"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round" /><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#666" }}>{estimate.tierName ? <>Pricing for <strong style={{ color: dark }}>{estimate.locationName}</strong> ({estimate.tierName})</> : <strong style={{ color: dark }}>{estimate.locationName}</strong>}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 6, height: 6, borderRadius: "50%", background: gold }} /><span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#999" }}>Based on 50,000+ regional data points</span></div>
        </div>
      </div>

      <div style={{ background: `linear-gradient(145deg, ${dark}, #1a1a1a)`, padding: "clamp(24px, 4vw, 48px)", borderRadius: 12, boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(20px, 3vw, 30px)", color: "#fff", textAlign: "center", marginBottom: 32 }}>Cost Breakdown</h2>
        <div style={{ width: "100%", height: 320 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={estimate.breakdown} margin={{ top: 20, right: 20, left: 10, bottom: 10 }} barCategoryGap="20%">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: "#d1d5db", fontSize: 13, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }} tickLine={false} axisLine={{ stroke: "rgba(255,255,255,0.15)" }} />
              <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} tick={{ fill: "#9ca3af", fontSize: 13, fontWeight: 500, fontFamily: "'DM Sans', sans-serif" }} tickLine={false} axisLine={{ stroke: "rgba(255,255,255,0.15)" }} width={60} />
              <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, "Cost"]} contentStyle={{ backgroundColor: "#1a1a1a", border: `1px solid ${gold}`, borderRadius: 8, boxShadow: `0 10px 40px ${gold}33`, padding: "12px 16px", fontSize: 14, color: "#fff" }} labelStyle={{ fontWeight: 700, marginBottom: 6, color: gold }} cursor={{ fill: `${gold}11` }} />
              <Bar dataKey="value" fill={gold} radius={[6, 6, 0, 0]} barSize={60} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(estimate.breakdown.length, 4)}, 1fr)`, gap: 16, marginTop: 32, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          {estimate.breakdown.map((item) => (<div key={item.name} style={{ textAlign: "center" }}><div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "clamp(18px, 2.5vw, 24px)", color: "#fff" }}>${(item.value / 1000).toFixed(0)}k</div><div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#888", marginTop: 4 }}>{item.name}</div></div>))}
        </div>
      </div>

      {isConsulting && (
        <div style={{ marginTop: 32, background: "#fafafa", border: "1px solid #eee", borderRadius: 12, padding: "28px 32px", textAlign: "center" }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#666", lineHeight: 1.7, maxWidth: 480, margin: "0 auto 16px", fontStyle: "italic" }}>&ldquo;Their technical expertise got us through a $600K dispute in under 3 months — without going to court.&rdquo;</p>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: dark }}>Michael Chen</span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#999" }}> · Pacific Luxury Homes</span>
        </div>
      )}

      {isCustomHome && (
        <div style={{ marginTop: 32, background: "#fafafa", border: "1px solid #eee", borderRadius: 12, padding: "28px 32px", textAlign: "center" }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#666", lineHeight: 1.7, maxWidth: 480, margin: "0 auto 16px", fontStyle: "italic" }}>&ldquo;From first sketch to move-in day, Antova delivered a home that exceeded every expectation — on time and within budget.&rdquo;</p>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: dark }}>Sarah & David Thompson</span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#999" }}> · Coeur d&apos;Alene, ID</span>
        </div>
      )}

      <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 32, flexWrap: "wrap" }}>
        <OutlineButton onClick={handleDownload}>Save Estimate</OutlineButton>
        <DarkButton onClick={onReset}>New Estimate</DarkButton>
      </div>

      <div style={{ marginTop: 32, textAlign: "center", background: "#fafafa", border: "1px solid #eee", borderRadius: 12, padding: "28px 24px" }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: dark, fontWeight: 600, marginBottom: 4 }}>Ready to bring this to life?</p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#888", marginBottom: 16 }}>Lock in your estimate with a free consultation — no commitment required.</p>
        <GoldButton onClick={() => window.location.href = "/contact"}>Book Free Consultation <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg></GoldButton>
      </div>
    </div>
  );
}

/* ─── Trust Bar ────────────────────────────────────────────────── */

function TrustBar() {
  const stats = [{ icon: "★", value: "5.0", label: "Google Rating" }, { value: "150+", label: "Projects Completed" }, { value: "12", label: "Years Experience" }, { value: "98%", label: "Client Satisfaction" }, { value: "$50M+", label: "Total Value Built" }];
  return (
    <div style={{ borderTop: "1px solid #f0f0f0", borderBottom: "1px solid #f0f0f0", padding: "36px 24px", background: "#fff" }}>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", gap: "clamp(20px, 4vw, 48px)", maxWidth: 1100, margin: "0 auto" }}>
        {stats.map((s, i) => (<div key={i} style={{ textAlign: "center", position: "relative", paddingLeft: i > 0 ? "clamp(20px, 4vw, 48px)" : 0, borderLeft: i > 0 ? "1px solid #e5e5e5" : "none" }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(28px, 4vw, 44px)", color: gold, letterSpacing: "-0.02em", lineHeight: 1.1 }}>{s.icon && <span style={{ fontSize: "0.6em", marginRight: 4, verticalAlign: "middle" }}>{s.icon}</span>}{s.value}</div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(11px, 1.2vw, 14px)", color: "#999", marginTop: 6, fontWeight: 500 }}>{s.label}</div>
        </div>))}
      </div>
    </div>
  );
}

/* ─── Main Component ───────────────────────────────────────────── */

function CostEstimatorInner() {
  const searchParams = useSearchParams();
  const urlType = (searchParams?.get("type") ?? "") as ProjectType;

  const [state, setState] = useState<FormState>({
    step: "type-select", projectType: "", zipCode: "", sqft: 2000,
    exteriorQuality: "standard", bedrooms: 3, bathrooms: 2, interiorFinish: "standard",
    stories: 2, garageSpaces: 2, renoScope: "", renoArea: 500,
    renoCondition: "", renoFinish: "standard", renoFeatures: [], consultType: "",
    consultComplexity: "", consultTimeline: "standard",
    consultPropertyType: "", consultProjectValue: "",
    homeStyle: "", homeFeatures: [],
    commercialType: "", commercialFinish: "standard",
    remoteType: "", remoteAccess: "", remoteFeatures: [],
  });

  const [displayedTotal, setDisplayedTotal] = useState(0);
  const hasAnimated = useRef(false);
  const hasReadUrl = useRef(false);
  const update = (u: Partial<FormState>) => setState((p) => ({ ...p, ...u }));

  useEffect(() => {
    if (hasReadUrl.current) return; hasReadUrl.current = true;
    const valid: ProjectType[] = ["custom-home", "new-build", "renovation", "consulting"];
    if (valid.includes(urlType)) { const steps = STEP_ORDERS[urlType]; setState((p) => ({ ...p, projectType: urlType, step: steps[1] })); }
  }, [urlType]);

  const steps = state.projectType ? STEP_ORDERS[state.projectType] : ["type-select"];
  const currentIdx = steps.indexOf(state.step);
  const progress = steps.length > 1 ? (currentIdx / (steps.length - 1)) * 100 : 0;
  const nextStep = () => { if (currentIdx < steps.length - 1) update({ step: steps[currentIdx + 1] }); };
  const prevStep = () => { if (currentIdx > 0) update({ step: steps[currentIdx - 1] }); else update({ step: "type-select", projectType: "" }); };
  const handleTypeSelect = (type: ProjectType) => { update({ projectType: type, step: STEP_ORDERS[type][1] }); };
  const handleZipSubmit = () => { if (!getZipTier(state.zipCode)) update({ step: "outside-area" }); else nextStep(); };
  const estimate = state.step === "results" ? calcEstimate(state) : null;

  useEffect(() => { if (state.step === "analyzing") { hasAnimated.current = false; const t = setTimeout(() => update({ step: "results" }), 3000); return () => clearTimeout(t); } }, [state.step]);
  useEffect(() => {
    if (state.step === "results" && estimate && !hasAnimated.current) {
      hasAnimated.current = true; setDisplayedTotal(0);
      const dur = 1500; const start = Date.now();
      const tick = () => { const p = Math.min((Date.now() - start) / dur, 1); setDisplayedTotal(Math.round(estimate.total * (1 - Math.pow(1 - p, 3)))); if (p < 1) requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
    }
  }, [state.step, estimate]);

  const reset = () => setState({ step: "type-select", projectType: "", zipCode: "", sqft: 2000, exteriorQuality: "standard", bedrooms: 3, bathrooms: 2, interiorFinish: "standard", stories: 2, garageSpaces: 2, renoScope: "", renoArea: 500, renoCondition: "", renoFinish: "standard", renoFeatures: [], consultType: "", consultComplexity: "", consultTimeline: "standard", consultPropertyType: "", consultProjectValue: "", homeStyle: "", homeFeatures: [], commercialType: "", commercialFinish: "standard", remoteType: "", remoteAccess: "", remoteFeatures: [] });

  const isTypeSelect = state.step === "type-select";
  const isOutside = state.step === "outside-area";
  const showProgress = true;
  const showBanners = !isTypeSelect && state.step !== "results" && state.step !== "analyzing" && state.step !== "outside-area";

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "'DM Sans', sans-serif", background: "#fff", position: "relative" }}>
      <style>{globalStyles}</style>

      {showProgress && <div style={{ height: 3, background: "#eee", flexShrink: 0 }}><div style={{ height: "100%", background: gold, width: `${progress}%`, transition: "width 0.5s cubic-bezier(0.22, 1, 0.36, 1)" }} /></div>}

      <header style={{ background: dark, borderBottom: "1px solid rgba(255,255,255,0.08)", flexShrink: 0 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="/" style={{ textDecoration: "none", fontSize: 20, letterSpacing: "0.08em", fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}><span style={{ color: "#fff" }}>ANTOVA </span><span style={{ color: gold }}>BUILDERS</span></a>
          {state.projectType && !isTypeSelect && <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.4)", letterSpacing: "0.05em" }}>{PROJECT_TYPES.find(p => p.id === state.projectType)?.label ?? ""}</span>}
        </div>
      </header>

      <main style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "clamp(24px, 4vw, 64px) 24px", background: isTypeSelect ? dark : "#fff", transition: "background 0.5s", position: "relative", overflow: "hidden" }}>
        {isTypeSelect && (<><div style={{ position: "absolute", top: "15%", right: "20%", width: 500, height: 500, borderRadius: "50%", background: `${gold}0d`, filter: "blur(120px)", pointerEvents: "none" }} /><div style={{ position: "absolute", bottom: "20%", left: "15%", width: 400, height: 400, borderRadius: "50%", background: `${gold}08`, filter: "blur(100px)", pointerEvents: "none" }} /><div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)`, backgroundSize: "60px 60px" }} /></>)}

        <div style={{ width: "100%", maxWidth: 860, margin: "0 auto", position: "relative", zIndex: 10 }}>
          {state.step === "type-select" && <TypeSelectStep onSelect={handleTypeSelect} />}
          {state.step === "zip" && <ZipCodeStep zipCode={state.zipCode} onZipChange={(z) => update({ zipCode: z })} onBack={prevStep} onSubmit={handleZipSubmit} projectType={state.projectType} />}
          {state.step === "outside-area" && <OutsideAreaStep zipCode={state.zipCode} onRetry={() => { update({ zipCode: "", step: "zip" }); }} onReset={reset} />}
          {state.step === "sqft" && <SqftStep sqft={state.sqft} onSqftChange={(s) => update({ sqft: s })} onBack={prevStep} onNext={nextStep} projectType={state.projectType} />}
          {state.step === "home-style" && <HomeStyleStep homeStyle={state.homeStyle} onStyleChange={(s) => update({ homeStyle: s })} onBack={prevStep} onNext={nextStep} />}
          {state.step === "build-details" && <BuildDetailsStep stories={state.stories} garageSpaces={state.garageSpaces} onStoriesChange={(s) => update({ stories: s })} onGarageChange={(g) => update({ garageSpaces: g })} onBack={prevStep} onNext={nextStep} />}
          {state.step === "exterior" && <ExteriorStep exteriorQuality={state.exteriorQuality} onQualityChange={(q) => update({ exteriorQuality: q })} onBack={prevStep} onNext={nextStep} projectType={state.projectType} />}
          {state.step === "interior-finish" && <InteriorFinishStep interiorFinish={state.interiorFinish} onFinishChange={(f) => update({ interiorFinish: f })} onBack={prevStep} onNext={nextStep} projectType={state.projectType} />}
          {state.step === "interior-rooms" && <InteriorRoomsStep bedrooms={state.bedrooms} bathrooms={state.bathrooms} onBedroomsChange={(b) => update({ bedrooms: b })} onBathroomsChange={(b) => update({ bathrooms: b })} onBack={prevStep} onNext={nextStep} projectType={state.projectType} />}
          {state.step === "home-features" && <HomeFeaturesStep features={state.homeFeatures} onToggle={(f) => { const curr = state.homeFeatures; update({ homeFeatures: curr.includes(f) ? curr.filter(x => x !== f) : [...curr, f] }); }} onBack={prevStep} onNext={nextStep} />}
          {state.step === "reno-scope" && <RenoScopeStep renoScope={state.renoScope} onScopeChange={(s) => update({ renoScope: s })} onBack={prevStep} onNext={() => { const needsArea = state.renoScope !== "kitchen" && state.renoScope !== "bathroom"; if (needsArea) nextStep(); else update({ step: "reno-condition" }); }} />}
          {state.step === "reno-area" && <RenoAreaStep renoArea={state.renoArea} onAreaChange={(a) => update({ renoArea: a })} onBack={prevStep} onNext={nextStep} renoScope={state.renoScope} />}
          {state.step === "reno-condition" && <RenoConditionStep renoCondition={state.renoCondition} onConditionChange={(c) => update({ renoCondition: c })} onBack={() => { const needsArea = state.renoScope !== "kitchen" && state.renoScope !== "bathroom"; if (needsArea) prevStep(); else update({ step: "reno-scope" }); }} onNext={nextStep} renoScope={state.renoScope} />}
          {state.step === "reno-finish" && <RenoFinishStep renoFinish={state.renoFinish} onFinishChange={(f) => update({ renoFinish: f })} onBack={prevStep} onNext={nextStep} />}
          {state.step === "reno-features" && <RenoFeaturesStep features={state.renoFeatures} renoScope={state.renoScope} onToggle={(f) => { const curr = state.renoFeatures; update({ renoFeatures: curr.includes(f) ? curr.filter(x => x !== f) : [...curr, f] }); }} onBack={prevStep} onNext={nextStep} />}
          {state.step === "consult-type" && <ConsultTypeStep consultType={state.consultType} onTypeChange={(t) => update({ consultType: t })} onBack={prevStep} onNext={nextStep} />}
          {state.step === "consult-details" && <ConsultDetailsStep consultComplexity={state.consultComplexity} consultTimeline={state.consultTimeline} onComplexityChange={(c) => update({ consultComplexity: c })} onTimelineChange={(t) => update({ consultTimeline: t })} onBack={prevStep} onNext={nextStep} />}
          {state.step === "consult-property" && <ConsultPropertyStep propertyType={state.consultPropertyType} onPropertyChange={(p) => update({ consultPropertyType: p })} onBack={prevStep} onNext={nextStep} />}
          {state.step === "consult-value" && <ConsultValueStep projectValue={state.consultProjectValue} onValueChange={(v) => update({ consultProjectValue: v })} onBack={prevStep} onNext={nextStep} />}
          {state.step === "commercial-type" && <CommercialTypeStep commercialType={state.commercialType} onTypeChange={(t) => update({ commercialType: t })} onBack={prevStep} onNext={nextStep} />}
          {state.step === "commercial-finish" && <CommercialFinishStep commercialFinish={state.commercialFinish} onFinishChange={(f) => update({ commercialFinish: f })} onBack={prevStep} onNext={nextStep} />}
          {state.step === "remote-type" && <RemoteTypeStep remoteType={state.remoteType} onTypeChange={(t) => update({ remoteType: t })} onBack={prevStep} onNext={nextStep} />}
          {state.step === "remote-access" && <RemoteAccessStep remoteAccess={state.remoteAccess} onAccessChange={(a) => update({ remoteAccess: a })} onBack={prevStep} onNext={nextStep} />}
          {state.step === "remote-features" && <RemoteFeaturesStep features={state.remoteFeatures} onToggle={(f) => { const curr = state.remoteFeatures; update({ remoteFeatures: curr.includes(f) ? curr.filter(x => x !== f) : [...curr, f] }); }} onBack={prevStep} onNext={nextStep} />}
          {state.step === "analyzing" && <AnalyzingStep projectType={state.projectType} zipCode={state.zipCode} />}
          {state.step === "results" && estimate && <ResultsStep estimate={estimate} displayedTotal={displayedTotal} onReset={reset} isConsulting={state.projectType === "consulting"} isCustomHome={state.projectType === "custom-home"} />}
        </div>
      </main>

      {(isTypeSelect || state.step === "results") && <TrustBar />}

      {showBanners && (
        <div style={{ borderTop: "1px solid #f0f0f0", padding: "20px 24px 24px", background: "#fafafa", textAlign: "center", flexShrink: 0 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "12px 24px", background: `${gold}0c`, border: `1.5px solid ${gold}40`, borderRadius: 8, marginBottom: 14 }}>
            <div style={{ width: 22, height: 22, borderRadius: "50%", background: gold, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
            </div>
            <div style={{ textAlign: "left" }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: gold, fontWeight: 700, letterSpacing: "0.02em", display: "block" }}>Applied: Free Design Consultation + Priority Spring Scheduling</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#999", display: "block", marginTop: 2 }}>Included automatically with your estimate</span>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap", fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#bbb" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>No commitment</span>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>No sales calls</span>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>150+ projects</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CostEstimator() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: dark }}><div style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.5)" }}>Loading estimator...</div></div>}>
      <CostEstimatorInner />
    </Suspense>
  );
}
