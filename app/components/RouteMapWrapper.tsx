"use client";

import dynamic from "next/dynamic";

const RouteMap = dynamic(
  () => import("./RouteMap"),
  { ssr: false }
);

export default function RouteMapWrapper() {
  return <RouteMap />;
}