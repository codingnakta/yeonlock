import { RELATIONSHIP_TYPE_LABELS } from "@/config/relationshipTypes";
import type { RelationshipTypeId } from "@/types/compatibility";

export function RelationshipTypeBadge({
  type,
  size = "lg",
}: {
  type: RelationshipTypeId;
  size?: "lg" | "sm";
}) {
  const label = RELATIONSHIP_TYPE_LABELS[type];
  if (size === "sm") {
    return <span className="text-[13px] text-ink-soft">{label}</span>;
  }
  return (
    <span className="font-display text-[34px] leading-tight tracking-tight text-ink">{label}</span>
  );
}
