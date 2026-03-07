// Badge class helpers
export const statusBadge = (s) => {
  const m = {
    active:"b-green",    published:"b-green",  available:"b-green", confirmed:"b-green",
    completed:"b-green", present:"b-green",    paid:"b-green",
    pending:"b-amber",   draft:"b-amber",      booked:"b-amber",
    inactive:"b-gray",   cancelled:"b-rose",   sold_out:"b-rose",   refunded:"b-blue",
    absent:"b-gray",     failed:"b-rose",
  };
  return m[s] || "b-gray";
};

export const roleBadge = (r) => {
  const m = { ADMIN:"b-violet", ORGANIZER:"b-blue", CUSTOMER:"b-green", ATTENDEE:"b-green" };
  return m[r] || "b-gray";
};

// Star rating display
export function Stars({ n }) {
  return (
    <span style={{ fontSize: "1rem" }}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} style={{ opacity: i < n ? 1 : 0.2 }}>⭐</span>
      ))}
    </span>
  );
}
