import { site } from "@/content/site";
import { LoopVideo } from "./LoopVideo";

/** The hero's moving pool water, toned to sit with the sand + clay palette. */
export function OceanVideo() {
  return (
    <div className="absolute inset-0 bg-sea-deep">
      <LoopVideo
        eager
        src={site.oceanVideo.src}
        poster={site.oceanVideo.poster}
        className="h-full w-full scale-[1.02] object-cover [filter:saturate(.78)_hue-rotate(-10deg)_brightness(1.04)]"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-[#e6d7c3] mix-blend-soft-light opacity-40" />
    </div>
  );
}
